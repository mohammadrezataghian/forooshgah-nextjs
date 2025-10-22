'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useSaveMainConfig = (setMessage:any,setOpensnackbar:any) => {

const SaveMainConfig = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/config/SaveMainConfig`

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveConfig, setSaveConfig] = useState<any>(null);

  const getSaveConfig = async (params:any,userToken:any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        SaveMainConfig, 
        params,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSaveConfig(res?.data);
            if (res?.data?.resCode === 1) {
              setMessage(res?.data?.resMessage)
            }else{
              setMessage("تنظیمات ذخیره نشد")
            }
            setOpensnackbar(true)
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred in SaveMainConfig"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
            params,
            SaveMainConfig,
          err.message + " , An unknown error occurred in SaveMainConfig",
          userToken
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { saveConfig, loading, error ,getSaveConfig };
};

export default useSaveMainConfig;
