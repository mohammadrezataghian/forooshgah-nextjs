'use client'

import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { VscTextSize } from "react-icons/vsc";

export default function ToggleButtons({alignment,setAlignment}) {

  const handleAlignment = (
    event,
    newAlignment,
  ) => {
    if (newAlignment !== null) {
        setAlignment(newAlignment);
      }
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      color="info"
      sx={{flexDirection:'row-reverse' }}
      className='w-full justify-center bg-white p-5 align-baseline'
    >
      <ToggleButton className='w-28' value="16px" aria-label="centered">
      <div className='w-full h-full flex flex-col items-center justify-center'>
            <VscTextSize className='text-blue-500 text-4xl' />
            <span className='text-[16px]'>16px</span>
        </div>
      </ToggleButton>
      <ToggleButton className='w-28' value="12px" aria-label="right aligned">
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <VscTextSize className='text-blue-500 text-3xl' />
            <span>12px</span>
        </div>
      </ToggleButton>
      <ToggleButton className='w-28' value="8px" aria-label="justified">
      <div className='w-full h-full flex flex-col items-center justify-center'>
            <VscTextSize className='text-blue-500 text-2xl' />
            <span>8px</span>
        </div>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
