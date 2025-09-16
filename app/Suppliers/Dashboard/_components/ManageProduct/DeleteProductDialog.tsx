'use client'

import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import useGetDeleteKala from "@/api/manageProduct/deleteProduct";
import { Button, Divider } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DeleteProductDialog = ({ open, setOpen, selected,onRefresh,setSelected }) => {

  const userToken = localStorage.getItem("supplierUserToken");

  const handleClose = () => {
    setOpen(false);
  };

  const params = {
    "Id": selected,
  };
  const { deletekala, loadingDeleteKala, errorDeleteKala, getDeleteKala } = useGetDeleteKala(userToken, selected);

  const handleDelete = () =>{
    getDeleteKala(params)
  }

React.useEffect(()=>{
if (deletekala && deletekala?.data?.resCode && deletekala?.data?.resCode === 1) {
  handleClose()
  onRefresh()
  setSelected(null)
}
},[deletekala])

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          حذف محصول
        </DialogTitle>
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
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom className="p-3">
            آیا از حذف محصول انتخابی از لیست اطمینان دارید؟
          </Typography>
        </DialogContent>
        <Divider className="w-full" />
        <div className="w-full flex gap-5 p-3">
          <Button
            autoFocus
            variant="contained"
            className="text-white bg-yellow-500"
            onClick={()=>handleDelete()}
          >
            حذف
          </Button>
          <Button
            autoFocus
            onClick={handleClose}
            variant="outlined"
            color="error"
            className="text-red-500"
          >
            انصراف
          </Button>
        </div>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default DeleteProductDialog;
