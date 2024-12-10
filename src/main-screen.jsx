import { Outlet } from "react-router-dom";
import MainHeader from "./components/common/main-header";

export default function MainScreen() {
  return (
    <div>
      <MainHeader/>
      <div className="w-full min-h-[calc(100vh-250px)]">
        <Outlet />
      </div>
    </div>
  );
}
