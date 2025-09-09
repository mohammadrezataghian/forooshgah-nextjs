import React from "react";
import { PiCoins } from "react-icons/pi";

const ScoreHistoryTab = ({ response }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-start py-10">
        <div className="w-full flex justify-between h-auto ">
          <span className="w-auto font-bold text-lg">تاریخچه امتیازات</span>
          {response && (
            <div className="flex gap-1">
              <div className="flex gap-1">
                <PiCoins className="text-yellow-500 text-2xl" />
                <span>امتیاز:</span>
              </div>
              <span>{response?.data?.Data.Score}</span>
            </div>
          )}
        </div>
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-7">
          <div className="shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full text-sm ">
              <thead className="bg-white text-base uppercase font-medium">
                <tr>
                  <th scope="col" className="px-6 py-6 tracking-wider">
                    امتیاز
                  </th>
                  <th scope="col" className="px-6 py-6 tracking-wider">
                    عنوان و جزئیات
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-6 text-left tracking-wider"
                  >
                    تاریخ
                  </th>
                </tr>
              </thead>
              {response &&
                response?.data?.Data?.List.map((item:any, index:any) => (
                  <tbody key={item.FldId} >
                    <tr
                      className={`${
                        index % 2 === 0
                          ? "bg-gray-300"
                          : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-10 whitespace-nowrap text-right">
                        {item.FldScoreTalabkar > 0 &&
                          `+ ${item.FldScoreTalabkar}`}
                        {item.FldScoreBedehkar > 0 &&
                          `- ${item.FldScoreBedehkar}`}
                      </td>
                      <td className="px-6 py-10 whitespace-nowrap text-right">
                        {item.FldDescription}
                      </td>
                      <td className="px-6 py-10 whitespace-nowrap">
                        {item.FldInsertTimeHijri}
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreHistoryTab;