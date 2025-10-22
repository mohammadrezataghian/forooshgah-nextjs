'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useApplyBonCard = (userToken: any) => {

const ApplyBonKart = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ApplyBonKart`

  const [applyBonCardLoading,setApplyBonCardLoading] = useState(false);
  const [applyBonCardError,setApplyBonCardError] = useState<string | null>(null);
  const [applyBonCardResponse,setApplyBonCardResponse] = useState<any>(null);

  const getApplyBonCard = async (data: any) => {
    setApplyBonCardLoading(true);
    setApplyBonCardError(null);

    try {
      const res = await axios.post(
        ApplyBonKart,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setApplyBonCardResponse(res);
    } catch (err: any) {
        setApplyBonCardError(
        err.message || "An unknown error occurred in applyBonCard"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          ApplyBonKart,
          err.message + " , An unknown error occurred in applyBonCard",
          userToken
        );
      }
    } finally {
        setApplyBonCardLoading(false);
    }
  };

  return { applyBonCardLoading, applyBonCardError, applyBonCardResponse, getApplyBonCard };
};

export default useApplyBonCard;
