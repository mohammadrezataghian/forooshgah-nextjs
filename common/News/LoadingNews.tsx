import { Divider, Skeleton } from "@mui/material";
import React from "react";

const LoadingNews = () => {
  return (
    <>
      <div className="w-full h-auto flex justify-between gap-5">
        <div className="w-3/4 flex flex-col gap-1">
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width='60%'
            height={20}
          />
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400 mt-5"
            width='80%'
            height={12}
          />
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400 "
            width='40%'
            height={12}
          />
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400 mt-auto"
            width={60}
            height={15}
          />
        </div>
        <Skeleton
          variant="rectangular"
          className="rounded-lg bg-gray-400"
          width={150}
          height={150}
        />
      </div>
      <Divider/>
      <div className="w-full h-auto flex justify-between gap-5">
        <div className="w-3/4 flex flex-col gap-1">
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width='60%'
            height={20}
          />
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400 mt-5"
            width='80%'
            height={12}
          />
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400 "
            width='40%'
            height={12}
          />
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400 mt-auto"
            width={60}
            height={15}
          />
        </div>
        <Skeleton
          variant="rectangular"
          className="rounded-lg bg-gray-400"
          width={150}
          height={150}
        />
      </div>
      <Divider/>
      <div className="w-full h-auto justify-between gap-5 hidden md:flex">
        <div className="w-3/4 flex flex-col gap-1">
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width='60%'
            height={20}
          />
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400 mt-5"
            width='80%'
            height={12}
          />
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400 "
            width='40%'
            height={12}
          />
          <Skeleton
            variant="rectangular"
            className="rounded-lg bg-gray-400 mt-auto"
            width={60}
            height={15}
          />
        </div>
        <Skeleton
          variant="rectangular"
          className="rounded-lg bg-gray-400"
          width={150}
          height={150}
        />
      </div>
    </>
  );
};

export default LoadingNews;
