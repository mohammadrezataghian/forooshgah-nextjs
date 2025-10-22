'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useEditProduct = (userToken: any) => {

const UpdateKalaTaminKonande = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/UpdateKalaTaminKonande`

  const [editProductLoading,setEditProductLoading] = useState(false);
  const [editProductError,setEditProductError] = useState<string | null>(null);
  const [editProductResponse,setEditProductResponse] = useState<any>(null);

  const EditProduct = async (data: any) => {
   
    setEditProductLoading(true);
    setEditProductError(null);

    try {
      const res = await axios.post(
        UpdateKalaTaminKonande,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEditProductResponse(res);
    } catch (err: any) {
        setEditProductError(
        err.message || "An unknown error occurred in updateKalaTaminKonande"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          UpdateKalaTaminKonande,
          err.message + " , An unknown error occurred in updateKalaTaminKonande",
          userToken
        );
      }
    } finally {
        setEditProductLoading(false);
    }
  };

  return { editProductLoading, editProductError, editProductResponse, EditProduct };
};

export default useEditProduct;
