'use client'

import { NoeErsalList } from "@/types/types";
import { Box, FormControl, Select } from "@mui/material";
import React, { useState } from "react";

type DeliveryTypeProps = {
    ersalList:NoeErsalList;
    selectedItem:number;
    setSelectedItem:React.Dispatch<React.SetStateAction<number>>;
}

const DeliveryType = ({ ersalList,selectedItem,setSelectedItem }:DeliveryTypeProps) => {

  const [focused, setFocused] = useState(false);

  const handleChange = (event:any) => {
    setSelectedItem(event.target.value);
  };

  return (
    <>
    <div className="flex flex-wrap xs:flex-row gap-5 items-center border border-blue-400 lg:p-10 p-3 rounded-lg bg-gray-100">
      <h3 className="text-right lg:text-xl text-lg text-nowrap">تعیین نحوه ی ارسال:</h3>
      <div className="self-center">
        <Box
          component="form"
          sx={{ display: "flex", flexWrap: "wrap" }}
          className="h-[41px] w-48 boxshadowHead lg:ml-0 ml-4 rounded-md"
        >
          <FormControl sx={{ minWidth: 120 }} className="h-[41px]">
            <Select
              dir="ltr"
              sx={{
                "& fieldset": {
                  borderColor: "white", // Default border color
                },
                "& option": {
                  padding: "30px 15px", // Increase padding for better spacing
                  fontSize: "16px", // Adjust font size for better readability
                  fontWeight: "500",
                  height: "40px", // Make font weight bold
                },
                "& option:hover": {
                  backgroundColor: "red", // Light background on hover
                },
              }}
              native
              onFocus={() => setFocused(true)} // Set focused to true on focus
              onBlur={() => setFocused(false)}
              onChange={handleChange}
              className="h-[41px] w-48 flex flex-row"
              value={selectedItem || 0} 
            >
              <option value={0} className="text-right">
                انتخاب روش ارسال
              </option>
              {ersalList && ersalList.map((item:any) => (
                <option key={item.Id} value={item.Id} className="text-right">
                  {item.Name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  </>
  );
};

export default DeliveryType;
