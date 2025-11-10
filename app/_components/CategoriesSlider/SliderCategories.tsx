'use client'

import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import SliderCategoriesCard from "./SliderCategoriesCard";
import useGetMenu from "@/app/api/menu/hook";
import Cookies from "js-cookie";
import LoadingSkeleton from "./LoadingSkeleton";
import { MenuResponse } from "@/types/types";

const SliderCategories = () => {
 
    const { loading, error, response,getMenu } = useGetMenu()
  // get data
  const [menuData, setMenuData] = useState<MenuResponse | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(()=>{
    setMounted(true)
  },[])

  useEffect(() => {
    if (!mounted) return

    if (sessionStorage.getItem("MenuData")) {
      const data = JSON.parse(sessionStorage.getItem("MenuData") || '');
      setMenuData(data);
    } else {
      const fetchData = async () => {
        try {
          const data = await getMenu();
          setMenuData(data);
        } catch (error) {
          console.error("Failed to fetch menu:", error);
        }
      };

      fetchData();
    }
  }, [mounted]);

  const firstData = menuData?.Data || [];
  const Data = firstData.length > 0 ? firstData[0].children : [];
  // end get data

  // handle loading
  const [loadingS,setLoadingS]= useState(true);
  
  useEffect(() => {
    if (Data.length > 0) {
        setLoadingS(false);
    }
  }, [Data]);
  // handle loading
  
  return (
    <>
      <div className="relative h-full">
        {loadingS ? <LoadingSkeleton/> : (
          <>
            <Swiper
              slidesPerView={1}
              loop={true}
              spaceBetween={5}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: ".custom-nexttwo",
                prevEl: ".custom-prevtwo",
              }}
              breakpoints={{
                480: {
                  slidesPerView: 1.5,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1536: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              modules={[Pagination, Navigation]}
              className="mySecondSwiper"
            >
              {Data &&
                Data.map((data:any) => (
                  <SwiperSlide key={data.Id}>
                    <SliderCategoriesCard
                      name={data.Name}
                      id={data.Id}
                      NameImage={data.NameImage}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
            {/* navigation buttons start */}
            <div className="swiper-button-next custom-nexttwo bg-white rounded-md visible boxshadowHead text-gray-500">
              <ArrowForwardIosIcon />
            </div>
            <div className="swiper-button-prev custom-prevtwo bg-white rounded-md visible pl-1 text-gray-500 boxshadowHead">
              <ArrowBackIosIcon />
            </div>
            {/* navigation buttons end */}
          </>
        )}
      </div>
    </>
  );
};

export default SliderCategories;
