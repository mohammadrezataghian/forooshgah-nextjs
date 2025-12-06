'use client'

import React, { useEffect, useDeferredValue } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SearchedItems from "./_components/SearchedItems";
import FilterSearch from "./_components/FilterSearch";
import  useFetchProducts  from "@/app/api/search/hook";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setInputValue } from "@/store/slices/inputValueSlice";
import { FiSearch } from "react-icons/fi";

type payload = {
  NameKala: string,
  pageIndex: number,
  pageSize: number,
  idForooshgah?:number;
  SortOrder?:number;
}

const Search = () => {

  const dispatch = useDispatch();
  const searchItem = useSelector((state: RootState) => state.inputValue.value);
  const state = useSelector((state:RootState)=>state.selectedStore.value)
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted,setMounted] = useState(false)
  //handle search
  const [apiUsers, setApiUsers] = useState<any>({});
  const [filteredUsers, setFilteredUsers] = useState<any>({});
  const[sort,setSort] = useState(0)
  const [resCode, setResCode] = useState<number>(0);
  const [tempSearch, setTempSearch] = useState("");

  // manage the url on first mount
  useEffect(() => {
    const queryFromUrl = searchParams.get("q");
    const sortFromUrl = searchParams.get("sort");
    if (queryFromUrl) {
      dispatch(setInputValue(queryFromUrl)); // ⬅️ Set Redux input from URL
      setTempSearch(queryFromUrl)
      setSort(Number(sortFromUrl))
    }
    if (searchItem) {
      router.push(`?q=${encodeURIComponent(searchItem)}&sort=0`, { scroll: false });
      // setTempSearch(searchItem)
    }
  }, []);

  useEffect(()=>{
    setMounted(true)
  },[])

  // manage the url on first mount
  // useEffect(() => {
  //   const urlQuery = searchParams.get("q");
  //   if (urlQuery && urlQuery !== searchItem) {
  //     dispatch(setInputValue(urlQuery));
  //   }
  // }, []);

  // ✅ `searchItem` updates instantly (no delay in input UI)
  const handleInputChange = (e: any) => {
    setTempSearch(e.target.value);
  };
  const handleSearchClick = () => {
    setSort(0)
    dispatch(setInputValue(tempSearch)); // Update Redux search value
    router.push(`?q=${encodeURIComponent(tempSearch)}&sort=0`, { scroll: false }); // Update URL
  };

  // ✅ `useDeferredValue` delays heavy updates (filtering + API calls)
  const deferredSearchTerm = useDeferredValue(searchItem);

  // ✅ Debounced API request (prevents too many calls)

const { loading:loadingApiUsers, error, fetchProducts } = useFetchProducts();
const queryFromUrl = searchParams.get("q")
const sortFromUrl = Number(searchParams.get("sort"))

  useEffect(() => {
    if (searchItem.trim().length < 2) {
      setApiUsers({});
      return;
    }
    const debounceTimeout = setTimeout(async () => {
      const payload:payload = {
        NameKala: queryFromUrl || searchItem,
        pageIndex: 1,
        pageSize: 100,
        idForooshgah : state,
      };
      // if (state !== 0) {
      //   payload.idForooshgah = state;
      // }
        payload.SortOrder = sortFromUrl;
    
      try {
        const result = await fetchProducts(payload);
        setApiUsers(result?.data?.Data || {});
        setResCode(result?.data?.resCode)
         // ✅ use the actual response directly
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    }, 1000);// Debounce API calls (500ms delay)

    return () => clearTimeout(debounceTimeout); // Cleanup function
  }, [queryFromUrl,searchItem,sort,state,sortFromUrl]);

  useEffect(()=>{
    setTempSearch(queryFromUrl || '')
  },[queryFromUrl])

  // ✅ Filtering logic with `deferredSearchTerm`
  useEffect(() => {
    if (deferredSearchTerm) {
      const filteredItems = apiUsers;
      setFilteredUsers(filteredItems);
    } else {
      setFilteredUsers([]);
    }
    
    // if (deferredSearchTerm && deferredSearchTerm.length < 2) {
    //   localStorage.removeItem("foundproducts");
    // }
  }, [deferredSearchTerm, apiUsers]);

  // ✅ Filtering logic with `deferredSearchTerm`

  // handle search

// by sort change push the new url
useEffect(() => {
    if (searchItem.length > 2) {
      router.push(`?q=${encodeURIComponent(searchItem)}&sort=${sort}`, { scroll: false });
    }
}, [sort]);

// handle search by pressing enter
const handleKeyDown = (e: any) => {
  if (e.key === "Enter") {
    handleSearchClick();
  }
};

  return (
    <>
      <title>جستجوی محصولات</title>
      <meta name="description" content="جستجوی محصولات" />  
      <div className="w-full h-auto md:flex-row justify-between items-center flex flex-col gap-3 py-5">
        <div className="relative flex items-center gap-1 px-3">
        <input
          type="text"
          value={tempSearch}
          onChange={handleInputChange}
          placeholder="محصول، گروه کالا یا برند مورد نظرتان را اینجا جستجو کنید"
          className="w-[350px] h-8 border pr-1 border-red-500 rounded-sm placeholder:text-[12.5px] text-sm"
          onKeyDown={handleKeyDown}
        />
         <button
        onClick={handleSearchClick}
        className="absolute left-4 px-1.5 py-0.5 bg-gray-200 text-gray-400 rounded hover:bg-gray-300 hover:text-gray-100 cursor-pointer"
      >
        <FiSearch size={20} />
      </button>
        </div>
        <div>
          <FilterSearch sort={sort} setSort={setSort} sortFromUrl={sortFromUrl}/>
        </div>
      </div>
      <SearchedItems filteredUsers={apiUsers} searchItem={searchItem} loadingApiUsers={loadingApiUsers} resCode={resCode}/>
    </>
  );
};

export default Search;