import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

type ColorPickerWithInputProps = {
  color:string | undefined;
  setColor:React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function ColorPickerWithInput({color,setColor}:ColorPickerWithInputProps) {

  const handleColorChange = (e:any) => {
    setColor(e.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white">
      {/* Color Picker (Swatch) */}
      <div className="relative w-full flex items-center">
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-full h-12 p-0 border border-blue-500 rounded cursor-pointer appearance-none"
          style={{ background: 'none' }}
        />
        <EditIcon className="absolute right-1.5  text-white text-xl  pointer-events-none" />
        
      </div>

      {/* Hex Code Input */}
      <div className="relative">
        <input
          type="text"
          value={color}
          onChange={handleColorChange}
          className="w-28 px-2 py-2 pr-6 rounded text-sm font-mono border border-blue-500"
          maxLength={7}
        />
        <EditIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xl pointer-events-none" />
      </div>
    </div>
  );
}
