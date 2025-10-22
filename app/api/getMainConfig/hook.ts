'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";
import { useAtom } from "jotai";
import { mainConfig } from "@/shared/mainConfig";

const useGetMainConfig = () => {

const GetMainConfig = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pub/config/GetMainConfig`

  const [loadingConfig, setLoadingConfig] = useState(false);
  const [errorConfig, setErrorConfig] = useState<string | null>(null);
  const [config,setConfig] = useState<any>(null);
  const [mainconfig,setMainConfig] = useAtom(mainConfig);

  const getConfig = async () => {
      setLoadingConfig(true);
      setErrorConfig(null);

    try {
      const res = await axios.get(
        GetMainConfig
      );

      setConfig(res?.data?.Data);
      setMainConfig(res?.data?.Data)
        
      return res
    } catch (err: any) {
        setErrorConfig(
        err.message || "An unknown error occurred in getSahamPersonScore"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          '',
          GetMainConfig,
          err.message + " , An unknown error occurred in getSahamPersonScore",
        );
      }
    } finally {
        setLoadingConfig(false);
    }
  };

  return { loadingConfig, errorConfig,getConfig,config };
};

export default useGetMainConfig;
