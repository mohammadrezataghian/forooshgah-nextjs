'use client'

import React, { useEffect } from 'react'
import { Divider } from "@mui/material";
import { usePathname } from "next/navigation";
import useGetNews from "@/app/api/getNewsArticles/hook";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


const GetArticles = () => {

  const siteAddress = useSelector((state:RootState)=>state.siteUrlAddress.value)

  const params = usePathname()
  const segment = params.split('/')
  const id = segment[2]
  
  const { loadingNews, error, News,getNews } = useGetNews()
  useEffect(()=>{
    const param ={
    "IdNewsOrArticles" : id,
    "pageIndex" : 1,
    "pageSize" : 1
    }
    if(id){
      getNews(param)
    }
  },[id])

  return (
    <>
    {News && 
    <div className='lg:px-64 xl:px-96 px-3 pt-10 bg-white pb-24'>
      <div className='w-full h-auto flex flex-col gap-5'>
        <h1 className='text-xl'>{News?.Title}</h1>
        <div className="flex justify-center">
            <img 
            src={`${siteAddress}/assets/public/News/Main/${News?.FldId}/${News?.MainImage}`}
            alt={News?.Title}  className="object-cover"/>
        </div>
        <Divider/>
        <p className='text-justify'>{News?.ShortBody}</p>
        <p className='text-justify leading-8'>
        {News?.LargeBody}
        </p>
        <Divider/>
        <p className='text-lg'>ویدیو ها:</p>
        <div className="flex gap-5 flex-wrap justify-center">
        {News?.VideoDetailList && News.VideoDetailList.map((items:any)=>(
            <div key={items.Id} className="w-96">
                <video src={`${siteAddress}/assets/public/News/Video/${News.FldId}/${items.Id}/${items.VideoName}`} controls></video>
            </div>
          ))
          }
        </div>     
      </div>
    </div>
    }
    </>
  )
}

export default GetArticles