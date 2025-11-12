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
        <section className=" text-black text-lg pt-5 pb-7 block px-2.5 overflow-hidden mx-auto ">
          <div className="max-w-[1360px] w-full px-2.5 mx-auto">
            <div className="flex flex-wrap gap-y-5 justify-between">
              <b className="text-xl block float-right">خرید آسان، تحویل سریع </b>
              <div>
                <a href="https://ble.ir/taavonibmi" target="_blank" className="bg-[#10CCC7] btn_hover w-[150px] h-[38px] text-xs mr-2.5 leading-[38px] float-left rounded-sm overflow-hidden border-none block relative text-white">
                  <span className="pr-2.5 block w-full absolute right-0 top-0 z-[2] h-full">
                    <HelpIcon className="ml-1 mb-1" />
                    نیاز به کمک دارید ؟
                  </span>
                </a>
                <Link href='/stores' className="btn_hover rounded-sm overflow-hidden border-none block relative text-white w-[150px] h-[38px] text-xs leading-[38px]  ">
                  <span className="text-white pr-2.5 block w-full absolute right-0 top-0 z-[2] h-full after:absolute after:mt-[-9px] after:right-[9px] after:top-1/2">
                    <LocationOnIcon className="ml-1 mb-1" />
                    فروشگاه های تعاونی مصرف کارکنان بانک ملی{" "}
                  </span>
                </Link>
              </div>
            </div>
            <br/>

            <div className="pt-12 clear-both w-full">
              <div className="-mx-2.5">
                <div className="px-3.5 float-right relative min-h-[1px] lg:w-[66.66666667%]">
                  <div className="-mx-2.5">
                    <div className="px-3.5 float-right relative min-h-[1px] xl:w-1/4">
                      <div>
                        <strong className="block mb-3.5 text-sm">اطلاع رسانی و آموزش</strong>
                        <ul className="xs:block">
                          <li className="block mb-2 text-right">
                            <Link href="/news" className="block mb-1 text-right text-[#656565] text-xs">
                              اخبار
                            </Link>
                          </li>
                          <li className="block mb-2 text-right">
                            <Link href="/aboutUs" className="block mb-1 text-right text-[#656565] text-xs">
                              درباره ما
                            </Link>
                          </li>
                          <li className="block mb-2 text-right">
                            <Link href="/articles" className="block mb-1 text-right text-[#656565] text-xs">
                              مقالات آموزشی
                            </Link>
                          </li>
                          <li className="block mb-2 text-right">
                            <Link href="/videos" className="block mb-1 text-right text-[#656565] text-xs">
                              ویدئو
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="px-3.5 float-right relative min-h-[1px] xl:w-1/4">
                      <div>
                        <strong className="block mb-3.5 text-sm">خدمات مشتریان</strong>
                        <ul className="xs:block">
                          <li className="block mb-1 text-right">
                            <Link href="/contactUs" className="block mb-2 text-right text-[#656565] text-xs">
                              تماس با ما
                            </Link>
                          </li>
                          <li className="block mb-1 text-right">
                            <Link href="/faq" className="block mb-2 text-right text-[#656565] text-xs">
                              پرسش‌های متداول کاربران
                            </Link>
                          </li>
                          <li className="block mb-1 text-right">
                            <Link href="/privacyPolicy" className="block mb-2 text-right text-[#656565] text-xs">
                              سیاست های فروشگاه
                            </Link>
                          </li>
                          <li className="block mb-1 text-right">
                            <Link href="/rules" className="block mb-2 text-right text-[#656565] text-xs">
                              قوانین و مقررات استفاده از فروشگاه
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="px-3.5 float-right relative min-h-[1px] xl:w-1/4">
                      <div>
                        <strong className="block mb-3.5 text-sm">راهنمای خرید</strong>
                        <ul className="xs:block">
                          <li className="block mb-1 text-right">
                            <Link href="/trust" className="block mb-2 text-right text-[#656565] text-xs">
                            چطور از سایت خرید قسطی نمایم؟
                            </Link>
                          </li>
                          <li className="block mb-1 text-right">
                            <Link href="/howToShop" className="block mb-2 text-right text-[#656565] text-xs">
                              چطور سفارش خود را ثبت کنم؟
                            </Link>
                          </li>
                          <li className="block mb-1 text-right">
                            <Link href="/takeBack" className="block mb-2 text-right text-[#656565] text-xs">
                              راه‌های بازگرداندن سفارش چگونه است؟
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="px-3.5 float-right relative min-h-[1px] xl:w-1/4">
                      <div>
                        <strong className="block mb-3.5 text-sm">ما را دنبال کنید</strong>
                        <ul className="xs:block">
                          <li className="block mb-2 text-right ">
                            <a
                              href="http://ble.ir/join/33hfKGho1R"
                              title="bale"
                              target="_blank"
                              className="flex w-48 items-end mb-1 text-right text-[#656565] relative text-xs"
                            >
                              <Image src={bale} alt="بله" className="w-5 h-5 mr-0 ml-1.5"/>
                              <span className="text-md">کانال «بله» تعاونی بانک ملی</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-3.5 float-right relative min-h-[1px]">
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
        <section className="footer_description px-2.5 overflow-hidden mx-auto">
          <div className="max-w-[1360px] w-full px-2.5 py-7 mx-auto">
            <div className="py-7 border-t border-[#DCDCDC]">
              <div className="-mx-2.5">
                <div className="px-3.5 float-right relative min-h-[1px]">
                  <h1 className="inline text-lg mb-3.5 font-bold text-[#737272]">{h1 && h1.Value} </h1>
                  <br />
                  <h2 className="inline text-lg mb-3.5 font-bold text-[#737272]">{h2 && h2.Value}</h2>
                  <p className="mt-5 text-justify leading-[25px] text-[#323232] text-sm">
                    {p && p.Value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="px-2.5 overflow-hidden mx-auto">
          <div className="max-w-[1360px] w-full px-2.5 mx-auto">
            <div>
              <div className="-mx-2.5">
                <div className="footer_description py-7 px-3.5 float-right relative min-h-[1px]">
                  <div>
                    <p className="text-xs text-center mb-4 text-[#656565] text-balance leading-5" dir="ltr">
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
                  <p className="text-center">
                    <a href="https://rashensystem.com/" className="text-[#B00937]">www.rashensystem.com</a>{" "}
                    - Copyright © 2025 - All rights reserved
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