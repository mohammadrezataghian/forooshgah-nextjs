'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetItems = () => {

  const ForooshgahList = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/ForooshgahList`

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<any>(null);

  useEffect(() => {
  const getItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        ForooshgahList,
      );

      setItems(res?.data?.Data?.lst || []);
      
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in ForooshgahList"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          '',
          ForooshgahList,
          err.message + " , An unknown error occurred in ForooshgahList",''
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
