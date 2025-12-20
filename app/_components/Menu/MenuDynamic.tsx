'use client'
import React, { useState } from "react";
import { PiListBold } from "react-icons/pi";
import { FaAngleLeft } from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const MenuDynamic = () => {

  const menuData = useSelector((state:RootState)=>state.menuData.value)

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility
  
  const firstData = menuData?.Data || [];
  const Data = firstData.length > 0 ? firstData[0].children : [];

  return (
    <>
      {/* start menu */}
      <div className="w-full h-10 bg-white lg:flex lg:px-5 2xl:px-64 justify-between hidden relative boxshadowmenu" dir="rtl">
        {/* start menu desktop */}
        <nav className="w-full h-full flex justify-end">
          <div
            className="w-auto flex items-end cursor-pointer relative openmegamenu"
            onMouseEnter={() => setIsMenuOpen(true)} // Open on hover
            onMouseLeave={() => setIsMenuOpen(false)} // Close when mouse leaves
          >
            <span className="pb-2 pr-1">دسته بندی کالاها</span>
            <span className="pb-3">
              <PiListBold />
            </span>

            {/* Mega Menu */}
            {Data && Data.length > 0 && <div
              className={`absolute w-72 h-[72vh] top-full right-0 bg-gray-300 flex flex-col megamenuu transition border-b-menu duration-500 ease-in-out ${
               isMenuOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="overflow-y-auto">
                {Data &&
                  Data.map((item:any, index:number) => (
                    <div key={item.Id} className="group">
                      <Link
                        href={`/productList/${item.Name}`}
                        className="text-[#2b2b2b] p-3 block group-hover:bg-white text-right"
                        onClick={() => {
                          setIsMenuOpen(false);
                          sessionStorage.removeItem('ProductListOrderParam');
                        }}
                      >
                        {item.Name}
                      </Link>
                      <div
                        className={`w-[60vw] h-[72vh] bg-white absolute top-0 right-full overflow-y-auto z-50 p-4 transition-all border-b-menu ${
                          index === 0
                            ? "visible"
                            : "invisible group-hover:visible"
                        }`}
                      >
                        <div className="w-full h-full flex flex-col flex-wrap-reverse items-start ">
                          {item.children &&
                            item.children.map((child:any) => (
                              <Link
                                href={`/productList/${child.Name}`}
                                key={child.Id}
                                className="text-[#2b2b2b] px-3 py-4 hover:text-red-600 w-auto h-auto flex items-center"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  sessionStorage.removeItem('ProductListOrderParam');
                                }}
                              >
                                <FaAngleLeft />
                                {child.Name}
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>}
          </div>
        </nav>
        {/* end menu desktop */}
      </div>
      {/* end menu */}
    </>
  );
};

export default MenuDynamic;