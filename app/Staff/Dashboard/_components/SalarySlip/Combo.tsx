'use client'

import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

type ComboProps = {
    handleChange:(event:any)=>void;
    setFocused:React.Dispatch<React.SetStateAction<boolean>>;
    items:any;
    text:string;
}

const Combo = ({handleChange,setFocused,items,text}:ComboProps) => {

  return (
    <>
    {items && 
      <Box
        component="form"
        sx={{ display: "flex", flexWrap: "wrap" }}
        className="h-[41px] w-48 boxshadowHead rounded-md"
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
          >
            <option value={0} className="text-right">
              {text}
            </option>
            {items.map((item:any) => (
              <option key={item.Id} value={item.Id} className="text-right">
                {item.Name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>
      }
    </>
  )
}

export default Combo