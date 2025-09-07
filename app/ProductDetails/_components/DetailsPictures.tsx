'use client'

import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useAtom } from "jotai";
import { siteUrlAddress } from "@/shared/site.url.atom";
import MagnifierImage from "./MagnifierImage";
import "../DetailsPictures.css";
// Import custom icons

type DetailsPicturesProps = {
    imagee:string;
    name:string;
    IdKala:number;
}

const DetailsPictures = ({ imagee, name, IdKala }:DetailsPicturesProps) => {

  const imageArray = (imagee || "").split(",");
  const [siteAddress] = useAtom(siteUrlAddress);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const images = imageArray.map((item:any) => ({
    original: `${siteAddress}/assets/public/kala/${IdKala}/${item}`,
    thumbnail: `${siteAddress}/assets/public/kala/${IdKala}/${item}`,
    originalAlt: name,
    thumbnailAlt: name,
  }));

  if (imagee == null) {
    images.splice(0);
    images.push({
      original: `${siteAddress}/assets/public/kala/product.jpg`,
      thumbnail: `${siteAddress}/assets/public/kala/product.jpg`,
      originalAlt: `ناموجود`,
      thumbnailAlt: `ناموجود`,
    });
  }

  return (
    <ImageGallery
      infinite={true}
      items={images}
      showPlayButton={false}
      showFullscreenButton={true}
      showThumbnails={true}
      showNav={true}
      slideDuration={500}
      showIndex={true}
      onScreenChange={(full:any) => setIsFullscreen(full)}
      renderLeftNav={(onClick:any, disabled:any) => (
        <button
          onClick={onClick}
          disabled={disabled}
          style={{
            position: "absolute",
            top: "50%",
            left: "5px",
            // background: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <ChevronLeftIcon className="text-md" />
        </button>
      )}
      renderRightNav={(onClick:any, disabled:any) => (
        <button
          onClick={onClick}
          disabled={disabled}
          style={{
            position: "absolute",
            top: "50%",
            right: "5px",
            // background: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <ChevronRightIcon />
        </button>
      )}
      renderItem={(item:any) =>
        isFullscreen ? (
          <img
            src={item.original}
            alt={item.originalAlt}
            className="image-gallery-image"
            style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }}
          />
        ) : (
          <MagnifierImage
            src={item.original}
            alt={item.originalAlt}
            zoomLevel={2.5}
            magnifierHeight={150}
            magnifierWidth={150}
          />
        )
      }
    />
  );
};

export default DetailsPictures;
