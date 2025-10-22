'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetListKala = (params:any,userToken:any,page:any,rowsPerPage:any,refreshKey:any) => {

const ListKalaTaminKonande = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ListKalaTaminKonande`

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [list, setList] = useState<any>(null);

  useEffect(() => {
  const getList = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        ListKalaTaminKonande,
        { ...params },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setList(res?.data || []);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in ListKalaTaminKonande"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          params,
          ListKalaTaminKonande,
          err.message + " , An unknown error occurred in ListKalaTaminKonande",
          userToken
        );
      }
    } finally {
      setLoading(false);
    }
  };
  getList()
}, [page,rowsPerPage, refreshKey]);

  return { list, loading, error };
};

export default useGetListKala;
