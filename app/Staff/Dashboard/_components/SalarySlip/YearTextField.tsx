import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputAdornment } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

type UseFormControlProps={
    year:string;
    setYear:React.Dispatch<React.SetStateAction<string>>;
    initYear:any;
}

export default function UseFormControl({year,setYear,initYear}:UseFormControlProps) {

    const handleChange = (event:any) => {
        const value = event.target.value;
    
        if (/^\d*$/.test(value)) {
          setYear(value);
        }
      };
    
      const isValidYear = (val:any) => {
        const num = Number(val);
        return num >= (initYear - 50) && num <= initYear;
      };

  return (
    <div className='flex-col'>
    <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end"> : سال</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
              inputMode: 'numeric',
              pattern: '[0-9]*',
              maxLength: 4,
            }}
            onChange={handleChange}
            value={year}
            className='h-[41px]'
            error={year !== '' && !isValidYear(year)}
          />
          {year !== '' && !isValidYear(year) && (
        <FormHelperText error>{`سال باید بین ${initYear - 50} تا ${initYear} باشد`}</FormHelperText>
      )}
      </div>    
  );
}
