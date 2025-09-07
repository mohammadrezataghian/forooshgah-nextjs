import * as React from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import ImgMediaCard from "./_components/ImgMediaCard";
import RecipeReviewCard from "./_components/RecipeReviewCard";
import Filters from "./_components/Filters";
import OtherControls from "./_components/OtherControls";
// filters
import PaginationRounded from "./_components/Pagination";
import LoadingSkeleton from "./loading";
import { useAtom } from "jotai";
import { siteUrlAddress } from "@/shared/site.url.atom";
import { selectedStore } from '@/shared/selectedStoreAtom';
import { useFetchProducts } from "@/api/productList/productList";
import { useSearchParams } from "react-router";
import { FcRemoveImage } from "react-icons/fc";
import { ProductType } from "@/types/types";
import { useParams } from "next/navigation";

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
document.documentElement.setAttribute("dir", "rtl");

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
}

export default function ProductList() {

  const [siteAddress] = useAtom(siteUrlAddress);
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState<ProductType>([]);
  const [checkedBrands, setCheckedBrands] = React.useState<number[]>([]);
  const [priceFilter, setPriceFilter] = React.useState([0, 500000000]);
  const [onlyAvailable, setOnlyAvailable] = React.useState(false);
  const [sort, setSort] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState("")
  
  const [state] = useAtom(selectedStore);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const categoryFromPath = params?.id as string;
  const decodedCategory = decodeURIComponent(categoryFromPath || "");
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = React.useState(initialPage);
  const [filterVersion, setFilterVersion] = React.useState(0);
  const [totalCount,setTotalCount] = React.useState(0);

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
    setSearchParams((prev:any) => {
      prev.set("page", page.toString());
      return prev;
    }, { replace: false });
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
  setSearchParams((prev:any) => {
    const updated = new URLSearchParams(prev);
    updated.set("page", "1");
    return updated;
  });
}, [JSON.stringify(checkedBrands), JSON.stringify(priceFilter), onlyAvailable, sort,state]);

  React.useEffect(() => {

    if ( selectedCategory !== decodedCategory) return;

    const payload:payloadType = {
      namekala: "",
      pageIndex: 1,
      pageSize: 20,
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
    if (selectedCategory !== "") {
      payload.Category = selectedCategory;
      console.log("selectedCategory");
    }
    if (page > 1) {
      payload.pageIndex = page;
      console.log("page");
    }
    if (sort > 0) {
      payload.Order = sort;
      console.log("sort");
    }
    if(state !== 0){
      payload.idForooshgah = state
      console.log("state");
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
                      <RecipeReviewCard />
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
                      <Stack direction="row" spacing={2}>
                        <FormControlLabel
                          control={<Switch />}
                          checked={onlyAvailable}
                          onChange={(_event, checked) => setOnlyAvailable(checked)}
                          label="فقط نمایش کالا‌های موجود:"
                          sx={{ direction: "rtl" }}
                        />
                      </Stack>
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