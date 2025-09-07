import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ProductType } from '@/types/types';

type PaginationRoundedProps={
    page:number;
    setPage:React.Dispatch<React.SetStateAction<number>>;
    products:ProductType;
    totalCount:number;
}

export default function PaginationRounded({page,setPage,products,totalCount}:PaginationRoundedProps) {

    const handleChange = (event:any, value:any) => {
        setPage(value);
      };

    return (
      <Stack spacing={2}>
        <Pagination count={totalCount && Math.ceil(totalCount / 20)} variant="outlined" shape="rounded" page={page} onChange={handleChange}/>
      </Stack>
    );
  }