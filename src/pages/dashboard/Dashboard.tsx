
import RecentOrder from "./components/recent-order";
import RightBar from "./components/right-bar";
import Charts from "./components/charts";
// import { useAuth } from "@/helpers/useAuth";

const Dashboard = () => {
  // const {token, user} = useAuth()
  return (
    <div className="flex w-full justify-between">
      <main className="grow">
        <Charts />
        <RecentOrder />
      </main>
      <aside className="w-[30%] shrink-0">
        <RightBar />
      </aside>
    </div>
  );
};

export default Dashboard;
