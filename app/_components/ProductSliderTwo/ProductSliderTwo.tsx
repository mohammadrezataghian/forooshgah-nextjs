import ProductsSliderCommon from '@/common/productSlider/ProductSliderCommon';

const ProductsSliderTwo = () => {
  
const orderImage = 5
const threshold = 0.2
// params for slider
const params = {
  namekala: "",
  pageIndex: 2,
  pageSize: "10",
  Order: 7
};
// end params for slider
const title = 'محبوب ترین محصولات'

  return (
    <>
      <ProductsSliderCommon orderImage={orderImage} threshold={threshold} params={params} title={title}/>
    </>
  );
};

export default ProductsSliderTwo;