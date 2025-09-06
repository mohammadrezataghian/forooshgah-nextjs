import { Divider } from '@mui/material';
import InformationsComponent from '@/common/InformationComponent/InformationComponent'

const HowToShop = () => {

const paramKey = 'WebAppHowToShop'

  return (
    <>
      <div className="w-full p-5 text-lg font-bold h-auto flex justify-center items-center bg-white">
        <h5>چطور سفارش خود را ثبت کنم؟</h5>
      </div>
      <Divider />
      <InformationsComponent paramKey={paramKey}/>
    </>
  );
};

export default HowToShop;