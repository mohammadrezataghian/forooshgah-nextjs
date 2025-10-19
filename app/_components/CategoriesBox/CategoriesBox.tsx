'use client'

import React, { useEffect, useState } from "react";
import useGetMenu from "@/app/api/menu/hook";
import Cookies from "js-cookie";
import Link from "next/link";
import { MenuResponse } from "@/types/types";

const CategoriesBox = () => {
  
const { loading, error, response,getMenu } = useGetMenu()
// get data
const [rawMenu,setRawMenu] = useState<string | null>(null)
const [mounted,setMounted] = useState(false)
const [menuData, setMenuData] = useState<MenuResponse | null>(null);

React.useEffect(()=>{
  const menuStorage = Cookies.get('MenuData') || null
  setRawMenu(menuStorage)
  setMounted(true)
},[])

useEffect(() => {
  if(!mounted) return

  if(rawMenu){
    const data = JSON.parse(rawMenu);
    setMenuData(data);
  }else{
    const fetchData = async () => {
      try {
        const data = await getMenu();
        setMenuData(data);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      }
    };

    fetchData();
  }
}, [mounted]);

const firstData = menuData?.Data || [] ;
const Data = firstData.length > 0 ? firstData[0].children : [];
// end get data

  return (
    <>
      <div className="w-full h-52 px-40 hidden lg:block">
        <div className="w-full h-full borderTopBox mt-5 bg-white rounded-md">
          <div className="w-full h-full px-5">
            <div className="w-full h-1/3">
              <h2 className="borderBottomBox py-3">محبوب‌ترین دسته محصولات</h2>
            </div>
            {/* links */}
            <nav className="w-full h-2/3">
              <ul className="w-full h-full grid grid-cols-4 pb-2 overflow-hidden text-gray-600">
                {Data && Data.map((data:any) => (
                  <li
                    key={data.Id}
                    className="text-right pr-3 pb-1 w-fit h-fit relative before:content-['•'] before:text-gray-600 before:absolute before:right-0 before:top-[17px] before:-translate-y-1/2 hover:text-red-500 hover:before:text-red-500 transition-all duration-300 before:duration-300 hover:bg-warmGray-300 p-1 group"
                  >
                    <Link
                      className="text-sm text-black group-hover:text-red-500"
                      href={`/productList/${data.Name}`}
                    >
                      {data.Name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {/* links */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesBox;