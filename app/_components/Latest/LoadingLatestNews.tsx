import { Skeleton } from '@mui/material'
import React from 'react'

const LoadingLatestNews = () => {
  return (
    <>
    <div className='h-72 px-2 flex flex-col gap-2'>
    <Skeleton
          variant="rectangular"
          className="rounded-xl"
          width="full"
          height="100%"
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md"
          width={70}
          height={15}
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md"
          width={300}
          height={20}
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md mt-3"
          width="full"
          height={18}
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md"
          width="50%"
          height={18}
          sx={{ bgcolor: "#ggg" }}
        />
    </div>
    </>
  )
}

export default LoadingLatestNews