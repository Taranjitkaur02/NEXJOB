import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
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
      await updateDoc(doc(db, "jobApplications", app.id), {
        shortlisted: true,
        status: 1,
      });

      const interviewId = `${jobId}_${app.userId}`;
      await setDoc(doc(db, "interviews", interviewId), {
        jobId,
        companyId,
        userId: app.userId,
        applicationId: app.id,
        date: null,
        link: "",
        isMeetingStarted: false,
        isMeetingEnded: false,
        createdAt: new Date().toISOString(),
      });

      await setDoc(doc(db, "notifications", `${app.userId}_${jobId}`), {
        userId: app.userId,
        jobId,
        companyId,
        status: "shortlisted",
        timestamp: new Date(),
        seen: false,
        message: "You have been shortlisted for an interview.",
      });

      toast.success("User shortlisted!");
      navigate(`/company/schedule-interview/${jobId}/${app.id}`);
    } catch (err) {
      console.error("Shortlist error:", err);
      toast.error("Failed to shortlist user.");
    }
  };

  const handleReject = async (app) => {
    try {
      await updateDoc(doc(db, "jobApplications", app.id), {
        status: 4,
      });

      const interviewId = `${jobId}_${app.userId}`;
      await setDoc(doc(db, "interviews", interviewId), {
        jobId,
        companyId,
        userId: app.userId,
        applicationId: app.id,
        date: null,
        link: "",
        isMeetingStarted: false,
        isMeetingEnded: false,
        createdAt: new Date().toISOString(),
      });

      await setDoc(doc(db, "notifications", `${app.userId}_${jobId}_rejected`), {
        userId: app.userId,
        jobId,
        companyId,
        status: "rejected",
        timestamp: new Date(),
        seen: false,
        message: "Your application has been rejected.",
      });

      setApplications((prev) => prev.filter((item) => item.id !== app.id));
      toast.success("User rejected.");
    } catch (err) {
      console.error("Reject error:", err);
      toast.error("Failed to reject user.");
    }
  };

  const handleSelect = async (app) => {
    try {
      await updateDoc(doc(db, "jobApplications", app.id), {
        status: 5,
      });

      await setDoc(doc(db, "notifications", `${app.userId}_${jobId}_selected`), {
        userId: app.userId,
        jobId,
        companyId,
        status: "selected",
        timestamp: new Date(),
        seen: false,
        message: "Congratulations! You have been selected for the job.",
      });

      toast.success("User marked as Selected.");
    } catch (err) {
      console.error("Select error:", err);
      toast.error("Failed to update selection.");
    }
  };

  return (
    <>
     
      <style>{`
        .hover-effect {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-effect:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
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
              <h1 className="text-white font-weight-bold">Applicants</h1>
              <div className="custom-breadcrumbs">
                <Link to="/admin">Home</Link>{" "}
                <span className="mx-2 slash"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <div className="container my-5">
        
        <div className="row">
          {applications.length === 0 ? (
            <div className="col-12 text-center">
              <p>No applications submitted yet.</p>
            </div>
          ) : (
            applications.map((app) => (
              <div className="col-md-4 mb-4" key={app.id}>
                <div className="card shadow rounded p-3 text-center d-flex flex-column h-100 hover-effect">
                  <img
                    src={app.resume}
                    alt="Resume"
                    className="img-fluid mb-3"
                    style={{
                      height: "180px",
                      objectFit: "contain",
                      borderRadius: "8px",
                      cursor: "zoom-in",
                    }}
                    onClick={() => window.open(app.resume, "_blank")}
                  />
                  <p className="text-muted mb-1">{app.userEmail}</p>
                  <p className="fw-bold">
                    Status:{" "}
                    {app.status === 5
                      ? "Selected"
                      : app.status === 4
                      ? "Rejected"
                      : app.status === 1
                      ? "Shortlisted"
                      : "Applied"}
                  </p>

                  {/* Buttons */}
                  <div className="mt-auto">
                    <div className="row g-2">
                      <div className="col-6">
                        {app.status === 1 ? (
                          <button
                            className="btn btn-outline-primary btn-sm w-100"
                            onClick={() =>
                              navigate(
                                `/company/schedule-interview/${jobId}/${app.id}`
                              )
                            }
                          >
                            <i className="bi bi-calendar-check me-1"></i>{" "}
                            Interview
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-success btn-sm w-100"
                            onClick={() => handleShortlist(app)}
                          >
                            <i className="bi bi-check-circle me-1"></i>{" "}
                            Shortlist
                          </button>
                        )}
                      </div>
                      <div className="col-6">
                        <button
                          className="btn btn-outline-danger btn-sm w-100"
                          onClick={() => handleReject(app)}
                        >
                          <i className="bi bi-x-circle me-1"></i> Reject
                        </button>
                      </div>
                      <div className="col-12 mt-2">
                        <button
                          className="btn btn-outline-info btn-sm w-100"
                          onClick={() => handleSelect(app)}
                        >
                          <i className="bi bi-star me-1"></i> Select
                        </button>
                      </div>
                    </div>
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


