import { Skeleton } from '@mui/material'
import React from 'react'

const MissionLoading = () => {
  return (
    <div className="flex flex-col gap-0">
    <Skeleton variant="rectangular" width="100%" height={225} className='rounded-xl'/>
    <Skeleton variant="rectangular" width="100%" height={225} className='mt-5 rounded-xl'/>
    <Skeleton variant="rectangular" width="100%" height={225} className='mt-5 rounded-xl'/>
  </div>
  
  )
}

export default MissionLoading;