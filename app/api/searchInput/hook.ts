'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useFetchProducts = (setApiUsers:any) => {

const GetKala = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/GetKala`

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (payload: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        GetKala,
        payload,
      );

      setApiUsers(res.data.Data.lst || []);
      return res
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in getKala/searchInput"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          payload,
          GetKala,
          err.message + " , An unknown error occurred in GetKala/searchInput",
          ''
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchProducts };
};

export default useFetchProducts;
