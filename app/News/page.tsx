'use client'

import useGetNews from '@/app/api/news/hook';
import { Divider } from '@mui/material';
import React from 'react'
import { useAtom } from "jotai";
import { siteUrlAddress } from "@/shared/site.url.atom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BasicPagination from '@/common/News/NewsPagination';
import CustomizedInputBase from '@/common/News/NewsSearch';
import LoadingNews from '@/common/News/LoadingNews';
import Link from 'next/link';

const News = () => {

  const [searchValue,setSearchValue] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [siteAddress] = useAtom(siteUrlAddress);
  const placeholder = 'عنوان خبر را جستجو کنید...'

const params = {
      "newsOrArticle":"True",
      "title":searchValue,
      "pageIndex":page,
      "pageSize":10
      };
    const { News, loadingNews, error } = useGetNews(params,searchValue,page);
    const data = News?.lst
    const totalRecord = News?.totalRecord
    const totalPages = Math.ceil(totalRecord / params.pageSize);
    
  return (
    <>
        <div className='w-full p-5 text-lg font-bold h-auto flex justify-center items-center bg-white mt-5'>
          <h5>
            اخبار
          </h5>
        </div>
        <div className='w-full h-auto bg-white lg:px-64 px-4 flex flex-col gap-5 pb-24 pt-5'>
          <div className='w-full h-auto flex justify-between items-end'>
            <p className='text-xl md:block hidden'>تازه ترین اخبار و اطلاعات :</p>
            <div>
              <CustomizedInputBase setSearchValue={setSearchValue} currentPage={page} totalPages={totalPages} placeholder={placeholder}/>
            </div>
            </div> 
          <Divider/>
          {/* start card */}
          
          {loadingNews ? <LoadingNews/> : data && data.map((item:any)=>(
            <React.Fragment key={item.FldId}>
            <div className='w-full h-auto flex justify-between gap-5'>
            <div className='flex flex-col items-start gap-2 w-3/4'>
              <h3 className='font-bold text-justify'>{item.Title}</h3>
              <p className='text-justify line-clamp-4'>{item.ShortBody}</p>
              <Link href={`/GetNews/${item.FldId}`}
              onClick={()=> sessionStorage.setItem('NewsItem',JSON.stringify(item))}
              className='mt-auto p-1'>برو به خبر <span><ArrowBackIcon/></span></Link>
            </div>
            <div className='w-44 h-44'>
              <img className='w-44 h-44 object-cover rounded-sm' src={`${siteAddress}/assets/public/News/Main/${item.FldId}/${item.MainImage}`} alt={item.Title} />
            </div>
          </div>
          <Divider/>
          </React.Fragment>
          ))}
          {/* end card */}
          {data && 
            <div className='flex justify-center'>
              <BasicPagination 
                setPage={setPage}
                currentPage={page}
                totalPages={totalPages}/>
            </div>
          }
        </div>
    </>
  )
}

export default News