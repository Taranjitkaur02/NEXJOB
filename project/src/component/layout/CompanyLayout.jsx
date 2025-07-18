import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import CompanyNavbar from "./CompanyNavbar";


export default function CompanyLayout(){
    return(
        <>
        <CompanyNavbar/>
        <Outlet/>
        <Footer/>
        </>
    )
}