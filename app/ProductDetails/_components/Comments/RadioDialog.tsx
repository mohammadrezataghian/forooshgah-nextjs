'use client'

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from '@mui/material';
import ControlledRadioButtonsGroup from './Radio';

type RadioDialogProps = {
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    value:string;
    setValue:React.Dispatch<React.SetStateAction<string>>;
    firstName:string;
    lastName:string;
}

export default function RadioDialog({open,setOpen,value,setValue,firstName,lastName}:RadioDialogProps) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'xs'}
        open={open}
        onClose={handleClose}
        className='z-[10000]'
      >
        <DialogTitle className='!text-lg'>نحوه ی نمایش دیدگاه ها
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
        <Divider/>
        <DialogContent>
          <div className='w-full flex'>
            <ControlledRadioButtonsGroup value={value} setValue={setValue} firstName={firstName} lastName={lastName} setOpen={setOpen}/>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}