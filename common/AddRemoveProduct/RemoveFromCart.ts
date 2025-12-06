import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setProductListUpdate } from "@/store/slices/productListSlice";

const useRemoveProduct = () => {

  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.productListUpdate.value);

    const removeProduct = (data:any) => {
      
      const updated = (() => {
        const existingIndex = products.findIndex(
          (el:any) => el.IdStoreStock === data.IdStoreStock
        );
  
        if (existingIndex > -1) {
          const item = products[existingIndex];
          if (item.count !== undefined) {
            
          if (item.count === 1) {
            return products.filter(
              (item:any) => item.IdStoreStock !== data.IdStoreStock
            );
          }
  
          const updatedProducts = [...products];
          updatedProducts[existingIndex] = {
            ...data,
            count: item.count - 1,
          };
  
          return updatedProducts;
        }}
  
        return products;
      });
      dispatch(setProductListUpdate(updated()));
    };
  
    return { removeProduct };
  };
  
  export default useRemoveProduct;
  