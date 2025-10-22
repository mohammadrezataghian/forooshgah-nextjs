'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetItems = () => {

const getcommonquestion = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/getcommonquestion`

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<any>(null);

  useEffect(() => {
  const getItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        getcommonquestion,
      );

      setItems(res?.data?.Data || []);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in getcommonquestion"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          null,
          getcommonquestion,
          err.message + " , An unknown error occurred in getcommonquestion",
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
