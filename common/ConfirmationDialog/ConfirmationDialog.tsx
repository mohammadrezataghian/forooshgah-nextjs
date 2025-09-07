'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmationDialog({open,setOpen,handleDelete,dialogTitle,dialogContent}) {
  
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
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title" className='mb-5'>
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className='mb-3'>
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions className='gap-5 mb-2 ms-3'>
          <Button variant='outlined' color='error'  onClick={handleClose}>انصراف</Button>
          <Button variant='contained' onClick={()=>{
            handleDelete();
            handleClose();
            }}  autoFocus className='text-white' color='error'>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
