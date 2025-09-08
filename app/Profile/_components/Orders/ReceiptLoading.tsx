import React from "react";
import { Card, Skeleton } from "@mui/material";

const ReceiptLoading = () => {
  return (
    <>
      <div className="flex gap-5 flex-wrap">
        <Card variant="outlined" className="w-[336px]">
        <div className="flex justify-center gap-3 my-2">
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        </div>
        <div className="flex justify-center gap-3 mb-2">
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        </div>
        <div className="flex justify-center gap-3 my-2 mt-5">
        <Skeleton
          variant="rectangular"
          className="rounded-md"
          width={150}
          height={130}
          sx={{ bgcolor: "#bdbdbd" }}
        />
        <Skeleton
          variant="rectangular"
          className="rounded-md"
          width={150}
          height={130}
          sx={{ bgcolor: "#bdbdbd" }}
        />
        </div>
        <div className="flex justify-center gap-3 my-2">
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        </div>
        <div className="flex justify-center gap-3 my-2">
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        </div>
        </Card>
        <Card variant="outlined" className="w-[336px]">
        <div className="flex justify-center gap-3 my-2">
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        </div>
        <div className="flex justify-center gap-3 mb-2">
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        </div>
        <div className="flex justify-center gap-3 my-2 mt-5">
        <Skeleton
          variant="rectangular"
          className="rounded-md"
          width={150}
          height={130}
          sx={{ bgcolor: "#bdbdbd" }}
        />
        <Skeleton
          variant="rectangular"
          className="rounded-md"
          width={150}
          height={130}
          sx={{ bgcolor: "#bdbdbd" }}
        />
        </div>
        <div className="flex justify-center gap-3 my-2">
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        </div>
        <div className="flex justify-center gap-3 my-2">
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        <Skeleton sx={{ bgcolor: "#bdbdbd" }} height={20} width={150} />
        </div>
        </Card>
      </div>
    </>
  );
};

export default ReceiptLoading;
