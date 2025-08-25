import React, { useEffect, useState } from "react";
import { IoMdHome } from "react-icons/io";
import Svg from "../../global/svg/apps-svgrepo-com.svg";
import DrawerDrawer from "../Head/Drawer";
import CustomDialog from "@/common/EnterModal/CustomDialog";
import Badge from "@mui/material/Badge";
import SidemenuDrawer from "./SideMenu";
import Account from '../../global/svg/User.svg'
import Search from '../../global/svg/Search_magnifyer.svg'
import Basket from '../../global/svg/Shopping_cart.svg'
import useInterceptLocalProducts from "@/hooks/useInterceptLocalProducts";
import Cookies from "js-cookie";
import AlertDialog from "@/common/ProfileExitDialog/ProfileExitDialog";
import FullScreenDialog from "./AccountDialog";
import { useAtom } from "jotai";
import { IsUserloggedIn } from "@/shared/isLoggedIn";
import UserPassDialog from "@/common/EnterModal/UsernameDialog";
import Link from "next/link";

const MobileMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [SidemenuDrawerOpen, setSidemenuDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [loggedIn, setloggedIn] = useAtom(IsUserloggedIn);
  const [openUserPassDialog, setOpenUserPassDialog] = useState(false);

  //  start handle drawer
  const toggleDrawer = (open:boolean) => (event:any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
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

   // start sidemenu Drawer Handlers
   const toggleSidemenuDrawer = (open:boolean) => (event:any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSidemenuDrawerOpen(open);
  };
  // end sidemenu Drawer Handlers

  //handle cart count
    const selectedProductsCount = useInterceptLocalProducts();
    // end handle cart count

const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("user"));

useEffect(() => {
  const checkLoginStatus = () => {
    setIsLoggedIn(!!Cookies.get("user"));
  };

  // Run once on mount and also whenever cookies might change
  checkLoginStatus();
  
  // Set an interval to check for updates every second
  const interval = setInterval(checkLoginStatus, 1000);

  return () => clearInterval(interval);
}, []);
const handleExit = () => {
  Cookies.remove("user");
  setloggedIn(false)
  setIsLoggedIn(false); // Manually update state
  localStorage.removeItem('userToken')
  setOpenAlertDialog(false)
};
    
const [openAlertDialog, setOpenAlertDialog] = useState(false);
const handleClickOpen = () => {
  setOpenAlertDialog(true);
};

// handle open account dialog
const handleClickOpenAccount = () => {
  setOpen(true);
};
const handleCloseAccount = () => {
  setOpen(false);
};
// end handle open account dialog

  return (
    <>
      {/* start menu */}
      <div className="toolbar tabbar toolbar-bottom visible-xs visible-sm lg:hidden z-[10000]">
        <nav id="" className="toolbar-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="768"
            height="50"
            viewBox="0 0 768 50"
          >
            <path
              className="footer_path"
              d="M-15,0H345c12.855,0,16.965,20,39,20,22.238,0,25.921-20,39-20H828V95H-15V0Z"
            ></path>
          </svg>
          {/* start categories/menuMobile*/}
          <a className="tab-link sidemenu " onClick={(event) => {
            event.preventDefault();
            setSidemenuDrawerOpen(true); 
          }} >
            <img className="w-7 h-7" src={Svg} alt="" />
            <p className=" text-xs"> دسته بندی ها</p>
          </a>
          {/* end basket categories/menuMobile*/}
          {/* start account */}
          <a
            data-toggle="modal"
            className="tab-link"
            onClick={(event) => {
              event.preventDefault();
              {isLoggedIn ? handleClickOpenAccount() : handleDialogOpen() }
            }}
          >
            <img className="w-7 h-7" src={Account} alt="" />
            <p className=" text-xs">حساب کاربری</p>
          </a>
          {/* end account */}
          {/* start home */}
          <Link href="/" id="homebut" className="tab-link">
            <IoMdHome className="absolute top-3 left-1/2 translate-x-1/2 text-2xl" />
          </Link>
          {/* end home */}
          {/* start search */}
          <Link href="/Search" className="tab-link">
            <img className="w-7 h-7" src={Search} alt="" />
            <p className=" text-xs">جستجو</p>
          </Link>
          {/* end search */}
          {/* start basket */}
          <a className="tab-link" onClick={toggleDrawer(true)} 
          >
            <Badge
            sx={{
              '& .MuiBadge-badge': {
                transform: 'translate(18px, -2px)', // Adjust the X and Y offsets
              },
            }}
            badgeContent={selectedProductsCount} color="primary">
              <img className="w-7 h-7" src={Basket} alt="" />
            </Badge>

            <p className="text-xs">سبد خرید</p>
          </a>
          {/* end basket*/}
        </nav>
      </div>
      <AlertDialog open={openAlertDialog} setOpen={setOpenAlertDialog} handleExitAcc={handleExit} exitDialogContent={'با خروج از حساب کاربری، امکان ادامه ی خرید نخواهید داشت. هروقت بخواهید می‌توانید مجددا وارد شوید و خریدتان را ادامه دهید.'}/>
      <DrawerDrawer anchor="left" open={drawerOpen} toggleDrawer={toggleDrawer} />
      <CustomDialog open={dialogOpen} handleClose={handleDialogClose} openUserPassDialog={openUserPassDialog} setOpenUserPassDialog={setOpenUserPassDialog}/>
      <UserPassDialog open={openUserPassDialog} setOpen={setOpenUserPassDialog}/>
      <SidemenuDrawer isOpen={SidemenuDrawerOpen} toggleDrawer={toggleSidemenuDrawer}/>
      <FullScreenDialog handleClickOpenAccount={handleClickOpenAccount} open={open} setOpen={setOpen} handleCloseAccount={handleCloseAccount} handleClickOpen={handleClickOpen}/>
      {/* end menu */}
    </>
  );
};

export default MobileMenu;
