'use client'

import React, { useEffect, useState } from "react";
import Image1 from "@/public/images/smallImageBoxes/Bank.png";
// import Image2 from "@/public/images/smallImageBoxes/Acceptanceofgoods.png";
import Image3 from "@/public/images/smallImageBoxes/Citizencard.png";
// import Image4 from "@/public/images/smallImageBoxes/Installment.png";
import Image5 from "@/public/images/smallImageBoxes/Portal.png";
import Image6 from "@/public/images/smallImageBoxes/Representation.png";
import Image7 from "@/public/images/smallImageBoxes/Store.png";
import Image8 from "@/public/images/smallImageBoxes/Supplier.png";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setIsStaffLoggedIn } from "@/store/slices/isStaffLoggedInSlice";

const SmallimageBoxes = () => {
  
const dispatch = useDispatch()  
const IsloggedIn = useSelector((state:RootState) => state.isStaffLoggedIn.value)

const [mounted,setMounted] = useState(false)

useEffect(()=>{
  setMounted(true)
},[])

useEffect(()=>{
if (!!Cookies.get("staffUser")){
  dispatch(setIsStaffLoggedIn(true))
}
},[mounted])

  return (
    <>
    {mounted && 
      <div className="w-full h-auto mt-5 grid grid-rows-3 xs:grid-rows-2 xs:grid-cols-3 lg:grid-rows-1 grid-cols-2 lg:grid-cols-5 2xl:px-60 pt-5 xs:gap-y-5 gap-y-8 gap-x-14">
        {/* structure of one box */}
        <div className="w-full h-full px-6">
          <Link href={'/stores'} className="block gap-y-2 text-[#323232] font-bold h-full">
            <div className="flex justify-center">
              <Image
                src={Image1}
                alt=""
                className="w-20 h-20 object-cover rounded-2xl self-center"
              />
            </div>
            <div className="flex justify-center w-full ">
              <span className="mt-2 text-center"> فروشگاه های تعاونی </span>
            </div>
          </Link>
        </div>
        {/* end structure of one box */}
        {/* <div className="w-full h-full px-6">
          <a href="#" className="block gap-y-2 text-[#323232] font-bold h-full">
            <div className="flex justify-center">
              <Image
                src={Image3}
                alt=""
                className="w-20 h-20 object-cover rounded-2xl self-center"
              />
            </div>
            <div className="flex justify-center w-full ">
              <span className="mt-2 text-center"> بن کارت </span>
            </div>
          </a>
        </div> */}
        <div className="w-full h-full px-6">
          <Link href="/stockRequest" className="block gap-y-2 text-[#323232] font-bold h-full">
            <div className="flex justify-center">
              <Image
                src={Image6}
                alt=""
                className="w-20 h-20 object-cover rounded-2xl self-center"
              />
            </div>
            <div className="flex justify-center w-full ">
            <span className="mt-2 text-center"> سهامدار شوید </span>
            </div>
          </Link>
        </div>
        <div className="w-full h-full px-6">
          <Link href={IsloggedIn ? "/staff/dashboard" : "/staff/login"} className="block gap-y-2 text-[#323232] font-bold h-full">
            <div className="flex justify-center">
              <Image
                src={Image5}
                alt=""
                className="w-20 h-20 object-cover rounded-2xl self-center"
              />
            </div>
            <div className="flex justify-center w-full ">
              <span className="mt-2 text-center"> پرتال سازمانی </span>
            </div>
          </Link>
        </div>
        <div className="w-full h-full px-6">
          <Link href="/customersClub" className="block gap-y-2 text-[#323232] font-bold h-full">
            <div className="flex justify-center">
              <Image
                src={Image7}
                alt="Customers club"
                className="w-20 h-20 object-cover rounded-2xl self-center"
              />
            </div>
            <div className="flex justify-center w-full ">
              <span className="mt-2 text-center"> باشگاه مشتریان </span>
            </div>
          </Link>
        </div>
        <div className="w-full h-full px-6 col-span-2 lg:col-span-1">
          <Link href={(!!Cookies.get("supplierUser")) ? "/suppliers/dashboard" : "/suppliers/login"} className="block gap-y-2 text-[#323232] font-bold h-full">
            <div className="flex justify-center">
              <Image
                src={Image8}
                alt="تامین کنندگان"
                className="w-20 h-20 object-cover rounded-2xl self-center"
              />
            </div>
            <div className="flex justify-center w-full ">
              <span className="mt-2 text-center"> تامین کنندگان </span>
            </div>
          </Link>
        </div>
      </div>
      }
    </>
  );
};

export default SmallimageBoxes;