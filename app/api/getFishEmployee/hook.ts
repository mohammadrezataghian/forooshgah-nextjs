'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetFish = (userToken: any) => {
  const [DocLoading,setDocLoading] = useState(false);
  const [DocError,setDocError] = useState<string | null>(null);
  const [DocResponse,setDocResponse] = useState<any>(null);

  const getFish = async (data: any) => {
    setDocLoading(true);
    setDocError(null);

    try {
      const res = await axios.post(
        "/api/getFishEmployee",
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setDocResponse(res.data);
    } catch (err: any) {
        setDocError(
        err.message || "An unknown error occurred in GetFishEmployee"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          "/api/getFishEmployee",
          err.message + " , An unknown error occurred in GetFishEmployee",
          userToken
        );
      }
    } finally {
        setDocLoading(false);
    }
  };

  return { DocLoading, DocError, DocResponse, getFish };
};

export default useGetFish;
