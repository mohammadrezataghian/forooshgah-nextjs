import { Skeleton } from '@mui/material'
import React from 'react'

const SearchLoading = () => {
  return (
    <>
    <div className="grid sm:gap-10 gap-4 justify-center items-center grid-flow-col grid-rows-2 pb-24 pt-10">
        <Skeleton
        sx={{ bgcolor: '#bdbdbd' }}
        className="rounded-md !w-[250px] !h-[230px] md:!w-[354px] md:!h-[329px]"
        variant="rectangular"  />
        <Skeleton
        sx={{ bgcolor: '#bdbdbd' }}
        className="rounded-md md:!w-[354px] md:!h-[329px] !w-[250px] !h-[230px]"
        variant="rectangular" />
        <Skeleton
        sx={{ bgcolor: '#bdbdbd' }}
        className="rounded-md !w-[250px] !h-[230px] md:!w-[354px] md:!h-[329px] !hidden sm:!block"
        variant="rectangular"  />
        <Skeleton
        sx={{ bgcolor: '#bdbdbd' }}
        className="rounded-md !w-[250px] !h-[230px] md:!w-[354px] md:!h-[329px] !hidden sm:!block"
        variant="rectangular"  />
        <Skeleton
        sx={{ bgcolor: '#bdbdbd' }}
        className="rounded-md !hidden xl:!block"
        variant="rectangular" width={354} height={329} />
        <Skeleton
        sx={{ bgcolor: '#bdbdbd' }}
        className="rounded-md !hidden xl:!block"
        variant="rectangular" width={354} height={329} />
        </div>
    </>
  )
}

export default SearchLoading