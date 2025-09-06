'use client'

import { Divider } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../swiper.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useAtom } from "jotai";
import { siteUrlAddress } from "@/shared/site.url.atom";
import { ArticleItem } from '@/types/types';


const GetNews = () => {
  
    const [item, setItem] = useState<ArticleItem | null>(null);
    const [siteAddress] = useAtom(siteUrlAddress);
  // get data
  useEffect(() => {
      const saved = sessionStorage.getItem('NewsItem');
      if (saved) {
          setItem(JSON.parse(saved));
          sessionStorage.removeItem('NewsItem')
      }
    }, []);
  const images = item?.ImageGallury?.split(",")
  // end get data

  const progressCircle = useRef<SVGSVGElement | null>(null);
const progressContent = useRef<HTMLSpanElement | null>(null);
  const onAutoplayTimeLeft = (s:any, time:any, progress:any) => {
    if(progressCircle.current && progressContent.current){
      progressCircle.current.style.setProperty('--progress', String(1 - progress));
      progressContent.current.textContent = ` ${Math.ceil(time / 1000)} ثانیه`;
    }
  };

  if (!item) {
    return <div className="text-center mt-10">Loading...</div>; // safe fallback
  }
  
  return (
    <>
    <div className='lg:px-64 xl:px-96 px-3 pt-10 bg-white pb-24'>
      <div className='w-full h-auto flex flex-col gap-5'>
        <h1 className='text-xl'>{item.Title}</h1>
        <Divider/>
        <p className='text-justify'>{item.ShortBody}</p>
        <div className='h-auto w-full'>
        <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {/* SWIPER NAVIGATION */}
        <div className="swiper-button-next swiper-button-next2 custom-next bg-gray-500 pl-1 text-white">
            <ArrowForwardIosIcon />
          </div>
          <div className="swiper-button-prev swiper-button-prev2 custom-prev bg-gray-500 pr-1 text-white">
            <ArrowBackIosIcon />
          </div>
          {/* SWIPER NAVIGATION */}
          {/* SWIPER SLIDES */}
          {images && images.map((image:any, index:any) => (
            <SwiperSlide key={index}>
              <div className="w-full h-auto">
                <img
                  className="w-full lg:h-[60vh] h-auto object-cover"
                  src={`${siteAddress}/assets/public/News/Gallery/${item.FldId}/${image}`}
                />
              </div>
            </SwiperSlide>
          ))}
        {images && images.length > 1 && 
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>}
        
      </Swiper>
        </div>
        <p className='text-justify leading-8'>
        {item.LargeBody}
        </p>
        <Divider/>
          {item.VideoList &&
          <>
            <p className='text-lg'>ویدیو :</p>
            <video src={`${siteAddress}/assets/public/News/Video/${item.FldId}/${item.VideoList}`} controls></video>
          </>
          }
      </div>
    </div>
    </>
  )
}
export default GetNews