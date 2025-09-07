import { Divider, Skeleton } from '@mui/material'
import React from 'react'

const LoadingSkeleton = () => {
  return (
    <>
    <div className='w-full h-auto bg-white flex lg:flex-row flex-wrap flex-col-reverse 2xl:px-64 pt-3 lg:pt-0'>
        <div className='w-full lg:w-1/2 h-auto p-10 flex flex-col gap-5'>
        <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width='100%'
            height={50}
          />
        <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400 mt-5"
            width='50%'
            height={20}
          />
        <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width='50%'
            height={20}
          />
        <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width='50%'
            height={20}
          />
        <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width='50%'
            height={20}
          />
        <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width='50%'
            height={20}
          />
        <div className='flex justify-end'>
        <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width='30%'
            height={40}
          />
        </div>
          </div>
        <div className='w-full lg:w-1/2 h-auto gap-3 flex flex-col items-center lg:p-10 pb-2 '>
        <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={350}
            height={270}
          />
          <div className='w-full flex gap-2 justify-center'>
          <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={50}
            height={50}
          />
          <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={50}
            height={50}
          />
          <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={50}
            height={50}
          />
          <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={50}
            height={50}
          />
          <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={50}
            height={50}
          />
          <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={50}
            height={50}
          />
          </div>
        </div>
    </div>
    <div className='w-full flex flex-col gap-1 h-auto bg-white 2xl:px-72 px-5 pt-5'>
        <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={100}
            height={40}
          />
          <Divider/>
          <div className='flex w-full gap-3 lg:gap-10 items-center mt-5 pb-24 lg:pb-2'>
            <div className='flex flex-col gap-5 border border-gray-400 p-3 rounded-sm'>
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400 "
            width={150}
            height={20}
            />
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400 "
            width={150}
            height={20}
            />
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400 "
            width={150}
            height={20}
            />
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400 "
            width={150}
            height={20}
            />
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400 "
            width={150}
            height={20}
            />
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400 "
            width={150}
            height={20}
            />
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400 "
            width={150}
            height={20}
            />
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400 "
            width={150}
            height={20}
            />
            </div>
            <div className='flex flex-col gap-5'>
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={150}
            height={20}
            />
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={150}
            height={20}
            />
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={150}
            height={20}
            />
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={150}
            height={20}
            />
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={150}
            height={20}
            />
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={150}
            height={20}
            />
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={150}
            height={20}
            />
            <Skeleton   
            variant="rectangular"
            className="rounded-lg bg-gray-400"
            width={150}
            height={20}
            />
            </div>
          </div>
        </div>
    </>
  )
}

export default LoadingSkeleton