import ProductsSliderCommon from '@/common/productSlider/ProductSliderCommon';

const ProductsSlider = () => {
    
const orderImage = 4
const threshold = 0.4
// params for slider
const params = {
      namekala: "",
      pageIndex: 1,
      pageSize: "10",
      Order: 5
  };
// end params for slider
const title = 'پرفروش ترین محصولات'

  return (
    <>
        <ProductsSliderCommon orderImage={orderImage} threshold={threshold} params={params} title={title}/>
    </>
  )
}

export default ProductsSlider