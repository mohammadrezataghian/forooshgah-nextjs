'use client'

import React from "react";
import dynamic from "next/dynamic";
const LeafletMap = dynamic(() => import('./_components/LeafletMap'), {ssr: false,});


const Stores = () => {

  return (
    <>
      <div className="w-full bg-white p-5 md:flex justify-center text-lg font-bold hidden">
        <span>فروشگاه های تعاونی</span>
      </div>
      <LeafletMap/>
    </>
  );
};

export default Stores;
