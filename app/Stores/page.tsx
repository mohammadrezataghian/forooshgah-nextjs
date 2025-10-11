'use client'

import useGetForooshgahDetails from "@/app/api/forooshgahListByDetail/hook";
import React, { useState } from "react";
import Mapir from "mapir-react-component";
import { Button, Divider } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";

// Set up the Mapir token
const Map = Mapir.setToken({
  transformRequest: (url:any) => ({
    url,
    headers: {
      "x-api-key":
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY4ZjdjY2Y3ZmY0YWVkZjY3YjA4YmI3OGFhMTk1MTRhMDlmYzk0NjBlZGEyNWM1NjgzYThlNDQ0MzgzMTkwMDgzYzY5ODMwYzc0OGM1MmY2In0.eyJhdWQiOiIzMjA3OCIsImp0aSI6IjY4ZjdjY2Y3ZmY0YWVkZjY3YjA4YmI3OGFhMTk1MTRhMDlmYzk0NjBlZGEyNWM1NjgzYThlNDQ0MzgzMTkwMDgzYzY5ODMwYzc0OGM1MmY2IiwiaWF0IjoxNzQ1Mzg5OTc2LCJuYmYiOjE3NDUzODk5NzYsImV4cCI6MTc0Nzk4MTk3Niwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.MFTa5q1VTJVJxPriZ8vHdcWXsCeEk3UBBjBk4aeqv5shwGxR91Js9pWAYjIYuaalgojXFkINKxspa-FjS6mJpkBCWli_W-TmVKWvkNd2vcWY2Y-fg4nRk_vggM3e-UmBplyjr53aFb_KtIDcl00rMQn_uR7G0Gb_Nzybj9XUK8o7KV8iCrOiNJczESt-tr49rC-f7QWWClyHTmheROjbWkslVKj50jwhK6EH_k-pv1HCA6rpufi5FBgU2IiEhRw2KXojUASv8KciX0uBPzM1JHu-bXPU7KfPviKTY4qlEHT-OOuyrbXFoDsNgmu2_VvKWrTpa4KrKyWT0PdxMObEPQ",
      "Mapir-SDK": "reactjs",
    },
  }),
});

const Stores = () => {
  
  // get data
  const { items, loading, error } = useGetForooshgahDetails();
  // end get data
  const [searchText, setSearchText] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState([
    51.441342, 35.691672,
  ]); // default center
  const [zoomLevel, setZoomLevel] = useState([7]);
  const normalize = (str:any) =>
    str
      .trim()
      .toLowerCase()
      .replace(/ي/g, "ی") // Normalize Arabic Yeh to Persian Yeh
      .replace(/ك/g, "ک") // Normalize Arabic Kaf to Persian Kaf
      .replace(/\s+/g, " "); // Normalize multiple spaces to one

  const filteredItems = items && items.filter((item:any) =>
    normalize(item.Name).includes(normalize(searchText))
  );
  
  const handleItemClick = (item:any) => {
    setSelectedCoordinates([item.longitude, item.latitude]);
    setZoomLevel([14]); // Zoom in
  };

  const handleRouting = (item:any) => {
    const latitude = item.latitude;
    const longitude = item.longitude;
  
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    window.open(googleMapsUrl, "_blank"); // or neshanUrl / baladUrl
  };
  
  return (
    <>
      <div className="w-full bg-white p-5 md:flex justify-center text-lg font-bold hidden">
        <span>فروشگاه های تعاونی</span>
      </div>
      <div className="w-full h-auto flex flex-wrap md:flex-row flex-col-reverse gap-y-1">
        {items && items.length > 0 && (
          <>
            <div className="md:w-1/3 w-full h-[30vh]  lg:h-[80vh] md:h-[75vh] overflow-y-scroll bg-white flex flex-col gap-3 mb-24 xs:mb-0">
              <div className="w-full h-auto px-1">
                <input
                  type="text"
                  placeholder="جستجو بر اساس نام فروشگاه..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="border px-4 py-2 rounded w-full text-right text-base border-blue-400"
                />
              </div>
              {filteredItems.map((item:any) => (
                <React.Fragment key={item.Id}>
                  <div className="w-full flex flex-col gap-2 px-3">
                    <div className="flex items-baseline text-wrap">
                      <span className="align-bottom">
                        <PinDropIcon className="text-green-600" />
                        نام فروشگاه :
                      </span>
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
            <div className="md:w-2/3 w-full lg:h-[80vh] md:h-[75vh] h-[50vh]">
              <Mapir
                Map={Map}
                center={selectedCoordinates}
                zoom={zoomLevel}
                containerStyle={{ width: "100%", height: "100%" }}
              >
                {filteredItems.map((item:any) => (
                  <React.Fragment key={item.Id}>
                    <Mapir.Marker
                      coordinates={[item.longitude, item.latitude]}
                      anchor="bottom"
                    >
                      <div
                        style={{
                          background: "red",
                          borderRadius: "50%",
                          width: 10,
                          height: 10,
                        }}
                      />
                    </Mapir.Marker>
                    <Mapir.Popup
                      coordinates={[item.longitude, item.latitude]}
                      offset={15}
                      closeButton={true}
                    >
                      <div className="text-sm font-semibold cursor-pointer" onClick={() => handleItemClick(item)}>{item.Name}</div>
                    </Mapir.Popup>
                  </React.Fragment>
                ))}
              </Mapir>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Stores;
