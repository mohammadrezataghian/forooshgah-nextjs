'use client'

import React, { useEffect } from "react";
import { PageContainer } from "@toolpad/core/PageContainer";
import Cookies from "js-cookie";
import useGetStocks from "@/api/stocks/stocks";
import StockSkeleton from "./StockSkeleton";
import StockTable from "./StockTable";

const Stock = () => {
  
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const eshterakNo = user?.EshterakNo;
  const userToken = localStorage.getItem("userToken");

  // get data
  const params = {
    EshterakNo: eshterakNo,
  };
  const { stocks, loading, error,getStocks } = useGetStocks(userToken);

  useEffect(()=>{
    getStocks(params)
  },[])
  // end get data
  
  return (
    <>
      <PageContainer>
        {user ? (
          <div className="w-full h-auto mb-52">
            {loading ? (
              <StockSkeleton/>
            ) : (
              <StockTable stocks={stocks} getStocks={getStocks}/>
            )}
          </div>
        ) : (
          <div className="flex justify-center mt-10 text-red-500">
            <span>برای مشاهده ی سهام ابتدا وارد شوید</span>
          </div>
        )}
      </PageContainer>
    </>
  );
};

export default Stock;
