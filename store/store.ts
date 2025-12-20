import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import counterReducer from "@/store/slices/counterSlice";
import inputValueReducer from "@/store/slices/inputValueSlice";
import lastSearchValueReducer from '@/store/slices/lastSearchSlice';
import searchBoxVisibleReducer from '@/store/slices/isSearchBoxVisibleSlice'
import mainConfigReducer from '@/store/slices/mainConfigSlice'
import bannersReducer from '@/store/slices/bannersSlice'
import addressReducer from '@/store/slices/addressSlice'
import clubScoreReducer from '@/store/slices/customerClubScoreSlice'
import drawerSessionReducer from '@/store/slices/drawerProductSlice'
import productListBrandsReducer from '@/store/slices/forBrandsSlice'
import isStaffLoggedInReducer from '@/store/slices/isStaffLoggedInSlice'
import isSupplierLoggedInReducer from '@/store/slices/isSupplierLoggedInSlice'
import payfullOrPartReducer from '@/store/slices/paymentSlice'
import selectedStoreReducer from '@/store/slices/selectedStoreSlice'
import siteUrlAddressReducer from '@/store/slices/siteUrlSlice'
import isUserloggedInReducer from '@/store/slices/isLoggedInSlice'
import productListUpdateReducer from '@/store/slices/productListSlice'
import menuDataReducer from '@/store/slices/menuSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    inputValue: inputValueReducer,
    lastSearchValue:lastSearchValueReducer,
    searchBoxVisible:searchBoxVisibleReducer,
    mainConfig:mainConfigReducer,
    banners:bannersReducer,
    address:addressReducer,
    clubScore:clubScoreReducer,
    drawerSession:drawerSessionReducer,
    productListBrands:productListBrandsReducer,
    isStaffLoggedIn:isStaffLoggedInReducer,
    isSupplierLoggedIn:isSupplierLoggedInReducer,
    payfullOrPart:payfullOrPartReducer,
    selectedStore:selectedStoreReducer,
    siteUrlAddress:siteUrlAddressReducer,
    isUserloggedIn:isUserloggedInReducer,
    productListUpdate:productListUpdateReducer,
    menuData:menuDataReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook to use typed dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
