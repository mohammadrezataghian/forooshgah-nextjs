'use client'

import React, { useEffect, useState, useDeferredValue } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { LuPackageSearch } from "react-icons/lu";
import SearchInputItems from "./SearchInputItems";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useAtom } from 'jotai';
import { selectedStore } from '@/shared/selectedStoreAtom';
import { inputValue } from '@/shared/inputs';
import useGetKala from "@/app/api/searchInput/hook";
import { useRouter } from 'next/navigation';
import { filteredUsersType } from "@/types/types";

const SearchInput = () => {
  const [apiUsers, setApiUsers] = useState<{ NameKala: string; pageIndex: number; pageSize: number; idForooshgah?: number } | undefined>(undefined);
  const [searchItem, setSearchItem] = useAtom(inputValue);
  const [filteredUsers, setFilteredUsers] = useState<filteredUsersType>([]);
  const [isBoxVisible, setIsBoxVisible] = useState<boolean>(false);
  const [state] = useAtom(selectedStore)
  const router = useRouter();
  const [wasNavigatedBack, setWasNavigatedBack] = useState(false);
  
  // handle keep box open on navigation back
  useEffect(() => {
    const handlePopState = () => {
      setWasNavigatedBack(true);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  useEffect(() => {
    if (wasNavigatedBack && searchItem.length > 0 && filteredUsers ) {
      setIsBoxVisible(true);
      setWasNavigatedBack(false); // Reset
    }
  }, [wasNavigatedBack, searchItem, filteredUsers]);
// end of handle keep box open on navigation back

  // ✅ `searchItem` updates instantly (no delay in input UI)
  const handleInputChange = (e : any) => {
    setSearchItem(e.target.value);
  };

  // ✅ `useDeferredValue` delays heavy updates (filtering + API calls)
  const deferredSearchTerm = useDeferredValue(searchItem);

  // ✅ Debounced API request (prevents too many calls)

  const { loading, error, getGetKala } = useGetKala(setApiUsers);

  useEffect(() => {
    if (deferredSearchTerm.trim().length < 2) {
      setApiUsers(undefined);
      return;
    }

    const debounceTimeout = setTimeout(() => {
      const payload: { NameKala: string; pageIndex: number; pageSize: number; idForooshgah?: number } = {
        NameKala: deferredSearchTerm,
        pageIndex: 1,
        pageSize: 50,
      };
      if(state !== 0){
        payload.idForooshgah = state
      }
      setApiUsers(payload);
    }, 1000); // Debounce API calls (500ms delay)

    return () => clearTimeout(debounceTimeout); // Cleanup function
  }, [deferredSearchTerm]);

  // ✅ Filtering logic with `deferredSearchTerm`
  useEffect(() => {
    if (deferredSearchTerm) {
      const filteredItems = apiUsers
      setFilteredUsers(filteredItems);
      setIsBoxVisible(searchItem.length > 0);
    } else {
      setFilteredUsers([]);
      setIsBoxVisible(false);
    }
  }, [deferredSearchTerm, apiUsers]);

  return (
    <>
      <div style={{ height: "100%" }} className="relative group ">
        <TextField
          placeholder="محصول، گروه کالا یا برند مورد نظرتان را جستجو کنید "
          variant="outlined"
          fullWidth
          value={searchItem}
          onChange={handleInputChange}
          className="boxshadowHead rounded-md"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                
                  <LuPackageSearch className="searchIcon text-xl" />
                
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "41px",
              backgroundColor: "white",
              borderRadius: "4px",
              paddingLeft:'12px',
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "unset",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "1px solid lightblue", // Outline when focused
            },
            "& input": {
              textAlign: "right",
              paddingRight: "10px",
              fontSize: "12px",
              direction: "rtl",
            },
            "& input::placeholder": {
              color: "black", // Change this to your desired placeholder color
              opacity: 1, // Optional: Make sure the placeholder is fully opaque
            },
          }}
        />
        {isBoxVisible && (
          <div className={`w-[100vw] h-[90vh] bg-white absolute z-[123456789] xs:-right-3 sm:-right-5 md:-right-5 lg:-right-72 xl:-right-80 2xl:-right-[500px] top-14 xl:px-20 md:px-10 lg:px-10 sm:px-7 2xl:px-64 xs:px-7 py-5 -right-2 px-5  borderSearch ${isBoxVisible ? 'visible' : 'invisible'} transition-all`}>
            <div className="w-full h-full">
              <div className="flex justify-between items-baseline w-full h-auto text-[#0AF8D8] borderSubSearch pb-2 pr-5 mb-3">
                <button
                  onClick={() => {
                    setIsBoxVisible(false);
                    router.push('/search')
                    // router.replace('/dashboard');
                  }}
                  className="py-1 px-2 text-[#0AF8D8] text-xs sm:text-md"
                >
                  برو به صفحه ی جستجو
                  <ArrowBackIosIcon className="text-sm" />
                </button>
                <span className="text-xs sm:text-lg">محصولات</span>
              </div>

              <div className="w-full h-[51%] lg:h-[90%] overflow-y-scroll flex">
                <SearchInputItems filteredUsers={filteredUsers} searchItem={searchItem} setIsBoxVisible={setIsBoxVisible}/>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchInput;