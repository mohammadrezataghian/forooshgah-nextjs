import React, { useState } from 'react'
import {Typography,FormControl,Select,MenuItem,Stack} from "@mui/material"

type FilterSearchProps = {
    sort: number;
    setSort: React.Dispatch<React.SetStateAction<number>>;
}

const FilterSearch = ({sort,setSort}:FilterSearchProps) => {

    const handleChangeSort = (event:any) => {
        setSort(event.target.value);
      };

  return (
    <>
        <Stack
          spacing={3}
          direction={{ xs: "row", sm: "row" }}
          alignItems="center"
          className='gap-1'
        >
          <Typography variant="overline" gutterBottom>
            مرتب سازی بر اساس : 
          </Typography>
          <FormControl sx={{ m: 0, minWidth: 120 }}>
            <Select
              value={sort}
              onChange={handleChangeSort}
              inputProps={{
                "aria-label": "Without label",
                style: { padding: "0 !important" },
              }}
              sx={{
                backgroundColor: "#F8F8F8",
                "& .MuiSelect-select": {
                  paddingRight: 4,
                  paddingLeft: 2,
                  paddingTop: 1,
                  paddingBottom: 1,
                },
              }}
            >
              {[
                "نام محصول",
                "جدیدترین",
                "قدیمی ترین",
                "بیشترین قیمت",
                "کمترین قیمت",
              ].map((value, index) => (
                <MenuItem value={index}>{value}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
    </>
  )
}

export default FilterSearch