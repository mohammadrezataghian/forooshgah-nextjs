'use client'

import React from "react";
import SliderNews from "./SliderNews";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useGetNews from "@/app/api/news/hook";
import LoadingLatestNews from "./LoadingLatestNews";
import Link from "next/link";

const LatestNews = () => {
  
  // get data
    const params = {
      "newsOrArticle":"True",
      "title":"",
      "pageIndex":1,
      "pageSize":10
      };
    const { News, loadingNews, error } = useGetNews(params);
    const data = News?.lst
    const totalRecord = News?.totalRecord
  // end get data

  return (
    <>
     <div className="w-full lg:w-1/3 h-auto bordertlatestnews rounded-md bg-white">
        <div>
          <h4 className="p-5 font-bold">تازه ترین اخبار و اطلاعیه ها</h4>
        </div>
        {loadingNews ? <LoadingLatestNews/> :
        <div className="slidernews h-72 px-2">
          {data && <SliderNews data={data}/>}
        </div>}
        <div className="pl-3 py-3 flex justify-end">
          <Link className="text-xs" href="/news">
            مشاهده آرشیو
            <ArrowBackIcon className="text-sm mr-1" />
          </Link>
        </div>
      </div>
      
    </>
  );
};

export default LatestNews;