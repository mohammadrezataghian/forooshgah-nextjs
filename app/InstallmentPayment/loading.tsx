import { Skeleton } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <div className='lg:col-span-3 md:col-span-2 col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-auto gap-5'>
    <div className='w-full h-96'>
        <Skeleton className='w-full h-full rounded-lg'/>
    </div>
    <div className='w-full h-96'>
        <Skeleton className='w-full h-full rounded-lg'/>
    </div>
    <div className='w-full h-96'>
        <Skeleton className='w-full h-full rounded-lg'/>
    </div>
    </div>
  )
}

export default Loading