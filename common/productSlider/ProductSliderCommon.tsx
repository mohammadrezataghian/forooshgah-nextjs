import React, { useEffect, useState } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SliderLeft from '@/common/productSlider/SliderLeft';
import { Link } from 'react-router';
import { useAtom } from "jotai";
import { banners } from "@/shared/banners";
import { siteUrlAddress } from "@/shared/site.url.atom";

const ProductsSliderCommon = ({orderImage,threshold,params,title}) => {
    
    const [siteAddress] = useAtom(siteUrlAddress);
// get data
const [banner,setBanner] = useAtom(banners);
const orderImageBestSeller = banner.advertisement?.find(item => item.OrderImage === orderImage)
// end get data

 // start lazyloading
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after component loads
        }
      },
      { threshold: threshold } // Adjust this value as needed
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  //end lazyloading

  return (
    <>
        <div ref={setRef} className='w-full h-[409px] mt-10'>
            <div className=' w-full h-full lg:grid lg:grid-cols-6 flex flex-col gap-5 items-start justify-center lg:px-5 lg:py-10 xl:p-10 xl:gap-x-0 lg:gap-x-5' style={orderImageBestSeller ? { backgroundColor: orderImageBestSeller.HexColor } : { backgroundColor: '#ED1944' }}>
                {/* start link */}
                    <div className=' lg:col-span-1 h-auto flex justify-between lg:items-center w-full lg:flex-col lg:self-start pt-5 px-5'>
                        <h2 className='text-white text-sm lg:text-xl xl:text-3xl text-center font-bold'>
                        {title}
                        </h2>
                        <div className=' justify-self-center hidden lg:flex'>
                            <img src={orderImageBestSeller && `${siteAddress}/assets/public/adv/${orderImageBestSeller.Id}/${orderImageBestSeller.imageList[0].Id}/${orderImageBestSeller.imageList[0].UploadImageName}`} alt={orderImageBestSeller && orderImageBestSeller.NameOrderImage} className='w-auto h-auto object-cover'/>
                        </div>
                        <div className='text-center lg:w-full lg:h-full lg:mt-10 text-nowrap'>
                            <Link to="/ProductList" className='w-full h-full borderseeall lg:border-2 lg:border-white p-1 lg:p-2 text-white rounded-md lg:rounded-md lg:text-md text-xs sm:text-sm'>
                                مشاهده همه
                                <ChevronLeftIcon className='xl:mr-5 lg:text-xl text-sm'/>
                            </Link>
                        </div>
                    </div>
                {/* end link */}
                {/* start slider */}
                <div className='lg:col-span-5 xl:pb-2 2xl:pb-0 h-full w-full px-2 mb-2 '>
                {isVisible && <SliderLeft params={params}/>}
                </div>
                {/* end slider */}
            </div>
        </div>
    </>
  )
}

export default ProductsSliderCommon