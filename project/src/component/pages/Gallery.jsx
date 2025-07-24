import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";

export default function CompanyProfile() {
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (!email) return;

    // Fetch company profile
    const companyQuery = query(collection(db, "users"), where("email", "==", email));
    const unsubCompany = onSnapshot(companyQuery, (snapshot) => {
      if (!snapshot.empty) {
        setCompany({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
      }
    });

    // Fetch posted jobs
    const jobsQuery = query(collection(db, "postJob"), where("email", "==", email));
    const unsubJobs = onSnapshot(jobsQuery, (snapshot) => {
      setJobs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubCompany();
      unsubJobs();
    };
  }, [email]);

  if (!company) return <div className="text-center mt-5">Loading Company Profile...</div>;

  return (
    <>
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-2 text-center">
              <img
                src={company.image || "/assets/images/default_company.png"}
                alt="Company Logo"
                className="img-fluid rounded-circle border"
                style={{ height: 120, width: 120 }}
              />
            </div>
            <div className="col-md-10 text-white">
              <h1 className="font-weight-bold">{company.name}</h1>
              <p className="mb-1">📧 {company.email}</p>
              <p className="mb-1">📞 {company.contact}</p>
              <p>📍 {company.location}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">Jobs Posted by {company.name}</h2>
            </div>
          </div>

          {jobs.length > 0 ? (
            <ul className="job-listings mb-5">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center"
                >
                  <div className="job-listing-logo">
                    <img
                      src={job.image || "/assets/images/default_company.png"}
                      alt="Logo"
                      className="img-fluid"
                    />
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
          ) : (
            <div className="text-center text-muted">No jobs posted yet.</div>
          )}
        </div>
      </section>
    </>
  );
}
