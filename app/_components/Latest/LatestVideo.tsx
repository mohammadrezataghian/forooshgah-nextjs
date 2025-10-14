'use client'

import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideoCard from "./VideoCard";
import useGetNews from "@/app/api/news/hook";
import LoadingLatestVideo from "./LoadingLatestVideo";
import Link from "next/link";

const LatestVideo = () => {
  
  /// get data
      const params = {
        "newsOrArticle":"false",
        "title":"",
        "pageIndex":1,
        "pageSize":3
        };
      const { News, loadingNews, error } = useGetNews(params);
      const data = News?.lst
    // end get data

  return (
    <>
     <div className="w-full lg:w-2/3 h-auto bordertlatestvideos rounded-md bg-white px-5">
        <div className="py-5 pr-3">
          <h4>آخرین آموزش ها</h4>
        </div>
        <div className="videocard grid gap-3 grid-cols-2 sm:grid-cols-3 grid-rows-1 w-full h-auto overflow-hidden ">
          {loadingNews ? <LoadingLatestVideo/> : (
          data && data.length > 0 && data.map((item:any) => (
            <VideoCard item={item} key={item.FldId} />
          ))
          )}
        </div>
        <div className="pl-3 py-5 flex justify-end">
          <Link className="text-xs mt-auto" href="/articles">
            مشاهده آرشیو
            <ArrowBackIcon className="text-sm mr-1" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default LatestVideo;
