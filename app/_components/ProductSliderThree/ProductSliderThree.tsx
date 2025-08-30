import ProductsSliderCommon from '@/common/productSlider/ProductSliderCommon';

const ProductsSliderThree = () => {

const orderImage = 6
const threshold = 0.2
// params for slider
const params = {
  namekala: "",
  pageIndex: 3,
  pageSize: "10",
  Order: 6
};
// end params for slider
const title = 'پرتخفیف ترین محصولات'

  return (
    <>
      <ProductsSliderCommon orderImage={orderImage} threshold={threshold} params={params} title={title}/>
    </>
  );
};

export default ProductsSliderThree;