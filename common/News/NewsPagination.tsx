import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type BasicPaginationProps = {
    setPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
    totalPages: number;
}

export default function BasicPagination({setPage,currentPage,totalPages}:BasicPaginationProps) {

    const handleChange = (event:any,value:any) => {
        setPage(value);
      };

  return (
    <Stack >
      <Pagination count={totalPages} page={currentPage} color="secondary" onChange={handleChange} sx={{
          '& .MuiPagination-ul': {
            flexDirection: 'row-reverse',
          }
        }}/>
    </Stack>
  );
}
