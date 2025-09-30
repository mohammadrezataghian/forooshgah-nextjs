'use client'

import React from "react";
import { Divider } from "@mui/material";
import useGetItems from "@/app/api/faq/hook";

const FAQ = () => {

  // get data
   const { items, loading, error } = useGetItems();
   // end get data
  
  return (
    <>
      <div className="w-full p-5 text-lg font-bold h-auto flex justify-center items-center bg-white ">
        <h5>پرسش‌‌‌‌‌های متداول کاربران</h5>
      </div>
      <Divider/>
      <div className="w-full h-auto bg-white flex flex-col lg:px-64 px-5 gap-10 pt-10 pb-24">
        {items &&
          items.map((item:any) => (
            <div key={item.Id} className="w-full flex flex-col gap-1">
              <p className="text-lg text-justify">{item.Code} - {item.Question}</p>
              <p className="text-gray-600 text-justify">{item.Answer}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default FAQ;