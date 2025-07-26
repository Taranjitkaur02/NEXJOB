import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function CompanyJobs() {
  const [jobs, setJobs] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, "postJob"), where("userId", "==", userId));
    const unsub = onSnapshot(q, (snapshot) => {
      const jobList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setJobs(jobList);
    });

    return () => unsub();
  }, [userId]);

  return (
    <>
    {/* Hero Section */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">Manage Company</h1>
              <div className="custom-breadcrumbs">
                <Link to="/admin">Home</Link> <span className="mx-2 slash"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    <div className="container my-5">
      <h2 className="mb-4">Your Posted Jobs</h2>
      <div className="row">
        {jobs.length === 0 ? (
          <p className="text-center">No jobs posted yet.</p>
        ) : (
          jobs.map((job) => (
            <div className="col-md-4 mb-4" key={job.id}>
              <div
                className="card shadow-sm h-100 hover-shadow"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/company/applicants/${job.id}`)}
              >
                <div className="card-body text-center">

                  {/*  Company Logo from postJob.image */}
                  {job.image && (
                    <img
                      src={job.image}
                      alt="Company Logo"
                      className="mb-3"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  )}

                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text text-muted">{job.location}</p>
                  <p className="text-primary">Click to View Applicants</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
}
