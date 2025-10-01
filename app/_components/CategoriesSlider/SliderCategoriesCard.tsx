'use client'

import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { siteUrlAddress } from "@/shared/site.url.atom";
import Link from "next/link";

type SliderCategoriesCardProps ={
    name: string;
    id: string;
    NameImage: string;
}


const SliderCategoriesCard = ({ name, id,NameImage }:SliderCategoriesCardProps) => {

// set site address and image
    const [siteAddress] = useAtom(siteUrlAddress);
    const [image,SetImage] = useState<string | null>(null)
    useEffect(()=>{
      if(siteAddress){
        const imageInit =  `${siteAddress}/assets/public/category/${id}/${NameImage}`
        SetImage(imageInit)
        }
    },[])
// end set site address and image

  return (
    <>
    {image && 
      <div className="w-full h-full" id={id}>
        <Link
          href={`/ProductList/${name}`}
          className="block w-full h-full rounded-lg overflow-hidden text-[#323232]"
        >
          <div className="w-full h-[80%] ">
            <img src={image} alt={name} className="rounded-none object-cover"/>
          </div>
          <div className="w-full h-[20%] text-center text-sm bg-[#F0F0F1] flex justify-center items-center object-cover">
            <h3>{name}</h3>
          </div>
        </Link>
      </div>
      }
    </>
  );
};

export default SliderCategoriesCard;
