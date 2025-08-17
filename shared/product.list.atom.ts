import { atom } from 'jotai';

const getInitialState = () => {
    const storedData = localStorage.getItem('products');
    return storedData ? JSON.parse(storedData) : [];
  };
export const productListUpdate = atom(getInitialState());