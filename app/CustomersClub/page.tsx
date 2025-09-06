import InformationsComponent from "@/common/InformationComponent/InformationComponent";
import { Divider } from "@mui/material";

const CustomersClub = () => {

const paramKey = "customerClubOffers"

  return (
    <>
    <div className='w-full p-5 text-lg font-bold h-auto flex justify-center items-center bg-white'>
          <h5>
           باشگاه مشتریان
          </h5>
        </div>
        <Divider/>
      <InformationsComponent paramKey={paramKey}/>
    </>
  );
};

export default CustomersClub;