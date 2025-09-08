import React from "react";
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import Cookies from "js-cookie";

const Dashboard = () => {

const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
// console.log(user);

// handle comma
const autocomma = (number_input) =>
  new Intl.NumberFormat("en-US").format(number_input);
//handle comma

  return (
    <>  
      <PageContainer>
        {user ? <Grid container>
          <div className="w-full h-auto grid lg:grid-cols-2 grid-cols-1 ring-1 rounded-md ring-blue-400 p-2 gap-5 mb-24 mt-3">
            <p className="font-semibold">
              نام و نام خانوادگی : <span className="font-light text-gray-600">{user?.FirstName} {user?.LastName}</span>
            </p>
            <p className="font-semibold">
            نام پدر : <span className="font-light text-gray-600">{user?.FatherName}</span>
            </p>
            <p className="font-semibold">
            تاریخ عضویت : <span className="font-light text-gray-600">{user?.Dateouzviyat}</span>
            </p>
            <p className="font-semibold">
              شماره عضویت : <span className="font-light text-gray-600">{user?.EshterakNo}</span>
            </p>
            <p className="font-semibold">
              وضعیت سهامدار : <span className="font-light text-gray-600">{user?.Fldvaziat_Sahamdar}</span>
            </p>
            <p className="font-semibold">
              وضعیت تاهل : <span className="font-light text-gray-600">{user?.Married ? "متاهل" : "مجرد"}</span>
            </p>
            <p className="font-semibold">
            محل صدور : <span className="font-light text-gray-600">{user?.MehaleSoddor}</span>
            </p>
            <p className="font-semibold">
            شماره موبایل : <span className="font-light text-gray-600">{user?.Mobile}</span>
            </p>
            <p className="font-semibold">
            عنوان شغل : <span className="font-light text-gray-600">{user?.NameJob}</span>
            </p>
            <p className="font-semibold">
            محل کار : <span className="font-light text-gray-600">{user?.NameWorkPlace}</span>
            </p>
            <p className="font-semibold">
            کد ملی : <span className="font-light text-gray-600">{user?.NationalCode}</span>
            </p>
            <p className="font-semibold">
            سقف خرید قسطی : <span className="font-light text-gray-600">{autocomma(user?.SaghfeKharidGhest)}</span> ریال
            </p>
            <p className="font-semibold">
            جنسیت : <span className="font-light text-gray-600">{user?.Sex ? "مذکر" : "مونث"}</span>
            </p>
            <p className="font-semibold">
            شماره شناسنامه : <span className="font-light text-gray-600">{user?.ShomareShenasname}</span>
            </p>
            <p className="font-semibold">
            تلفن ثابت : <span className="font-light text-gray-600">{user?.Tel}</span>
            </p>
          </div>
        </Grid> : <div className="flex justify-center mt-10 text-red-500">
            <span> ابتدا وارد شوید</span>
          </div>}
        
      </PageContainer>
    </>
  );
};

export default Dashboard;
