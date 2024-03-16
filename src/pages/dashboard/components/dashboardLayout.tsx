
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";

const DashboardLayout = () => {
  return <div className="flex w-full h-screen overflow-hidden">
    {/* side menu */}
    <aside className="h-screen w-[16%] overflow-hidden flex flex-col bg-black/80">
     <SideNav/>
    </aside>
    {/* Main screen */}
    <main className="w-full overflow-y-scroll h-full ">
      <Outlet/>
    </main>
  </div>;
};

export default DashboardLayout;
