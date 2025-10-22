'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useDeleteFactor = (userToken: string | null) => {

const DeleteFactor = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/DeleteFactor`

  const [deleteFactorLoading,setDeleteFactorLoading] = useState(false);
  const [deleteFactorError,setDeleteFactorError] = useState<string | null>(null);
  const [deleteFactorResponse,setDeleteFactorResponse] = useState<any>(null);

  const getDeleteFactor = async (data: any) => {

    if(!userToken) return

    setDeleteFactorLoading(true);
    setDeleteFactorError(null);

    try {
      const res = await axios.post(
        DeleteFactor,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setDeleteFactorResponse(res);
    } catch (err: any) {
        setDeleteFactorError(
        err.message || "An unknown error occurred in DeleteFactor"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          DeleteFactor,
          err.message + " , An unknown error occurred in DeleteFactor",
          userToken
        );
      }
    } finally {
        setDeleteFactorLoading(false);
    }
  };

  return { deleteFactorLoading, deleteFactorError, deleteFactorResponse, getDeleteFactor };
};

export default useDeleteFactor;
