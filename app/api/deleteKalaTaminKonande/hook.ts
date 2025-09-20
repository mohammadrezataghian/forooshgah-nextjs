'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetDeleteKala = (userToken:any,selected:any) => {
  const [loadingDeleteKala, setLoadingDeleteKala] = useState(false);
  const [errorDeleteKala, setErrorDeleteKala] = useState<string | null>(null);
  const [deletekala, setDeleteKala] = useState<any>(null);

  const getDeleteKala = async (params: any) => {
    if (!selected) return;
        setLoadingDeleteKala(true);
        setErrorDeleteKala(null);

    try {
      const res = await axios.post(
        "/api/deleteKalaTaminKonande",
        params,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setDeleteKala(res);
    } catch (err: any) {
        setErrorDeleteKala(
        err.message || "An unknown error occurred in deleteKalaTaminKonande"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          params,
          "/api/deleteKalaTaminKonande",
          err.message + " , An unknown error occurred in deleteKalaTaminKonande",
          userToken
        );
      }
    } finally {
        setLoadingDeleteKala(false);
    }
  };

  return { deletekala, loadingDeleteKala, errorDeleteKala,getDeleteKala };
};

export default useGetDeleteKala;
