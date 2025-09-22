import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { verifyStatus } from '@/types/types';

type RowRadioButtonsGroupProps = {
  buttons:verifyStatus[];
  selectedValue:string;
  setSelectedValue:React.Dispatch<React.SetStateAction<string>>;
}

export default function RowRadioButtonsGroup({buttons,selectedValue,setSelectedValue}:RowRadioButtonsGroupProps) {

    const handleChange = (event:any) => {
      setSelectedValue(event.target.value);
    };

  return (
    <>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectedValue}
        onChange={handleChange}
        sx={{'.MuiFormControlLabel-label': {color: 'black'}}}
      >
        {buttons && buttons.map((item:any)=>(
            <React.Fragment key={item.id}>
                <FormControlLabel value={item.id} control={<Radio sx={{'& .MuiSvgIcon-root': {color: 'black'}}}/>} label={item.stat} />
            </React.Fragment>
        ))}
      </RadioGroup>
      </>
  );
}
