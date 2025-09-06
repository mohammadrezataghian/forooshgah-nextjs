'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetNews = (params:any,searchValue?:any,page?:any) => {
  const [loadingNews, setLoadingNews] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [News, setNews] = useState<any>(null);

  useEffect(() => {
  const getNews = async () => {
    setLoadingNews(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/news", // call YOUR Next.js API route
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
          "/api/news",
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
