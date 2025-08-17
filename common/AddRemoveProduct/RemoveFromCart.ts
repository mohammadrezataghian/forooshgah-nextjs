
const useRemoveProduct = (setProducts:any) => {
    const removeProduct = (data:any) => {
      setProducts((product:any) => {
        const existingIndex = product?.findIndex(
          (el:any) => el?.IdStoreStock === data?.IdStoreStock
        );
  
        if (existingIndex > -1) {
          if (product[existingIndex].count === 1) {
            return product.filter(
              (item:any) => item.IdStoreStock !== data.IdStoreStock
            );
          }
  
          const updatedProducts = [...product];
          updatedProducts[existingIndex] = {
            ...data,
            count: product[existingIndex].count - 1,
          };
  
          return updatedProducts;
        }
  
        return product;
      });
    };
  
    return { removeProduct };
  };
  
  export default useRemoveProduct;
  