import { PageContainer } from '@toolpad/core/PageContainer'
import React from 'react'
import Grid from '@mui/material/Grid';
import Cookies from "js-cookie";

const Profile = () => {

const user = Cookies.get("staffUser") ? JSON.parse(Cookies.get("staffUser") || '') : null;

  return (
    <>
    <PageContainer>
    {user ? <Grid container>
          <div className="w-full h-auto grid lg:grid-cols-2 grid-cols-1 ring-1 rounded-md ring-blue-400 p-2 gap-5 mb-24 mt-3">
            <p className="font-semibold">
              نام و نام خانوادگی : <span className="font-light text-gray-600">{user?.Name} {user?.Family}</span>
            </p>
            <p className="font-semibold">
            نام پدر : <span className="font-light text-gray-600">{user?.FatherName}</span>
            </p>
            <p className="font-semibold">
            تاریخ استخدام : <span className="font-light text-gray-600">{user?.EstekhdamDate}</span>
            </p>
            <p className="font-semibold">
              شماره کارمندی : <span className="font-light text-gray-600">{user?.Empno}</span>
            </p>
            <p className="font-semibold">
              وضعیت اشتغال : <span className="font-light text-gray-600">{user?.VaziatEshteghal}</span>
            </p>
            <p className="font-semibold">
              وضعیت تاهل : <span className="font-light text-gray-600">{user?.Marrid}</span>
            </p>
            <p className="font-semibold">
            محل صدور : <span className="font-light text-gray-600">{user?.MahaleSoudur}</span>
            </p>
            <p className="font-semibold">
            شماره موبایل : <span className="font-light text-gray-600">{user?.Mobile}</span>
            </p>
            <p className="font-semibold">
            عنوان شغل : <span className="font-light text-gray-600">{user?.Shoghl}</span>
            </p>
            <p className="font-semibold">
            کد ملی : <span className="font-light text-gray-600">{user?.NationalCode}</span>
            </p>
            <p className="font-semibold">
            جنسیت : <span className="font-light text-gray-600">{user?.sex}</span>
            </p>
            <p className="font-semibold">
            تلفن ثابت : <span className="font-light text-gray-600">{user?.Tel}</span>
            </p>
            <p className="font-semibold">
            تاریخ تولد : <span className="font-light text-gray-600">{user?.BirthDate}</span>
            </p>
            <p className="font-semibold">
            شماره بیمه : <span className="font-light text-gray-600">{user?.InsuranceNO}</span>
            </p>
            <p className="font-semibold">
            مانده مرخصی : <span className="font-light text-gray-600">{user?.MandeMorkhasi} روز</span>
            </p>
            <p className="font-semibold">
            مذهب : <span className="font-light text-gray-600">{user?.Mazhab}</span>
            </p>
            <p className="font-semibold">
            موظفی : <span className="font-light text-gray-600">{user?.Movazafi}</span>
            </p>
            <p className="font-semibold">
            مدرک تحصیلی : <span className="font-light text-gray-600">{user?.NameMadrak}</span>
            </p>
            <p className="font-semibold">
            رسته : <span className="font-light text-gray-600">{user?.NameRaste}</span>
            </p>
            <p className="font-semibold">
            رشته تحصیلی : <span className="font-light text-gray-600">{user?.NameReshte}</span>
            </p>
            <p className="font-semibold">
            نوع سهمیه : <span className="font-light text-gray-600">{user?.NameSahmie}</span>
            </p>
            <p className="font-semibold">
            وضعیت استخدامی : <span className="font-light text-gray-600">{user?.VaziatEstekhdam}</span>
            </p>
            <p className="font-semibold">
            آدرس : <span className="font-light text-gray-600">{user?.Address}</span>
            </p>
          </div>
        </Grid> : <div className="flex justify-center mt-10 text-red-500">
            <span> ابتدا وارد شوید</span>
          </div>}
    </PageContainer>
    </>
  )
}

export default Profile