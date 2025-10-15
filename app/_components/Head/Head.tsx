"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useInterceptLocalProducts from "@/hooks/useInterceptLocalProducts";
import { useAtom } from "jotai";
import { siteUrlAddress } from "@/shared/site.url.atom";
import { addressService } from "@/services/addressService";
import { address } from "@/shared/Address";
import dynamic from "next/dynamic";
const HeadReturn = dynamic(() => import("./HeadReturn"), {ssr: false,});
const UserAddressModal = dynamic(() => import("@/common/address/UserAddressModal"), {ssr: false,});
const AlertDialog = dynamic(() => import("@/common/ProfileExitDialog/ProfileExitDialog"), {ssr: false,});
const CityDialog = dynamic(() => import("@/common/CityDialog/CityDialog"), {ssr: false,});
const UserPassDialog = dynamic(() => import("@/common/EnterModal/UsernameDialog"), {ssr: false,});
const CustomDialog = dynamic(() => import("@/common/EnterModal/CustomDialog"), {ssr: false,});
const Drawer = dynamic(() => import("./Drawer"), {ssr: false,});
import {useGetSiteAddress} from "@/app/api/siteAddress/hook";
import { IsUserloggedIn } from "@/shared/isLoggedIn";

const Head = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [citydialogOpen, citysetDialogOpen] = useState(false);
  const [siteAddress, setSiteAddress] = useAtom<string | null>(siteUrlAddress);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [addresses, setAdreesses] = useState([]);
  const [userToken, setUserToken] = useState(""); // در یافت توکن از نرم افزار
  const [eshterakNo, setEshterakNo] = useState<{ EshterakNo: number }>({
    EshterakNo: 0,
  });
  const [deleteAddress, setdeleteAddress] = useState(null);
  const [showdefaultaddress, setshowdefaultaddress] = useAtom(address)
  const [loggedIn, setloggedIn] = useAtom(IsUserloggedIn);
  const [errorLoadAddress, setErrorLoadAddress] = useState<string | null>(null);
  const [openUserPassDialog, setOpenUserPassDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  
  //  start handle drawer
  const toggleDrawer = (newOpen: any) => () => {
    setDrawerOpen(newOpen);
  };
  // end handle drawer
  
    //start handle enter dialog
    const handleDialogOpen = () => {
      setDialogOpen(true);
    };
    
    const handleDialogClose = () => {
      setDialogOpen(false);
    };
    //end handle enter dialog
    
    //strat handle city dialog
    const handleSelectAddress = async (address:any) => {
  
      setAdreesses((prev:any) =>
        prev.map((item:any) =>
          item.Id === address.Id
            ? { ...item, SetDefault: true }
            : { ...item, SetDefault: false }
        )
      );
    
      setDefaultAddress(address);
    
      try {
        await addressService.setDefaultAddress(address, userToken);
      } catch (err) {
        console.error("Failed to set default address:", err);
      }
    };


const handleDeleteAddress = (address: any) => {
  setdeleteAddress(address);
  setIsAddressModalOpen(false);
  addressService.deleteAddress(address, userToken);
  console.log(deleteAddress);
};

const handlecityDialogOpen = () => {
  if (loggedIn) {
    //citydialogOpen(true);
    loadAddresses();
    setIsAddressModalOpen(true);
    // console.log(isAddressModalOpen);
  }
};

const handleSelectMapOpen = () => {
  if (loggedIn) {
    citysetDialogOpen(true);
  }
};

const loadAddresses = async () => {
  const obj = Cookies.get("user");
  const userData = obj && JSON.parse(obj);
  const token = localStorage.getItem("userToken") || '';
  const eshterakNo = userData?.EshterakNo;

  setUserToken(token);
  setEshterakNoInpt(eshterakNo);
  setTokenInpt(token);

  if (eshterakNo && token && token != "") {
    console.log(eshterakNo);
    console.log(userToken);
    
    try {
      const data = await addressService.getAllAddresses(
        { EshterakNo: eshterakNo },
        token
      );

      setUserAddressAndSetdefaultAddress(data.Data);
    } catch (err) {
      console.error("API call failed:", err);
      throw Error("Failed to load addresses");
    }
  }
};


const setUserAddressAndSetdefaultAddress = (addressAray: any) => {
  setAdreesses(addressAray);
  
  if (addresses) {
    const findDefaultAddress = addresses.find(
      (item: any) => item?.SetDefault == true
    );
    if (findDefaultAddress) {
      setDefaultAddress(findDefaultAddress);
    }
  }
};

const setEshterakNoInpt = (eshteraknoInput: number) => {
  setEshterakNo({ EshterakNo: eshteraknoInput });
};
const setTokenInpt = (tokenInputValue: string) => {
  setUserToken(tokenInputValue);
};

const handlecityDialogClose = () => {
  citysetDialogOpen(false);
  loadAddresses();
};
// end handle city dialog

//handle cart count
const selectedProductsCount = useInterceptLocalProducts();
// end handle cart count

// Handle line-clamp 1
// if (
//   defaultAddress && defaultAddress?.AddressCompact &&
//   defaultAddress.AddressCompact.length > 40
// ) {
//    defaultAddress.AddressCompact = `${defaultAddress.AddressCompact.substring(
//     0,
//     40
//   )}...`;
// }
// Handle line-clamp-1

const { loading, error,getSiteAddress } = useGetSiteAddress(setSiteAddress)

useEffect(() => {
  const fetchSiteAddress = async () => {
    const data = await getSiteAddress()
    setSiteAddressResponce(data?.data)
  };

  const setSiteAddressResponce = async (data:any) => {
    if (data && data.Data) {
      setSiteAddress(data.Data);
    }
  };

  if (!siteAddress) {
    fetchSiteAddress();
  }

}, [siteAddress, setSiteAddress, loggedIn]);

// alert dialog
const handleExit = () => {
  Cookies.remove("user");
  setloggedIn(false);
  localStorage.removeItem("userToken");
  setOpenAlertDialog(false);
};

const handleClickOpen = () => {
  setOpenAlertDialog(true);
};
//alert dialog

// get user
const userStr = Cookies.get("user");
const user = userStr ? JSON.parse(userStr) : null;
// end get user

  return (
    <>
      <header
        className="w-full 2xl:px-56 h-auto pt-5 pb-3 bg-white boxshadowHead"
      >
        <HeadReturn
          toggleDrawer={toggleDrawer}
          selectedProductsCount={selectedProductsCount}
          isLoggedIn={loggedIn}
          user={user}
          handleClickOpen={handleClickOpen}
          handleDialogOpen={handleDialogOpen}
          handlecityDialogOpen={handlecityDialogOpen}
          showdefaultaddress={showdefaultaddress}
          userToken={userToken}
          eshterakNo={eshterakNo}
        />
      </header>
      <Drawer anchor="right" open={drawerOpen} toggleDrawer={toggleDrawer} />
      <CustomDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        openUserPassDialog={openUserPassDialog}
        setOpenUserPassDialog={setOpenUserPassDialog}
      />
      <UserPassDialog
        open={openUserPassDialog}
        setOpen={setOpenUserPassDialog}
      />
      <CityDialog
        open={citydialogOpen}
        handleClose={handlecityDialogClose}
        loadAddresses={loadAddresses}
      />
      <AlertDialog
        open={openAlertDialog}
        setOpen={setOpenAlertDialog}
        handleExitAcc={handleExit}
        exitDialogContent={
          "با خروج از حساب کاربری، امکان ادامه ی خرید نخواهید داشت. هروقت بخواهید می‌توانید مجددا وارد شوید و خریدتان را ادامه دهید."
        }
      />
      <UserAddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        addresses={addresses}
        onSelectAddress={handleSelectAddress}
        onSelecteMap={handleSelectMapOpen}
        onSelectDelete={handleDeleteAddress}
      />
    </>
  );
};

export default Head;
