'use client';

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface SearchOptions {
  text?: string;
  [key: string]: any;
}

interface MarkerType {
  lat: number;
  lng: number;
}

interface SearchResult {
  notFound?: boolean;
  geom?: { coordinates: [number, number] };
  title?: string;
  address?: string;
}

const defaultCenter: [number, number] = [35.729054, 51.42047]; // lat, lng

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://map.ir/css/images/marker-default-blue.svg",
  iconSize: [60, 50],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
});

type AppmapsProps = {
  setIsMapClicked:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Appmaps({setIsMapClicked}:AppmapsProps) {
  const [text, setText] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [marker, setMarker] = useState<MarkerType | null>(null);
  const [center, setCenter] = useState<[number, number]>(defaultCenter);
  const [address, setAddress] = useState<string>("مکان تقریبی شما");
  const [zoom, setZoom] = useState<number>(11);

  // --- search function ---
  const search = (options: SearchOptions) => {
    if (!options.text) return;

    const data: Record<string, any> = {};
    for (const key in options) {
      if (options[key]) data[key] = options[key];
    }

    fetch("https://map.ir/search/v2/", {
      method: "POST",
      headers: {
        "x-api-key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIn0.eyJhdWQiOiIzMDI5MCIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIiwiaWF0IjoxNzM1NzE5MzI4LCJuYmYiOjE3MzU3MTkzMjgsImV4cCI6MTczODIyNDkyOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.LZVMWBz7UfDz-1MrZPOtkVZMwwxIKWN5CSwqdkz1zLvfvEyFgCRoH5D3NZR7kwuzAruP3keDWLhdoJ9yGmBozWxMA5KQ7ti2BHztd3GL-Osgl1WWpjQDyzIXPwBOd7ouNMifTCDP046FKm3Jtvx1rYKKPccILVdRe-4tAIClVM7BmNv2HXGkr_3ZeQ7bKIM1t_gDsM366tpUQQMfsCddNSamGFI0pbGqXzV47nUjvaksj_721inHjpX8sWtUjLpK2YB2WGM1yP9NCjJfXxqaSYlD7VxEZjtTLfdDPFGx9dIYrN-D3a-0Vw6kYMYJ7sds6D-ldaagjwEv1Hz2BSNB6A",
        "Mapir-SDK": "reactjs",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["odata.count"] > 0) {
          setResults(data.value);
        } else {
          setResults([{ notFound: true }]);
        }
      })
      .catch(console.error);
  };

  // --- reverse function (click on map) ---
  const reverseFunction = (lat: number, lng: number) => {
    const url = `https://map.ir/reverse/no?lat=${lat}&lon=${lng}`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIn0.eyJhdWQiOiIzMDI5MCIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIiwiaWF0IjoxNzM1NzE5MzI4LCJuYmYiOjE3MzU3MTkzMjgsImV4cCI6MTczODIyNDkyOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.LZVMWBz7UfDz-1MrZPOtkVZMwwxIKWN5CSwqdkz1zLvfvEyFgCRoH5D3NZR7kwuzAruP3keDWLhdoJ9yGmBozWxMA5KQ7ti2BHztd3GL-Osgl1WWpjQDyzIXPwBOd7ouNMifTCDP046FKm3Jtvx1rYKKPccILVdRe-4tAIClVM7BmNv2HXGkr_3ZeQ7bKIM1t_gDsM366tpUQQMfsCddNSamGFI0pbGqXzV47nUjvaksj_721inHjpX8sWtUjLpK2YB2WGM1yP9NCjJfXxqaSYlD7VxEZjtTLfdDPFGx9dIYrN-D3a-0Vw6kYMYJ7sds6D-ldaagjwEv1Hz2BSNB6A",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("whereaboutes", JSON.stringify(data));
        setMarker({ lat, lng });
        setCenter([data.geom.coordinates[1], data.geom.coordinates[0]]);
        setAddress(data.address);
        setIsMapClicked(true)
        setZoom(14);
        setResults([]);
        setText("");
      });
  };

  // --- handle search input ---
  useEffect(() => {
    if (text.length > 1) {
      search({ text });
    } else if (text.length === 0) {
      setResults([]);
    }
  }, [text]);

  // --- map click handler ---
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        reverseFunction(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  return (
    <>
      <div className="h-[94%] lg:!h-[94%] w-full relative">
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <MapClickHandler />

          {marker ? (
            <Marker position={[marker.lat, marker.lng]} icon={customIcon}>
              <Popup>{address}</Popup>
            </Marker>
          ) : (
            <Marker
              position={[defaultCenter[0], defaultCenter[1]]}
              icon={customIcon}
            >
              <Popup>{address}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* --- search box --- */}
      <div className="container search-boxMap">
        <div className="containerMap search-box__itemMap flex-row">
          <input
            autoComplete="off"
            type="text"
            id="searchMap"
            placeholder="دنبال کجا می‌گردید... 🔍"
            onChange={(e) => setText(e.target.value)}
            value={text}
            className="w-full placeholder:text-center pe-2"
          />
          {results.length > 0 && (
            <div className="clear-seachMap" onClick={() => setResults([])}>
              <span>&#10006;</span>
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="containerMap search-box__itemMap search-resultsMap">
            {results.map((item, i) =>
              item.notFound ? (
                <p key={i}>نتیجه‌ای یافت نشد</p>
              ) : (
                <div
                  key={i}
                  onClick={() =>
                    item.geom?.coordinates &&
                    reverseFunction(
                      item.geom.coordinates[1],
                      item.geom.coordinates[0]
                    )
                  }
                  className="search-result-itemMap"
                >
                  <p className="search-result-item-titleMap">
                    <img
                      alt="markerIcon"
                      src="https://map.ir/css/images/marker-default-white.svg"
                    />
                    {item.title}
                  </p>
                  <p className="search-result-item-addressMap">{item.address}</p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}
