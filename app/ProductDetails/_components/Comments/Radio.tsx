'use client'

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

type ControlledRadioButtonsGroupProps = {
    value:string;
    setValue:React.Dispatch<React.SetStateAction<string>>;
    firstName:string;
    lastName:string;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ControlledRadioButtonsGroup({value,setValue,firstName,lastName,setOpen}:ControlledRadioButtonsGroupProps) {

  const handleChange = (event:any) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="ارسال با نام شما" control={<Radio />} label={<span style={{ fontWeight: "bold" }}>ارسال با نام شما</span>} onClick={()=>(setOpen(false))}/>
        <div className='flex text-xs mb-10 text-gray-500 ps-14'><span className='text-justify'>{`دیدگاه شما در صفحه محصول با نام ${firstName + ' ' + lastName} نمایش داده می‌شود`}</span></div>
        <FormControlLabel value="ارسال ناشناس" control={<Radio />} label={<span style={{ fontWeight: "bold" }}>ارسال ناشناس</span>} onClick={()=>(setOpen(false))}/>
        <div className='flex text-xs text-gray-500 ps-14 mb-5'><span className='text-justify'>دیدگاه شما در صفحه محصول با عنوان کاربر دیجی‌کالا نمایش داده می‌شود</span></div>
      </RadioGroup>
    </FormControl>
  );
}
