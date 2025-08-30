'use client'

import React from "react";
import { useAtom } from "jotai";
import { siteUrlAddress } from "@/shared/site.url.atom";
import Link from "next/link";


const VideoCard = (data:any) => {

  const [siteAddress] = useAtom(siteUrlAddress);
  
  return (
    <div className="w-full h-auto mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Video-like Image */}
      <Link
        href={{
            pathname: `/articles/${data.item.FldId}`,
            query: { item: data.item },
          }}
        className="relative block group w-full h-40 rounded-md"
      >
        <img
          src={`${siteAddress}/assets/public/News/Main/${data.item.FldId}/${data.item.MainImage}`}
          alt={data.item.Title}
          className="w-full h-40 object-cover rounded-md"
        />
        {/* Play Icon */}
        <div className="h-full w-full absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity bg-black bg-opacity-40 duration-500 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9.75 7.1v9.8L16.8 12 9.75 7.1z" />
          </svg>
        </div>
      </Link>
      {/* Views */}
      <div className=" flex flex-col gap-2 pt-2 w-full">
        <p className="text-xs text-gray-500">
          تاریخ : {data.item.PublishDateTimeShamsi}
        </p>
        {/* Description */}
        <Link
          href={{
            pathname: `/articles/${data.item.FldId}`,
            query: { item: data.item },
          }}
          className="w-full block text-gray-800 hover:text-blue-600 transition-colors"
        >
          <span className="line-clamp-1">{data.item.Title}</span>
        </Link>
        <p className=" flex">
          <Link href={{
            pathname: `/articles/${data.item.FldId}`,
            query: { item: data.item },
          }} className="text-gray-500 hover:text-blue-600 text-sm line-clamp-2 text-justify">{data.item.ShortBody}</Link>
          </p>
      </div>
    </div>
  );
};

export default VideoCard;
