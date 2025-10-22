'use client'

import { useState } from "react";
import axios from "axios";
import { addLog } from "@/app/api/addlog/addlog";

const useAddProduct = (userToken: any) => {

const AddKalaTaminKonande = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/AddKalaTaminKonande`

  const [addProductLoading,setAddProductLoading] = useState(false);
  const [addProductError,setAddProductError] = useState<string | null>(null);
  const [addProductResponse,setAddProductResponse] = useState<any>(null);

  const AddProduct = async (data: any) => {
    setAddProductLoading(true);
    setAddProductError(null);

    try {
      const res = await axios.post(
        AddKalaTaminKonande,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAddProductResponse(res);
    } catch (err: any) {
        setAddProductError(
        err.message || "An unknown error occurred in AddKalaTaminKonande"
      );

      if (process.env.NODE_ENV === "production") {
        await addLog(
          data,
          AddKalaTaminKonande,
          err.message + " , An unknown error occurred in AddKalaTaminKonande",
          userToken
        );
      }
    } finally {
        setAddProductLoading(false);
    }
  };

  return { addProductLoading, addProductError, addProductResponse, AddProduct };
};

export default useAddProduct;
