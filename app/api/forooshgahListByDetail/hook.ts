'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetForooshgahDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<any>(null);

  useEffect(()=>{
  const getItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("/api/forooshgahListByDetail");

      setItems(res?.data?.Data?.lst || []);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in ForooshgahListByDetail"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          '',
          "/api/forooshgahListByDetail",
          err.message + " , An unknown error occurred in ForooshgahListByDetail",
          ''
        );
      }
    } finally {
      setLoading(false);
    }
  };
},[])

  return { items, loading, error };
};

export default useGetForooshgahDetails;
