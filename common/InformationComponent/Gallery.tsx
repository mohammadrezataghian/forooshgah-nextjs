'use client'

import React, { useState } from 'react';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

type GalleryProps ={
    images: string[];
    alt: string;
}

const Gallery = ({ images, alt }:GalleryProps) => {
    
  const [current, setCurrent] = useState(0);

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto ">
      <div className="w-full h-[200px] relative">
        {images.map((img:any, index:any) => (
          <img
            key={index}
            src={img}
            alt={`${alt} ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-contain rounded-lg shadow-md transition-opacity duration-500 ease-in-out ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goPrev}
        className="absolute left-[-30px] top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-1 rounded-full z-20"
      >
        <ArrowBackIosNewOutlinedIcon />
      </button>
      <button
        onClick={goNext}
        className="absolute right-[-30px] top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-1 rounded-full z-20"
      >
        <ArrowForwardIosOutlinedIcon />
      </button>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-2">
        {images.map((_:any, index:any) => (
          <span
            key={index}
            className={`inline-block w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
              index === current ? 'bg-blue-500' : 'bg-gray-400'
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;