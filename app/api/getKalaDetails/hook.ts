'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetProductDetails = (params:any,id:any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
  const getProductDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/getKalaDetails",
        { ...params });

        setData(res?.data?.Data?.details || []);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in GetKalaDetails"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          "/api/getKalaDetails",
          err.message + " , An unknown error occurred in GetKalaDetails",
        );
      }
    } finally {
      setLoading(false);
    }
  };
  getProductDetails()
}, [id]);

  return { data, loading, error };
};

export default useGetProductDetails;
