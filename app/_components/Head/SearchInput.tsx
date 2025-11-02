'use client'

import React, { useEffect, useState, useDeferredValue, useRef  } from "react";
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
import { ProductType } from "@/types/types";
import { usePathname } from "next/navigation";
import { searchBoxVisible } from "@/shared/isSearchBoxVisible";
import { lastSearchValue } from "@/shared/lastSearchValue";

const SearchInput = () => {
  const [apiUsers, setApiUsers] = useState<any>({});
  const [searchItem, setSearchItem] = useAtom(inputValue);
  const [filteredUsers, setFilteredUsers] = useState<any>({});
  const [isBoxVisible, setIsBoxVisible] = useAtom(searchBoxVisible);
  const [state] = useAtom(selectedStore)
  const router = useRouter();
  const [wasNavigatedBack, setWasNavigatedBack] = useState(false);
  const pathname = usePathname();
  const prevIndexRef = useRef(null);
  const [lastSearch, setLastSearch] = useAtom(lastSearchValue);
  
  // handle keep box open on navigation back
  useEffect(() => {
    // Each entry has a unique key in React Router
    const currentIndex = window.history.state?.idx;

    if (prevIndexRef.current !== null) {
      if (currentIndex < prevIndexRef.current) {
        // ✅ Navigated back
        setWasNavigatedBack(true);
      } else {
        // Forward or push → don’t reopen
        setWasNavigatedBack(false);
        setIsBoxVisible(false); 
      }
    }

    prevIndexRef.current = currentIndex;
  }, [pathname]);

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

  const { loading, error, fetchProducts } = useGetKala(setApiUsers);

  useEffect(() => {
    if (deferredSearchTerm.trim().length < 2) {
      setApiUsers({});
      return;
    }

    const debounceTimeout = setTimeout(() => {
      const payload: { NameKala: string; pageIndex: number; pageSize: number; idForooshgah?: number } = {
        NameKala: deferredSearchTerm,
        pageIndex: 1,
        pageSize: 50,
        idForooshgah : state,
      };
      // if(state !== 0){
      //   payload.idForooshgah = state
      // }
      fetchProducts(payload);
    }, 1000); // Debounce API calls (500ms delay)

    return () => clearTimeout(debounceTimeout); // Cleanup function
  }, [deferredSearchTerm,state]);

  // ✅ Filtering logic with `deferredSearchTerm`
  useEffect(() => {
    if (deferredSearchTerm && pathname != '/search') {
      const filteredItems = apiUsers
      setFilteredUsers(filteredItems);
    } else {
      setFilteredUsers({});
    }
  }, [deferredSearchTerm, apiUsers]);

  useEffect(() => {
    if (pathname !== "/search") {
      if (searchItem.trim().length > 2) {
        setIsBoxVisible(true);
      } else {
        setIsBoxVisible(false); // 👈 hide box when text is cleared
      }
    }
  }, [searchItem, pathname]);

  return (
    <>
      <div style={{ height: "100%" }} className="relative group ">
        <TextField
          placeholder={lastSearch != '' ? lastSearch : "محصول، گروه کالا یا برند مورد نظرتان را جستجو کنید "}
          variant="outlined"
          fullWidth
          value={searchItem}
          onChange={handleInputChange}
          disabled={pathname == '/search'}
          className="boxshadowHead rounded-md"
          onFocus={() => {
            if (
              (pathname.includes("/productDetails") || pathname.includes("/productList")) &&
              searchItem === "" &&
              lastSearch.trim() !== ""
            ) {
              setSearchItem(lastSearch);
              setLastSearch('')
            }
          }}
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
            "& input::focus" : {
              backgroundColor:"white"
            }
          }}
        />
        {isBoxVisible && (
          <div className={`w-[95vw] xl:w-[97vw] 2xl:w-[95vw] h-[90vh] bg-white absolute z-[123456789] xs:-right-3 sm:-right-5 md:-right-5 lg:-right-[270px] xl:-right-[290px] 2xl:-right-[460px] top-14 xl:px-20 md:px-10 lg:px-10 sm:px-7 2xl:px-64 xs:px-7 py-5 -right-2 px-5  borderSearch ${isBoxVisible ? 'visible' : 'invisible'} transition-all`}>
            <div className="w-full h-full">
              <div className="flex justify-between items-baseline w-full h-auto text-[#0AF8D8] borderSubSearch pb-2 pr-5 mb-3">
                <button
                  onClick={() => {
                    setIsBoxVisible(false);
                    router.push('/search')
                    // router.replace('/dashboard');
                  }}
                  className="py-1 px-2 text-[#0AF8D8] text-xs sm:text-md text-right cursor-pointer flex items-center"
                >
                  <ArrowBackIosIcon className="text-sm" />
                  <span>برو به صفحه ی جستجو</span>
                </button>
                <span className="text-xs sm:text-lg">جستجو</span>
              </div>

              <div className="w-full h-[51%] lg:h-[90%] overflow-y-scroll flex">
                <SearchInputItems filteredUsers={filteredUsers} searchItem={searchItem} setIsBoxVisible={setIsBoxVisible} setSearchItem={setSearchItem} setLastSearch={setLastSearch}/>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchInput;