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
import ManageJobs from "./component/admin/ManageJobs";


import ViewJob from "./component/users/ViewJob";
import ApplyJob from "./component/users/ApplyJob";
import CompanyHome from "./component/company/CompanyHome";
import ManageCompanyJobs from "./component/company/ManageCompanyJobs";
import AdminHome from "./component/admin/AdminHome";
import UpdateJob from "./component/company/UpdateJob";

import UpdateCompany from "./component/company/UpdateProfile";
import ApplyJobForm from "./component/users/ApplyJobForm";
import CompanyViewApplications from "./component/company/CompanyViewApplication";
import CompanyApplicants from "./component/company/Applicant";
import ScheduleInterview from "./component/company/ScheduleInterview";
import UserInterviewSchedule from "./component/users/UserInteviewSchedule";
import ViewApplication from "./component/admin/ViewApplication";
import UserProfile from "./component/users/UserProfile";
import AdminManageInterview from "./component/admin/AdminManageInterview";
import AdminJobsList from "./component/admin/AdminJobList";
function App() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<Layout/>}>
     <Route index element={<Home/>}/>
     
      <Route path="view-job" element={<ViewJob/>}/>
      <Route path="apply-job" element={<ApplyJob/>}/>
      <Route path="interview/:applicationId" element={<UserInterviewSchedule/>}/>
      <Route path="job-form/:jobId" element={<ApplyJobForm />} />
      <Route path="user-profile" element={<UserProfile/>}/>
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
     <Route index element={<AdminHome/>}/>
     <Route path="manage-user" element={<ManageUser/>}/>
     <Route path="manage-company" element={<ManageCompany/>}/>
     <Route path="manage-jobs" element={<ManageJobs/>}/>
     <Route path="company/applications/:companyId" element={<ViewApplication/>}/>
     <Route path="manage-interviews" element={<AdminJobsList/>}/>
     <Route path="interview/:jobId" element={<AdminManageInterview/>}/>
     </Route>
     <Route path="/company" element={<CompanyLayout/>}>
     <Route index element={<CompanyHome/>}/>
     <Route path="post-job" element={<Post_job/>}/>
     <Route path="manage-jobs" element={<ManageCompanyJobs/>}/>
     <Route path="update-job/:id" element={<UpdateJob/>}/>
     <Route path="update-profile" element={<UpdateCompany/>}/>
     <Route path="view-application" element={<CompanyViewApplications/>}/>
     <Route path="applicants/:jobId" element={<CompanyApplicants />} />
    <Route path="schedule-interview/:jobId/:applicationId" element={<ScheduleInterview />} />

     </Route>
      <Route path="/*" element={<Error/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
