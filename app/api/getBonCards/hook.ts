'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetBonCards = (userToken: any,isPart:boolean) => {
  const [loadingBons, setLoadingBons] = useState(false);
  const [errorBons, setErrorBons] = useState<string | null>(null);
  const [bons, setBons] = useState<any>(null);


  useEffect(() => {
    if (!userToken) return
  const getBonCards = async () => {
    if(isPart) return
    setLoadingBons(true);
    setErrorBons(null);

    try {
      const res = await axios.get(
        "/api/getBonCards",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setBons(res?.data?.Data || []);
    } catch (err: any) {
        setErrorBons(
        err.message || "An unknown error occurred in getBonCards"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          '',
          "/api/getBonCards",
          err.message + " , An unknown error occurred in getBonCards",
          userToken
        );
      }
    } finally {
        setLoadingBons(false);
    }
  };
  getBonCards()
  }, [userToken]);

  return { bons, loadingBons, errorBons };
};

export default useGetBonCards;
