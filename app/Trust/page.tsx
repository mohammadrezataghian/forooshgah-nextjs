import React from 'react'
import { Divider } from '@mui/material'
import InformationsComponent from '@/common/InformationComponent/InformationComponent'

const Trust = () => {

const paramKey = "WepAppHowToMakeSureToSale"

  return (
    <>
    <div className='w-full p-5 text-lg font-bold h-auto flex justify-center items-center bg-white'>
          <h5>
          چطور از سایت خرید قسطی نمایم؟
          </h5>
        </div>
        <Divider/>
        <InformationsComponent paramKey={paramKey}/>
    </>
  )
}

export default Trust