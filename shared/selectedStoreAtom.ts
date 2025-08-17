import { atom } from 'jotai';

export const selectedStore = atom(0);




// using this in other components  

// import { useAtom } from 'jotai';
// import { selectedStore } from '@/shared/selectedStoreAtom';
// const [state] = useAtom(selectedStore);
//   console.log(state);

// using this in other components 