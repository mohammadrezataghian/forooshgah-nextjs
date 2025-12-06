import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setProductListUpdate } from "@/store/slices/productListSlice";

const useAddProduct = (
  setOpenSnackbar?: React.Dispatch<React.SetStateAction<boolean>>
) => {

  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.productListUpdate.value);

    const addProduct = (data:any) => {
      const updated = (() => {
        const existingIndex = products.findIndex(
          (el:any) => el?.IdStoreStock === data?.IdStoreStock
        );
        
        let addedNew = true;
        if (products?.length > 0) {
          const idForooshgah = products[0].idForooshGaha;
          if (idForooshgah !== data?.idForooshGaha) {
            addedNew = false;
            setOpenSnackbar?.(true);
          }
        }
  
        if (addedNew) {
          if (existingIndex > -1) {
            const currentCount = products[existingIndex].count;
            if (currentCount !== undefined) {

            // Prevent adding more than 5
            if (currentCount >= 5) {
              return products;
            }
            // Create a copy of the array
            const updatedProducts = [...products];
            // Update the specific item
            updatedProducts[existingIndex] = {
              ...data,
              count: currentCount + 1,
            };
  
            return updatedProducts;
          }}
          return [...products, { ...data, count: 1 }];
        } else {
          return [...products];
        }
      });
      dispatch(setProductListUpdate(updated()));
    };
  
    return { addProduct };
  };
  
  export default useAddProduct;