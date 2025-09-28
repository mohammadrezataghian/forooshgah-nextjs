'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useFetchProducts = (setApiUsers:any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (payload: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/searchInput",
        payload,
      );

      setApiUsers(res.data.Data.lst || []);
      return res
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in getKala"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          payload,
          "/api/getKala",
          err.message + " , An unknown error occurred in getCodeSabteName",
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
