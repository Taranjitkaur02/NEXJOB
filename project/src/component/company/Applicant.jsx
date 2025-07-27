import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function CompanyApplicants() {
  const [applications, setApplications] = useState([]);
  const { jobId } = useParams();
  const companyId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!jobId || !companyId) return;

    const q = query(
      collection(db, "jobApplications"),
      where("jobId", "==", jobId),
      where("companyId", "==", companyId)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const appList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setApplications(appList);
    });

    return () => unsub();
  }, [jobId, companyId]);

  const handleShortlist = async (app) => {
    try {
      // Step 1: Update the application with shortlisted flag
      const appRef = doc(db, "jobApplications", app.id);
      await updateDoc(appRef, { shortlisted: true });

      // Step 2: Create a notification
      const notificationRef = doc(db, "notifications", `${app.userId}_${jobId}`);
      await setDoc(notificationRef, {
        userId: app.userId,
        jobId,
        companyId,
        status: "shortlisted",
        timestamp: new Date(),
        seen: false,
        message: "You have been shortlisted for an interview.",
      });

      // Step 3: Navigate to schedule interview page
      navigate(`/company/schedule-interview/${jobId}/${app.id}`);
    } catch (err) {
      console.error("Failed to notify user:", err);
      toast.error("Failed to notify user.");
    }
  };

  const handleReject = async (appId) => {
    try {
      await deleteDoc(doc(db, "jobApplications", appId));
      toast.success("Application rejected.");
    } catch (err) {
      console.error("Error rejecting application:", err);
      toast.error("Failed to reject application.");
    }
  };

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

      {/* Applications Section */}
      <div className="container my-5">
        <h2 className="mb-4">Applications for Job</h2>
        <div className="row">
          {applications.length === 0 ? (
            <div className="col-12 text-center">
              <p>No applications submitted yet.</p>
            </div>
          ) : (
            applications.map((app) => (
              <div className="col-md-4 mb-4" key={app.id}>
                <div className="card shadow rounded p-3 text-center">
                  <img
                    src={app.resume}
                    alt="Resume Preview"
                    className="img-fluid mb-3"
                    style={{
                      height: "180px",
                      objectFit: "contain",
                      borderRadius: "8px",
                      cursor: "zoom-in",
                    }}
                    onClick={() => window.open(app.resume, "_blank")}
                  />
                  <p className="text-muted">{app.userEmail}</p>

                  <div className="d-flex justify-content-center flex-wrap mt-2">
                    <button
                      className="btn btn-success btn-lg mx-2 mb-2"
                      onClick={() => handleShortlist(app)}
                    >
                      <i className="fa fa-check me-1"></i> Shortlist
                    </button>
                    <button
                      className="btn btn-danger btn-lg mx-2 mb-2"
                      onClick={() => handleReject(app.id)}
                    >
                      <i className="fa fa-times me-1"></i> Reject
                    </button>
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
