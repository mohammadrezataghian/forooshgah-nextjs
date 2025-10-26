'use client'

import useGetItems from '@/app/api/getFishParam/hook'
import { PageContainer } from '@toolpad/core/PageContainer'
import React, { useEffect, useState } from 'react'
import Combo from './Combo';
import Cookies from 'js-cookie';
import useGetFish from '@/app/api/getFishEmployee/hook';
import UseFormControl from './YearTextField';
import SimpleBackdrop from '@/common/BackdropSpinnerLoading/Loading';
import { Button, Divider, Skeleton } from '@mui/material';
import { FcDownload } from "react-icons/fc";
import { FcDoNotInsert } from "react-icons/fc";

const SalarySlip = () => {

  // init data
  const user = Cookies.get("staffUser") ? JSON.parse(Cookies.get("staffUser") || '') : null;
  const userToken = localStorage.getItem('staffUserToken') || '';
  const { items, loading, error,getItems } = useGetItems(userToken)
  const [year,setYear] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    getItems()
  },[])

  useEffect(()=>{
    if (items) {
      setYear(items?.Year)
    }
  },[items])
// end init data

  const [selectedItemMonth, setSelectedItemMonth] = useState(0);
  const [focusedMonth, setFocusedMonth] = useState(false);
  const handleChangeMonth = (event:any) => {
    setSelectedItemMonth(event.target.value);
  };

  const [selectedItemType, setSelectedItemType] = useState(0);
  const [focusedType, setFocusedType] = useState(false);
  const handleChangeType = (event:any) => {
    setSelectedItemType(event.target.value);
  };

const { DocLoading, DocError, DocResponse, getFish } = useGetFish(userToken)
const param = {
  FishTypeID: selectedItemType,
  Year: year || '',
  FromMonth: selectedItemMonth,
  idPerson: Number(user?.Id)
}

const handleGetFish =()=> {
  if (param.FishTypeID != 0 && param?.Year != '' && param.FromMonth != 0 && param.idPerson != 0) {
    getFish(param)
  }
}

  return (
    <>
    <PageContainer>
      {loading && 
        <div className='w-full h-auto bg-white p-5 flex justify-center md:items-start items-center gap-5 md:flex-row flex-col flex-wrap'> 
          <Skeleton  className='w-44 h-12'/>
          <Skeleton className='w-44 h-12'/>
          <Skeleton className='w-44 h-12'/>
          <Skeleton className='w-28 h-12'/>
        </div>}
      {!loading && items && (items?.FishTypeList || items?.MonthList || items?.Year) && <>
        <div className='w-full h-auto bg-white p-5 flex justify-center md:items-start items-center gap-5 md:flex-row flex-col flex-wrap'>
            <Combo items={items?.FishTypeList} setFocused={setFocusedType}  handleChange={handleChangeType} text={'انتخاب نوع فیش'}/>
            <div className='flex justify-center items-center shadow-lg w-[168px] flex-shrink-0'>
              <UseFormControl year={year} setYear={setYear} initYear={items?.Year}/>
            </div>
            <Combo items={items?.MonthList} setFocused={setFocusedMonth}  handleChange={handleChangeMonth} text={'انتخاب ماه'}/>
            <Button onClick={handleGetFish} className='flex items-center h-[41px] px-4' variant='outlined' color='success'><span>جستجو</span></Button>
        </div>
        <Divider/>
        {DocResponse && 
        <div className='w-full h-auto bg-white flex p-5 justify-start items-center flex-col gap-5 pb-10'>
          <p>{DocResponse?.data?.resCode == 1 ? <span>فیش مورد نظر شما آماده ی دانلود می باشد</span> : <span>{DocResponse?.data?.resMessage}</span>}</p>
          <div>
            {DocResponse?.data?.resCode == 1 ? 
            <FcDownload className='text-9xl'/> : 
            <FcDoNotInsert className='text-9xl'/>}
          </div>
          {DocResponse?.data?.resCode == 1 && DocResponse?.data?.Data &&
            <div className='w-full flex justify-center'>
              <Button variant='outlined' color='info'>
              <a href={DocResponse?.data?.Data} download>دانلود فایل</a>
              </Button>
            </div>
          }
        </div>
        }
        </>
        }
        {DocLoading && <SimpleBackdrop open={true}/>}
    </PageContainer>
    </>
  )
}

export default SalarySlip