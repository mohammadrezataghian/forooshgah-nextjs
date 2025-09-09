import { atom } from "jotai";

const getInitialState = () => {
  const storedData = localStorage.getItem("productsInSearch");
  return storedData ? JSON.parse(storedData) : [];
};
export const productInSearchUpdate = atom(getInitialState());
