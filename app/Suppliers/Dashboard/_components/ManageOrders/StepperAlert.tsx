'use client'

import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type SimpleSnackbarProps = {
  open:boolean;
  setOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SimpleSnackbar({open,setOpen}:SimpleSnackbarProps) {
  

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" color='secondary'/>
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="تغییر وضعیت با موفقیت انجام شد."
        action={action}
        sx={{
            '& .MuiSnackbarContent-root': {
              backgroundColor: 'white',
              color: 'black',
            },
          }}
      />
    </div>
  );
}
