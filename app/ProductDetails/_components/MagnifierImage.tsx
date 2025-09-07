import React, { useState, useRef } from "react";

type MagnifierImageProps ={
    src:string;
    alt:string;
    magnifierHeight:number;
    magnifierWidth:number;
    zoomLevel:number;
}

const MagnifierImage = ({ src, alt, magnifierHeight = 150, magnifierWidth = 150, zoomLevel = 2 }:MagnifierImageProps) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!imgRef.current) return;

    const { top, left } = imgRef.current.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setMagnifierPos({ x, y });
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }}
      />
      {showMagnifier && imgRef.current &&  (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${magnifierPos.y - magnifierHeight / 2}px`,
            left: `${magnifierPos.x - magnifierWidth / 2}px`,
            border: "1px solid lightgray",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgRef.current?.width * zoomLevel}px ${
              imgRef.current?.height * zoomLevel
            }px`,
            backgroundPositionX: `-${magnifierPos.x * zoomLevel - magnifierWidth / 2}px`,
            backgroundPositionY: `-${magnifierPos.y * zoomLevel - magnifierHeight / 2}px`,
            zIndex: 5,
            borderRadius: "50%",
          }}
        />
      )}
    </div>
  );
};

export default MagnifierImage;
