import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";

const Layout = () => {
  const location = useLocation();

  const hideHeaderRoutes = ["/login", "/register"];

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Outlet />
    </div>
  );
};

export default Layout;
