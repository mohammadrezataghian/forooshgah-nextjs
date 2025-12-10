'use client'

import * as React from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  FormControlLabel,
  Switch,
} from "@mui/material";
import dynamic from "next/dynamic";
const RecipeReviewCard = dynamic(() => import("@/app/productList/_components/RecipeReviewCard"), {ssr: false,});
const Filters = dynamic(() => import("@/app/productList/_components/Filters"), {ssr: false,});
const OtherControls = dynamic(() => import("@/app/productList/_components/OtherControls"), {ssr: false,});
const OnlyAvailables = dynamic(() => import("@/app/productList/_components/OnlyAvailables"), {ssr: false,});
const PaginationRounded = dynamic(() => import("@/app/productList/_components/Pagination"), {ssr: false,});
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import ImgMediaCard from "../_components/ImgMediaCard";
// filters
import LoadingSkeleton from "./loading";
import useFetchProducts  from "@/app/api/productList/hook";
import { FcRemoveImage } from "react-icons/fc";
import { ProductType } from "@/types/types";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

type payloadType ={
    namekala: string;
    pageIndex: number;
    pageSize: number;
    Brand?:string;
    MinPrice?:number;
    MaxPrice?:number;
    OnlyAvailable?:number;
    Category?:string;
    Order?:number;
    idForooshgah?:number
    SortOrder?:number 
}

export default function ProductList() {

  const state = useSelector((state:RootState)=>state.selectedStore.value)
  const siteAddress = useSelector((state:RootState)=>state.siteUrlAddress.value)

  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState<ProductType>([]);
  const [checkedBrands, setCheckedBrands] = React.useState<number[]>([]);
  const [priceFilter, setPriceFilter] = React.useState([0, 500000000]);
  const [onlyAvailable, setOnlyAvailable] = React.useState(false);
  const [sort, setSort] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState("")
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const categoryFromPath = params?.slug as string;
  const decodedCategory = decodeURIComponent(categoryFromPath || "");
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = React.useState(initialPage);
  const [filterVersion, setFilterVersion] = React.useState(0);
  const [totalCount,setTotalCount] = React.useState(0);

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("dir", "rtl");
    }
  }, []);

  // api request
const {error , fetchProducts,checkNamojod} = useFetchProducts(setProducts,setLoading,setTotalCount)
// end api request

React.useEffect(() => {
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  if (
    selectedCategory !== decodedCategory ||
    page !== currentPage
  ) {
    if (selectedCategory !== decodedCategory) {
      setSelectedCategory(decodedCategory);
    }

    if (page !== currentPage) {
      setPage(currentPage);
    }
  }
}, [decodedCategory, searchParams]);

React.useEffect(() => {
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  if (page !== currentPage) {
    const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`);
  }
}, [page]);


const isFirstRender = React.useRef(true);

React.useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return; // Skip on first mount
  }

  // ✅ Only runs on actual filter changes
  setPage(1);
  setFilterVersion((v) => v + 1);
  const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
}, [JSON.stringify(checkedBrands), JSON.stringify(priceFilter), onlyAvailable, sort,state]);

  React.useEffect(() => {

    if ( selectedCategory !== decodedCategory) return;

    const payload:payloadType = {
      namekala: "",
      pageIndex: 1,
      pageSize: 20,
      idForooshgah : state,
    };

    if (checkedBrands && checkedBrands.length > 0) {
      let stringifiedcheckedBrands = checkedBrands.join(",")
      payload.Brand = stringifiedcheckedBrands;
      console.log("checkedBrands");
    }

    if (priceFilter[0] !== 0 || priceFilter[1] !== 500000000) {
      payload.MinPrice = priceFilter[0];
      payload.MaxPrice = priceFilter[1];
      console.log("priceFilter");
    }

    if (onlyAvailable) {
      payload.OnlyAvailable = 1; // true
      console.log("onlyAvailable");
    }
    if (selectedCategory !== "" && selectedCategory !== 'AllCategories') {
      payload.Category = selectedCategory;
      console.log("selectedCategory");
    }
    if (page > 1) {
      payload.pageIndex = page;
      console.log("page");
    }
    if (sort > 0) {
      payload.SortOrder = sort;
      console.log("sort");
    }
    // if(state !== 0){
    //   payload.idForooshgah = state
    //   console.log("state");
    // }
    if(sessionStorage.getItem('ProductListOrderParam')){
      payload.Order = Number(sessionStorage.getItem('ProductListOrderParam'))
      console.log(Number(sessionStorage.getItem('ProductListOrderParam')));
    }

    fetchProducts(payload);
  }, [
    selectedCategory,
    page,
    filterVersion
  ]);
  // end get filtered data from api

  React.useEffect(() => {
    setLoading(products.length === 0);
  }, [products]);

  return (
    <>
    <title>محصولات</title>
    <meta name="description" content="لیست محصولات" />
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%" }} className='mb-24'>
          <Stack spacing={2} sx={{ pt: 2 }}>
            {/* <BasicBreadcrumbs />                  site breadcrumb */}
            <Box component="section" className="container-fluid" sx={{overflow:'unset'}}>
              <Container maxWidth="xl">
                <Stack direction="row" spacing={2} useFlexGap>
                  <Box
                    sx={{
                      width: "25%",
                      minWidth: "16rem",
                      maxWidth: "24rem",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    <Stack spacing={2} 
                    sx={{position:'sticky',
                    top:120,
                    backgroundColor: '#F4F4F4',
                    }}>
                      <RecipeReviewCard/>
                      {/* filters */}
                      <Filters 
                        checked={checkedBrands} 
                        setChecked={setCheckedBrands} 
                        priceFilter={priceFilter} 
                        setPriceFilter={setPriceFilter} 
                      />
                      {/*end filters */}
                    </Stack>
                  </Box>
                  <Grid size="grow">
                    <Stack spacing={2}>
                      {/* <Selections />                        users filters*/}
                      <OtherControls 
                        sort={sort}
                        setSort={setSort}
                        priceFilter={priceFilter}
                        setPriceFilter={setPriceFilter}
                        checked={checkedBrands}
                        setChecked={setCheckedBrands}
                        />
                      <OnlyAvailables onlyAvailable={onlyAvailable} setOnlyAvailable={setOnlyAvailable}/>
                      <Grid
                        container
                        spacing={2}
                        sx={{ justifyContent: "center" }}
                      >
                        {checkNamojod && checkNamojod === -3 && <div className="p-5 text-red-500 flex flex-col text-xl"> <p className="flex justify-center"><span>کالایی موجود نمی باشد</span></p>
                        <p className="flex justify-center text-[200px]"><FcRemoveImage /></p>
                         </div>}
                        {checkNamojod !== -3 && loading ? (
                          <LoadingSkeleton />
                        ) : (
                          products.map((product) => {
                            return (
                              <Grid
                                key={product.IdStoreStock}
                                size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
                              >
                                {ImgMediaCard({ product, siteAddress })}
                              </Grid>
                            );
                          })
                        )}
                      </Grid>
                    </Stack>
                  </Grid>
                </Stack>
              </Container>
            </Box>
          </Stack>
          {products && checkNamojod !== -3 && totalCount > 20 && (
            <div
              className="w-full h-12 bg-[#ECECEC] mt-5 flex justify-center items-center"
              dir="ltr"
            >
              <PaginationRounded page={page} setPage={setPage} products={products} totalCount={totalCount}/>
            </div>
          )}
        </Box>
      </ThemeProvider>
    </CacheProvider>
    </>
  );
}