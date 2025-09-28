'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetItems = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<any>(null);

  useEffect(() => {
  const getItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        "/api/forooshgahList",
      );

      setItems(res?.data?.Data?.lst || []);
      console.log(res);
      
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in forooshgahList"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          '',
          "/api/forooshgahList",
          err.message + " , An unknown error occurred in forooshgahList",''
        );
      }
    } finally {
      setLoading(false);
    }
  };
  getItems()
}, []);

  return { items, loading, error };
};

export default useGetItems;
