import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout(){
    return(
        <>
       <AdminNavbar/>
        <Outlet/>
        <Footer/>
        </>
    )
}