import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react"
export default function Layout(){
    const {pathname}=useLocation()
    useEffect(()=>{
        window.scrollTo(0,0)
    },[pathname])
    return(
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    )
}