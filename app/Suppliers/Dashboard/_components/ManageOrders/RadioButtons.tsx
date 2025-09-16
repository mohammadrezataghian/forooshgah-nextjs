import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function RowRadioButtonsGroup({buttons,selectedValue,setSelectedValue}) {

    const handleChange = (event) => {
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
        {buttons && buttons.map((item)=>(
            <React.Fragment key={item.id}>
                <FormControlLabel value={item.id} control={<Radio sx={{'& .MuiSvgIcon-root': {color: 'black'}}}/>} label={item.stat} />
            </React.Fragment>
        ))}
      </RadioGroup>
      </>
  );
}
