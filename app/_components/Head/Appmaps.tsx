'use client';

import React, { useEffect, useState } from "react";
import Mapir from "mapir-react-component";

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

const Maps = Mapir.setToken({
  transformRequest: (url: string) => ({
    url,
    headers: {
      "x-api-key":
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIn0.eyJhdWQiOiIzMDI5MCIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIiwiaWF0IjoxNzM1NzE5MzI4LCJuYmYiOjE3MzU3MTkzMjgsImV4cCI6MTczODIyNDkyOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.LZVMWBz7UfDz-1MrZPOtkVZMwwxIKWN5CSwqdkz1zLvfvEyFgCRoH5D3NZR7kwuzAruP3keDWLhdoJ9yGmBozWxMA5KQ7ti2BHztd3GL-Osgl1WWpjQDyzIXPwBOd7ouNMifTCDP046FKm3Jtvx1rYKKPccILVdRe-4tAIClVM7BmNv2HXGkr_3ZeQ7bKIM1t_gDsM366tpUQQMfsCddNSamGFI0pbGqXzV47nUjvaksj_721inHjpX8sWtUjLpK2YB2WGM1yP9NCjJfXxqaSYlD7VxEZjtTLfdDPFGx9dIYrN-D3a-0Vw6kYMYJ7sds6D-ldaagjwEv1Hz2BSNB6A",
      "Mapir-SDK": "reactjs",
    },
  }),
});

