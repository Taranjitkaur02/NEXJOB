import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getCountFromServer,
  onSnapshot,
  query,
  orderBy,
  limit,
  where
} from "firebase/firestore";
import { db } from "../../Firebase";

export default function AdminHome() {
  const [counters, setCounters] = useState({ users: 0, companies: 0, jobs: 0 });//counter
  const [recentJobs, setRecentJobs] = useState([]);//hold last 5 jobs

  const fetchCounters = async () => {
    try {
      {/* get the total number of users,company and job post in counter */}
      const usersSnap = await getCountFromServer(query(collection(db, "users"), where("userType", "==", 3)));
      const companiesSnap = await getCountFromServer(query(collection(db, "users"), where("userType", "==", 2)));
      const jobsSnap = await getCountFromServer(collection(db, "postJob"));

      setCounters({
        users: usersSnap.data().count,
        companies: companiesSnap.data().count,
        jobs: jobsSnap.data().count
      });
    } catch (error) {
      console.error("Error fetching counters:", error);
    }
  };
  //fetch the recent 5 jobs
  const fetchRecentJobs = () => {
    const q = query(collection(db, "postJob"), orderBy("createdAt", "desc"), limit(5));
    onSnapshot(q, (snapshot) => {
      const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecentJobs(jobs);
    });
  };

  useEffect(() => {
    fetchCounters();
    fetchRecentJobs();
  }, []);

  return (
    <>
    {/*Hero section */}
      <section
        className="home-section section-hero overlay bg-image d-flex align-items-center"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")', minHeight: "70vh" }}
      >
        <div className="container text-center text-white">
          <h1 className="font-weight-bold mb-3 display-4">Welcome Admin</h1>
          <p className="lead mb-4">Monitor activity and manage the platform efficiently.</p>
        </div>
      </section>

      <section
        className="py-5 bg-image overlay-primary fixed overlay"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
      >
        {/*counter */}
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2 text-white">Platform Stats</h2>
              <p className="lead text-white">Keep track of platform growth</p>
            </div>
          </div>
          <div className="row pb-0 section-counter text-white text-center">
            <div className="col-md-4 mb-4">
              <h1 className="display-4 text-white fw-bold">{counters.users}</h1>
              <p className="text-white">Registered Users</p>
            </div>
            <div className="col-md-4 mb-4">
              <h1 className="display-4 text-white fw-bold">{counters.jobs}</h1>
              <p className="text-white">Jobs Posted</p>
            </div>
            <div className="col-md-4 mb-4">
              <h1 className="display-4 text-white fw-bold">{counters.companies}</h1>
              <p className="text-white">Registered Companies</p>
            </div>
          </div>
        </div>
      </section>
      {/*recent jobs */}
      <section className="site-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">Recent Job Listings</h2>
            </div>
          </div>
          {recentJobs.length > 0 ? (
            <ul className="job-listings mb-5">
              {recentJobs.map((job) => (
                <li key={job.id} className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                  <div className="job-listing-logo">
                    <img src={job.image || "/assets/images/default_company.png"} alt="Logo" className="img-fluid" />
                  </div>
                  <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                    <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                      <h2>{job.title}</h2>
                      <strong>{job.company || "Company"}</strong>
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
            <div className="text-center text-muted">No recent jobs available.</div>
          )}
        </div>
      </section>
    </>
  );
}

