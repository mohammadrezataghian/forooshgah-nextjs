import React from 'react'
import { Skeleton } from "@mui/material";

const LoadingSkeleton = () => {
  return (
    <>
    <div className="grid grid-flow-col 2xl:gap-10 xl:gap-9 lg-gap-5 gap-10 justify-center items-center grid-rows-2 sm:grid-rows-1 lg:grid-rows-2 ">
        <Skeleton
        sx={{ bgcolor: '#bdbdbd' }} 
        className="rounded-md 2xl:w-[245px] 2xl:h-[250px] xl:w-[270px] xl:h-[260px] lg:w-[210px] lg:h-[230px] md:w-[260px] md:h-[240px] sm:w-[260px] sm:h-[240px] w-[260px] h-[250px]"
        variant="rectangular"  />
        <Skeleton
        sx={{ bgcolor: '#bdbdbd' }}
        className="rounded-md 2xl:w-[245px] 2xl:h-[250px] xl:w-[270px] xl:h-[260px] lg:w-[210px] lg:h-[230px] md:w-[260px] md:h-[240px] sm:w-[260px] sm:h-[240px] w-[260px] h-[250px]"
        variant="rectangular"  />
        <Skeleton
        sx={{ bgcolor: '#bdbdbd' }}
        className="rounded-md 2xl:w-[245px] 2xl:h-[250px] xl:w-[270px] xl:h-[260px] lg:w-[210px] lg:h-[230px] md:w-[260px] md:h-[240px] sm:w-[260px] sm:h-[240px] hidden lg:block"
        variant="rectangular" />
        <Skeleton
        sx={{ bgcolor: '#bdbdbd' }}
        className="rounded-md 2xl:w-[245px] 2xl:h-[250px] xl:w-[270px] xl:h-[260px] lg:w-[210px] lg:h-[230px] md:w-[260px] md:h-[240px] sm:w-[260px] sm:h-[240px] hidden lg:block"
        variant="rectangular"  />
        <Skeleton
        sx={{ bgcolor: '#bdbdbd' }}
        className="rounded-md 2xl:w-[245px] hidden lg:block 2xl:h-[250px] xl:w-[270px] xl:h-[260px] lg:w-[210px] lg:h-[230px]"
        variant="rectangular"  />
        <Skeleton
        sx={{ bgcolor: '#bdbdbd' }}
        className="rounded-md 2xl:w-[245px] hidden lg:block 2xl:h-[250px] xl:w-[270px] xl:h-[260px] lg:w-[210px] lg:h-[230px]"
        variant="rectangular"  />
        <Skeleton
        sx={{ bgcolor: '#bdbdbd' }}
        className="rounded-md hidden 2xl:block 2xl:w-[245px] 2xl:h-[250px]"
        variant="rectangular"/>
        <Skeleton
        sx={{ bgcolor: '#bdbdbd' }}
        className="rounded-md hidden 2xl:block 2xl:w-[245px] 2xl:h-[250px]"
        variant="rectangular"  />
        
        </div>
    </>
  )
}

export default LoadingSkeleton