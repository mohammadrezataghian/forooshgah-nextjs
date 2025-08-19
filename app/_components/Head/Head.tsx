'use client'

import React, { useState } from "react";
import Drawer from "./Drawer";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { siteUrlAddress } from "@/shared/site.url.atom";
import { address } from '@/shared/Address';
import { IsUserloggedIn } from "@/shared/isLoggedIn";
import useInterceptLocalProducts from "@/hooks/useInterceptLocalProducts";
import HeadReturn from "./HeadReturn";
import { addressService } from "@/services/addressService";
import { Address } from "@/types/types";
import AlertDialog from "@/common/ProfileExitDialog/ProfileExitDialog";

const Head = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [citydialogOpen, citysetDialogOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [addresses, setAdreesses] = useState([]);
  const [userToken, setUserToken] = useState(""); // در یافت توکن از نرم افزار
  const [eshterakNo, setEshterakNo] = useState<{ EshterakNo: number }>({EshterakNo: 0});
  const [deleteAddress,setdeleteAddress] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("user"));
  const [errorLoadAddress, setErrorLoadAddress] = useState<string | null>(null);
  const [openUserPassDialog, setOpenUserPassDialog] = useState(false);
  const [siteAddress, setSiteAddress] = useAtom(siteUrlAddress);
  const [showdefaultaddress, setshowdefaultaddress] = useAtom<Address | undefined>(address)
  const [loggedIn, setloggedIn] = useAtom(IsUserloggedIn);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

//handle cart count
const selectedProductsCount = useInterceptLocalProducts();
// end handle cart count

  //  start handle drawer
  const toggleDrawer = (newOpen:any) => () => {
    setDrawerOpen(newOpen);
  };
  // end handle drawer
    
// get user
const userStr = Cookies.get('user');
const user = userStr ? JSON.parse(userStr) : null;
// end get user

const handleClickOpen = () => {
  setOpenAlertDialog(true);
};


  //start handle enter dialog
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  //end handle enter dialog

  const handlecityDialogOpen = () => {
    if (isLoggedIn) {
      //citydialogOpen(true);
      loadAddresses();
      setIsAddressModalOpen(true);
      // console.log(isAddressModalOpen);
    }
  };

  const loadAddresses = async () => {
    const obj = Cookies.get("user");
    const userData = obj && JSON.parse(obj);
    setUserToken(localStorage.getItem("userToken") || "");
    setEshterakNoInpt(userData && userData.EshterakNo);
    const token = localStorage.getItem("userToken");
    setTokenInpt(token || "");
    if (eshterakNo && userToken && userToken != "") {
      try {
        const data = await addressService.getAllAddresses(
          {
            eshterakno: eshterakNo?.EshterakNo ?? '', 
            tokenInput: userToken || ''
          }
        );

        setUserAddressAndSetdefaultAddress(data.Data);
      } catch (err) {
        setErrorLoadAddress("Failed to load addresses");
      }
    }
  };

  const setUserAddressAndSetdefaultAddress = (addressAray : any) => {
    setAdreesses(addressAray);

    if (addresses) {
      const findDefaultAddress = addresses.find(
        (item : any) => item?.SetDefault == true
      );
      if (findDefaultAddress) {
        setDefaultAddress(findDefaultAddress);
      }
    }
  };

  const setEshterakNoInpt = (eshteraknoInput : number) => {
    setEshterakNo({ EshterakNo: eshteraknoInput });
  };
  const setTokenInpt = (tokenInputValue : string) => {
    setUserToken(tokenInputValue);
  };

  // alert dialog
  const handleExit = () => {
    Cookies.remove("user");
    setloggedIn(false)
    setIsLoggedIn(false); // Manually update state
    localStorage.removeItem('userToken')
    setOpenAlertDialog(false)
  };
  //alert dialog

  return (
    <>
      <header className="w-full 2xl:px-56 h-auto pt-5 pb-3 bg-white boxshadowHead">
       <HeadReturn toggleDrawer={toggleDrawer} selectedProductsCount={selectedProductsCount} isLoggedIn={isLoggedIn} user={user} handleClickOpen={handleClickOpen} handleDialogOpen={handleDialogOpen} handlecityDialogOpen={handlecityDialogOpen} showdefaultaddress={showdefaultaddress} userToken={userToken} eshterakNo={eshterakNo}/>
      </header>
      <Drawer anchor="right" open={drawerOpen} toggleDrawer={toggleDrawer} />
      <AlertDialog
        open={openAlertDialog}
        setOpen={setOpenAlertDialog}
        handleExitAcc={handleExit}
        exitDialogContent={'با خروج از حساب کاربری، امکان ادامه ی خرید نخواهید داشت. هروقت بخواهید می‌توانید مجددا وارد شوید و خریدتان را ادامه دهید.'}
      />
    </>
  )
}

export default Head