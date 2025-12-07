'use client'

import * as React from 'react'
import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { addressService } from "@/services/addressService";
import useGetCartBalance from "@/app/api/itemCart/hook";
import useGetTotalFactor from '@/app/api/totalFactor/hook';
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const IndexButtons = dynamic(() => import("./_components/IndexButtons"), {ssr: false,});
const CustomDialog = dynamic(() => import("@/common/EnterModal/CustomDialog"), {ssr: false,});
const UserPassDialog = dynamic(() => import("@/common/EnterModal/UsernameDialog"), {ssr: false,});
const CityDialog = dynamic(() => import("@/common/CityDialog/CityDialog"), {ssr: false,});
const ConfirmationDialog = dynamic(() => import("@/common/ConfirmationDialog/ConfirmationDialog"), {ssr: false,});
const MessageSnackbar = dynamic(() => import("@/common/Snackbar/MessageSnackbar"), {ssr: false,});
const UserAddressModal = dynamic(() => import("@/common/address/UserAddressModal"), {ssr: false,});
const CustomizedDialogs = dynamic(() => import("./_components/DialogDelete"), {ssr: false,});
import CardItem from "./_components/CardItem"
import TotalFactor from "./_components/TotalFactor"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearProductListUpdate, setProductListUpdate } from '@/store/slices/productListSlice';

