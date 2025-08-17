
const useAddProduct = (
  setProducts: React.Dispatch<React.SetStateAction<any[]>>,
  setOpenSnackbar?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const addProduct = (data:any) => {
      setProducts((product:any) => {
        const existingIndex = product?.findIndex(
          (el:any) => el?.IdStoreStock === data?.IdStoreStock
        );
        
        let addedNew = true;
        if (product.length > 0) {
          const idForooshgah = product[0].idForooshGaha;
          if (idForooshgah !== data?.idForooshGaha) {
            addedNew = false;
            setOpenSnackbar?.(true);
          }
        }
  
        if (addedNew) {
          if (existingIndex > -1) {
            const currentCount = product[existingIndex].count;
  
            // Prevent adding more than 5
            if (currentCount >= 5) {
              return product;
            }
            // Create a copy of the array
            const updatedProducts = [...product];
            // Update the specific item
            updatedProducts[existingIndex] = {
              ...data,
              count: currentCount + 1,
            };
  
            return updatedProducts;
          }
          return [...product, { ...data, count: 1 }];
        } else {
          return [...product];
        }
      });
    };
  
    return { addProduct };
  };
  
  export default useAddProduct;