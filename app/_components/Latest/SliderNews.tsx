'use client'

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useAtom } from "jotai";
import { siteUrlAddress } from "@/shared/site.url.atom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";


const SliderNews = (data:any) => {
  
  const [siteAddress] = useAtom(siteUrlAddress);
  
  return (
    <>
      {data && data.data.length > 0 && (
        <Swiper
          loop={data.data.length > 1}
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={
            data.data.length > 1
              ? { clickable: true }
              : false 
          }
          navigation={{
            nextEl: ".swiper-button-next2",
            prevEl: ".swiper-button-prev2",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiperNews group"
          >
          {/* SWIPER NAVIGATION */}
          {data.data.length > 1 && 
          <>
          <div className="swiper-button-next swiper-button-next2 custom-next bg-gray-500 invisible lg:group-hover:visible transition-[300ms] pl-1 text-white">
            <ArrowForwardIosIcon />
          </div>
          <div className="swiper-button-prev swiper-button-prev2 custom-prev bg-gray-500 invisible lg:group-hover:visible transition-[300ms] pr-1 text-white">
            <ArrowBackIosIcon />
          </div>
          </>}
          {/* end SWIPER NAVIGATION */}
          
          {/* SWIPER SLIDES */}
          {data.data.map((item:any) => (
            <SwiperSlide key={item.FldId}>
              <div className="w-full">
                <Link
                  // href={`/#/newsInformation/newsdetails/${item.FldId}`}`/GetNews/${item.FldId}
                  href={`/getNews/${item.FldId}`}
                  onClick={()=> sessionStorage.setItem('NewsItem',JSON.stringify(item))}
                  className="w-full h-full block"
                >
                        <img
                          className="w-full h-44 object-fill"
                          src={`${siteAddress}/assets/public/News/Main/${item.FldId}/${item.MainImage}`}
                          alt={item.Title}
                        />                  
                </Link>
                <p className="text-xs my-2 ps-1 text-gray-500 text-right">تاریخ : <span>{item.PublishDateTimeShamsi}</span></p>
                <p className="text-sm ps-1 flex ">
                  <Link
                    // href={`/#/newsInformation/newsdetails/${item.FldId}`}
                    href={`/getNews/${item.FldId}`}
                  onClick={()=> sessionStorage.setItem('NewsItem',JSON.stringify(item))}
                    className="line-clamp-2 hover:text-blue-500 text-black pb-3"
                  >
                    {item.Title}
                  </Link>
                </p>
                <p className="text-sm flex line-clamp-2 text-justify pl-3">
                  <Link className="line-clamp-2 text-justify text-gray-500 hover:text-blue-500" 
                  href={`/getNews/${item.FldId}`}
                  onClick={()=> sessionStorage.setItem('NewsItem',JSON.stringify(item))}>
                    {item.ShortBody}</Link>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default SliderNews;
