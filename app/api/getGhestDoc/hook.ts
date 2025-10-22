'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetINP = (params:any,userToken:any,result:any) => {

const GetGhestDoc = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/GetGhestDoc`

  const [loadingInp, setLoadingInp] = useState(false);
  const [errorInp, setErrorInp] = useState<string | null>(null);
  const [inp, setInp] = useState<any>(null);

  const getINP = async () => {
    setLoadingInp(true);
    setErrorInp(null);

    try {
      const res = await axios.post(
        GetGhestDoc,
        { ...params },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setInp(res?.data?.Data || [])
    } catch (err: any) {
        setErrorInp(
        err.message || "An unknown error occurred in GetGhestDoc"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          params,
          GetGhestDoc,
          err.message + " , An unknown error occurred in GetGhestDoc",
          userToken
        );
      }
    } finally {
        setLoadingInp(false);
    }
  };

  useEffect(() => {
    getINP();
  }, [result]);

  return { inp, loadingInp, errorInp,getINP };
};

export default useGetINP;