'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetNews = (params:any,searchValue?:any,page?:any) => {

const GetNewsUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/GetNews`

  const [loadingNews, setLoadingNews] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [News, setNews] = useState<any>(null);

  useEffect(() => {
  const getNews = async () => {
    setLoadingNews(true);
    setError(null);

    try {
      const res = await axios.post(
        GetNewsUrl,
        { ...params }
      );

      setNews(res?.data?.Data || []);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in getNews"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
            params,
            GetNewsUrl,
          err.message + " , An unknown error occurred in getNews",
        );
      }
    } finally {
        setLoadingNews(false);
    }
  };
  getNews()
  }, [searchValue,page]);

  return { loadingNews, error, News };
};

export default useGetNews;
