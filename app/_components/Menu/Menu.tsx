'use client'
import React, { useEffect, useState } from "react";
import useGetMenu from "@/app/api/menu/hook";
import { PiListBold } from "react-icons/pi";
import { FaAngleLeft } from "react-icons/fa";
import Cookies from "js-cookie";
import Link from "next/link";
import { MenuResponse } from "@/types/types";

const Menu = () => {

  const { loading, error, response,getMenu } = useGetMenu()
  // menu data
  const [menuData, setMenuData] = useState<MenuResponse | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

  // START HANDLING REFRESHING LOCAL STORAGE WHEN USER PRESSED REFRESH BUTTON
  
  useEffect(() => {
    // Check if the navigation was a full page reload
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

    if (nav?.type === "reload") {
      // Page was refreshed
      Cookies.remove("MenuData");

      (async () => {
        try {
          const data = await getMenu();
          setMenuData(data);
          Cookies.set("MenuData", JSON.stringify(data));
        } catch (err) {
          console.error("Failed to fetch menu after reload:", err);
        }
      })();
    } else {
      // Not a reload — load from cookies if available
      const cached = Cookies.get("MenuData");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setMenuData(parsed);
        } catch (err) {
          console.error("Error parsing cached MenuData:", err);
          Cookies.remove("MenuData");
        }
      } else {
        // No cache — fetch for the first time
        (async () => {
          try {
            const data = await getMenu();
            setMenuData(data);
            Cookies.set("MenuData", JSON.stringify(data));
          } catch (err) {
            console.error("Failed to fetch menu:", err);
          }
        })();
      }
    }
  }, []);
  const firstData = menuData?.Data || [];
  const Data = firstData.length > 0 ? firstData[0].children : [];
// end get data

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
            {/* <div
              className={`absolute w-72 h-[72vh] top-full right-0 bg-gray-300 flex-col megamenuu transition-all border-b-menu ${
                Data && Data.length > 0 && isMenuOpen ? "flex" : "hidden"
              }`}
            > */}
              <div className="overflow-y-auto">
                {Data &&
                  Data.map((item:any, index:number) => (
                    <div key={item.Id} className="group">
                      <Link
                        href={`/productList/${item.Name}`}
                        className="text-[#2b2b2b] p-3 block group-hover:bg-white text-right"
                        onClick={() => setIsMenuOpen(false)} // Close menu on link click
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
                                onClick={() => setIsMenuOpen(false)} // Close menu on link click
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

export default Menu;