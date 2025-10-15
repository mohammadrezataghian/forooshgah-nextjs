'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetInstallmentDetails = (params:any,userToken:any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [installmentDetail, setInstallmentDetail] = useState<any>(null);

  useEffect(() => {
  const getInstallmentDetail = async () => {
    if (!params.idFactor) return;
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/installmentDetails", // call YOUR Next.js API route
        { ...params },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setInstallmentDetail(res?.data || []);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in GetFactorGhestiDetail"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
            params,
          "/api/installmentDetails",
          err.message + " , An unknown error occurred in GetFactorGhestiDetail",
          userToken
        );
      }
    } finally {
      setLoading(false);
    }
  };
  getInstallmentDetail()
  }, [params.idFactor]);

  return { installmentDetail, loading, error };
};

export default useGetInstallmentDetails;
