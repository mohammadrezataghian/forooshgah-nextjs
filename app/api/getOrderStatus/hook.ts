'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetOrderStatus = () => {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {

  const getStatus = async () => {
    setLoadingStatus(true);
    setErrorStatus(null);
    try {
      const res = await axios.post(
        "/api/getOrderStatus"
      );

      setResponse(res);
    } catch (err: any) {
        setErrorStatus(
        err.message || "An unknown error occurred in getOrderStatus"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          '',
          "/api/getOrderStatus",
          err.message + " , An unknown error occurred in getOrderStatus",
          ''
        );
      }
    } finally {
        setLoadingStatus(false);
    }
  };
  getStatus()
    },[]) 

  return { response, loadingStatus, errorStatus };
};

export default useGetOrderStatus;
