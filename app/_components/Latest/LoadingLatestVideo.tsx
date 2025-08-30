import { Skeleton } from '@mui/material'
import React from 'react'

const LoadingLatestVideo = () => {
  return (
    <>
    <div className='w-full h-auto mx-auto bg-white rounded-lg shadow-md overflow-hidden flex flex-col gap-2 p-2'>
    <Skeleton
          variant="rectangular"
          className="rounded-xl"
          width="full"
          height={150}
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md"
          width={70}
          height={10}
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md"
          width='100%'
          height={20}
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md mt-3"
          width="full"
          height={15}
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md"
          width="50%"
          height={15}
          sx={{ bgcolor: "#ggg" }}
        />
    </div>
    <div className='w-full h-auto mx-auto bg-white rounded-lg shadow-md overflow-hidden flex flex-col gap-2 p-2'>
    <Skeleton
          variant="rectangular"
          className="rounded-xl"
          width="full"
          height={150}
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md"
          width={70}
          height={10}
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md"
          width='100%'
          height={20}
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md mt-3"
          width="full"
          height={15}
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md"
          width="50%"
          height={15}
          sx={{ bgcolor: "#ggg" }}
        />
    </div>
    <div className='w-full h-auto mx-auto bg-white rounded-lg shadow-md overflow-hidden flex flex-col gap-2 p-2'>
    <Skeleton
          variant="rectangular"
          className="rounded-xl"
          width="full"
          height={150}
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md"
          width={70}
          height={10}
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md"
          width='100%'
          height={20}
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md mt-3"
          width="full"
          height={15}
          sx={{ bgcolor: "#ggg" }}
        />
    <Skeleton
          variant="rectangular"
          className="rounded-md"
          width="50%"
          height={15}
          sx={{ bgcolor: "#ggg" }}
        />
    </div>
    </>
  )
}

export default LoadingLatestVideo