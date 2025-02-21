import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";

const Layout = () => {
  const location = useLocation();

  const hideHeaderRoutes = ["/login", "/register"];

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <main className="flex flex-col items-center justify-center flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
