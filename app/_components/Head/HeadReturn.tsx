'use client'

import React from 'react'
import Basket from "@/public/svg/Shopping_cart_24.svg";
import { Badge } from "@mui/material";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchInput from "./SearchInput";
import ForooshgahList from "./ForooshaghList";
import Logo from "@/public/logo/logo.png";
import Link from 'next/link';
import Image from "next/image";
import { Address } from '@/types/types';
import dynamic from 'next/dynamic';
const MenuListComposition = dynamic(() => import("./AccountDropdown"), {ssr: false,});
  
type headReturnType={

  toggleDrawer: (newOpen: any) => () => void;
  selectedProductsCount: any;
  isLoggedIn: boolean;
  user: any;
  handleClickOpen: () => void;
  handleDialogOpen: () => void;
  handlecityDialogOpen: () => void;
  showdefaultaddress: Address | undefined;
  userToken: string;
}

const HeadReturn = ({toggleDrawer,selectedProductsCount,isLoggedIn,user,handleClickOpen,handleDialogOpen,handlecityDialogOpen,showdefaultaddress,userToken} : headReturnType) => {
  
  return (
    <>
    <div className="w-full h-auto grid lg:px-2 lg:justify-between lg:flex lg:flex-row lg:flex-nowrap lg:gap-3 gap-y-2 grid-cols-2 grid-rows-1 px-2 ">
          {/* start basket */}
          <div className="basket bg-white boxshadowHead rounded-md p-2 w-fit col-start-1 row-start-1 lg:block hidden">
            <button type="button" onClick={toggleDrawer(true)} className='cursor-pointer'>
              <Badge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                badgeContent={selectedProductsCount}
                color="info"
              >
                <Image className="ml-1 w-6 h-6" src={Basket} alt="Open Drawer" />
              </Badge>
            </button>
          </div>
          {/* end basket */}
          {/* start register&enter */}
          <div className="rgisterEnter hidden lg:flex justify-center items-center lg:w-1/6 h-[41px] rounded-md mt-1 lg:mt-0 boxshadowHead col-span-3">
            {/* <a className="text-md text-black mt-1" href="/#/dashboard/">
              | &nbsp;ثبت نام
            </a> */}
            {isLoggedIn ? (
              <>
              <div>
                {/* <Button variant="text" onClick={handleClickOpen} className="flex gap-1 items-center lg:hidden">
                <BiExit className="text-xl scale-x-[-1]"/> <span className="">خروج از حساب کاربری</span>
                </Button> */}
                <div className="lg:hidden block">{user && user.FirstName} {user && user.LastName}</div>
              </div>
              <MenuListComposition handleClickOpen={handleClickOpen} user={user} userToken={userToken} />
              </>
            ) : (
              <Button className="register w-full" onClick={handleDialogOpen}>
                ورود
              </Button>
            )}
          </div>
          {/* end register&enter */}
          {/* start choose city */}
          <div className="chooseCity hidden lg:flex justify-between lg:w-1/4 h-[41px] rounded-md items-center px-2 boxshadowHead col-span-3">
            <div className="">
              <LocationOnIcon className="LocationOnIcon" />
            </div>
            <Button
              className="city line-clamp-1 leading-5 overflow-hidden flex justify-center w-full"
              onClick={handlecityDialogOpen}
            >
              {!isLoggedIn && (
                <span className="w-full text-center">
                  برای مکان یابی ابتدا وارد شوید
                </span>
              )}
              <div className='line-clamp-1'>
                {isLoggedIn && showdefaultaddress && showdefaultaddress.AddressCompact}
              </div>
              {isLoggedIn &&  !showdefaultaddress &&"لطفا آدرس خود را انتخاب کنید"}
            </Button>
          </div>
          {/* end choose city */}
          {/* start search box */}

          <div className="searchProduct lg:w-1/3 h-[41px] rounded-md col-span-3 lg:block hidden ">
            <SearchInput />
          </div>

          {/* end search box */}
          {/* start select store */}
          <div className=" flex h-[41] items-center col-start-2 row-start-1 overflow-visible w-56 justify-self-end">
            <ForooshgahList />
          </div>
          {/* end select store */}
          {/* start logo */}
          <div className="w-auto h-[35px] flex items-center col-start-1 row-start-1 justify-self-start">
            <Link
              className="w-auto h-full flex items-center"
              href="/"
              target="_self"
            >
              <Image className="object-contain w-14" src={Logo} alt="لوگو" />
            </Link>
          </div>
          {/* end logo */}
        </div>
    </>
  )
}

export default HeadReturn