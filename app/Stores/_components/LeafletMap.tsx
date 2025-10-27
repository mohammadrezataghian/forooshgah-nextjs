'use client'

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Button, Divider } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import useGetForooshgahDetails from "@/app/api/forooshgahListByDetail/hook";
import "leaflet/dist/leaflet.css";

// Fix default icon issue in Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Component to programmatically move the map
const FlyToMarker = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  map.flyTo(position, 14, { duration: 1.2 });
  return null;
};

const LeafletMap = () => {
  const { items, loading, error } = useGetForooshgahDetails();
  const [searchText, setSearchText] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number]>([35.691672, 51.441342]);

  const normalize = (str: string) =>
    str.trim().toLowerCase().replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/\s+/g, " ");

  const filteredItems = items?.filter((item: any) =>
    normalize(item.Name).includes(normalize(searchText))
  );

  const handleItemClick = (item: any) => {
    setSelectedCoordinates([item.latitude,item.longitude ]);
  };
  
  const handleRouting = (item: any) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${item.latitude},${item.longitude}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
      <div className="w-full h-auto flex flex-wrap md:flex-row flex-col-reverse gap-y-1">
        {filteredItems && filteredItems.length > 0 && (
          <>
            {/* Left panel */}
            <div className="md:w-1/3 w-full h-[30vh] lg:h-[80vh] md:h-[75vh] overflow-y-scroll bg-white flex flex-col gap-3 mb-24 xs:mb-0">
              <div className="w-full h-auto px-1">
                <input
                  type="text"
                  placeholder="جستجو بر اساس نام فروشگاه..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="border px-4 py-2 rounded w-full text-right text-base border-blue-400"
                />
              </div>
              {filteredItems.map((item: any) => (
                <React.Fragment key={item.Id}>
                  <div className="w-full flex flex-col gap-2 px-3">
                    <div className="flex items-baseline text-wrap">
                      <PinDropIcon className="text-green-600" />
                      <span className="ml-1">نام فروشگاه :</span>
                      <span>{item.Name}</span>
                    </div>
                    <div className="flex">
                      <span>تلفن: </span>
                      <span>{item.Tel}</span>
                    </div>
                    <div className="flex">
                      <span>آدرس: </span>
                      <span>{item.Address}</span>
                    </div>
                    <div className="flex gap-5">
                      <Button
                        variant="contained"
                        className="bg-blue-500 text-white"
                        onClick={() => handleItemClick(item)}
                      >
                        مشاهده روی نقشه
                      </Button>
                      <Button
                        variant="contained"
                        className="bg-blue-500 text-white"
                        onClick={() => handleRouting(item)}
                      >
                        مسیریابی
                      </Button>
                    </div>
                  </div>
                  <Divider />
                </React.Fragment>
              ))}
            </div>

            {/* Right panel - Leaflet map */}
            <div className="md:w-2/3 w-full lg:h-[80vh] md:h-[75vh] h-[50vh]">
              <MapContainer
                center={selectedCoordinates}
                zoom={7}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                />
                <FlyToMarker position={selectedCoordinates} />
                {filteredItems.map((item: any) => (
                  <Marker key={item.Id} position={[item.latitude, item.longitude]}>
                    <Popup>
                      <div className="flex flex-col gap-1 z-50">
                        <span className="font-semibold cursor-pointer" onClick={() => handleItemClick(item)}>
                          {item.Name}
                        </span>
                        <span>تلفن: {item.Tel}</span>
                        <span>آدرس: {item.Address}</span>
                        <Button
                          variant="contained"
                          className="bg-blue-500 text-white mt-1"
                          onClick={() => handleRouting(item)}
                        >
                          مسیریابی
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </>
        )}
      </div>
  );
};

export default LeafletMap;
