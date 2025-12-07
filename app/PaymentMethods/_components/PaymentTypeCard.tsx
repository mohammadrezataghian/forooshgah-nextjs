'use client'

import React, { useState } from 'react';
import { useEffect } from 'react';
import { Card, CardMedia, Typography } from '@mui/material';


type PaymentTypeCardProps = {
    item:any; 
    onSelectItem:(item:any)=>void;
    selectedItem:any;
}

const PaymentTypeCard = ({ item, onSelectItem,selectedItem }:PaymentTypeCardProps) => {
    const handleClick = () => {
      onSelectItem(item); // ارسال ای دی به کامپوننت والد   
    };
  const [imageArress ,setImageAddress]=useState('')

    useEffect(()=>{
      setImageAddress(item.imgaddress);
    })
    
    return (
      <>
      <div className={`flex flex-col justify-center items-center`}>
      <Card className='w-[100px] h-[100px] flex p-1 ' onClick={handleClick} sx={{ cursor: 'pointer', maxWidth: 125, margin: '10px',border: selectedItem && item.Id === selectedItem.Id
      ? '2px solid lightgreen'
      : '1px solid transparent' }}>
        <CardMedia
          component="img"
          className='!object-contain'
          image={item.imgaddress}// URL تصویر
          alt={item.Name}
        />
      </Card>
      <Typography variant="body2" className='text-black'>
      {item.Name}
    </Typography>
    </div>
    </>
    );
  };
  
  export default PaymentTypeCard;