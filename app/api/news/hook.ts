'use client';

import useSWR from 'swr';
import axios from 'axios';
import { addLog } from '@/app/api/addlog/addlog';
import { useCallback, useState } from 'react';

const useGetNews = (initialParams: any, searchValue?: any, page?: any) => {
  const GetNewsUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/GetNews`;

  // keep params in state so we can update and refetch manually if needed
  const [params, setParams] = useState(initialParams);

  // SWR fetcher
  const fetcher = async ([url, params]: [string, any]) => {
    const res = await axios.post(url, params);
    return res?.data?.Data || [];
  };

  // Create a unique SWR key based on URL + params + searchValue + page
  const key = params ? [GetNewsUrl, { ...params, searchValue, page }] : null;

  const { data, error, isValidating, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  // manual refresh trigger — same as re-fetching news with new params
  const getNews = useCallback(
    async (newParams?: any) => {
      try {
        if (newParams) setParams(newParams);
        await mutate(); // refetch using latest params
      } catch (err: any) {
        if (process.env.NODE_ENV === 'production') {
          await addLog(
            newParams || params,
            GetNewsUrl,
            err.message + ' , An unknown error occurred in getNews'
          );
        }
      }
    },
    [mutate, params, GetNewsUrl]
  );

  return {
    News: data || [],
    loadingNews: isValidating,
    error: error ? error.message || 'An unknown error occurred in getNews' : null,
    getNews, // manual refresh method
  };
};

export default useGetNews;


// 'use client'

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { addLog } from "@/app/api/addlog/addlog";

// const useGetNews = (params:any,searchValue?:any,page?:any) => {

// const GetNewsUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/GetNews`

//   const [loadingNews, setLoadingNews] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [News, setNews] = useState<any>(null);

//   useEffect(() => {
//   const getNews = async () => {
//     setLoadingNews(true);
//     setError(null);

//     try {
//       const res = await axios.post(
//         GetNewsUrl,
//         { ...params }
//       );

//       setNews(res?.data?.Data || []);
//     } catch (err: any) {
//       setError(
//         err.message || "An unknown error occurred in getNews"
//       );

//       if (process.env.NODE_ENV === "production") {
//         await addLog(
//             params,
//             GetNewsUrl,
//           err.message + " , An unknown error occurred in getNews",
//         );
//       }
//     } finally {
//         setLoadingNews(false);
//     }
//   };
//   getNews()
//   }, [searchValue,page]);

//   return { loadingNews, error, News };
// };

// export default useGetNews;
