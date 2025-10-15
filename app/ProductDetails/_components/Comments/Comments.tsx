'use client'

import React, { useState } from 'react'
import StarRating from './StarRating'
import { Button, Divider } from '@mui/material'
import CommentText from './CommentTruncate'
import Cookies from 'js-cookie'
import dynamic from "next/dynamic";
const CustomDialog = dynamic(() => import('@/common/EnterModal/CustomDialog'), {ssr: false,});
const UserPassDialog = dynamic(() => import('@/common/EnterModal/UsernameDialog'), {ssr: false,});
const SubmitCommentDialog = dynamic(() => import('./SubmitCommentDialog'), {ssr: false,});

type CommentsProps = {
    comments:any;
    nameKala:string;
    IdKala:number;
}

const Comments = ({comments,nameKala,IdKala}:CommentsProps) => {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [openUserPassDialog, setOpenUserPassDialog] = useState(false);
  const [openSubmitCommentDialog,setOpenSubmitCommentDialog]=useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

const userToken = localStorage.getItem('userToken');
const sizeInScoreBox = 20
const sizeInCommentBox = 15

//start handle enter dialog

const handleDialogClose = () => {
  setDialogOpen(false);
};
//end handle enter dialog


const handleClick = () => {
  const currentUser = Cookies.get("user") ? JSON.parse(Cookies.get("user") || '') : null;
  const currentToken = localStorage.getItem("userToken");

  if (currentUser && currentToken) {
    setOpenSubmitCommentDialog(true);
  } else {
    setDialogOpen(true);
  }
};

  return (
    <>
      <div className='w-full h-auto'>
        <div className='w-full h-auto flex flex-col gap-10'>
          {/* title */}
          <div className='w-full flex'>
            <span className='font-bold text-xl border-b-2 border-b-red-400 pb-1'>امتیاز و دیدگاه کاربران</span>
          </div>
          {/* end title */}

          {/* order score & comment */}
          <div className='flex flex-col md:flex-row gap-10 p-5 md:p-0'>
            {/* score box */}
            <div className='w-fit flex flex-col gap-3 flex-shrink-0 md:sticky md:top-32 self-start'>
              {comments && comments?.Comments && comments?.Comments.length > 0  ? <>
              <div className='w-auto flex gap-1 h-auto items-baseline'>
                <span className='font-semibold text-2xl'>{comments?.Average}</span> <span className='text-sm'>از 5</span>
              </div>
              <div className='flex items-end gap-1'>
                <StarRating value={comments?.Average} size={sizeInScoreBox}/> 
                <div className='flex text-xs text-[#BCBDC1] gap-1'><span>از مجموع </span><span>{comments?.NamberOfComments}</span><span>امتیاز</span></div>
              </div>
              </>
              : 
              <div className='w-full flex'><span>دیدگاهی درباره ی این محصول موجود نیست</span></div>
              }
              <div className='flex w-auto text-sm'><span>شما هم درباره این کالا دیدگاه ثبت کنید</span></div>
              <div className='flex w-full'><Button onClick={handleClick} variant='outlined' className='w-full'>ثبت دیدگاه</Button></div>
            </div>
            {/* end box */}

            {/* comment section */}
            <div className='flex flex-col gap-1 mb-5 flex-grow '>
            {comments && comments?.Comments?.slice(0, visibleCount).map((item:any, index:any) => (
                <div key={index} className='flex flex-col h-auto'>
                  <Divider/>
                  <div className='flex gap-3 text-sm text-[#BCBDC1] items-end mt-3'>
                    <span>{item?.FullName}</span>
                    {item?.FldIsBuy && <span className='py-0.5 px-2 text-xs text-green-600 bg-green-200 rounded-xl'>خریدار</span>}
                    <span>&#8226;</span>
                    <span>{item?.CreateDate}</span>
                  </div>
                  <div className='flex mt-1'><StarRating value={item?.FldRating} size={sizeInCommentBox}/></div>
                  <CommentText text={item?.FldCommentText} />
              </div>
              ))}
              {/* Show more button */}            
              {comments && comments?.Comments?.length > visibleCount && (
                <>
                <Divider/>
                <div className="flex mt-5">
                  <Button
                    variant="outlined"
                    onClick={() => setVisibleCount(prev => prev + 20)}
                  >
                    نمایش بیشتر
                  </Button>
                </div>
                </>
              )}
            </div>
            {/* end comment section */}
          </div>
          {/* order score & comment */}
        </div>
      </div>
      <CustomDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        openUserPassDialog={openUserPassDialog}
        setOpenUserPassDialog={setOpenUserPassDialog}
      />
      <UserPassDialog open={openUserPassDialog} setOpen={setOpenUserPassDialog}/>
      <SubmitCommentDialog open={openSubmitCommentDialog} setOpen={setOpenSubmitCommentDialog} nameKala={nameKala} IdKala={IdKala}/>
    </>
  )
}

export default Comments