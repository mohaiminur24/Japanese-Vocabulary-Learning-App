import { Outlet } from "react-router-dom";
import MainHeader from "./components/common/main-header";

export default function MainScreen() {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bg-white z-20">
        <MainHeader />
      </div>
      <div className="w-full min-h-[calc(100vh-250px)] mt-24">
        <Outlet />
      </div>
    </div>
  );
}
