import React, { useState} from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useAtom } from "jotai";
import { selectedStore } from "@/shared/selectedStoreAtom";
import useForooshgahList from "@/app/api/foroooshgahList/hook";

const ForooshgahList = () => {

  const [selectedItem, setSelectedItem] = useAtom(selectedStore); // برای ذخیره آیتم انتخاب شده
  const [focused, setFocused] = useState(false);

 // get data
 const { ForooshgahList, loading, error, getForooshgahList } = useForooshgahList();
 // end get data

  // تغییر مقدار انتخاب شده
  const handleChange = (event:any) => {
    setSelectedItem(event.target.value);
    // console.log("Selected Item ID:", event.target.value); // برای بررسی مقدار انتخاب شده
  };

  return (
    <>
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
            // value={selectedItem ? selectedItem : ""}
            onFocus={() => setFocused(true)} // Set focused to true on focus
            onBlur={() => setFocused(false)}
            onChange={handleChange}
            className="h-[41px] w-48 flex flex-row"
          >
            <option value={0} className="text-right">
              انتخاب فروشگاه
            </option>
            {ForooshgahList && ForooshgahList.map((item:any) => (
              <option key={item.Id} value={item.Id} className="text-right">
                {item.Name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default ForooshgahList;