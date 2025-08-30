import BigImageBoxes from "./_components/BigImageBoxes/BigImageBoxes";
import BigImageBoxesTwo from "./_components/BigImageBoxesTwo/BigImageBoxesTwo";
import CategoriesSlider from "./_components/CategoriesSlider/CategoriesSlider";
import Head from "./_components/Head/Head";
import MainSlider from "./_components/MainSlider/MainSlider";
import Menu from "./_components/Menu/Menu";
import MobileMenu from "./_components/Menu/MobileMenu";
import ProductsSlider from "./_components/ProductSlider/ProductSlider";
import ProductsSliderFour from "./_components/ProductSliderFour/ProductSliderFour";
import ProductsSliderThree from "./_components/ProductSliderThree/ProductSliderThree";
import ProductsSliderTwo from "./_components/ProductSliderTwo/ProductSliderTwo";
import SmallimageBoxes from "./_components/SmallImageBoxes/SmallImageBoxes";

export default function Home() {
  return (
    <>
    <div className="w-full sticky top-0 z-[10000] rastchin">
      <Head/>
      <Menu/>
    </div>
    <MobileMenu/>
    <main className="w-full">
      <MainSlider />
      <SmallimageBoxes />
      <ProductsSlider />
      <BigImageBoxes />
      <ProductsSliderTwo />
      <BigImageBoxesTwo />
      <ProductsSliderThree />
      <CategoriesSlider  />
      <ProductsSliderFour  />

      
    </main>
    </>
  );
}
