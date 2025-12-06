'use client'

import React from "react";
import useGetNews from "@/app/api/news/hook";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Divider } from "@mui/material";
import BasicPagination from '@/common/News/NewsPagination';
import CustomizedInputBase from '@/common/News/NewsSearch';
import LoadingNews from '@/common/News/LoadingNews';
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Articles = () => {

  const siteAddress = useSelector((state:RootState)=>state.siteUrlAddress.value)

  const [searchValue, setSearchValue] = React.useState("");
  const [page, setPage] = React.useState(1);
  const placeholder = "عنوان مقاله را جستجو کنید..."

  const params = {
    newsOrArticle: "false",
    title: searchValue,
    pageIndex: page,
    pageSize: 10,
  };
  const { News, loadingNews, error } = useGetNews(params, searchValue, page);
  const data = News?.lst;
  const totalRecord = News?.totalRecord;
  const totalPages = Math.ceil(totalRecord / params.pageSize);

  return (
    <>
      <div className="w-full p-5 text-lg font-bold h-auto flex justify-center items-center bg-white mt-5">
        <h5>مقالات آموزشی</h5>
      </div>
      <div className="w-full h-auto bg-white lg:px-64 px-4 flex flex-col gap-5 pb-24 pt-5">
        <div className="w-full h-auto flex justify-between items-end">
          <p className="text-xl md:block hidden">تازه ترین ویدیوها و آموزش ها :</p>
          <div>
            <CustomizedInputBase
              setSearchValue={setSearchValue}
              currentPage={page}
              totalPages={totalPages}
              placeholder={placeholder}
            />
          </div>
        </div>
        <Divider />
        {/* start card */}
        {loadingNews ? <LoadingNews/> :
         data && data.map((item:any,index:any) => (
            <React.Fragment key={index}>
              <div
                className="w-full h-auto flex justify-between gap-5"
              >
                <div className="flex flex-col items-start gap-2 md:w-3/4 w-1/2">
                  <h3 className="font-bold text-justify">{item.Title}</h3>
                  <p className="text-justify line-clamp-4">{item.ShortBody}</p>
                  <Link
                    href={`/getArticles/${item.FldId}`}
                    className="mt-auto p-1"
                  >
                    برو به ویدیو
                    <span>
                      <ArrowBackIcon />
                    </span>
                  </Link>
                </div>
                <div className="w-44 h-44 relative group">
                  <img
                    className="w-44 h-44 object-cover rounded-sm"
                    src={`${siteAddress}/assets/public/News/Main/${item.FldId}/${item.MainImage}`}
                    alt={item.Title}
                  />
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
                </div>
              </div>
              <Divider />
            </React.Fragment>
          ))}
        {/* end card */}
        {data && (
          <div className="flex justify-center">
            <BasicPagination 
                setPage={setPage}
                currentPage={page}
                totalPages={totalPages} />
          </div>
        )}
      </div>
    </>
  );
};

export default Articles;
