'use client'

import React, { useState,useEffect } from "react";
import useGetAdvertisement from "@/app/api/mainSlider/hook";
import MainSliderLoadingSkeleton from "./LoadingSkeleton";
import SmallSkeleton from "./SmallSkeleton";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
const SwiperSlider = dynamic(() => import("./Swiper"), {ssr: false,});
import { useDispatch, useSelector } from "react-redux";
import { setBanners } from "@/store/slices/bannersSlice";
import { setIsUserloggedIn } from "@/store/slices/isLoggedInSlice";
import { RootState } from "@/store/store";

const MainSlider = () => {

  const dispatch = useDispatch();
  const siteAddress = useSelector((state:RootState)=>state.siteUrlAddress.value)
  const loggedIn = useSelector((state:RootState)=>state.isUserloggedIn.value)
  // configure params & get data
  const [isMobile, setIsMobile] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // for example, mobile if width <= 768px
    };

    handleResize(); // check on mount

    window.addEventListener("resize", handleResize); // listen to resize
    return () => window.removeEventListener("resize", handleResize); // clean up
  }, []);

  useEffect(() => {
    if (Cookies.get("user")) {
      dispatch(setIsUserloggedIn(true))
      setShouldFetch(true);
    }else {
      setShouldFetch(true); // Proceed anyway (as guest)
    }
  }, []);
  const params = {
    "MobileOrPc":isMobile,
    "OutOrInLogin":loggedIn
    }
    const { advertisement, loading, error } = useGetAdvertisement(
      params,
      isMobile,
      loggedIn,
      shouldFetch
    );
  const orderImagezero = advertisement?.find((item:any) => item.OrderImage === 0)
  const orderImageOne = advertisement?.find((item:any) => item.OrderImage === 1)
  // end configure params & get data

  // send data to two other components
useEffect(()=>{
const banners = {
  advertisement: advertisement,
  loading: loading,
  error: error,
}
dispatch(setBanners(banners))
},[advertisement])
// end send data to two other components
  
  return (
    <>
      <div className="w-full h-48 md:h-80 pt-5 2xl:px-64 flex gap-5 justify-center lg:px-5 px-2">
        {/* start two desktop boxes */}
        {loading ? <SmallSkeleton/> : 
        <div className="w-1/4 h-full lg:grid grid-rows-2 gap-5 hidden">
        {orderImagezero && orderImagezero.imageList?.map((item:any)=>(
          <div key={item.Id} className="w-full">
            <a href={item.ImageLink} className="w-full h-full ">
              <img
                src={item.UploadImageName ? `${siteAddress}/assets/public/adv/${orderImagezero.Id}/${item.Id}/${item.UploadImageName}` : item.Base64Image}
                alt={item.Description}
                className="object-fill w-full h-full rounded-2xl"
              />
            </a>
          </div>
        ))}
        </div>}
        {/* END TWO DESKTOP BOXES */}
        {/* start swiper */}
        {loading ? <MainSliderLoadingSkeleton/> : 
        <div className="lg:w-3/4 w-full h-full relative">
          <SwiperSlider orderImageOne={orderImageOne} loading={loading} error={error} siteAddress={siteAddress}/>
        </div>}
        
        {/* end swiper */}
      </div>
    </>
  );
};

export default MainSlider;
