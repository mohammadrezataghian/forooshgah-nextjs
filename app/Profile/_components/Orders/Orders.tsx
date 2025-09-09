import React from "react";
import { PageContainer } from "@toolpad/core/PageContainer";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Receipt from "./Receipt";
import Returned from "./Returned";

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
              <Tab label="تکمیل شده" {...a11yProps(0)} />
              <Tab label="مرجوع شده" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Receipt />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Returned/>
          </CustomTabPanel>
        </Box>
      </PageContainer>
    </>
  );
};

export default Orders;
