import React from "react";
import avatar from "../../../assets/avatar.jpg";
import { MdOutlineNotifications } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { IoIosSearch } from "react-icons/io";
import { PiArrowCircleLeftLight } from "react-icons/pi";

const RightBar = () => {
  return (
    <div className="h-screen bg-black/80 flex flex-col px-[2px] fixed top-0 bottom-0 w-[25%] right-0">
      <div className="flex flex-col w-full px-[8px]">
        {/* <div className="flex "></div> */}
        <div className=" flex justify-between items-center">
          <div className="flex gap-x-[4px] items-end">
            <img src={avatar} className="size-[36px] h-ful rounded-full " />
            <div className="flex flex-col">
              <p className="shrink-0 text-nowrap text-white">Jackson Murouse</p>
              <p className="text-gray-400">Sale Manager</p>
            </div>
          </div>
          <MdOutlineNotifications className="text-white text-[24px]" />
        </div>
        <div className="relative mt-[12px]">
          <IoIosSearch className="absolute top-[50%] translate-y-[-50%] left-[8px] text-white" />
          <Input
            type="search"
            placeholder="Search..."
            className="bg-gray-500/20 border-none pl-[26px] text-white placeholder:text-white"
          />
        </div>
      </div>

      {/* Inbox */}
      <div className="w-full rounded-[4px] mt-[18px] shadow-sm px-[4px] border border-gray-500 shadow-gray-500 gap-y-[8px]">
        <div className="flex flex-col w-full">
          <div className=" w-full flex justify-between text-white">
            <p>Inbox</p>
            <PiArrowCircleLeftLight />
          </div>
          <div className="flex w-full justify-between mt-[8px]">
            <img src={avatar} className="size-[28px] rounded-full" />
            <div className="flex flex-col text-red-500">
              <p className="font-bold text-[14px]">Mike Thompson</p>
              <p className="text-gray-400 text-[12px] -mt-[3px]">
                Tell me later
              </p>
            </div>
            <div className="flex flex-col items-end text-[12px] text-white">
              <span>10:32 am</span>
              <span className="rounded-full bg-white text-black size-[16px] text-center text-[12px]">
                4
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
