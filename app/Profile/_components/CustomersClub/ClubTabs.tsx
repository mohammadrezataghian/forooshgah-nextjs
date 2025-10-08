import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { FcShop } from "react-icons/fc";
import MissionsTab from "./MissionsTab";
import ScoreHistoryTab from "./ScoresHistoryTab";

type LabTabsProps = {
  items:any;
  response:any;
  loadingItems:boolean;
  score:number | null;
}

export default function LabTabs({ items, response,loadingItems,score }:LabTabsProps) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              disabled
              label={<div className="hidden md:block">باشگاه مشتریان</div>}
              value="3"
              icon={<FcShop className="text-5xl" />}
              sx={{ flexDirection: "row", gap: "5px" }}
            />
            <Tab label="ماموریت های باشگاه" value="1" />
            <Tab label="تاریخچه امتیازات" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <MissionsTab items={items} loadingItems={loadingItems}/>
        </TabPanel>
        <TabPanel value="2">
          <div className="w-full h-auto">
            <div className="container h-96 ">
              <ScoreHistoryTab response={response} score={score}/>
            </div>
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}