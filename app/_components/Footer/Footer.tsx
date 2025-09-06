"use client"

import React from "react";
import bale from "@/public/images/footer/bale.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HelpIcon from "@mui/icons-material/Help";
import { useAtom } from "jotai";
import { mainConfig } from "@/shared/mainConfig";
import Link from "next/link";
import Image from "next/image";
import useGetMainConfig from "@/app/api/getMainConfig/hook";

const Footer = () => {

// config
const { loadingConfig, errorConfig,getConfig} = useGetMainConfig()
React.useEffect(()=>{
  getConfig()
},[])
// end config

//get data 
const [config,setConfig] =  useAtom(mainConfig)
const data = config?.filter((item:any)=>item.TypeSetting === "Footer")

const h1 = data?.find((item:any) => item.Key === "webAppFooterH1")
const h2 = data?.find((item:any) => item.Key === "webAppFooterH2")
const p = data?.find((item:any) => item.Key === "webAppFooterP")

// end get data

const enamadCode= `<img
                          className="w-[125px] h-[120px]"
                          referrerPolicy="origin"
                          src="https://trustseal.enamad.ir/logo.aspx?id=571822&Code=79YwXMbcElb0J3xASuI5dte0TmPBWvoE"
                          alt=""
                          style={{ cursor: "pointer" }}
                          code="79YwXMbcElb0J3xASuI5dte0TmPBWvoE"
                        />`

  return (
    <>
      <footer
        role="footer"
        className="pb-20 lg:mb-0 lg:pb-5 mt-20 bg-white"
      >
        <section className=" text-black text-lg pt-[20px] pb-[30px] block px-[10px] overflow-hidden mx-auto ">
          <div className="max-w-[1360px] w-full px-[10px] mx-auto">
            <div className="flex flex-wrap gap-y-5 justify-between">
              <b className="text-[19px] block float-right">خرید آسان، تحویل سریع </b>
              <div>
                <a href="https://ble.ir/taavonibmi" target="_blank" className=" btn_hover w-[150px] h-[38px] text-[12px] mr-[10px] leading-[38px] float-left rounded-[4px] overflow-hidden border-none block relative text-white">
                  <span className="pr-[10px] block w-full absolute right-0 top-0 z-[2] h-full">
                    <HelpIcon className="ml-1 mb-1" />
                    نیاز به کمک دارید ؟
                  </span>
                </a>
                <Link href='/stores' className="btn_hover rounded-[4px] overflow-hidden border-none block relative text-white w-[150px] h-[38px] text-[12px] leading-[38px]  ">
                  <span className="text-white pr-[10px] block w-full absolute right-0 top-0 z-[2] h-full after:absolute after:mt-[-9px] after:right-[9px] after:top-1/2">
                    <LocationOnIcon className="ml-1 mb-1" />
                    فروشگاه های تعاونی مصرف کارکنان بانک ملی{" "}
                  </span>
                </Link>
              </div>
            </div>
            <br/>

            <div className="pt-[45px] clear-both w-full">
              <div className="mx-[-10px]">
                <div className="px-[15px] float-right relative min-h-[1px] lg:w-[66.66666667%]">
                  <div className="mx-[-10px]">
                    <div className="px-[15px] float-right relative min-h-[1px] xl:w-1/4">
                      <div>
                        <strong className="block mb-[15px] text-[14px]">اطلاع رسانی و آموزش</strong>
                        <ul className="xs:block">
                          <li className="block mb-[5px] text-right">
                            <a href="/#/News" className="block mb-[5px] text-right text-[#656565] text-[12px]">
                              اخبار
                            </a>
                          </li>
                          <li className="block mb-[5px] text-right">
                            <Link href="/AboutUs" className="block mb-[5px] text-right text-[#656565] text-[12px]">
                              درباره ما
                            </Link>
                          </li>
                          <li className="block mb-[5px] text-right">
                            <Link href="/Articles" className="block mb-[5px] text-right text-[#656565] text-[12px]">
                              مقالات آموزشی
                            </Link>
                          </li>
                          <li className="block mb-[5px] text-right">
                            <a href="/#/video" className="block mb-[5px] text-right text-[#656565] text-[12px]">
                              ویدئو
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="px-[15px] float-right relative min-h-[1px] xl:w-1/4">
                      <div>
                        <strong className="block mb-[15px] text-[14px]">خدمات مشتریان</strong>
                        <ul className="xs:block">
                          <li className="block mb-[5px] text-right">
                            <Link href="/ContactUs" className="block mb-[5px] text-right text-[#656565] text-[12px]">
                              تماس با ما
                            </Link>
                          </li>
                          <li className="block mb-[5px] text-right">
                            <Link href="/FAQ" className="block mb-[5px] text-right text-[#656565] text-[12px]">
                              پرسش‌های متداول کاربران
                            </Link>
                          </li>
                          <li className="block mb-[5px] text-right">
                            <a href="/#/privacypolicy" className="block mb-[5px] text-right text-[#656565] text-[12px]">
                              سیاست حفظ حریم شخصی افراد
                            </a>
                          </li>
                          <li className="block mb-[5px] text-right">
                            <a href="/#/rules" className="block mb-[5px] text-right text-[#656565] text-[12px]">
                              قوانین و مقررات استفاده از فروشگاه
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="px-[15px] float-right relative min-h-[1px] xl:w-1/4">
                      <div>
                        <strong className="block mb-[15px] text-[14px]">راهنمای خرید</strong>
                        <ul className="xs:block">
                          <li className="block mb-[5px] text-right">
                            <a href="/#/trust" className="block mb-[5px] text-right text-[#656565] text-[12px]">
                              چطور اطمینان پیدا کنم؟
                            </a>
                          </li>
                          <li className="block mb-[5px] text-right">
                            <a href="/#/howtoshop" className="block mb-[5px] text-right text-[#656565] text-[12px]">
                              چطور سفارش خود را ثبت کنم؟
                            </a>
                          </li>
                          <li className="block mb-[5px] text-right">
                            <a href="/#/takeback" className="block mb-[5px] text-right text-[#656565] text-[12px]">
                              راه‌های بازگرداندن سفارش چگونه است؟
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="px-[15px] float-right relative min-h-[1px] xl:w-1/4">
                      <div>
                        <strong className="block mb-[15px] text-[14px]">ما را دنبال کنید</strong>
                        <ul className="xs:block">
                          <li className="block mb-[9px] text-right ">
                            <a
                              href="http://ble.ir/join/33hfKGho1R"
                              title="bale"
                              target="_blank"
                              className="flex w-48 items-end mb-[5px] text-right text-[#656565] relative text-[12px]"
                            >
                              <Image src={bale} alt="بله" className="w-5 h-5 mr-0 ml-[6px]"/>
                              <span className="text-md">کانال «بله» تعاونی بانک ملی</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-[15px] float-right relative min-h-[1px]">
                  <div className="flex gap-10 lg:mt-0 mt-5">
                    <div className="namadBox">
                      <a
                        referrerPolicy="origin"
                        target="_blank"
                        href="https://trustseal.enamad.ir/?id=571822&Code=79YwXMbcElb0J3xASuI5dte0TmPBWvoE"
                        dangerouslySetInnerHTML={{ __html: enamadCode }}
                      >
                        
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="footer_description px-[10px] overflow-hidden mx-auto">
          <div className="max-w-[1360px] w-full px-[10px] py-[30px] mx-auto">
            <div className="py-[30px] border-t border-[#DCDCDC]">
              <div className="mx-[-10px]">
                <div className="px-[15px] float-right relative min-h-[1px]">
                  <h1 className="inline text-[17px] mb-[15px] font-bold text-[#737272]">{h1 && h1.Value} </h1>
                  <br />
                  <h2 className="inline text-[17px] mb-[15px] font-bold text-[#737272]">{h2 && h2.Value}</h2>
                  <p className="mt-[20px] text-justify leading-[25px] text-[#323232] text-[14px]">
                    {p && p.Value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="px-[10px] overflow-hidden mx-auto">
          <div className="max-w-[1360px] w-full px-[10px] mx-auto">
            <div>
              <div className="mx-[-10px]">
                <div className="footer_description py-[30px] px-[15px] float-right relative min-h-[1px]">
                  <div>
                    <p className="text-[13px] text-center mb-[17px] text-[#656565]" dir="ltr">
                      تمامی حقوق مادی و معنوی این وب سایت و محتوای آن اعم از
                      تصاویر و توضیحات محصولات، ویدئوها، متون و تصاویر آموزشی
                      متعلق به فروشگاه مجازی تعاونی مصرف کارکنان بانک ملی
                      می‌باشد و هرگونه استفاده و بازنشر آن بدون اجازه کتبی از
                      فروشگاه اینترنتی تعاونی مصرف کارکنان بانک ملی ممنوع بوده و
                      موجب پیگرد قانونی می‌باشد.
                    </p>
                  </div>
                </div>

                {/* rashen rights */}
                <div className="w-full h-auto flex justify-center">
                  <p>
                    <a href="https://rashensystem.com/" className="text-[#B00937]">www.rashensystem.com</a>{" "}
                    - Copyright © 2025 - All rights reserved.
                  </p>
                </div>
                {/* rashen rights */}
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;