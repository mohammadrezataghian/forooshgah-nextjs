'use client'

import useSWR from 'swr'
import axios from 'axios'
import { addLog } from '@/app/api/addlog/addlog'

const ForooshgahListByDetailURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/ForooshgahListByDetail`

// --- fetcher function ---
const fetcher = async () => {
  try {
    const res = await axios.get(ForooshgahListByDetailURL)
    return res?.data?.Data?.lst || []
  } catch (err: any) {
    if (process.env.NODE_ENV === 'production') {
      await addLog(
        '',
        ForooshgahListByDetailURL,
        err.message + ' , An unknown error occurred in ForooshgahListByDetail',
        ''
      )
    }
    throw new Error(err.message || 'An unknown error occurred in ForooshgahListByDetail')
  }
}

// --- main hook ---
const useGetForooshgahDetails = () => {
  const { data, error, isLoading } = useSWR(
    'ForooshgahListByDetail', // cache key
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 600000, // cache data for 10 minutes
    }
  )

  return {
    items: data,
    loading: isLoading,
    error: error ? error.message : null,
  }
}

export default useGetForooshgahDetails


// 'use client'

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { addLog } from "@/app/api/addlog/addlog";

// const useGetForooshgahDetails = () => {

// const ForooshgahListByDetail = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/ForooshgahListByDetail`

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [items, setItems] = useState<any>(null);

//   useEffect(()=>{
//   const getItems = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.get(ForooshgahListByDetail);

//       setItems(res?.data?.Data?.lst || []);
//     } catch (err: any) {
//       setError(
//         err.message || "An unknown error occurred in ForooshgahListByDetail"
//       );

//       if (process.env.NODE_ENV === "production") {
//         await addLog(
//           '',
//           ForooshgahListByDetail,
//           err.message + " , An unknown error occurred in ForooshgahListByDetail",
//           ''
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//   getItems()
// },[])

//   return { items, loading, error };
// };

// export default useGetForooshgahDetails;
