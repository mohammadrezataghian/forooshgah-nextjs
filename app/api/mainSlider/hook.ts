'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

type param ={
    OutOrInLogin:boolean;
    MobileOrPc:boolean;
}


const useGetAdvertisement = (params:param,isMobile:boolean,loggedIn:boolean,shouldFetch:boolean) => {

const AdvertisementList = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/AdvertisementList`

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [advertisement, setAdvertisement] = useState<any>(null);

  useEffect(()=>{

 
  const getAdvertisement = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        AdvertisementList,
        params,
      );

      setAdvertisement(res?.data?.Data?.List || []);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in getSahamPersonScore"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
            params,
            AdvertisementList,
          err.message + " , An unknown error occurred in getSahamPersonScore",
        );
      }
    } finally {
      setLoading(false);
    }
  };
  getAdvertisement()
},[isMobile,loggedIn,shouldFetch])
  return { loading, error, advertisement };
};

export default useGetAdvertisement;
