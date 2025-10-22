'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetOneKala = (params:any,userToken:any,selected:any) => {

const GetOneKalaTaminKonande = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/GetOneKalaTaminKonande`

  const [loadingKala, setLoadingKala] = useState(false);
  const [errorKala, setErrorKala] = useState<string | null>(null);
  const [kala, setKala] = useState<any>(null);

  useEffect(() => {
    if (!selected) return;

  const getOneKala = async () => {
    setLoadingKala(true);
    setErrorKala(null);
    try {
      const res = await axios.post(
        GetOneKalaTaminKonande,
        { ...params },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setKala(res?.data?.Data || []);
    } catch (err: any) {
        setErrorKala(
        err.message || "An unknown error occurred in GetOneKalaTaminKonande"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          params,
          GetOneKalaTaminKonande,
          err.message + " , An unknown error occurred in GetOneKalaTaminKonande",
          userToken
        );
      }
    } finally {
        setLoadingKala(false);
    }
  };
  getOneKala()
}, [selected]);

  return { kala, loadingKala, errorKala };
};

export default useGetOneKala;
