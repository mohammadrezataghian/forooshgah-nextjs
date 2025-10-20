import { atom } from "jotai";

const getInitialState = () => {
  if (typeof window === "undefined") return []; // prevent SSR errors
  const storedData = localStorage.getItem("productsInSearch");
  return storedData ? JSON.parse(storedData) : [];
};

export const productInSearchUpdate = atom(getInitialState());
