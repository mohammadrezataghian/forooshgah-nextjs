'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';

type AlertDialogProps={
    open:boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleExitAcc:()=>void ;
    exitDialogContent: string;
}

export default function AlertDialog({open,setOpen,handleExitAcc,exitDialogContent}:AlertDialogProps) {
 
 const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiPaper-root': {
             minWidth:"350px",
          }}}
      >
        <DialogTitle id="alert-dialog-title">
          خروج از حساب کاربری
        </DialogTitle>
        <Divider/>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {exitDialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions className='gap-5'>
          <Button variant='contained' onClick={() => handleExitAcc()} className='bg-red-500 text-white'>بله</Button>
          <Button variant='contained' onClick={handleClose} autoFocus className='bg-yellow-500 text-white'>
            خیر
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
