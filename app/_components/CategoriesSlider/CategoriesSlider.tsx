'use client'

import React, { useEffect, useState } from 'react'
import SliderCategories from './SliderCategories';
import { useAtom } from "jotai";
import { banners } from "@/shared/banners";
import { siteUrlAddress } from "@/shared/site.url.atom";

const CategoriesSlider = () => {

const [siteAddress] = useAtom(siteUrlAddress);
// get data
const [banner,setBanner] = useAtom(banners);
const orderImageCategory = banner?.advertisement?.find(item => item.OrderImage === 7)
// end get data

// start lazyloading
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after component loads
        }
      },
      { threshold: 0.2 } // Adjust this value as needed
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  //end lazyloading

  return (
    <>
    <div ref={setRef} className='w-full h-[409px] mt-10 2xl:h-full'>
            <div className=' w-full h-full lg:grid lg:grid-cols-6 flex flex-col gap-5 items-start justify-center lg:px-5 lg:py-10 xl:p-10 xl:gap-x-0 lg:gap-x-5' style={orderImageCategory ? { backgroundColor: orderImageCategory.HexColor } : {backgroundColor: '#68D9C9'}}>
                {/* start link */}
                    <div className=' lg:col-span-1 h-auto flex justify-between lg:items-center w-full lg:flex-col lg:self-start pt-5 px-5 lg:mt-5'>
                        <h2 className='text-white text-sm lg:text-xl xl:text-3xl text-center font-bold'>
                        دسته بندی محصولات
                        </h2>
                        <div className=' justify-self-center hidden lg:flex'>
                            <img src={orderImageCategory && `${siteAddress}/assets/public/adv/${orderImageCategory.Id}/${orderImageCategory.imageList[0].Id}/${orderImageCategory.imageList[0].UploadImageName}`} alt={orderImageCategory && orderImageCategory.NameOrderImage} className='w-auto h-auto object-cover'/>
                        </div>
                    </div>
                {/* end link */}
                {/* start slider */}
                <div className='lg:col-span-5 xl:pb-2 2xl:pb-0 h-full w-full px-2 mb-2 '>
                    {isVisible && <SliderCategories/>}
                </div>
                {/* end slider */}
            </div>
        </div>
    </>
  )
}

export default CategoriesSlider