'use client'

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type BigImageBoxesCommonProps={
    orderImage:number;
}

const BigImageBoxesCommon = ({orderImage}:BigImageBoxesCommonProps) => {

  const siteAddress = useSelector((state:RootState)=>state.siteUrlAddress.value)
  const banner = useSelector((state: RootState) => state.banners.value);

// get data
const orderImagetwo = banner?.advertisement?.find(item => item.OrderImage === orderImage)
// end get data

  return (
    <>
      <div className="w-full h-auto 2xl:px-64 grid items-center gap-5 mt-10  px-2 justify-center md:flex md:justify-center">
        {orderImagetwo && orderImagetwo.imageList?.map((item)=>(
          <div key={item.Id} className="h-60 md:h-72 col-span-1 rounded-xl w-full ">
          <a className="w-full h-full flex justify-end" href={item.ImageLink}>
            <img className="w-full h-full object-fill max-w-[670px]  rounded-2xl" src={item.UploadImageName ? `${siteAddress}/assets/public/adv/${orderImagetwo.Id}/${item.Id}/${item.UploadImageName}` : item.Base64Image ?? "/images/skeletonGif/layout-change-1756394580034.gif"} alt={item.Description} />
          </a>
        </div>
        ))}
      </div>
    </>
  );
};

export default BigImageBoxesCommon;