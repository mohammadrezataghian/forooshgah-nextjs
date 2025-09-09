'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetInstallment = (params:any,userToken:any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [installment, setInstallment] = useState<any>(null);


  useEffect(() => {
  const getInstallment = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/installment",
        { ...params },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setInstallment(res?.data?.Data || [])
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in installment"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
            params,
          "/api/installment",
          err.message + " , An unknown error occurred in installment",
          userToken
        );
      }
    } finally {
      setLoading(false);
    }
  };
  getInstallment()
}, []);

  return { installment, loading, error };
};

export default useGetInstallment;
