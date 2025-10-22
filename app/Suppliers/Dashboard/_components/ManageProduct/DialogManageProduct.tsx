'use client'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import useGetInitData from '@/app/api/getInitData/hook';
import EditAddForm from './EditAddForm';
import Cookies from 'js-cookie';
import useGetMaxCode from '@/app/api/getMaxCodeKalaTaminKonande/hook';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type CustomizedDialogsProps = {
  open:boolean;
  setOpen:React.Dispatch<React.SetStateAction<boolean>>;
  onRefresh:()=>void;
}

export default function CustomizedDialogs({open,setOpen,onRefresh}:CustomizedDialogsProps) {
  
  const handleClose = () => {
    setOpen(false);
  };

  // init data
  const user = Cookies.get("supplierUser") ? JSON.parse(Cookies.get("supplierUser") || '') : null;
  const userToken = localStorage.getItem("supplierUserToken");
  const GroupKalaList = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/GroupKalaList`
  const UnitKalaList = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/UnitKalaList`
  const GetTypeKalaList = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/GetTypeKalaList`

  const group = useGetInitData(userToken, GroupKalaList);
  const unit = useGetInitData(userToken, UnitKalaList);
  const type = useGetInitData(userToken, GetTypeKalaList);

  const groupResponse = group && group?.response?.lst
  const unitResponse = unit && unit?.response
  const typeResponse = type && type?.response

  const param = {
    "idTaminKonande": user?.Id
  }
  const { Code, loadingCode, errorCode } = useGetMaxCode(param,userToken,open)

  //end init data

  // input values 
  const [selectedGroupId, setSelectedGroupId] = React.useState(null);
  const [selectedUnitId, setSelectedUnitId] = React.useState(null);
  const [selectedTypeId, setSelectedTypeId] = React.useState(null);
  const [checked, setChecked] = React.useState(true);
  
  // end input values
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
           ثبت محصول
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            left: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom component="div">
            <EditAddForm groupResponse={groupResponse} setSelectedGroupId={setSelectedGroupId} unitResponse={unitResponse} setSelectedUnitId={setSelectedUnitId} typeResponse={typeResponse} setSelectedTypeId={setSelectedTypeId} setChecked={setChecked} handleClose={handleClose} userToken={userToken} Code={Code} user={user} onRefresh={onRefresh}/>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
