import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import CompanyNavbar from "./CompanyNavbar";
import { useEffect } from "react"
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
export default function CompanyLayout(){
    // const {pathname}=useLocation()
    // useEffect(()=>{
    //     window.scrollTo(0,0)
    // },[pathname])
    // let isLogin=sessionStorage.getItem("isLogin")
    // let userType=sessionStorage.getItem("userType")
    // const nav=useNavigate()
    // useEffect(()=>{
    //     if(!isLogin || userType!=2){
    //         toast.error("Please login")
    //         nav("/login")
    //     }
    // },[])
    return(
        <>
        <CompanyNavbar/>
        <Outlet/>
        <Footer/>
        </>
    )
}