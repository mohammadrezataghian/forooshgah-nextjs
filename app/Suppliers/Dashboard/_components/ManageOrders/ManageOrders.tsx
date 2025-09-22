'use client'

import React, { useMemo, useState } from "react";
import { PageContainer } from "@toolpad/core/PageContainer";
import DatePickerFrom from "./DatePicker";
import RowRadioButtonsGroup from "./RadioButtons";
import Cookies from "js-cookie";
import { Button, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useSubmitSearch from "@/app/api/listForooshTaminKonande/hook";
import DataTable from "./DataTable";
import AutoHideDialog from "@/common/AutoHideDialog/AutoHideDialog";
import { DateObject } from "react-multi-date-picker";

const ManageOrders = () => {
  
  const verifyStatus = [
    { id: 0, stat: "تایید نشده", default: false },
    { id: 1, stat: "تایید شده", default: false },
    { id: 2, stat: "همه", default: true },
  ];

  const shippingStatus = [
    { id: 0, stat: "ارسال نشده", default: false },
    { id: 1, stat: "ارسال شده", default: false },
    { id: 2, stat: "همه", default: true },
  ];

  const deliveryStatus = [
    { id: 0, stat: "تحویل نشده", default: false },
    { id: 1, stat: "تحویل شده", default: false },
    { id: 2, stat: "همه", default: true },
  ];

  const typeFactorStatus = [
    { id: 0, stat: "فروش", default: true },
    { id: 1, stat: "برگشت از فروش", default: false },
  ];

  const user = useMemo(() => {
    const cookie = Cookies.get("supplierUser");
    return cookie ? JSON.parse(cookie) : null;
  }, []); // user
  const userToken = localStorage.getItem("supplierUserToken"); // token
  const [selectedDateFrom, setSelectedDateFrom] = useState<DateObject | null>(null); // from
  const [selectedDateTo, setSelectedDateTo] = useState<DateObject | null>(null); // to
  const [selectedStat, setSelectedStat] = React.useState(
    verifyStatus.find((item) => item.default)?.id.toString() ?? ""
  ); // stat
  const [selectedShipping, setSelectedShipping] = React.useState(
    shippingStatus.find((item) => item.default)?.id.toString() ?? ""
  ); // shipping
  const [selectedDelivery, setSelectedDelivery] = React.useState(
    deliveryStatus.find((item) => item.default)?.id.toString() ?? ""
  ); // delivery
  const [selectedTypeFactor, setSelectedTypeFactor] = React.useState(
    typeFactorStatus.find((item) => item.default)?.id.toString() ?? ""
  ); // delivery
  const [subscriptionNumber, setSubscriptionNumber] = useState(""); // subscription number
  const [buyerName, setBuyerName] = useState(""); // buyerName number
  const [buyerLastName, setBuyerLastName] = useState(""); // buyerName number
  const [open, setOpen] = React.useState(false); // wrong date dialog
  const fromPlaceholder = "از تاریخ";
  const toPlaceholder = "تا تاریخ";

  const { loading, error, response, submitSearch } = useSubmitSearch(userToken);

  const convertToDate = (dateObj:any) => {
    // handle missplaced dates
    if (!dateObj) return null;
    return new Date(dateObj.year, dateObj.month.number - 1, dateObj.day);
  };

  const handleSearch = () => {
    const fromDate = convertToDate(selectedDateFrom);
    const toDate = convertToDate(selectedDateTo);

    // Validation
    if (fromDate && toDate && toDate < fromDate) {
      setOpen(true);
      return; // Stop search
    }

    const searchObject = {
      idTaminKonande: user?.Id || "",
      azTarikh:
        `${selectedDateFrom?.year}/${selectedDateFrom?.month?.number}/${selectedDateFrom?.day}` ||
        "",
      taTarikh:
        `${selectedDateTo?.year}/${selectedDateTo?.month?.number}/${selectedDateTo?.day}` ||
        "",
      eshterakNo: Number(subscriptionNumber) || 0,
      nameKharidar: buyerName || "",
      lastNameKharidar: buyerLastName || "",
      taeedVaziat: selectedStat !== "" ? Number(selectedStat) : 2,
      ersalVaziat: selectedShipping !== "" ? Number(selectedShipping) : 2,
      tahvilVaziat: selectedDelivery !== "" ? Number(selectedDelivery) : 2,
      typeFactor: selectedTypeFactor !== "" ? Number(selectedTypeFactor) : 1,
    };

    console.log("Search Object:", searchObject);
    submitSearch(searchObject);
  };

  return (
    <PageContainer>
      {user ? (
        <>
          <div className="w-full h-auto p-3 bg-white flex flex-col">
            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="w-full">
                {/* from */}
                <DatePickerFrom
                  selectedDate={selectedDateFrom}
                  setSelectedDate={setSelectedDateFrom}
                  Placeholder={fromPlaceholder}
                />
              </div>
              {/* to */}
              <div className="w-full">
                <DatePickerFrom
                  selectedDate={selectedDateTo}
                  setSelectedDate={setSelectedDateTo}
                  Placeholder={toPlaceholder}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span>تایید وضعیت :</span>
                <RowRadioButtonsGroup
                  buttons={verifyStatus}
                  selectedValue={selectedStat}
                  setSelectedValue={setSelectedStat}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span>وضعیت ارسال :</span>
                <RowRadioButtonsGroup
                  buttons={shippingStatus}
                  selectedValue={selectedShipping}
                  setSelectedValue={setSelectedShipping}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span>وضعیت تحویل :</span>
                <RowRadioButtonsGroup
                  buttons={deliveryStatus}
                  selectedValue={selectedDelivery}
                  setSelectedValue={setSelectedDelivery}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span>وضعیت فاکتور :</span>
                <RowRadioButtonsGroup
                  buttons={typeFactorStatus}
                  selectedValue={selectedTypeFactor}
                  setSelectedValue={setSelectedTypeFactor}
                />
              </div>

              <div className="w-full">
                <OutlinedInput
                  placeholder="نام خریدار"
                  className="w-full h-10"
                  value={buyerName}
                  onChange={(event) => setBuyerName(event.target.value)}
                />
              </div>
              <div className="w-full">
                <OutlinedInput
                  placeholder="نام خانوادگی خریدار"
                  className="w-full h-10"
                  value={buyerLastName}
                  onChange={(event) => setBuyerLastName(event.target.value)}
                />
              </div>
              <div className="w-full">
                <OutlinedInput
                  placeholder="شماره اشتراک"
                  className="w-full h-10"
                  value={subscriptionNumber}
                  onChange={(event) =>
                    setSubscriptionNumber(event.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex p-5">
              {loading ? (
                <Button
                  loading
                  variant="outlined"
                  className="bg-yellow-500 text-white w-20 h-9 rounded-lg flex items-center gap-1"
                ></Button>
              ) : (
                <Button
                  className="bg-yellow-500 text-white px-3 py-2 rounded-lg flex items-center gap-1"
                  onClick={handleSearch}
                >
                  <span>جستجو</span>
                  <SearchIcon className="text-white" />
                </Button>
              )}
            </div>
            {/* data to show  */}
            {Response && (
              <div className="w-full">
                <DataTable Response={Response} handleSearch={handleSearch} />
              </div>
            )}
          </div>
          <AutoHideDialog open={open} onClose={() => setOpen(false)} duration={5000} dialogTitle={'فرمت تاریخ'} dialogContent={'تاریخ به اشتباهی وارد شده است . (امکان وارد کردن تاریخ ها به صورت جابه جا وجود دارد.)'}/>
        </>
      ) : (
        <div className="flex justify-center mt-10 text-red-500">
          <span> ابتدا وارد شوید</span>
        </div>
      )}
    </PageContainer>
  );
};

export default ManageOrders;
