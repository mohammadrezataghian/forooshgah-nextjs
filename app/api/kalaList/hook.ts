'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetKalaList = (params:any,selectedItem:any) => {

const KalaList = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/KalaList`

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kalaList, setKalaList] = useState<any>(null);

  useEffect(() => {

      const getKalaList = async () => {

      if (selectedItem <= 0) return

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        KalaList,
        { ...params });

        setKalaList(res.data)
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in kalaList"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          params,
          KalaList,
          err.message + " , An unknown error occurred in kalaList",
          ''
        );
      }
    } finally {
      setLoading(false);
    }
  };
  getKalaList()
}, [selectedItem]);

  return { kalaList, loading, error };
};

export default useGetKalaList;