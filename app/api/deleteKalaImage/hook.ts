'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useDelDoc = (userToken: any) => {

const DeleteKalaImage = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/DeleteKalaImage`

  const [delDocLoading,setDelDocLoading] = useState(false);
  const [delDocError,setDelDocError] = useState<string | null>(null);
  const [delDocResponse,setDelDocResponse] = useState<any>(null);

  const getDelDoc = async (data: any) => {
    setDelDocLoading(true);
    setDelDocError(null);

    try {
      const res = await axios.post(
        DeleteKalaImage,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setDelDocResponse(res.data);
    } catch (err: any) {
        setDelDocError(
        err.message || "An unknown error occurred in DeleteKalaImage"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          DeleteKalaImage,
          err.message + " , An unknown error occurred in DeleteKalaImage",
          userToken
        );
      }
    } finally {
        setDelDocLoading(false);
    }
  };

  return { delDocLoading, delDocError, delDocResponse, getDelDoc };
};

export default useDelDoc;
