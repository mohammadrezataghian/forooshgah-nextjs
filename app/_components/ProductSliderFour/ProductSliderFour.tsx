import ProductsSliderCommon from '@/common/productSlider/ProductSliderCommon';

const ProductsSliderFour = () => {
  
const orderImage = 8
const threshold = 0.2
// params for slider
const params = {
  namekala: "",
  pageIndex: 4,
  pageSize: "10",
};
// end params for slider
const title = 'یک دسته از محصولات'

  return (
    <>
      <ProductsSliderCommon orderImage={orderImage} threshold={threshold} params={params} title={title}/>
    </>
  );
};

export default ProductsSliderFour;