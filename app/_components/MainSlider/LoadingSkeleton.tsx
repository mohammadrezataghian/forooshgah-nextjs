import { Skeleton } from "@mui/material";
import React from "react";

const MainSliderLoadingSkeleton = () => {
  return (
    <>
      <div className="lg:w-3/4 w-full h-full mt-1 lg:mt-0 rounded-xl">
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

export default MainSliderLoadingSkeleton;
