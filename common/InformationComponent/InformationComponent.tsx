'use client'

import React from 'react';
import useGetConfig from '@/app/api/config/hook';
import Gallery from './Gallery';

type InformationsComponentProps ={
    paramKey:string
}

const InformationsComponent = ({paramKey}:InformationsComponentProps) => {

  const params = {
    Key: paramKey,
  };
  const { data, loading, error } = useGetConfig(params);

  const renderContent = (item:any) => {
    const type = item.TypeName?.toLowerCase(); // Normalize for safety
    switch (type) {
      case 'img':
        const imageUrls = item.imageUrlList || [];
        if (imageUrls.length > 1) {
            return (
                <div className="w-full flex justify-center px-5">
                    <Gallery images={imageUrls} alt={item.Name} />
                </div>
            );
        } else if (imageUrls.length === 1) {
            return (
                <div className="w-full flex justify-center">
                    <img
                    src={imageUrls[0]}
                    alt={item.Name}
                    className="shadow-md"
                    />
                </div>
            );
        } else {
            // Fallback if no image exists
            return null;
        } 
      case 'p':
        return <p className="text-lg text-justify " dangerouslySetInnerHTML={{ __html: item.Value }}></p>;
      case 'a':
        return (
          <a
            href={item.Value}
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.Name}
          </a>
        );
      case 'h1':
        return <h1 className="text-2xl font-bold">{item.Value}</h1>;
      case 'h2':
        return <h2 className="text-xl font-semibold">{item.Value}</h2>;
      case 'h3':
        return <h3 className="text-lg font-semibold">{item.Value}</h3>;
      case 'h4':
        return <h3 className="text-lg font-semibold">{item.Value}</h3>;
      case 'h5':
        return <h3 className="text-lg font-semibold">{item.Value}</h3>;
      case 'h6':
        return <h3 className="text-lg font-semibold">{item.Value}</h3>;
      default:
        // If TypeName is null, fallback to displaying item.Name or item.Value
        return item.Value ? <p className="text-lg text-justify ">{item.Value}</p> : null;
    }
  };

  return (
    <>
      <div className="w-full h-auto pt-10 pb-24 bg-white lg:px-64 px-5">
        <div className="w-full flex flex-col gap-10">
          {data &&
            data.map((item:any) => (
              <div key={item.Id} className="flex w-full">
                {renderContent(item)}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default InformationsComponent;