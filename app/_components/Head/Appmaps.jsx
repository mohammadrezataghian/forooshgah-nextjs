'use client'

import React, { Component, useEffect, useState } from "react";
// import "@/app/styles/appMaps/appMapsOne.css";
// import "@/app/styles/appMaps/appMapsTwo.css";
import Mapir from "mapir-react-component";
const Maps = Mapir.setToken({
  transformRequest: (url) => {
    return {
      url: url,
      headers: {
        "x-api-key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIn0.eyJhdWQiOiIzMDI5MCIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIiwiaWF0IjoxNzM1NzE5MzI4LCJuYmYiOjE3MzU3MTkzMjgsImV4cCI6MTczODIyNDkyOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.LZVMWBz7UfDz-1MrZPOtkVZMwwxIKWN5CSwqdkz1zLvfvEyFgCRoH5D3NZR7kwuzAruP3keDWLhdoJ9yGmBozWxMA5KQ7ti2BHztd3GL-Osgl1WWpjQDyzIXPwBOd7ouNMifTCDP046FKm3Jtvx1rYKKPccILVdRe-4tAIClVM7BmNv2HXGkr_3ZeQ7bKIM1t_gDsM366tpUQQMfsCddNSamGFI0pbGqXzV47nUjvaksj_721inHjpX8sWtUjLpK2YB2WGM1yP9NCjJfXxqaSYlD7VxEZjtTLfdDPFGx9dIYrN-D3a-0Vw6kYMYJ7sds6D-ldaagjwEv1Hz2BSNB6A", //Mapir api key
        "Mapir-SDK": "reactjs",
      },
    };
  },
});
export default function Appmaps() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [marker, setMarker] = useState(null);
  const [center, setCenter] = useState([51.42047, 35.729054]);
  const [markerArray, setMarkerArray] = useState([]);
  const [lat, setLat] = useState(35.72);
  const [lon, setLon] = useState(51.42);
  const [address, setAddress] = useState("مکان تقریبی شما");
  const [zooooom, setZooooom] = useState(10);

  function search(options) {
    if (options.text === null || options.text === "") {
      return null;
    }
    //prepare data
    const data = {};
    for (const key in options) {
      if (options[key] !== null && options[key] !== "") {
        data[key] = options[key];
      }
    }
    try {
      fetch("https://map.ir/search/v2/", {
        method: "POST",
        headers: {
          "x-api-key":
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIn0.eyJhdWQiOiIzMDI5MCIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIiwiaWF0IjoxNzM1NzE5MzI4LCJuYmYiOjE3MzU3MTkzMjgsImV4cCI6MTczODIyNDkyOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.LZVMWBz7UfDz-1MrZPOtkVZMwwxIKWN5CSwqdkz1zLvfvEyFgCRoH5D3NZR7kwuzAruP3keDWLhdoJ9yGmBozWxMA5KQ7ti2BHztd3GL-Osgl1WWpjQDyzIXPwBOd7ouNMifTCDP046FKm3Jtvx1rYKKPccILVdRe-4tAIClVM7BmNv2HXGkr_3ZeQ7bKIM1t_gDsM366tpUQQMfsCddNSamGFI0pbGqXzV47nUjvaksj_721inHjpX8sWtUjLpK2YB2WGM1yP9NCjJfXxqaSYlD7VxEZjtTLfdDPFGx9dIYrN-D3a-0Vw6kYMYJ7sds6D-ldaagjwEv1Hz2BSNB6A", //Mapir api key
          "Mapir-SDK": "reactjs",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data["odata.count"] > 0) {
            // setResults(data.value);
            setResults(data.value);
            console.log(data);
          } else {
            setResults([{ notFound: true }]);
            console.log("notFound");
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      // insertLog("Header-fetchSiteAddress", err);
    }
  }

  function reverseFunction(map, e) {
    // console.log(e.target._easeOptions.zoom);
    console.log(e.target.transform.tileZoom);

    const url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIn0.eyJhdWQiOiIzMDI5MCIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIiwiaWF0IjoxNzM1NzE5MzI4LCJuYmYiOjE3MzU3MTkzMjgsImV4cCI6MTczODIyNDkyOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.LZVMWBz7UfDz-1MrZPOtkVZMwwxIKWN5CSwqdkz1zLvfvEyFgCRoH5D3NZR7kwuzAruP3keDWLhdoJ9yGmBozWxMA5KQ7ti2BHztd3GL-Osgl1WWpjQDyzIXPwBOd7ouNMifTCDP046FKm3Jtvx1rYKKPccILVdRe-4tAIClVM7BmNv2HXGkr_3ZeQ7bKIM1t_gDsM366tpUQQMfsCddNSamGFI0pbGqXzV47nUjvaksj_721inHjpX8sWtUjLpK2YB2WGM1yP9NCjJfXxqaSYlD7VxEZjtTLfdDPFGx9dIYrN-D3a-0Vw6kYMYJ7sds6D-ldaagjwEv1Hz2BSNB6A",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("whereaboutes", JSON.stringify(data));
        // console.log(data);
        // console.log(array);
        setMarkerArray(array);
        setMarker({
          lng: e.lngLat.lng,
          lat: e.lngLat.lat,
        });
        // console.log("data.geom.coordinates", data.geom.coordinates);
        setCenter(data.geom.coordinates);
        setLat(e.lngLat.lat);
        setLon(e.lngLat.lng);
        setAddress(data.address);
        setZooooom(e.target.transform.tileZoom);
        clearSearch();
      });
    const array = [];

    array.push(
      <Mapir.Marker
        coordinates={[e.lngLat.lng, e.lngLat.lat]}
        anchor="bottom"
      />
    );
  }

  function reverseFunction2(e) {
    console.log(e);
    const url = `https://map.ir/reverse/no?lat=${e[1]}&lon=${e[0]}`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIn0.eyJhdWQiOiIzMDI5MCIsImp0aSI6IjJjZWQ2ZTQ1MzgwOTgxMjFkYjZjYTMxNmRiZTljYjUyMDdhYjFkYzhkM2E5NmIwNzdjNWEzZmMxY2IyMmRkZDc3MzgxNGU2MDU4ZWVlMjFkIiwiaWF0IjoxNzM1NzE5MzI4LCJuYmYiOjE3MzU3MTkzMjgsImV4cCI6MTczODIyNDkyOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.LZVMWBz7UfDz-1MrZPOtkVZMwwxIKWN5CSwqdkz1zLvfvEyFgCRoH5D3NZR7kwuzAruP3keDWLhdoJ9yGmBozWxMA5KQ7ti2BHztd3GL-Osgl1WWpjQDyzIXPwBOd7ouNMifTCDP046FKm3Jtvx1rYKKPccILVdRe-4tAIClVM7BmNv2HXGkr_3ZeQ7bKIM1t_gDsM366tpUQQMfsCddNSamGFI0pbGqXzV47nUjvaksj_721inHjpX8sWtUjLpK2YB2WGM1yP9NCjJfXxqaSYlD7VxEZjtTLfdDPFGx9dIYrN-D3a-0Vw6kYMYJ7sds6D-ldaagjwEv1Hz2BSNB6A",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("whereaboutes", JSON.stringify(data));
        console.log(data);
        // console.log(array);
        setMarkerArray(array);
        setMarker({
          lng: e[0],
          lat: e[1],
        });
        // console.log("data.geom.coordinates", data.geom.coordinates);
        setCenter(data.geom.coordinates);
        setLat(e[1]);
        setLon(e[0]);
        setAddress(data.address);
        setZooooom(e.target.transform.tileZoom);
        // clearSearch();
      });
    const array = [];

    array.push(<Mapir.Marker coordinates={[e[0], e[1]]} anchor="bottom" />);
  }

  useEffect(() => {
    if (text.length > 1) {
      const params = {};
      const options = { text };
      for (const key in options) {
        if (options[key] !== null && options[key] !== "") {
          params[key] = options[key];
        }
      }

      search(params);
    } else if (text.length === 0) {
      setResults([]);
    }
  }, [text]);

  function clearSearch() {
    setResults([]);
    setText("");
  }
  function clearSearch۲() {
    setText("");
  }

  return (
    <>
      <div className="App h-[90%] ">
        {/* center={center} Map={Maps} */}
        <Mapir
          zoom={[zooooom]}
          center={center}
          Map={Maps}
          userLocation
          onClick={reverseFunction}
          onZoomEnd={clearSearch۲}
          // onPitchEnd={clearSearch۲}
          minZoom={[zooooom]}
          scrollZoom={true}
          hash={true}
          // movingMethod="jumpTo"
          // movingMethod="easeTo"
          movingMethod="flyTo"
        >
          <Mapir.Layer type="symbol" layout={{ "icon-image": "harbor-15" }} />

          {marker !== null && (
            <Mapir.Marker
              userLocation
              coordinates={[marker.lng, marker.lat]}
              anchor="bottom"
              Image={"https://map.ir/css/images/marker-default-blue.svg"}
            />
          )}
          {marker !== null && (
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
          )}
          {marker === null && (
            <>
              <Mapir.Marker
                userLocation
                coordinates={[lon, lat]}
                anchor="bottom"
                Image={"https://map.ir/css/images/marker-default-blue.svg"}
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
          {/* {markerArray} */}
        </Mapir>
      </div>
      <div className="container search-box ">
        <div className="container search-box__item flex-row">
          <input
            autoComplete="off"
            type="text"
            id="search"
            placeholder="دنبال کجا می&zwnj;گردید...&#128269;"
            onChange={(e) => setText(e.target.value)}
            value={text}
            className="w-full"
          />
          {results.length > 0 && (
            <div className="clear-seach" onClick={() => clearSearch()}>
              <span> &#10006; </span>
            </div>
          )}
          {/* <div class="btn-seach">
            {" "}
            <span onClick={() => clearSearch()}>برو</span>
          </div> */}
        </div>
        {results.length > 0 && (
          <div className="container search-box__item search-results">
            {results.map((item) => {
              if (item.notFound === true) {
                return <p>نتیجه ای یافت نشد</p>;
              } else {
                return (
                  <div
                    onClick={() => {
                      reverseFunction2(item.geom.coordinates);
                    }}
                    className="search-result-item"
                  >
                    <p className="search-result-item-title">
                      <img
                        alt="markerIcon"
                        src="https://map.ir/css/images/marker-default-white.svg"
                      />
                      {item.title}
                    </p>
                    <p className="search-result-item-address">{item.address}</p>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </>
  );
}
