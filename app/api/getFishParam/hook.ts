'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetItems = (userToken: any) => {

const GetFishParam = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Emp/GetFishParam`

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<any>(null);

  const getItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        GetFishParam,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

        setItems(res?.data?.Data || []);
        return res
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in GetFishParam"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          '',
          GetFishParam,
          err.message + " , An unknown error occurred in GetFishParam",
          userToken
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, error,getItems };
};

export default useGetItems;
