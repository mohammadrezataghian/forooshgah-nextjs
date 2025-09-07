import { Skeleton } from "@mui/material";
import React from "react";

const TotalFactorLoading = () => {
  return (
    <>
      <div className="w-full flex justify-center h-auto mb-10 text-xl">
        <div className="px-5 xs:px-0 w-full xs:w-2/3 h-auto flex flex-col items-start gap-5">
          <div className="w-full flex justify-between bordercartcard">
            <Skeleton className="w-28 h-10" />
            <Skeleton className="w-28 h-10" />
          </div>
          <div className="w-full flex justify-between bordercartcard">
            <Skeleton className="w-28 h-10" />
            <Skeleton className="w-28 h-10" />
          </div>
          <div className="w-full flex justify-between bordercartcard text-green-500">
            <Skeleton className="w-28 h-10" />
            <Skeleton className="w-28 h-10" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalFactorLoading;