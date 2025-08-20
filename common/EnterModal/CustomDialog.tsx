import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Enter from '@/common/EnterModal/Enter';


// dialog for Enter ********************************


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type CustomDialogProps ={
  open:boolean;
  handleClose:()=>void ;
  setOpenUserPassDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openUserPassDialog:boolean;
}

const CustomDialog = ({ open, handleClose,setOpenUserPassDialog,openUserPassDialog }:CustomDialogProps) => {

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      className="z-[100000]"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        ورود به حساب کاربری
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
          <Enter handleClose={handleClose} setOpenUserPassDialog={setOpenUserPassDialog}/>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default CustomDialog;
