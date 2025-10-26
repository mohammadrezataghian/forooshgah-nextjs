'use client'

import useSWR from 'swr'
import axios from 'axios'
import { addLog } from '@/app/api/addlog/addlog'

const ConfigURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/config/content`

const fetcher = async (params: any) => {
  try {
    const res = await axios.post(ConfigURL, params) // <-- use the passed params
    return res?.data?.Data || []
  } catch (err: any) {
    if (process.env.NODE_ENV === 'production') {
      await addLog(
        params,               // <-- log the params
        ConfigURL,
        err.message + ' , An unknown error occurred in Config'
      )
    }
    throw new Error(err.message || 'An unknown error occurred in Config')
  }
}

const useGetConfig = (params: any) => {
  const { data, error, isLoading } = useSWR(
    ['Config', params],      // <-- use params as part of the cache key
    () => fetcher(params),   // <-- fetch with the passed params
    {
      revalidateOnFocus: false,
      dedupingInterval: 600000, // cache 10 minutes
    }
  )

  return {
    data,
    loading: isLoading,
    error: error ? error.message : null,
  }
}

export default useGetConfig


// "use client"

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { addLog } from "@/app/api/addlog/addlog";

// const useGetConfig = (params:any) => {

// const config = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/config/content`

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//   const getConfig = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.post(
//         config,
//         { ...params }
//       );

//       setData(res?.data?.Data || []);
//     } catch (err: any) {
//       setError(
//         err.message || "An unknown error occurred in Config"
//       );

//       if (process.env.NODE_ENV === "production") {
//         await addLog(
//           data,
//           config,
//           err.message + " , An unknown error occurred in Config",
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//   getConfig()
// }, []);
//   return { data, loading, error };
// };

// export default useGetConfig;
