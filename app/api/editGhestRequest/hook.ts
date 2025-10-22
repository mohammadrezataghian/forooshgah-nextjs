'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useEditDoc = (userToken: any) => {

const EditGhestRequest = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/EditGhestRequest`

  const [editDocLoading,setEditDocLoading] = useState(false);
  const [editDocError,setEditDocError] = useState<string | null>(null);
  const [editDocResponse,setEditDocResponse] = useState<any>(null);

  const getEditDoc = async (data: any) => {

    if(!userToken) return

    setEditDocLoading(true);
    setEditDocError(null);

    try {
      const res = await axios.post(
        EditGhestRequest,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEditDocResponse(res);
    } catch (err: any) {
        setEditDocError(
        err.message || "An unknown error occurred in editGhestRequest"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          EditGhestRequest,
          err.message + " , An unknown error occurred in editGhestRequest",
          userToken
        );
      }
    } finally {
        setEditDocLoading(false);
    }
  };

  return { editDocLoading, editDocError, editDocResponse, getEditDoc };
};

export default useEditDoc;
