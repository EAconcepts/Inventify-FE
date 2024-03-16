import React from 'react'
import { IconType } from 'react-icons'
import { CiHome } from 'react-icons/ci'
import { LuBriefcase } from 'react-icons/lu'
import { MdLogout, MdOutlineStackedLineChart } from 'react-icons/md'
import { RiUserSettingsLine } from 'react-icons/ri'
import { TbSettings } from 'react-icons/tb'
import { NavLink, useLocation } from 'react-router-dom'

export interface navLinkProps{
    title: string;
    icon: IconType;
    path: string;
}
const SideNav = () => {
    const navLinks : navLinkProps[] = [
        {
            title: "Home",
            icon: CiHome,
            path: "",
        },
        {
            title: "Product",
            icon: CiHome,
            path: "products",
        },
        {
            title: "Order",
            icon: LuBriefcase,
            path: "order",
        },
        {
            title: "Statistics",
            icon: MdOutlineStackedLineChart,
            path: "statistics",
        },
        {
            title: "Manage User",
            icon: RiUserSettingsLine,
            path: "manage-user",
        },
        {
            title: "Settings",
            icon: TbSettings,
            path: "settings",
        },
        {
            title: "Log Out",
            icon: MdLogout,
            path: "",
        },
    ]
    const pathname = useLocation().pathname
    // console.log(pathname)
  return (
    <div className='flex flex-col mt-[24px]'>
        {/* logo */}
        <div className='flex justify-center'>
            <h2 className='text-white text-[18pd]'>INVENTIFY</h2>
        </div>
        {/* Links */}
        <nav className='flex flex-col mt-[32px] gap-y-[16px] pr-[15px] text-[18px]'>
            {navLinks.map((item, index)=>(
                <NavLink to={item.path} key={index} className={ ({isActive})=> isActive ? "bg-white rounded-r-full   flex justify-between items-center py-[5px] pr-[10px] pl-[4px]" : 'text-white pl-[4px]'}>
                <div className='flex gap-x-[6px] items-center'>
                    <item.icon/>
                    <span>{item.title}</span>
                </div>
                <div className={`${pathname ===`/dashboard/${item.path}` || item.path ==='' && pathname ==='/dashboard' ? ' size-[10px] rounded-full bg-black/80' :'hidden'}`}></div>
            </NavLink>
            ))}
            
        </nav>
    </div>
  )
}

export default SideNav