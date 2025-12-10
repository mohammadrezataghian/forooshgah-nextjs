'use client'

import { FormControlLabel, Stack, Switch } from "@mui/material";
import React from "react";

type OnlyAvailablesParams = {
    onlyAvailable:boolean;
    setOnlyAvailable:React.Dispatch<React.SetStateAction<boolean>>;
}

const OnlyAvailables = ({onlyAvailable,setOnlyAvailable}:OnlyAvailablesParams) => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <FormControlLabel
          control={<Switch />}
          checked={onlyAvailable}
          onChange={(_event, checked) => setOnlyAvailable(checked)}
          label="فقط نمایش کالا‌های موجود:"
          sx={{ direction: "rtl" }}
        />
      </Stack>
    </>
  );
};

export default OnlyAvailables;
