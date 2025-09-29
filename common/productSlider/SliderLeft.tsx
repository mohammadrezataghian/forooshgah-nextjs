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
import SliderLeftCard from "@/common/productSlider/SliderLeftCard";

// import data
import useGetProductDetails from "@/app/api/productSlider/hook";
import { drawerSessionUpdate } from "@/shared/drawer.product.atom";
import { useAtom } from "jotai";
import { productListUpdate } from "@/shared/product.list.atom";
import LoadingSkeleton from "@/common/productSlider/LoadingSkeleton";

const SliderLeft = ({params}:any) => {
  const [drawerSession, setDrawerSessions] = useAtom(drawerSessionUpdate);
  const [products,setProducts] = useAtom(productListUpdate);
  const [loading,setLoading]= useState(true);

  useEffect(() => {
    if (drawerSession && drawerSession.length > 0) {
      setProducts(drawerSession);
      setDrawerSessions([]); // clear once
    }
  }, [drawerSession, setProducts, setDrawerSessions]);

// get data
  const { productDetails, loadingProducts, error } = useGetProductDetails(params);
// end get data

  // handle loading
useEffect(() => {
  if (productDetails && productDetails.length > 0) {
    setLoading(false);
  }
}, [productDetails]);
// handle loading

  return (
    <>
      <div className="relative h-full">
        {loading ? <LoadingSkeleton/> : (
          <>
            <Swiper
              slidesPerView={1.5}
              // centeredSlides={true}
              // autoplay={{
              //   delay: 2500,
              //   disableOnInteraction: false,
              // }}
              loop={true}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              breakpoints={{
                480: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1280: {
                  slidesPerView: 4,
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
              <div className="w-full h-full">
                {productDetails.map((data:any, index:any) => (
                  <SwiperSlide key={data.IdStoreStock}>
                    <SliderLeftCard
                      discount={data.Takhfif}
                      id={data.IdStoreStock}
                      prevPrice={data.PriceForoosh}
                      price={data.PriceForooshAfterDiscount}
                      name={data.NameKala}
                      images={data.FldNameImageKalaList}
                      setProducts={setProducts}
                      data={data}
                      mojodi={data.Mojodi}
                      idForImage={data.IdKala}
                      NameForooshgah={data.NameForooshgah}
                    >
                      {products&&
                        products.find(
                          (item:any) => item?.IdStoreStock === data.IdStoreStock
                        )?.count
                      }
                    </SliderLeftCard>
                  </SwiperSlide>
                ))}
              </div>

              {/* this is extra */}
              {/* <SwiperSlide>Slide 2</SwiperSlide>
                  <SwiperSlide>Slide 3</SwiperSlide>
              */}
              {/* this was extra */}
            </Swiper>
            {/* navigation buttons start */}
            <div className="swiper-button-next custom-next bg-white rounded-md invisible sm:visible boxshadowHead text-gray-500">
              <ArrowForwardIosIcon />
            </div>
            <div className="swiper-button-prev custom-prev bg-white rounded-md invisible sm:visible pl-1 text-gray-500 boxshadowHead">
              <ArrowBackIosIcon />
            </div>
            {/* navigation buttons end */}
          </>
        )}
      </div>
    </>
  );
};

export default SliderLeft;
