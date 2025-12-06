import React, { useEffect, useState } from 'react'
import {Typography,FormControl,Select,MenuItem,Stack} from "@mui/material"

type FilterSearchProps = {
    sort: number;
    setSort: React.Dispatch<React.SetStateAction<number>>;
    sortFromUrl:number | null;
}

const FilterSearch = ({sort,setSort,sortFromUrl}:FilterSearchProps) => {

  const sortOrder = [
    "نام محصول",
    "جدیدترین",
    "قدیمی ترین",
    "بیشترین قیمت",
    "کمترین قیمت",
  ]

  const [afterAction,setAfterAction] = useState('')
    const handleChangeSort = (event:any) => {
        setSort(event.target.value);
      };
useEffect(()=>{
  if (sortFromUrl !== null) {
    setAfterAction(sortOrder[sortFromUrl]) 
  }else{
    setAfterAction(sortOrder[sort]) 
  }
},[sortFromUrl])

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
              renderValue={()=> afterAction}
            >
              {sortOrder.map((value, index) => (
                <MenuItem value={index}>{value}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
    </>
  )
}

export default FilterSearch