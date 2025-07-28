import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

export default function AdminJobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "postJob"), (snapshot) => {
      const jobList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* 3D Card Animation */}
      <style>{`
        .job-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .job-card:hover {
          transform: perspective(1000px) rotateX(3deg) rotateY(3deg) scale(1.03);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1), 0 0 20px rgba(137, 186, 22, 0.2);
        }

        @media (hover: none) {
          .job-card:hover {
            transform: none;
            box-shadow: none;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
      >
        <div className="container py-5">
          <h1 className="text-white">All Job Listings</h1>
        </div>
      </section>

      <div className="container my-5">
        {loading ? (
          <div className="text-center">
            <SyncLoader color="#89BA16" />
          </div>
        ) : (
          <div className="row">
            {jobs.map((job) => (
              <div className="col-12 col-sm-6 col-lg-4 mb-4" key={job.id}>
                <div className="bg-white shadow rounded p-4 d-flex flex-column h-100 job-card">
                  <div className="text-center mb-3">
                    <img
                      src={
                        job.companyImage || job.image || job.featuredImage || "/assets/images/default-company.png"
                      }
                      alt="Company"
                      className="img-fluid rounded-circle"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <h5 className="text-center mb-2">{job.title || "Untitled Job"}</h5>

                  <p className="mb-1 text-muted text-center">
                    <i className="bi bi-geo-alt me-2"></i>
                    {job.location || "Not specified"}
                  </p>
                  <p className="mb-1 text-muted text-center">
                    <i className="bi bi-briefcase me-2"></i>
                    {job.jobType || "Type not defined"}
                  </p>

                  <div className="mt-auto">
                    <button
                      className="btn btn-outline-primary w-100 mt-3"
                      onClick={() => navigate(`/admin/interview/${job.id}`)}
                    >
                      View Interviews
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}


