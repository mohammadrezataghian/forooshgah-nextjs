import { Skeleton } from "@mui/material";
import React from "react";

const SmallSkeleton = () => {
  return (
    <>
      <div className="w-1/4 h-full lg:grid grid-rows-2 gap-5 hidden rounded-xl">
        <Skeleton
          variant="rectangular"
          className="rounded-xl"
          width="full"
          height="100%"
          sx={{ bgcolor: "#ggg" }}
        />
        <Skeleton
          variant="rectangular"
          className="rounded-xl"
          width="full"
          height="100%"
          sx={{ bgcolor: "#ggg" }}
        />
      </div>
    </>
  );
};

export default SmallSkeleton;
