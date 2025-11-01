'use client'

import React, { useEffect, useDeferredValue } from "react";
import { useState } from "react";
import SearchedItems from "./_components/SearchedItems";
import useSearchLocalProducts from "@/hooks/useSearchLocalProducts";
import { productInSearchUpdate } from "@/shared/search.product.list.atom";
import { useAtom } from "jotai";
import { selectedStore } from "@/shared/selectedStoreAtom";
import FilterSearch from "./_components/FilterSearch";
import { inputValue } from '@/shared/inputs';
import  useFetchProducts  from "@/app/api/search/hook";

type payload = {
  NameKala: string,
  pageIndex: number,
  pageSize: number,
  idForooshgah?:number;
  SortOrder?:number;
}

const Search = () => {

  const [mounted,setMounted] = useState(false)
  const [foundProducts,setFoundProducts] = useState<any>(null)
  //handle search
  const [apiUsers, setApiUsers] = useState<any>({});
  const [searchItem, setSearchItem] = useAtom(inputValue);
  const [filteredUsers, setFilteredUsers] = useState<any>({});
  const SearchLocalProduct = useSearchLocalProducts();
  const [products, setProducts] = useAtom(productInSearchUpdate);
  const [state] = useAtom(selectedStore);
  const[sort,setSort] = useState(0)

  useEffect(()=>{
    setMounted(true)
  },[])

  // ✅ `searchItem` updates instantly (no delay in input UI)
  const handleInputChange = (e:any) => {
    setSearchItem(e.target.value);
  };

  // ✅ `useDeferredValue` delays heavy updates (filtering + API calls)
  const deferredSearchTerm = useDeferredValue(searchItem);

  // ✅ Debounced API request (prevents too many calls)

const { loading:loadingApiUsers, error, fetchProducts } = useFetchProducts();

  useEffect(() => {
    // setProducts(productInSearchUpdate);
    // if (localStorage.getItem("foundproducts") && sort === 0) {
    //   return; // If condition is met, skip the API call
    // }
    if (deferredSearchTerm.trim().length < 2) {
      setApiUsers({});
      return;
    }
    const debounceTimeout = setTimeout(async () => {
      const payload:payload = {
        NameKala: deferredSearchTerm,
        pageIndex: 1,
        pageSize: 100,
        idForooshgah : state,
      };
      // if (state !== 0) {
      //   payload.idForooshgah = state;
      // }
      if (sort > 0) {
        payload.SortOrder = sort;
      }
    
      try {
        const result = await fetchProducts(payload);
        setApiUsers(result?.data?.Data || {});
         // ✅ use the actual response directly
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    }, 1000);// Debounce API calls (500ms delay)

    return () => clearTimeout(debounceTimeout); // Cleanup function
  }, [deferredSearchTerm,sort,state]);

  // ✅ Filtering logic with `deferredSearchTerm`
  useEffect(() => {
    if (deferredSearchTerm) {
      const filteredItems = apiUsers;
      setFilteredUsers(filteredItems);
    } else if (SearchLocalProduct) {
      // setApiUsers(SearchLocalProduct);
      setFilteredUsers([]);
    } else {
      setFilteredUsers([]);
    }
    
    // if (deferredSearchTerm && deferredSearchTerm.length < 2) {
    //   localStorage.removeItem("foundproducts");
    // }
  }, [deferredSearchTerm, apiUsers]);

  // ✅ Filtering logic with `deferredSearchTerm`

  // handle search

  // function addProduc2(data:any) {
  //   setApiUsers(data.data.Data.lst || []);
  //   localStorage.removeItem("foundproducts"); // Clear previous search results
  //   localStorage.setItem("foundproducts", JSON.stringify(data.data.Data.lst || []));
  //   for (let i = 0; i < SearchLocalProduct.length; i++) {
  //     removeProduct(SearchLocalProduct[i]);
  //   }
  //   data.data.Data.lst.map((datas:any, index:any) => addProduct(datas));
  // }
  //

  //
  function addProduct(data:any) {
    setProducts((product:any) => {
      const existingIndex = product?.findIndex(
        (el:any) => el?.IdStoreStock === data?.IdStoreStock
      );

      let addeddNew = true;
      if (product.length > 0) {
        const idforooshgah = product[0].idForooshGaha;
        if (product[0].idForooshGaha != data?.idForooshGaha) {
          addeddNew = false;
        }
      }
      if (addeddNew == true) {
        if (existingIndex > -1) {
          const currentCount = product[existingIndex].count;

          // Prevent adding more than 5
          if (currentCount >= 5) {
            return product;
          }
          // Create a copy of the array
          const updatedProducts = [...product];
          // Update the specific item
          updatedProducts[existingIndex] = {
            ...data,
            count: currentCount + 1,
          };

          return updatedProducts;
        }
        return [...product, { ...data, count: 1 }];
      } else {
        return [...product];
      }
    });
  }
  //

  //
  function removeProduct(data:any) {
    setProducts((product:any) => {
      const existingIndex = product?.findIndex(
        (el:any) => el?.IdStoreStock === data?.IdStoreStock
      );

      if (existingIndex > -1) {
        // If count will become 0, remove the item
        if (product[existingIndex].count === 1) {
          return product.filter(
            (item:any) => item.IdStoreStock !== data.IdStoreStock
          );
        }

        // Otherwise decrease the count
        const updatedProducts = [...product];
        updatedProducts[existingIndex] = {
          ...data,
          count: product[existingIndex].count - 1,
        };

        return updatedProducts;
      }

      return product; // Return unchanged if item not found
    });
  }
  //
// useEffect(()=>{
//   const stored = localStorage.getItem("foundproducts")
//   if (stored){
//     setFoundProducts(JSON.parse(stored))
//   }
// },[mounted])

  return (
    <>
      <title>جستجوی محصولات</title>
      <meta name="description" content="جستجوی محصولات" />  
      <div className="w-full h-auto md:flex-row justify-between items-center flex flex-col border-b border-gray-500 gap-3 py-5">
        <div className="flex items-center gap-1 px-3">
        <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder="محصول، گروه کالا یا برند مورد نظرتان را اینجا جستجو کنید"
          className="w-[370px] h-8 border pr-2 border-red-500 rounded-sm placeholder:text-sm"
        />
        </div>
        <div>
          <FilterSearch sort={sort} setSort={setSort}/>
        </div>
      </div>
      <SearchedItems filteredUsers={apiUsers} searchItem={searchItem} loadingApiUsers={loadingApiUsers}/>
    </>
  );
};

export default Search;
