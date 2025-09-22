'use client'

import React, { useRef } from 'react'
import DatePicker, { DatePickerRef } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputAdornment } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateObject } from "react-multi-date-picker";

type DatePickerFromProps = {
  selectedDate: DateObject | null;
  setSelectedDate:React.Dispatch<React.SetStateAction<DateObject | null>>;
  Placeholder:string;
}

const DatePickerFrom = ({selectedDate,setSelectedDate,Placeholder}:DatePickerFromProps) => {

const datePickerRef = useRef<DatePickerRef>(null);

  return (
    <>
        <DatePicker
          ref={datePickerRef}
          value={selectedDate}
          onChange={setSelectedDate}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-center"
          style={{ display: 'none' }} // Hide default input
          containerStyle={{ zIndex: 1200 }}
        />
        <OutlinedInput
          readOnly
          value={
            selectedDate
              ? `${selectedDate.year}/${selectedDate.month.number}/${selectedDate.day}`
              : ''
          }
          placeholder={Placeholder}
          onClick={() => datePickerRef.current?.openCalendar()}
          className='w-full h-10'
          startAdornment={ // 👉 put it here!
            <InputAdornment position="start">
              <CalendarMonthIcon className='cursor-pointer'/>
            </InputAdornment>
          }
        />
    </>
  )
}

export default DatePickerFrom