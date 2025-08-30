'use client'

import React,{lazy, useEffect, useState} from "react";
import LatestVideo from "./LatestVideo";
import LatestNews from "./LatestNews";

const Latest = () => {

 // start lazyloading
    const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after component loads
        }
      },
      { threshold: 0.2 } // Adjust this value as needed
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  //end lazyloading

  return (
    <>
      <div ref={setRef} className="w-full min-h-[362px] mt-5 md:px-40">
        <div className="w-full h-auto flex flex-col lg:flex-row  gap-5">
        {isVisible && (
          <>
            {/* start latest videos box */}
            <LatestVideo/>
            {/* end latest videos box */}
            {/* start latest news box slider */}
            <LatestNews/>
            {/* end latest news box slider*/}
          </>
        )}
        </div>
      </div>
    </>
  );
};

export default Latest;
