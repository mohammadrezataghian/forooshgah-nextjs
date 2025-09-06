import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

type CustomizedInputBaseProps ={
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
    currentPage?: number;
    totalPages?: number;
}

export default function CustomizedInputBase({setSearchValue,placeholder,currentPage,totalPages}:CustomizedInputBaseProps) {

    const [searchQuery, setSearchQuery] = React.useState(''); 

    const handleInputChange = (event:any) => {
      setSearchQuery(event.target.value);
    };
    const handleSearchClick = () => {
        setSearchValue(searchQuery)
      };
      
  return (
    <Paper
      component="form"
      sx={{ display: 'flex',flexDirection:"row-reverse", alignItems: 'center', width: 335 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder= {placeholder}
        inputProps={{ 'aria-label': 'عنوان خبر را جستجو کنید' }}
        value={searchQuery}  // Bind the value to the state
        onChange={handleInputChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
