import About from "./component/pages/About"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blog from "./component/pages/Blog";
import Blog_single from "./component/pages/Blog_single";
import Contact from "./component/pages/Contact";
import Faq from "./component/pages/Faq";
import Gallery from "./component/pages/Gallery";
import Home from "./component/pages/Home";
import Job_listings from "./component/pages/Job_listings";
import Job_single from "./component/pages/Job_single";
import Login from "./component/auth/Login";
import Portfolio from "./component/pages/Portfolio";
import Portfolio_single from "./component/pages/Portfolio_single";
import Post_job from "./component/company/Post_job";
import Services from "./component/pages/Services";
import Services_single from "./component/pages/Services_single";
import Testimonials from "./component/pages/Testimonials";
import Error from "./component/pages/Error";
import Layout from "./component/layout/Layout";
import Register from "./component/auth/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CompanyRegister from "./component/auth/Company-register";
import AdminNavbar from "./component/layout/AdminNavbar";
import AdminLayout from "./component/layout/AdminLayout";
import CompanyLayout from "./component/layout/CompanyLayout";
import ManageUser from "./component/admin/ManageUser";
import ManageCompany from "./component/admin/ManageCompany";
// import { HashRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<Layout/>}>
     <Route index element={<Home/>}/>
     <Route path="about" element={<About/>}/>
      <Route path="blog" element={<Blog/>}/>
      <Route path="blog-single" element={<Blog_single/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="faq" element={<Faq/>}/>
      <Route path="gallery" element={<Gallery/>}/>
      <Route path="job-listings" element={<Job_listings/>}/>
      <Route path="job-single" element={<Job_single/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="portfolio" element={<Portfolio/>}/>
      <Route path="portfolio-single" element={<Portfolio_single/>}/>
      <Route path="services" element={<Services/>}/>
      <Route path="service-single" element={<Services_single/>}/>
      <Route path="testimonials" element={<Testimonials/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="company-register" element={<CompanyRegister/>}/>
     </Route>
     <Route path="/admin" element={<AdminLayout/>}>
     <Route index element={<Home/>}/>
     <Route path="manage-user" element={<ManageUser/>}/>
     <Route path="manage-company" element={<ManageCompany/>}/>
     </Route>
     <Route path="/company" element={<CompanyLayout/>}>
     <Route index element={<Home/>}/>
    <Route path="post-job" element={<Post_job/>}/>
     </Route>
      <Route path="/*" element={<Error/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
