'use client'

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import EditUserInfo from "./EditUserInfo";

// dialog for mobile ********************************

type CustomDialogProps ={
    MobileDialogOpen:boolean;
    handleMobileDialogClose:()=>void ;
}

const MobileDialog = ({ MobileDialogOpen, handleMobileDialogClose }:CustomDialogProps) => {

    const [isButtonClicked,setIsButtonClicked] = useState(false)
    const router = useRouter()

// handle navigation to stockRequest
const handleNav =()=>{
    router.push('/stockRequest')
}

  return (
    <Dialog
      onClose={handleMobileDialogClose}
      aria-labelledby="customized-dialog-title"
      open={MobileDialogOpen}
      className="z-[100000]"
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {isButtonClicked ? 'تکمیل اطلاعات' : 'شماره موبایل شما یافت نشد'}
        <IconButton
          aria-label="close"
          onClick={isButtonClicked ? ()=>(setIsButtonClicked(false)) : handleMobileDialogClose}
          sx={(theme) => ({
            position: "absolute",
            left: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon className="customDialogClose"/>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {isButtonClicked ? 
          <EditUserInfo/>
        :  
          <div className="flex flex-col gap-10 py-5 mb-3">
            <div className="flex flex-col gap-5">
                <p>اگر سهام دار هستید وارد شوید</p>
                <Button variant="contained" onClick={()=>(setIsButtonClicked(true))}>اصلاح اطلاعات</Button>
            </div>
            <Divider/>
            <div className="flex flex-col gap-5">
                <p>اگر سهام دار جدید هستید ثبت نام کنید</p>
                <Button variant="contained" onClick={handleNav}>ثبت نام سهامدار</Button>
            </div>
          </div>
        }
      </DialogContent>
    </Dialog>
  );
};

export default MobileDialog;
