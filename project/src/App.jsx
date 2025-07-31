import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contact from "./component/users/Contact";
import Home from "./component/pages/Home";
import Login from "./component/auth/Login";
import Post_job from "./component/company/Post_job";
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
import AdminContactMessages from "./component/admin/AdminContactMessages";
import CompanyContact from "./component/company/CompanyContact";
import ViewSkills from './component/users/ViewSkills';
// import SkillResult from './component/users/SkillResult';
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="view-job" element={<ViewJob />} />
            <Route path="view-skills" element={<ViewSkills />} />
            {/* <Route path="/skill/:skillName" element={<SkillResult />} /> */}

            <Route path="interview/:applicationId" element={<UserInterviewSchedule />} />
            <Route path="job-form/:jobId" element={<ApplyJobForm />} />
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="company-register" element={<CompanyRegister />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="manage-user" element={<ManageUser />} />
            <Route path="manage-company" element={<ManageCompany />} />
            <Route path="manage-jobs" element={<ManageJobs />} />
            <Route path="company/applications/:companyId" element={<ViewApplication />} />
            <Route path="manage-interviews" element={<AdminJobsList />} />
            <Route path="interview/:jobId" element={<AdminManageInterview />} />
            <Route path="contact" element={<AdminContactMessages />} />
          </Route>
          <Route path="/company" element={<CompanyLayout />}>
            <Route index element={<CompanyHome />} />
            <Route path="post-job" element={<Post_job />} />
            <Route path="manage-jobs" element={<ManageCompanyJobs />} />
            <Route path="update-job/:id" element={<UpdateJob />} />
            <Route path="update-profile" element={<UpdateCompany />} />
            <Route path="view-application" element={<CompanyViewApplications />} />
            <Route path="applicants/:jobId" element={<CompanyApplicants />} />
            <Route path="schedule-interview/:jobId/:applicationId" element={<ScheduleInterview />} />
            <Route path="company-contact" element={<CompanyContact />} />
          </Route>
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
