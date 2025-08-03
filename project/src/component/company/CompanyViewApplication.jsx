import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";

export default function CompanyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, "postJob"), where("userId", "==", userId));
    const unsub = onSnapshot(q, (snapshot) => {
      const jobList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setJobs(jobList);
      setLoading(false);
    });

    return () => unsub();
  }, [userId]);

  return (
    <>
      <style>{`
        .hover-3d {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .hover-3d:hover {
          transform: perspective(1000px) translateZ(20px) scale(1.03);
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1), 0 0 20px rgba(137, 186, 22, 0.15);
        }

        @media (hover: none) {
          .hover-3d:hover {
            transform: none;
            box-shadow: none;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">Applications</h1>
              <div className="custom-breadcrumbs">
                <Link to="/company">Home</Link>{" "}
                <span className="mx-2 slash"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-5">
        <h2 className="mb-4">Your Posted Jobs</h2>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
            <SyncLoader color="#89BA16" size={30} loading={loading} />
          </div>
        ) : (
          <div className="row">
            {jobs.length === 0 ? (
              <p className="text-center">No jobs posted yet.</p>
            ) : (
              jobs.map((job) => (
                <div className="col-md-4 mb-4" key={job.id}>
                  <div
                    className="card shadow-sm h-100 hover-3d"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/company/applicants/${job.id}`)}
                  >
                    <div className="card-body text-center">
                      {/* Company Logo */}
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
        )}
      </div>
    </>
  );
}
