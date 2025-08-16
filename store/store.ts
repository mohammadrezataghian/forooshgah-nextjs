import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import counterReducer from "@/store/slices/counterSlice";
import siteUrlAddressReducer from "@/store/slices/siteUrlAddress";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    siteUrlAddress : siteUrlAddressReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook to use typed dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
