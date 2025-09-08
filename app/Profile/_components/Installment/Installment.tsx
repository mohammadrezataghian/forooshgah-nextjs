'use client'

import * as React from "react";
import { PageContainer } from "@toolpad/core/PageContainer";
import Cookies from "js-cookie";
import useGetInstallment from "@/api/installment/installment";
import StockSkeleton from "../stock/StockSkeleton";
import InstallmentTable from "./InstallmentTable";

const Installment = () => {
  const [openRowId, setOpenRowId] = React.useState(null);
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const eshterakNo = user?.EshterakNo;
  const userToken = localStorage.getItem("userToken") || null;

  // get data
  const params = {
    EshterakNo: eshterakNo,
  };
  const { installment, loading, error } = useGetInstallment(params, userToken);
  // end get data

  return (
    <PageContainer>
      {user ? (
        <>
          {loading ? (
            <StockSkeleton />
          ) : (
            <InstallmentTable openRowId={openRowId} setOpenRowId={setOpenRowId} installment={installment} userToken={userToken}/>
          )}
        </>
      ) : (
        <div className="flex justify-center mt-10 text-red-500">
          <span>برای مشاهده ی اقساط ابتدا وارد شوید</span>
        </div>
      )}
    </PageContainer>
  );
};

export default Installment;