'use client'

import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {TabContext,TabList,TabPanel} from '@mui/lab';
import { Divider } from '@mui/material';
import { ProductDetails } from '@/types/types';


type DetailsTabsProps={
    data:ProductDetails;
}

const DetailsTabs = ({data}:DetailsTabsProps) => {

// start tabs
const [value, setValue] = useState('');
useEffect(() => {
    if (data) {
      if (data.ShortDescription) setValue('1');
      else if (data.Attributes && data.Attributes.length > 0) setValue('2');
      else if (data.Sections && data.Sections.length > 0) setValue('3');
    }
  }, [data]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
//  end tabs


  return (
    <>
    {data && (data.Attributes?.length > 0 || data.ShortDescription || data?.Sections?.length > 0) && <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  {data.ShortDescription && <Tab label="معرفی" value="1" />} 
                  {data.Attributes && data.Attributes.length > 0  && <Tab label="مشخصات" value="2" />}
                  {data.Sections && data?.Sections?.length > 0 && <Tab label="بررسی" value="3" />}
            </TabList>
              </Box>
            <TabPanel value="1">
                <h3 className='text-justify leading-7' dangerouslySetInnerHTML={{ __html: data.ShortDescription }}>
                </h3>
            </TabPanel>
            <TabPanel value="2">
                <div className='w-full h-auto'>
                    {Array.isArray(data?.Attributes) && data?.Attributes.map((item:any, index:any)=>{
                        const isLastItem = index === data.Attributes.length - 1;
                        return (
                        <div key={item.FldIdAttributeValue} className='flex gap-5'>
                            <div className='flex flex-col w-1/3 max-w-64 bg-gray-300 p-1 pb-3 '>
                                <div>{item.AttributeName}</div>
                            </div>
                            <div className='flex flex-col w-2/3 pb-3 gap-3 p-1'>
                                <div className='text-right'>{item.AttributeValue}</div>
                                {!isLastItem && <Divider />}
                            </div>
                        </div>
                        )
                    })}
                </div>
            </TabPanel>
            <TabPanel value="3">
                <div className='w-full flex flex-col gap-10'>
                    {Array.isArray(data?.Sections) && data.Sections.map((item:any)=>(
                        <div key={item.Id} className='flex flex-col gap-5'>
                            <p className='leading-7' dangerouslySetInnerHTML={{ __html: item.Description }}></p>
                            <img src={item.ImageName} alt={item.Title} />
                        </div>
                    ))}
                </div>
            </TabPanel>
        </TabContext>
      </Box>}
    </>
  )
}

export default DetailsTabs