import React from 'react'
import { Skeleton } from "@mui/material";

const LoadingSkeleton = () => {
  
  return (
    <>
    <div className="flex 2xl:gap-10 xl:gap-5 lg:gap-10 md:gap-5 sm:gap-10 xs:gap-3 justify-center items-center">
        {/* one box */}
                <div className="flex flex-col gap-3 borderskeletonmainpage py-5 2xl:px-10 xl:px-5 lg:px-5 md:px-4 sm:px-5 xs:px-3 px-10 rounded-md h-[329px]">
                  <div className='w-full flex justify-center'>
                  <Skeleton
                    variant="rectangular"
                    className="rounded-md"
                    width={130}
                    height={130}
                    sx={{ bgcolor: '#bdbdbd' }}
                  />
                  </div>
                  <div>
                    <div className='my-5 flex flex-col'>
                    <Skeleton
                      height={30}
                      width={200}
                      sx={{ bgcolor: '#bdbdbd' }}
                    />
                    <Skeleton
                      height={30}
                      width={120}
                      sx={{ bgcolor: '#bdbdbd' }}
                    />
                    </div>
                    <div className="flex gap-5 ">
                      <Skeleton sx={{ bgcolor: '#bdbdbd' }} height={20} width={100} />
                      <Skeleton sx={{ bgcolor: '#bdbdbd' }} height={20} width={60} />
                      
                    </div>
                  </div>
                </div>
                {/* end one box */}
        {/* one box */}
                <div className="xs:flex flex-col gap-3 borderskeletonmainpage py-5 2xl:px-10  xl: px-5 lg:px-5 md:px-4 sm:px-5 xs:px-3 rounded-md h-[329px] hidden">
                  <div className='w-full flex justify-center'>
                  <Skeleton
                    variant="rectangular"
                    className="rounded-md"
                    width={130}
                    height={130}
                    sx={{ bgcolor: '#bdbdbd' }}
                  />
                  </div>
                  <div>
                    <div className='my-5 flex flex-col'>
                    <Skeleton
                      height={30}
                      width={200}
                      sx={{ bgcolor: '#bdbdbd' }}
                    />
                    <Skeleton
                      height={30}
                      width={120}
                      sx={{ bgcolor: '#bdbdbd' }}
                    />
                    </div>
                    <div className="flex gap-5 ">
                      <Skeleton sx={{ bgcolor: '#bdbdbd' }} height={20} width={100} />
                      <Skeleton sx={{ bgcolor: '#bdbdbd' }} height={20} width={60} />
                      
                    </div>
                  </div>
                </div>
                {/* end one box */}
        {/* one box */}
                <div className="md:flex flex-col gap-3 borderskeletonmainpage py-5 2xl:px-10 xl:px-5 lg:px-5 md:px-4 rounded-md h-[329px] hidden">
                  <div className='w-full flex justify-center'>
                  <Skeleton
                    variant="rectangular"
                    className="rounded-md"
                    width={130}
                    height={130}
                    sx={{ bgcolor: '#bdbdbd' }}
                  />
                  </div>
                  <div>
                    <div className='my-5 flex flex-col'>
                    <Skeleton
                      height={30}
                      width={200}
                      sx={{ bgcolor: '#bdbdbd' }}
                    />
                    <Skeleton
                      height={30}
                      width={120}
                      style={{ marginBottom: 6 }}
                      sx={{ bgcolor: '#bdbdbd' }}
                    />
                    </div>
                    <div className="flex gap-5 ">
                      <Skeleton sx={{ bgcolor: '#bdbdbd' }} height={20} width={100} />
                      <Skeleton sx={{ bgcolor: '#bdbdbd' }} height={20} width={60} />
                      
                    </div>
                  </div>
                </div>
                {/* end one box */}
        {/* one box */}
                <div className="xl:flex flex-col gap-3 borderskeletonmainpage py-5 2xl:px-10 xl:px-5 lg:px-5 rounded-md h-[329px] hidden ">
                  <div className='w-full flex justify-center'>
                  <Skeleton
                    variant="rectangular"
                    className="rounded-md"
                    width={130}
                    height={130}
                    sx={{ bgcolor: '#bdbdbd' }}
                  />
                  </div>
                  <div>
                    <div className='my-5 flex flex-col'>
                    <Skeleton
                      height={30}
                      width={200}
                      sx={{ bgcolor: '#bdbdbd' }}
                    />
                    <Skeleton
                      height={30}
                      width={120}
                      sx={{ bgcolor: '#bdbdbd' }}
                    />
                    </div>
                    <div className="flex gap-5 ">
                      <Skeleton sx={{ bgcolor: '#bdbdbd' }} height={20} width={100} />
                      <Skeleton sx={{ bgcolor: '#bdbdbd' }} height={20} width={60} />
                      
                    </div>
                  </div>
                </div>
                {/* end one box */}
        </div>
    </>
  )
}

export default LoadingSkeleton