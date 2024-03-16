import React from "react";
import { FaGreaterThan } from "react-icons/fa";
import avatar from "../../../assets/avatar.jpg";
import { RxDownload } from "react-icons/rx";
import { PiPrinterThin } from "react-icons/pi";
import { IoEyeOutline } from "react-icons/io5";

const RecentOrder = () => {
  return (
    <div>
      <h3>Recent Order</h3>
      <table align="center">
        <thead className="border-b text-center ">
          <tr>
            <th className="pr-[12px]">Order Number</th>
            <th className="pr-[12px]">Date </th>
            <th className="pr-[12px]"> Product</th>
            <th className="pr-[12px]"> Customer</th>
            <th className="pr-[12px]"> Total Amount</th>
            <th className="pr-[12px]"> Status</th>
            <th className="pr-[12px]"> Account</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b mb-[8px] text-center hover:font-bold">
            <td className="pr-[18px]">123457384</td>
            <td className="pr-[18px]">18/7/2023</td>
            <td className="pr-[18px] ">
              <div className="flex flex-col">
                <span>Dolan Watch</span>
                <button className=" flex items-center gap-x-[8px]">
                  <span>See more</span> <FaGreaterThan />
                </button>
              </div>
            </td>
            <td className=" flex gap-x-[4px] items-center pr-[18px]">
              <img src={avatar} className="size-[36px] rounded-full" />
              <span>Allan wood</span>
            </td>
            <td className="pr-[18px]">$ 1,349</td>
            <td className="pr-[18px]">On progress</td>
            <td className="flex gap-x-[6px]">
              <RxDownload />
              <PiPrinterThin />
              <IoEyeOutline />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrder;
