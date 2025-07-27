// AdminJobsList.js
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
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
      >
        <div className="container">
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
              <div className="col-md-4 mb-4" key={job.id}>
                <div className="card shadow text-center p-3">
                  {job.featuredImage && (
                    <img
                      src={job.featuredImage}
                      alt="Company"
                      className="img-fluid mb-3"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  )}
                  <h5 className="mb-2">{job.title || "Untitled Job"}</h5>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/admin/interview/${job.id}`)}
                  >
                    View Interviews
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
