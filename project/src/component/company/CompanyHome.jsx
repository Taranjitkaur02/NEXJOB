import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, where, getCountFromServer, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";

export default function CompanyHome() {
  const [jobs, setJobs] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [counters, setCounters] = useState({ users: 0, jobs: 0, companies: 0 });
  const email = sessionStorage.getItem("email");

  const fetchCounters = async () => {
    const usersSnap = await getCountFromServer(query(collection(db, "users"), where("userType", "==", 1)));
    const companiesSnap = await getCountFromServer(query(collection(db, "users"), where("userType", "==", 2)));
    const jobsSnap = await getCountFromServer(collection(db, "postJob"));
    setCounters({
      users: usersSnap.data().count,
      companies: companiesSnap.data().count,
      jobs: jobsSnap.data().count,
    });
  };

  const fetchCompanyName = async () => {
    const q = query(collection(db, "users"), where("email", "==", email), where("userType", "==", 2));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const data = snapshot.docs[0].data();
      setCompanyName(data.name || "Your Company");
    }
  };

  const fetchCompanyJobs = () => {
    const q = query(collection(db, "postJob"), where("email", "==", email));
    onSnapshot(q, (snapshot) => {
      setJobs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };

  useEffect(() => {
    fetchCounters();
    fetchCompanyJobs();
    fetchCompanyName();
  }, []);

  return (
    <>
      <section
        className="home-section section-hero overlay bg-image d-flex align-items-center"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")', minHeight: "70vh" }}
      >
        <div className="container text-center text-white">
          <h1 className="font-weight-bold mb-3 display-4">Welcome to NEXJOB Employer Hub</h1>
          <p className="lead mb-4">Connect with talented candidates and manage your job posts seamlessly.</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/company/post-job" className="btn btn-primary btn-lg">PostJob</Link>
           
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-5 bg-image overlay-primary fixed overlay" style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}>
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2 text-white">Platform Overview</h2>
              <p className="lead text-white">Monitor your impact and track growth statistics</p>
            </div>
          </div>
          <div className="row pb-0 section-counter text-white text-center">
            <div className="col-md-4 mb-4">
              <h1 className="display-4">{counters.users}</h1>
              <p>Registered Candidates</p>
            </div>
            <div className="col-md-4 mb-4">
              <h1 className="display-4">{counters.jobs}</h1>
              <p>Total Jobs Posted</p>
            </div>
            <div className="col-md-4 mb-4">
              <h1 className="display-4">{counters.companies}</h1>
              <p>Registered Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Jobs */}
      <section className="site-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">Your Posted Jobs</h2>
            </div>
          </div>
          {jobs.length > 0 ? (
            <ul className="job-listings mb-5">
              {jobs.map((job) => (
                <li key={job.id} className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                  <div className="job-listing-logo">
                    <img src={job.image || "/assets/images/default_company.png"} alt="Logo" className="img-fluid" />
                  </div>
                  <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                    <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                      <h2>{job.title}</h2>
                      <strong>{companyName}</strong>
                    </div>
                    <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                      <span className="icon-room" /> {job.location}
                    </div>
                    <div className="job-listing-meta">
                      <span className="badge badge-success">{job.jobType}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted">You haven't posted any jobs yet.</div>
          )}
        </div>
      </section>
    </>
  );
}
