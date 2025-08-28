import React from "react";
import { useAtom } from "jotai";
import { banners } from "@/shared/banners";
import { siteUrlAddress } from "@/shared/site.url.atom";
import Image from "next/image";
import image1 from '@/public/images/skeletonGif/layout-change-1756394580034.gif'

type BigImageBoxesCommonProps={
    orderImage:number;
}

const BigImageBoxesCommon = ({orderImage}:BigImageBoxesCommonProps) => {

  const [siteAddress] = useAtom(siteUrlAddress);
// get data
const [banner,setBanner] = useAtom(banners);
const orderImagetwo = banner?.advertisement?.find(item => item.OrderImage === orderImage)
// end get data

  return (
    <>
      <div className="w-full h-auto 2xl:px-64 grid items-center gap-5 mt-10  px-2 justify-center md:flex md:justify-center">
        {orderImagetwo && orderImagetwo.imageList?.map((item)=>(
          <div key={item.Id} className="h-60 md:h-72 col-span-1 rounded-xl w-full ">
          <a className="w-full h-full flex justify-end" href={item.ImageLink}>
            <Image className="w-full h-full object-fill max-w-[670px]  rounded-2xl" src={item.UploadImageName ? `${siteAddress}/assets/public/adv/${orderImagetwo.Id}/${item.Id}/${item.UploadImageName}` : item.Base64Image ?? image1} alt={item.Description} />
          </a>
        </div>
        ))}
      </div>
    </>
  );
};

export default BigImageBoxesCommon;