import React from 'react'
import { Divider } from '@mui/material'
import InformationsComponent from '@/common/InformationComponent/InformationComponent'

const Rules = () => {

const paramKey = "WebAppRulsToUseApp"

  return (
    <>
    <div className='w-full p-5 text-lg font-bold h-auto flex justify-center items-center bg-white '>
          <h5>
          قوانین و مقررات استفاده از فروشگاه
          </h5>
        </div>
        <Divider/>
        <InformationsComponent paramKey={paramKey}/>
    </>
  )
}

export default Rules