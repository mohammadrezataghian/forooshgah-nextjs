import { atom } from "jotai";

const getInitialState = () => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("products");
    return storedData ? JSON.parse(storedData) : [];
  }
  return []; // default value on the server
};

export const productListUpdate = atom(getInitialState());
