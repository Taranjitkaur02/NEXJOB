import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const isLogin = sessionStorage.getItem("isLogin");

    const publicRoutes = ["/", "/login", "/register", "/user-register", "/company-register"];

    const isPublic = publicRoutes.includes(pathname);

    if (!isLogin && !isPublic) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [pathname, navigate]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
