'use client'

import React, { useState } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type CommentTextProps={
    text:string;
    limit?:number;
}

const CommentText = ({ text, limit = 480 }:CommentTextProps) => {
  const [showFull, setShowFull] = useState(false);
  const isLong = text.length > limit;

  const toggleShow = () => setShowFull((prev) => !prev);

  if (!isLong) return <div className="mt-3 leading-7 text-justify mb-5 flex"><span>{text}</span></div>;

  return (
    <>
    <div className="mt-3 flex flex-col gap-5">
      <div className="leading-7 text-justify">
      {showFull ? text : text.slice(0, limit) + "..."}
      </div>
      <button
        onClick={toggleShow}
        className="ml-2 text-blue-500 text-sm flex items-center"
      >
        {showFull ? "بستن" : "ادامه"} {showFull ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
      </button>
    </div>
    </>
  );
};

export default CommentText;
