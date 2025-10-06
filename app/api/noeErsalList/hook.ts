'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useGetNoeErsalList = () => {
  const [loadingErsalList, setLoadingErsalList] = useState(false);
  const [errorErsalList, setErrorErsalList] = useState<string | null>(null);
  const [ersalList, setErsalList] = useState<any>(null);

  useEffect(() => {

  const getNoeErsalList = async () => {
    setLoadingErsalList(true);
    setErrorErsalList(null);

    try {
      const res = await axios.post(
        "/api/noeErsalList",
      );

      setErsalList(res?.data?.Data || [])
    } catch (err: any) {
        setErrorErsalList(
        err.message || "An unknown error occurred in noeErsalList"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          '',
          "/api/noeErsalList",
          err.message + " , An unknown error occurred in noeErsalList",
          ''
        );
      }
    } finally {
        setLoadingErsalList(false);
    }
  };
  getNoeErsalList()
}, []);

  return { ersalList, loadingErsalList, errorErsalList };
};

export default useGetNoeErsalList;