export default function Appmaps() {
  const [text, setText] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [marker, setMarker] = useState<MarkerType | null>(null);
  const [center, setCenter] = useState<[number, number]>([51.42047, 35.729054]);
  const [markerArray, setMarkerArray] = useState<any[]>([]);
  const [lat, setLat] = useState<number>(35.72);
  const [lon, setLon] = useState<number>(51.42);
  const [address, setAddress] = useState<string>("مکان تقریبی شما");
  const [zooooom, setZooooom] = useState<number>(10);
console.log(address);
console.log(markerArray);
console.log(results);
console.log(JSON.parse(localStorage.getItem('whereaboutes') || ''));

  const search = (options: SearchOptions) => {
    if (!options.text) return;

    const data: Record<string, any> = {};
    for (const key in options) {
      if (options[key]) data[key] = options[key];
    }

    fetch("https://map.ir/search/v2/", {
      method: "POST",
      headers: {
        "x-api-key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIn0.eyJhdWQiOiIzMDI5MCIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIiwiaWF0IjoxNzM1NzE5MzI4LCJuYmYiOjE3MzU3MTkzMjgsImV4cCI6MTczODIyNDkyOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.LZVMWBz7UfDz-1MrZPOtkVZMwwxIKWN5CSwqdkz1zLvfvEyFgCRoH5D3NZR7kwuzAruP3keDWLhdoJ9yGmBozWxMA5KQ7ti2BHztd3GL-Osgl1WWpjQDyzIXPwBOd7ouNMifTCDP046FKm3Jtvx1rYKKPccILVdRe-4tAIClVM7BmNv2HXGkr_3ZeQ7bKIM1t_gDsM366tpUQQMfsCddNSamGFI0pbGqXzV47nUjvaksj_721inHjpX8sWtUjLpK2YB2WGM1yP9NCjJfXxqaSYlD7VxEZjtTLfdDPFGx9dIYrN-D3a-0Vw6kYMYJ7sds6D-ldaagjwEv1Hz2BSNB6A",
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

  const reverseFunction = (_map: any, e: any) => {
    const url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`;
    const array:any[] = [];

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIn0.eyJhdWQiOiIzMDI5MCIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIiwiaWF0IjoxNzM1NzE5MzI4LCJuYmYiOjE3MzU3MTkzMjgsImV4cCI6MTczODIyNDkyOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.LZVMWBz7UfDz-1MrZPOtkVZMwwxIKWN5CSwqdkz1zLvfvEyFgCRoH5D3NZR7kwuzAruP3keDWLhdoJ9yGmBozWxMA5KQ7ti2BHztd3GL-Osgl1WWpjQDyzIXPwBOd7ouNMifTCDP046FKm3Jtvx1rYKKPccILVdRe-4tAIClVM7BmNv2HXGkr_3ZeQ7bKIM1t_gDsM366tpUQQMfsCddNSamGFI0pbGqXzV47nUjvaksj_721inHjpX8sWtUjLpK2YB2WGM1yP9NCjJfXxqaSYlD7VxEZjtTLfdDPFGx9dIYrN-D3a-0Vw6kYMYJ7sds6D-ldaagjwEv1Hz2BSNB6A",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("whereaboutes", JSON.stringify(data));
        array.push(
          <Mapir.Marker
            key="marker"
            coordinates={[e.lngLat.lng, e.lngLat.lat]}
            anchor="bottom"
          />
        );
        setMarkerArray(array);
        setMarker({ lng: e.lngLat.lng, lat: e.lngLat.lat });
        setCenter(data.geom.coordinates);
        setLat(e.lngLat.lat);
        setLon(e.lngLat.lng);
        setAddress(data.address);
        setZooooom(e.target.transform.tileZoom);
        clearSearch();
      });
  };

  const reverseFunction2 = (coords: [number, number]) => {
    const url = `https://map.ir/reverse/no?lat=${coords[1]}&lon=${coords[0]}`;
    const array: any[] = [];

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIn0.eyJhdWQiOiIzMDI5MCIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIiwiaWF0IjoxNzM1NzE5MzI4LCJuYmYiOjE3MzU3MTkzMjgsImV4cCI6MTczODIyNDkyOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.LZVMWBz7UfDz-1MrZPOtkVZMwwxIKWN5CSwqdkz1zLvfvEyFgCRoH5D3NZR7kwuzAruP3keDWLhdoJ9yGmBozWxMA5KQ7ti2BHztd3GL-Osgl1WWpjQDyzIXPwBOd7ouNMifTCDP046FKm3Jtvx1rYKKPccILVdRe-4tAIClVM7BmNv2HXGkr_3ZeQ7bKIM1t_gDsM366tpUQQMfsCddNSamGFI0pbGqXzV47nUjvaksj_721inHjpX8sWtUjLpK2YB2WGM1yP9NCjJfXxqaSYlD7VxEZjtTLfdDPFGx9dIYrN-D3a-0Vw6kYMYJ7sds6D-ldaagjwEv1Hz2BSNB6A",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("whereaboutes", JSON.stringify(data));
        array.push(
          <Mapir.Marker
            key="marker2"
            coordinates={[coords[0], coords[1]]}
            anchor="bottom"
          />
        );
        setMarkerArray(array);
        setMarker({ lng: coords[0], lat: coords[1] });
        setCenter(data.geom.coordinates);
        setLat(coords[1]);
        setLon(coords[0]);
        setAddress(data.address);
      });
  };

  useEffect(() => {
    if (text.length > 1) {
      search({ text });
    } else if (text.length === 0) {
      setResults([]);
    }
  }, [text]);

  const clearSearch = () => setResults([]);
  const clearSearch2 = () => setText("");

  return (
    <>
      <div className="h-[94%] lg:!h-[94%] overflow-hidden w-full">
        <Mapir
          zoom={[zooooom]}
          center={center}
          Map={Maps}
          userLocation
          onClick={reverseFunction}
          onZoomEnd={clearSearch2}
          minZoom={[zooooom]}
          scrollZoom
          hash
          movingMethod="flyTo"
        >
          <Mapir.Layer type="symbol" layout={{ "icon-image": "harbor-15" }} />

          {marker ? (
            <>
              <Mapir.Marker
                userLocation
                coordinates={[marker.lng, marker.lat]}
                anchor="bottom"
                image="https://map.ir/css/images/marker-default-blue.svg"
              />
              <Mapir.Popup
                coordinates={[marker.lng, marker.lat]}
                style={{ width: "150px" }}
                offset={{
                  "bottom-left": [12, -38],
                  bottom: [0, -38],
                  "bottom-right": [-12, -38],
                }}
              >
                <h1>{address}</h1>
              </Mapir.Popup>
            </>
          ) : (
            <>
              <Mapir.Marker
                userLocation
                coordinates={[lon, lat]}
                anchor="bottom"
                image="https://map.ir/css/images/marker-default-blue.svg"
              />
              <Mapir.Popup
                coordinates={[lon, lat]}
                style={{ width: "150px" }}
                offset={{
                  "bottom-left": [12, -38],
                  bottom: [0, -38],
                  "bottom-right": [-12, -38],
                }}
              >
                <h1>{address}</h1>
              </Mapir.Popup>
            </>
          )}
        </Mapir>
      </div>

      <div className="container search-boxMap">
        <div className="containerMap search-box__itemMap flex-row">
          <input
            autoComplete="off"
            type="text"
            id="searchMap"
            placeholder="دنبال کجا می&zwnj;گردید...&#128269;"
            onChange={(e) => setText(e.target.value)}
            value={text}
            className="w-full placeholder:text-center pe-2"
          />
          {results.length > 0 && (
            <div className="clear-seachMap" onClick={clearSearch}>
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
                    item.geom?.coordinates && reverseFunction2(item.geom.coordinates)
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