export default function ItemCart() {

  const dispatch = useDispatch()
  const showdefaultaddress = useSelector((state: RootState) => state.address.value);
  const products = useSelector((state:RootState)=>state.productListUpdate.value)
  // check for login
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("user"));
  //
  const [siteAddress, setSiteAddress] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [opensnackbar, setOpensnackbar] = useState(false);
  //address
  const [addresses, setAdreesses] = useState([]);
  const [userToken, setUserToken] = useState(""); // در یافت توکن از نرم افزار
  const [eshterakNo, setEshterakNo] = useState<{EshterakNo:number}>({EshterakNo:0}); // در یافت توکن از نرم افزار
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [citydialogOpen, citysetDialogOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [deleteAddress,setdeleteAddress] = useState(null)
  const [opendialogdelete, setOpendialogdelete] = useState(false);
  const [openUserPassDialog, setOpenUserPassDialog] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
// start handling delete unmatching store products
useEffect(()=>{
  setTimeout(() => {
    const updated = () => {
      if (products.length === 0) return products;
    
      const firstStoreName = products[0].NameForooshgah;
      const filteredProducts = products.filter(
        (product:any) => product.NameForooshgah === firstStoreName
      );
    
      // Only update if filtering changed the array
      if (filteredProducts.length !== products.length) {
        setOpensnackbar(true);
        return filteredProducts;
      }
      
      return products; // No unnecessary state update
      
    }
    dispatch(setProductListUpdate(updated()))
    
  }, 1000);
  
    },[])
// end handling delete unmatching store products
    
    // delete unavailable from cart
    const params = useMemo(() => {
      if (products.length === 0) return null;
      return {
        IdFactor: 0,
        KalaList: products,
      };
    }, [products]);
  
    const { balance, loading, error } = useGetCartBalance(params);

    useEffect(() => {
      if (balance && balance.length > 0) {
        setOpendialogdelete(true);
      }
    }, [balance]);

    useEffect(() => {
      if (opendialogdelete === false && balance) {
        const mojod = products.filter(
          (item:any) => !balance.some((nm:any) => nm.IdKala === item.IdKala)
        );
        dispatch(setProductListUpdate(mojod))
      }
    }, [opendialogdelete]);
    // end delete unavailable from cart
    
// handle cart info
const dataToSend = useMemo(() => {
  if (products && products.length === 0) return null;
  return {
    IdFactor: 0,
    KalaList: products,
  };
}, [products]);

const { price, loadingPrice, errorPrice } = useGetTotalFactor(dataToSend);
//  end handle cart info

  // handle navigation
  const handleNavigation = () => {
    router.push("/preFactor")
  };
  // end handle navigation

  // check for login
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!Cookies.get("user"));
    };

    checkLoginStatus(); // Run once on mount and also whenever cookies might change

    const interval = setInterval(checkLoginStatus, 1000); // Set an interval to check for updates every second
    loadAddresses();
    
    return () => clearInterval(interval);
  }, [siteAddress, setSiteAddress, isLoggedIn]);
  // end check for login
 
  // handle location
  useEffect(() => {
    const updateLocation = () => {
      setLocation(localStorage.getItem("location") || ''); // Fetch updated value
    };

    window.addEventListener("storage", updateLocation);

    return () => {
      window.removeEventListener("storage", updateLocation);
    };
  }, []);

  useEffect(() => {
    setLocation(localStorage.getItem("location") || ''); // Update on component re-render
  }, [citydialogOpen]);
  // end location

  // handle deleting shopping cart
  function deleteShoppingCard() {
    localStorage.removeItem("products");
    dispatch(clearProductListUpdate())
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  // end handle delete shopping cart

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


  const handlecityDialogOpen = () => {
    if (isLoggedIn) {
      loadAddresses();
      setIsAddressModalOpen(true);
    }
  };

  const handleSelectMapOpen = () => {
    if (isLoggedIn) {
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

  const setUserAddressAndSetdefaultAddress = (addressAray:any) => {
    setAdreesses(addressAray);

    if (addresses) {
      const findDefaultAddress = addresses.find(
        (item:any) => item.SetDefault == true
      );
      if (findDefaultAddress) {
        setDefaultAddress(findDefaultAddress);
      }
    }
  };

  const setEshterakNoInpt = (eshteraknoInput:any) => {
    setEshterakNo({ EshterakNo: eshteraknoInput });
  };
  const setTokenInpt = (tokenInputValue:any) => {
    setUserToken(tokenInputValue);
  };

  const handlecityDialogClose = () => {
    citysetDialogOpen(false);
    loadAddresses();
  };

  const handleDeleteAddress = (address:any) => {
      setdeleteAddress(address);
      setIsAddressModalOpen(false);
      addressService.deleteAddress(address, userToken);
    };
  // end handle city dialog

// custom dialog settings
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
// end custom dialog settings
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

  return (
    <>
      <title>سبد خرید</title>
      <meta name="description" content="سبد خرید اینترنتی" />
      <div className="p-10 pt-3 gap-5 flex overflow-x-auto mb-5 w-full">
        {mounted && products && products.length > 0 ? (
          products?.map((data:any, index:any) => (
            <React.Fragment key={index}>
              <CardItem
                discount={data.Takhfif}
                id={data.IdStoreStock}
                prevPrice={data.PriceForoosh}
                price={data.PriceForooshAfterDiscount}
                name={data.NameKala}
                data={data}
                key={index}
                images={data.FldNameImageKalaList}
                NameForooshgah={data.NameForooshgah}
                count={
                  products.find(
                    (item:any) => item?.IdStoreStock === data.IdStoreStock
                  )?.count
                }
                products={products}
                idForImage={data.IdKala}
                kalalist={price?.KalaList}
              />
            </React.Fragment>
          ))
        ) : (
          <div className="w-full flex justify-center">
            <span className="text-red-500">سبد خرید شما خالی است!</span>
          </div>
        )}
      </div>
        {/* start total factor */}
      <TotalFactor factoeAfrerCalc={price} products={products} loadingPrice={loadingPrice}/>
        {/* end total factor */}

      {/* start buttons */}
      <IndexButtons products={products} factoeAfrerCalc={price} isLoggedIn={isLoggedIn} setOpenModal={setDialogOpen} showdefaultaddress={showdefaultaddress} handlecityDialogOpen={handlecityDialogOpen} handleNavigation={handleNavigation} handleClickOpen={handleClickOpen}/>
      {/* end buttons */}

      {/* start enter modal */}

      <CustomDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        openUserPassDialog={openUserPassDialog}
        setOpenUserPassDialog={setOpenUserPassDialog}
      />
      <UserPassDialog open={openUserPassDialog} setOpen={setOpenUserPassDialog}/>

      {/*  end enter modal */}
      <CityDialog open={citydialogOpen} handleClose={handlecityDialogClose} loadAddresses={loadAddresses}/>
      <ConfirmationDialog open={open} setOpen={setOpen} handleDelete={deleteShoppingCard} dialogTitle={'حذف سبد خرید'} dialogContent={'آیا از حذف سبد خرید اطمینان دارید؟'}/>
      <MessageSnackbar snackbarOpen={opensnackbar} autoHideDuration={2000} snackbarMessage={"محصولات در سبد خرید باید فقط از یک فروشگاه باشند"} setSnackbarOpen={setOpensnackbar}/>
      {/* مدال آدرس */}
      <UserAddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        addresses={addresses}
        onSelectAddress={handleSelectAddress}
        onSelecteMap={handleSelectMapOpen}
        onSelectDelete={handleDeleteAddress}
      />
      <CustomizedDialogs opendialogdelete={opendialogdelete} setOpendialogdelete={setOpendialogdelete} namojod={balance}/>
    </>
  );
}