import { Divider } from '@mui/material'
import React from 'react'
import InformationsComponent from '@/common/InformationComponent/InformationComponent'

const AboutUs = () => {

const paramKey = "webAppAbout"

  return (
    <>
    <div className='w-full p-5 text-lg font-bold h-auto flex justify-center items-center bg-white'>
          <h5>
            درباره ی ما
          </h5>
        </div>
        <Divider/>
        <InformationsComponent paramKey={paramKey}/>
    </>
  )
}

export default AboutUs