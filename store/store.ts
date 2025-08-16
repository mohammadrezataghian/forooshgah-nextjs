import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import counterReducer from "@/store/slices/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook to use typed dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
