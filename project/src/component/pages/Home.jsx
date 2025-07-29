import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, onSnapshot, query, where, getCountFromServer } from "firebase/firestore";
import { db } from "../../Firebase";

export default function Home() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [counters, setCounters] = useState({ users: 0, jobs: 0, companies: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const fetchJobs = () => {
    onSnapshot(collection(db, "postJob"), (snapshot) => {
      setJobs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };

  useEffect(() => {
    fetchCounters();
    fetchJobs();
  }, []);

  const uniqueCompanies = [...new Map(jobs.map(job => [job.userId, job])).values()];

  useEffect(() => {
    if (uniqueCompanies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % uniqueCompanies.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [uniqueCompanies.length]);

  return (
    <>
      <section
        className="home-section section-hero overlay bg-image d-flex align-items-center"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")', minHeight: "70vh" }}
        id="home-section"
      >
        <div className="container text-center">
          <h1 className="font-weight-bold text-white mb-2 display-4">The Easiest Way To Get Your Dream Job</h1>
          <p className="lead text-white">Jobs that match your skills. Careers that match your dreams.</p>

          {/* Rotating Company Logo with Hover Zoom and No Border */}
          <div className="text-center mt-5">
            <h2 className="mb-4" style={{ color: "#89BA16" }}>Top Companies Hiring</h2>

            {uniqueCompanies.length > 0 && uniqueCompanies[currentIndex] && (
              <div
                className="company-logo-wrapper"
                onClick={() => navigate(`/view-job?companyId=${uniqueCompanies[currentIndex]?.userId}`)}
              >
                <img
                  src={uniqueCompanies[currentIndex]?.image || "/assets/images/default_company.png"}
                  alt={uniqueCompanies[currentIndex]?.company || "Company"}
                  className="company-logo-img"
                />
                <p className="company-logo-name">{uniqueCompanies[currentIndex]?.company}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-5 fw-bold text-dark">Your Job Journey Starts Here</h2>
          <div className="row justify-content-center">
            {[
              { icon: "bi-person-circle", title: "1. Create Profile", link: "/register" },
              { icon: "bi-search", title: "2. Browse Jobs", link: "/view-job" },
              { icon: "bi-send-check", title: "3. Apply Instantly", link: "/apply-job" },
              { icon: "bi-award", title: "4. Get Hired", link: null },
            ].map((step, i) => (
              <div key={i} className="col-6 col-md-3 mb-4">
                {step.link ? (
                  <Link to={step.link} className="text-decoration-none text-dark">
                    <div className="journey-card text-center p-4">
                      <i className={`bi ${step.icon} display-4 text-primary mb-3`}></i>
                      <h6 className="fw-semibold">{step.title}</h6>
                    </div>
                  </Link>
                ) : (
                  <div className="journey-card text-center p-4 opacity-75">
                    <i className={`bi ${step.icon} display-4 text-primary mb-3`}></i>
                    <h6 className="fw-semibold">{step.title}</h6>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">Recent Job Listings</h2>
            </div>
          </div>
          <ul className="job-listings mb-5">
            {jobs.slice(0, 6).map((job) => (
              <li key={job.id} className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                <div className="job-listing-logo">
                  <img src={job.image || "/assets/images/default_company.png"} alt="Logo" className="img-fluid" />
                </div>
                <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                  <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                    <h2>{job.title}</h2>
                    <strong>{job.company}</strong>
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
        </div>
      </section>

      <section className="py-5 bg-image overlay-primary fixed overlay" style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}>
        <div className="container text-white text-center">
          <h2>Looking For A Job?</h2>
          <p className="mb-3">Your next opportunity is just one click away.</p>
          <Link to="/register" className="btn btn-warning btn-lg">Sign Up</Link>
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        .company-logo-wrapper {
          display: inline-block;
          cursor: pointer;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .company-logo-img {
          height: 120px;
          width: 120px;
          object-fit: cover;
          border-radius: 50%;
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
          transition: transform 0.4s ease;
        }

        .company-logo-wrapper:hover .company-logo-img {
          transform: scale(1.3);
        }

        .company-logo-name {
          margin-top: 10px;
          font-weight: bold;
          font-size: 1.25rem;
          color: #ffffff;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.9);
        }

        .journey-card {
          background-color: #fff;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          transform-style: preserve-3d;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .journey-card:hover {
          transform: rotateY(5deg) rotateX(5deg) scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          z-index: 1;
        }

        .journey-card:hover h6 {
          color: #89BA16;
        }
      `}</style>
    </>
  );
}


