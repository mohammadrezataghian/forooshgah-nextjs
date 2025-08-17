import { Skeleton } from "@mui/material";
import React from "react";

const SearchLoading = () => {
  return (
    <>
      <div className="w-full flex-col flex gap-10 pr-5 pt-5">
        {/* one box */}
        <div className="flex justify-end gap-3 items-center borderskeleton p-5 rounded">
          <Skeleton
            animation="wave"
            variant="rectangular"
            className="rounded-md"
            width={50}
            height={50}
          />
          <div>
            <Skeleton
              animation="wave"
              height={20}
              width={200}
              style={{ marginBottom: 6 }}
            />
            <div className="flex gap-5 justify-end">
              <Skeleton animation="wave" height={20} width={60} />
              <Skeleton animation="wave" height={20} width={100} />
            </div>
          </div>
        </div>
        {/* end one box */}
        {/* one box */}
        <div className="flex justify-end gap-3 items-center borderskeleton p-5 rounded">
          <Skeleton
            animation="wave"
            variant="rectangular"
            className="rounded-md"
            width={50}
            height={50}
          />
          <div>
            <Skeleton
              animation="wave"
              height={20}
              width={200}
              style={{ marginBottom: 6 }}
            />
            <div className="flex gap-5 justify-end">
              <Skeleton animation="wave" height={20} width={60} />
              <Skeleton animation="wave" height={20} width={100} />
            </div>
          </div>
        </div>
        {/* end one box */}
        {/* one box */}
        <div className="flex justify-end gap-3 items-center borderskeleton p-5 rounded">
          <Skeleton
            animation="wave"
            variant="rectangular"
            className="rounded-md"
            width={50}
            height={50}
          />
          <div>
            <Skeleton
              animation="wave"
              height={20}
              width={200}
              style={{ marginBottom: 6 }}
            />
            <div className="flex gap-5 justify-end">
              <Skeleton animation="wave" height={20} width={60} />
              <Skeleton animation="wave" height={20} width={100} />
            </div>
          </div>
        </div>
        {/* end one box */}
        {/* one box */}
        <div className="flex justify-end gap-3 items-center borderskeleton p-5 rounded">
          <Skeleton
            animation="wave"
            variant="rectangular"
            className="rounded-md"
            width={50}
            height={50}
          />
          <div>
            <Skeleton
              animation="wave"
              height={20}
              width={200}
              style={{ marginBottom: 6 }}
            />
            <div className="flex gap-5 justify-end">
              <Skeleton animation="wave" height={20} width={60} />
              <Skeleton animation="wave" height={20} width={100} />
            </div>
          </div>
        </div>
        {/* end one box */}
        {/* one box */}
        <div className="flex justify-end gap-3 items-center borderskeleton p-5 rounded">
          <Skeleton
            animation="wave"
            variant="rectangular"
            className="rounded-md"
            width={50}
            height={50}
          />
          <div>
            <Skeleton
              animation="wave"
              height={20}
              width={200}
              style={{ marginBottom: 6 }}
            />
            <div className="flex gap-5 justify-end">
              <Skeleton animation="wave" height={20} width={60} />
              <Skeleton animation="wave" height={20} width={100} />
            </div>
          </div>
        </div>
        {/* end one box */}
      </div>
    </>
  );
};

export default SearchLoading;
