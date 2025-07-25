import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./Footer";
import AdminNavbar from "./AdminNavbar";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
export default function AdminLayout(){
     const {pathname}=useLocation()
    useEffect(()=>{
        window.scrollTo(0,0)
    },[pathname])
     let isLogin=sessionStorage.getItem("isLogin")
    let userType=sessionStorage.getItem("userType")
    const nav=useNavigate()
    useEffect(()=>{
        if(!isLogin || userType!=1){
            toast.error("Please login")
            nav("/login")
        }
    },[])
    return(
        <>
       <AdminNavbar/>
        <Outlet/>
        <Footer/>
        </>
    )
}