'use client'

import useSWR from 'swr'
import axios from 'axios'
import { addLog } from '@/app/api/addlog/addlog'

const GetCustomerClubOffers = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/GetCustomerClubOffers`

// --- fetcher function ---
const fetcher = async (userToken: any) => {
  try {
    const res = await axios.get(GetCustomerClubOffers, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    })
    return res?.data || []
  } catch (err: any) {
    if (process.env.NODE_ENV === 'production') {
      await addLog(
        '',
        GetCustomerClubOffers,
        err.message + ' , An unknown error occurred in GetCustomerClubOffers',
        userToken
      )
    }
    throw new Error(err.message || 'An unknown error occurred in GetCustomerClubOffers')
  }
}

// --- main hook ---
const useGetOffers = (userToken: any) => {
  const shouldFetch = !!userToken // only fetch if token exists

  const { data, error, isLoading } = useSWR(
    shouldFetch ? ['GetCustomerClubOffers', userToken] : null, // cache key
    () => fetcher(userToken),
    {
      revalidateOnFocus: false,
      dedupingInterval: 600000, // cache 10 minutes
    }
  )

  return {
    items: data,
    loadingItems: isLoading,
    errorItems: error ? error.message : null,
  }
}

export default useGetOffers



// 'use client'

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { addLog } from "@/app/api/addlog/addlog";

// const useGetOffers = (userToken: any) => {

// const GetCustomerClubOffers = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/GetCustomerClubOffers`

//   const [loadingItems, setLoadingItems] = useState(false);
//   const [errorItems, setErrorItems] = useState<string | null>(null);
//   const [items, setItems] = useState<any>(null);


//   useEffect(() => {
//   const getItems = async () => {
//     setLoadingItems(true);
//     setErrorItems(null);

//     try {
//       const res = await axios.get(
//         GetCustomerClubOffers,
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setItems(res?.data || []);
//     } catch (err: any) {
//         setErrorItems(
//         err.message || "An unknown error occurred in GetCustomerClubOffers"
//       );

//       if (process.env.NODE_ENV === "production") {
//         await addLog(
//           '',
//           GetCustomerClubOffers,
//           err.message + " , An unknown error occurred in GetCustomerClubOffers",
//           userToken
//         );
//       }
//     } finally {
//         setLoadingItems(false);
//     }
//   };
//   getItems()
//   }, []);

//   return { items, loadingItems, errorItems };
// };

// export default useGetOffers;
