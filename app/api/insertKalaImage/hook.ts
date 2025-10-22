'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useAddDoc = (userToken: any) => {

const InsertKalaImage = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/InsertKalaImage`

  const [addDocLoading,setAddDocLoading] = useState(false);
  const [addDocError,setAddDocError] = useState<string | null>(null);
  const [addDocResponse,setAddDocResponse] = useState<any>(null);

  const getAddDoc = async (data: any) => {
    setAddDocLoading(true);
    setAddDocError(null);

    try {
      const res = await axios.post(
        InsertKalaImage,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAddDocResponse(res);
    } catch (err: any) {
        setAddDocError(
        err.message || "An unknown error occurred in insertKalaImage"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          InsertKalaImage,
          err.message + " , An unknown error occurred in insertKalaImage",
          userToken
        );
      }
    } finally {
        setAddDocLoading(false);
    }
  };

  return { addDocLoading, addDocError, addDocResponse, getAddDoc };
};

export default useAddDoc;
