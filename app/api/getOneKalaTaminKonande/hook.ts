'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetOneKala = (params:any,userToken:any,selected:any) => {
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
        "/api/getOneKalaTaminKonande",
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
          "/api/getOneKalaTaminKonande",
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
