'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetMaxCode = (params:any,userToken:any,open:any) => {
  const [loadingCode, setLoadingCode] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [Code, setCode] = useState<any>(null);

  useEffect(() => {
    if (!params) return;

  const getCode = async () => {
    setLoadingCode(true);
    setErrorCode(null);

    try {
      const res = await axios.post(
        "/api/getMaxCodeKalaTaminKonande",
        { ...params },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setCode(res?.data?.Data || []);
    } catch (err: any) {
        setErrorCode(
        err.message || "An unknown error occurred in GetMaxCodeKalaTaminKonande"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
            params,
          "/api/getMaxCodeKalaTaminKonande",
          err.message + " , An unknown error occurred in GetMaxCodeKalaTaminKonande",
          userToken
        );
      }
    } finally {
        setLoadingCode(false);
    }
  };
  getCode()
}, [open]);

  return { Code, loadingCode, errorCode };
};

export default useGetMaxCode;
