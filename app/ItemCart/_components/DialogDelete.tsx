'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import { Product } from '@/types/types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type CustomizedDialogsProps ={
  opendialogdelete:boolean;
  setOpendialogdelete:React.Dispatch<React.SetStateAction<boolean>>;
  namojod:[] | Product[];
}

export default function CustomizedDialogs({opendialogdelete,setOpendialogdelete,namojod}:CustomizedDialogsProps) {

  const handleClose = () => {
    setOpendialogdelete(false);
  };

// handle comma
const autocomma = (number_input:number) =>
  new Intl.NumberFormat("en-US").format(number_input);
//handle comma

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={opendialogdelete}
        className='z-[100000]'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className='text-red-500'>
          حذف از سبد خرید
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className='text-red-500'
          sx={(theme) => ({
            position: 'absolute',
            left: 8,
            top: 8,
            // color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom className='pl-20 text-red-500 pb-5'>
          محصولات زیر به علت ناکافی بودن موجودی درخواستی یا ناموجود شدن از سبد خرید حذف میگردند :
          </Typography>
         <div className='flex flex-col gap-3'>
            {namojod && namojod.map((item:any)=>(
                <Card key={item.IdKala} variant='outlined' className='py-5 px-2 leading-8'>
                    <h1 >{item.NameKala}</h1>
                    <p className='text-gray-500'>{item.NameStore}</p>
                    <p>قیمت : {autocomma(item.UnitPrice)} ریال</p>
                </Card>
            ))}
         </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} variant='outlined' color='error' className='text-red-500 m-2'>
            باشه
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
