'use client'

import React, { useEffect } from "react";
import { PageContainer } from "@toolpad/core/PageContainer";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Receipt from "./Receipt";
import Returned from "./Returned";
import Cookies from "js-cookie";
import useGetReceipts from "@/app/api/customerOrderList/hook";
import useGetOrderStatus from "@/app/api/getOrderStatus/hook";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

function CustomTabPanel(props:any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index:any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Orders = () => {

  const siteAddress = useSelector((state:RootState)=>state.siteUrlAddress.value)

  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user") || '') : null;
  const eshterakNo = user?.EshterakNo;
  const userToken = localStorage.getItem("userToken");

// get data
  const params = {
    EshterakNo: eshterakNo,
    typeFactore: 0,
  };
  const { receipts, loading: ReceiptLoading, error: ReceiptError,getReceipts } = useGetReceipts(userToken);
  useEffect(()=>{
    getReceipts(params)
  },[])
// end get data

// get order status 
const { response, loadingStatus, errorStatus } = useGetOrderStatus()
// end get order status

  const [value, setValue] = React.useState(0);

  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
  };

  return (
    <>
      <PageContainer>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              justifyContent: "center",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
              indicatorColor="secondary"
            >
              <Tab sx={{ fontWeight: "bold", fontSize: "16px", color: "gray" }} label="جاری" {...a11yProps(0)} />
              <Tab sx={{ fontWeight: "bold", fontSize: "16px", color: "gray" }} label="تحویل شده" {...a11yProps(1)} />
              <Tab sx={{ fontWeight: "bold", fontSize: "16px", color: "gray" }} label="مرجوع شده" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Receipt tahvil={false} getReceipts={getReceipts} receipts={receipts} params={params} loading={ReceiptLoading} response={response} siteAddress={siteAddress}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Receipt tahvil={true} getReceipts={getReceipts} receipts={receipts} params={params} loading={ReceiptLoading} siteAddress={siteAddress}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Returned siteAddress={siteAddress}/>
          </CustomTabPanel>
        </Box>
      </PageContainer>
    </>
  );
};

export default Orders;