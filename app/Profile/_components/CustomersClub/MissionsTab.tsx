import React from 'react'
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { PiCoins } from "react-icons/pi";
import MissionLoading from './MissionLoading';

const MissionsTab = ({items,loadingItems}) => {
  return (
    <>
    {loadingItems ? <MissionLoading/> : 
    <div className="w-full h-auto flex flex-col gap-5">
            {items &&
              items?.Data?.List.map((item) => (
                <div
                  key={item.FldId}
                  className="w-full lg:h-52 h-96 rounded-2xl flex lg:flex-row flex-col lg:gap-5 gap-2 container border border-gray-400 lg:pl-3"
                >
                  <div className="lg:w-72 w-full lg:h-full h-48 flex-shrink-0">
                    <img
                      src={item.FldImage_Str}
                      alt={item.FldImage_Alt}
                      className="w-full h-full object-cover rounded-tl-xl lg:rounded-tl-none lg:rounded-br-xl rounded-tr-xl border-0"
                    />
                  </div>
                  <div className="flex flex-col items-start p-2 lg:p-0 lg:py-2 w-auto lg:gap-1 gap-1">
                    <h3 className="flex lg:flex-row flex-col lg:gap-3 lg:items-center items-start">
                      <span className="font-bold lg:text-lg text-justify text-sm line-clamp-2">
                        {item.FldDescription}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {item.FldOfferStartDateHijri}
                      </span>
                    </h3>
                    <h3 className="text-justify lg:line-clamp-4 line-clamp-3 overflow-hidden lg:text-base text-xs">
                      {item.FldLongDescriptions}
                    </h3>
                    <div className="flex lg:flex-row flex-col lg:justify-between lg:w-11/12 w-full mt-auto">
                      <div className="flex gap-1 lg:items-center place-content-start">
                        <PiCoins className="text-yellow-500 text-2xl" />
                        <span>امتیاز:</span>
                        <span>{item.FldOfferScore}</span>
                      </div>
                      <div className="w-auto h-full flex lg:items-end place-content-end">
                        <a
                          href={item.FldPageURL}
                          className="text-nowrap flex items-center"
                        >
                          <span className="text-blue-400">
                            {item.FldPageURLTitle}
                          </span>
                          <ArrowBackIosIcon className="text-sm text-blue-400" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          }
    </>
  )
}

export default MissionsTab