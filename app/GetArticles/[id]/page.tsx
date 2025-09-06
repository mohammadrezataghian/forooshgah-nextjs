'use client'

import { useAtom } from "jotai";
import { siteUrlAddress } from '@/shared/site.url.atom'
import React, { useEffect, useState } from 'react'
import { Divider } from "@mui/material";
import { ArticleItem } from "@/types/types";


const GetArticles = () => {

    const [item, setItem] = useState<ArticleItem | null>(null);
    const [siteAddress] = useAtom(siteUrlAddress);

    // get data

  useEffect(() => {
    const saved = sessionStorage.getItem('ArticlesItem');
    if (saved) {
        setItem(JSON.parse(saved));
        sessionStorage.removeItem('ArticlesItem')
    }
  }, []);
// end get data

if (!item) {
    return <div className="text-center mt-10">Loading...</div>; // safe fallback
  }

  return (
    <>
    <div className='lg:px-64 xl:px-96 px-3 pt-10 bg-white pb-24'>
      <div className='w-full h-auto flex flex-col gap-5'>
        <h1 className='text-xl'>{item?.Title}</h1>
        <div className="flex justify-center">
            <img 
            src={`${siteAddress}/assets/public/News/Main/${item?.FldId}/${item?.MainImage}`}
            alt={item?.Title}  className="object-cover"/>
        </div>
        <Divider/>
        <p className='text-justify'>{item?.ShortBody}</p>
        <p className='text-justify leading-8'>
        {item?.LargeBody}
        </p>
        <Divider/>
        <p className='text-lg'>ویدیو ها:</p>
        <div className="flex gap-5 flex-wrap justify-center">
        {item?.VideoDetailList && item.VideoDetailList.map((items:any)=>(
            <div key={items.Id} className="w-96">
                <video src={`${siteAddress}/assets/public/News/Video/${item.FldId}/${items.Id}/${items.VideoName}`} controls></video>
            </div>
          ))
          }
        </div>
          
      </div>
    </div>
    </>
  )
}

export default GetArticles