'use client'

import React from "react";
import { Paper, Typography } from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import { FcAssistant,FcCollaboration } from "react-icons/fc"
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ContactUs = () => {

const config = useSelector((state: RootState) => state.mainConfig.value);

//get data 
const data = config?.filter(item=>item.TypeSetting === "Contact")

const h6 = data?.find(item => item.Key === "webAppContactH6")
const address = data?.find(item => item.Key === "webAppContactAddress")
const mail = data?.find(item => item.Key === "webAppContactMail")
const tel = data?.find(item => item.Key === "webAppContactTell")
const support = data?.find(item => item.Key === "webAppContactBaleSupport")
const accountingSupport = data?.find(item => item.Key === "webAppContactBaleAccountingSupport")
const supportTxt = data?.find(item => item.Key === "webAppContactBaleSupportTxt")
const offer = data?.find(item => item.Key === "webAppContactBaleChat")
const offerTxt = data?.find(item => item.Key === "webAppContactBaleChatTxt")
// end get data

  return (
    <>
      <div className="w-full p-5 text-lg font-bold h-auto flex justify-center items-center bg-white">
        <h5>تماس با ما</h5>
      </div>
      <div className="flex justify-center md:items-center items-start bg-gradient-to-br from-blue-50 to-white p-4" style={{ height: 'calc(100vh - 177.5px)' }}>
        <Paper
          elevation={6}
          className="w-full max-w-3xl p-8 rounded-3xl shadow-lg "
        >
          <div className="mb-6 text-center">
            <Typography variant="h4" className="font-bold text-gray-800 mb-2 text-2xl sm:text-4xl">
              { h6 && h6.Value }
            </Typography>
          </div>

          <div className="grid md:grid-cols-1 gap-6 text-gray-700">
            <div className="space-y-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <LocationOn className="text-red-600" />
                <Typography variant="body1" className="text-justify">
                  { address && address.Value }
                </Typography>
              </div>
              <div className="flex items-center gap-3">
                <Email className="text-blue-600" />
                <Typography variant="body1">
                  { mail && mail.Value }
                </Typography>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-green-600" />
                <Typography variant="body1" className="text-right">
                  { tel && tel.Value }
                </Typography>
              </div>
              <div className="flex items-center gap-3">
                <FcAssistant  className="text-2xl" />
                <Typography variant="body1" className="text-right"><a href={support && support.Value} target="_blank" className="underline">
                  {supportTxt && supportTxt.Value}
                  </a></Typography>
              </div>
              <div className="flex items-center gap-3">
                <FcAssistant  className="text-2xl" />
                <Typography variant="body1" className="text-right"><a href={accountingSupport && accountingSupport.Value} target="_blank" className="underline">
                  {accountingSupport && accountingSupport.Title}
                  </a></Typography>
              </div>
              <div className="flex items-center gap-3">
                <FcCollaboration  className="text-2xl" />
                <Typography variant="body1" className="text-right"><a href={offer && offer.Value} target="_blank" className="underline">
                  {offerTxt && offerTxt.Value}
                  </a></Typography>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default ContactUs;