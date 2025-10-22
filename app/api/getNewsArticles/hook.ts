'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetNews = () => {

const GetNewsUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/GetNews`

  const [loadingNews, setLoadingNews] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [News, setNews] = useState<any>(null);

  
  const getNews = async (param:any) => {
    setLoadingNews(true);
    setError(null);

    try {
      const res = await axios.post(
        GetNewsUrl,
        param
      );

      setNews(res?.data?.Data?.lst[0] || []);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in getNews"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          param,
          GetNewsUrl,
          err.message + " , An unknown error occurred in getNews",''
        );
      }
    } finally {
        setLoadingNews(false);
    }
  };

  return { loadingNews, error, News,getNews };
};

export default useGetNews;
