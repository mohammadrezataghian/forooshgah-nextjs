"use client"

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Advertisement } from "@/types/types";

type SwiperSliderProps={
  orderImageOne: Advertisement | null;
  loading: boolean;
  error: string | null;
  siteAddress: string | null;
}

export default function SwiperSlider({ orderImageOne, loading, error,siteAddress }:SwiperSliderProps) {
  
  return (
    <>
      <Swiper
        // loop={true}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper group"
      >
        
        {/* SWIPER SLIDES */}
        {orderImageOne && orderImageOne.imageList?.map((item:any)=>(
          <SwiperSlide key={item.Id}>
          <a className="block w-full h-full" href={item.ImageLink}>
            <img src={item.UploadImageName ? `${siteAddress}/assets/public/adv/${orderImageOne.Id}/${item.Id}/${item.UploadImageName}` : item.Base64Image} alt={item.Description} className=" w-full h-full object-fill"/>
            </a>
          </SwiperSlide>
        ))}
        
        {/* <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide> */}
        {/*  SWIPER SLIDES */}
        {/* SWIPER NAVIGATION */}
        <div className="swiper-button-next bg-gray-500 invisible xl:group-hover:visible transition-[300ms] pl-1 text-white">
          <ArrowForwardIosIcon />
        </div>
        <div className="swiper-button-prev bg-gray-500 invisible xl:group-hover:visible transition-[300ms] pr-1 text-white">
          <ArrowBackIosIcon />
        </div>
        {/* SWIPER NAVIGATION */}
      </Swiper>
    </>
  );
}
