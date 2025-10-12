'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetStatusMarjue = (userToken:any) => {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const getStatusMarjue = async (param: any) => {

    if (!userToken) return

    setLoadingStatus(true);
    setErrorStatus(null);

    try {
      const res = await axios.post(
        "/api/getStatusMarju",
        param,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(res);
    } catch (err: any) {
        setErrorStatus(
        err.message || "An unknown error occurred in getStatusMarju"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          param,
          "/api/getStatusMarju",
          err.message + " , An unknown error occurred in getStatusMarju",
          userToken
        );
      }
    } finally {
        setLoadingStatus(false);
    }
  };

  return { response, loadingStatus, errorStatus,getStatusMarjue };
};

export default useGetStatusMarjue;
