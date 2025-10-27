'use client'

import useSWR from 'swr'
import axios from 'axios'
import { addLog } from '@/app/api/addlog/addlog'

const GhestListPersonURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/GhestListPerson`

// --- fetcher function ---
const fetcher = async (params: any, userToken: any) => {
  try {
    const res = await axios.post(
      GhestListPersonURL,
      params,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return res?.data?.Data || []
  } catch (err: any) {
    if (process.env.NODE_ENV === 'production') {
      await addLog(
        params,
        GhestListPersonURL,
        err.message + ' , An unknown error occurred in installment',
        userToken
      )
    }
    throw new Error(err.message || 'An unknown error occurred in installment')
  }
}

// --- main hook ---
const useGetInstallment = (params: any, userToken: any) => {
  // cache key includes params and userToken so SWR refetches if they change
  const key = ['installment', params, userToken]

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => fetcher(params, userToken),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      dedupingInterval: 600000, // cache for 10 minutes
    }
  )

  return {
    installment: data,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refresh: mutate, // optional manual refresh
  }
}

export default useGetInstallment


// 'use client'

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { addLog } from "@/app/api/addlog/addlog";

// const useGetInstallment = (params:any,userToken:any) => {

// const GhestListPerson = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/GhestListPerson`

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [installment, setInstallment] = useState<any>(null);


//   useEffect(() => {
//   const getInstallment = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.post(
//         GhestListPerson,
//         { ...params },
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setInstallment(res?.data?.Data || [])
//     } catch (err: any) {
//       setError(
//         err.message || "An unknown error occurred in installment"
//       );

//       if (process.env.NODE_ENV === "production") {
//         await addLog(
//             params,
//             GhestListPerson,
//           err.message + " , An unknown error occurred in installment",
//           userToken
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//   getInstallment()
// }, []);

//   return { installment, loading, error };
// };

// export default useGetInstallment;
