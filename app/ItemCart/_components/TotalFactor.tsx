import { FactorAfterCalc, Product } from "@/types/types";
import TotalFactorLoading from "./TotalFactorLoading";

type TotalFactorProps={
  products:Product[];
  factoeAfrerCalc:FactorAfterCalc;
  loadingPrice:boolean;
}

const TotalFactor = ({products,factoeAfrerCalc,loadingPrice}:TotalFactorProps) => {

// handle comma
    const autocomma = (number_input:number) =>
    new Intl.NumberFormat("en-US").format(number_input);
//handle comma

  return (
    <>
    {loadingPrice ? <TotalFactorLoading/> : 
    <>
    {products && products.length > 0 && factoeAfrerCalc && (
        <div className="w-full flex justify-center h-auto mb-10 text-xl">
          <div className="px-5 xs:px-0 w-full xs:w-2/3 h-auto flex flex-col items-start gap-5">
            <div className="w-full flex justify-between bordercartcard">
              <span>قیمت کالاها</span>
              <span>{autocomma(factoeAfrerCalc.Mablaghekol)} ریال</span>
            </div>
            <div className="w-full flex justify-between bordercartcard">
              <span>مالیات</span>
              <span>{autocomma(factoeAfrerCalc.Maliat)} ریال</span>
            </div>
            <div className="w-full flex justify-between bordercartcard text-green-500">
              <span>جمع سبد خرید</span>
              <span>{autocomma(factoeAfrerCalc.GhabelePardakht)} ریال</span>
            </div>
          </div>
        </div>
      )}
    </>
    }
    </>
  )
}

export default TotalFactor