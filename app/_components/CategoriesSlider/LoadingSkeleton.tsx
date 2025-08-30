import React from "react";
import { Skeleton } from "@mui/material";

const LoadingSkeleton = () => {
  return (
    <div className="flex 2xl:gap-10 xl:gap-10 lg:gap-4 md:gap-5 sm:gap-5 xs:gap-3 justify-center items-center">
      {/* one box */}
      <div className="flex flex-col gap-3 borderskeletonmainpage py-5 2xl:px-5 xl:px-5 lg:px-5 md:px-4 sm:px-5 xs:px-3 px-5 rounded-md h-[329px]">
        <div className="w-full flex justify-center">
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={230}
            height={230}
          />
        </div>
        <div>
          <div className="flex justify-center">
            <Skeleton height={50} width={180} className="bg-gray-400" />
          </div>
        </div>
      </div>
      {/* end one box */}
      {/* one box */}
      <div className="sm:flex flex-col gap-3 borderskeletonmainpage py-5 2xl:px-5 xl:px-5 lg:px-5 md:px-4 sm:px-5 xs:px-3 px-10 rounded-md h-[329px] hidden">
        <div className="w-full flex justify-center">
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={230}
            height={230}
          />
        </div>
        <div>
          <div className="flex justify-center">
            <Skeleton height={50} width={180} className="bg-gray-400" />
          </div>
        </div>
      </div>
      {/* end one box */}
      {/* one box */}
      <div className="lg:flex flex-col gap-3 borderskeletonmainpage py-5 2xl:px-5 xl:px-5 lg:px-5 md:px-4 sm:px-5 xs:px-3 px-10 rounded-md h-[329px] hidden">
        <div className="w-full flex justify-center">
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={230}
            height={230}
          />
        </div>
        <div>
          <div className="flex justify-center">
            <Skeleton height={50} width={180} className="bg-gray-400" />
          </div>
        </div>
      </div>
      {/* end one box */}
      {/* one box */}
      <div className="hidden flex-col gap-3 borderskeletonmainpage py-5 2xl:px-5 xl:px-5 lg:px-5 md:px-4 sm:px-5 xs:px-3 px-10 rounded-md h-[329px] 2xl:flex">
        <div className="w-full flex justify-center">
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={230}
            height={230}
          />
        </div>
        <div>
          <div className="flex justify-center">
            <Skeleton height={50} width={180} className="bg-gray-400" />
          </div>
        </div>
      </div>
      {/* end one box */}
    </div>
  );
};

export default LoadingSkeleton;
