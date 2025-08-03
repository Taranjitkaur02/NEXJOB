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
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";

export default function CompanyApplicants() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [load, setLoad] = useState(true);
  const companyId = sessionStorage.getItem("userId");

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
      setLoad(false);
    });
    return () => unsub();
  }, [jobId, companyId]);

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
      await setDoc(
        doc(db, "notifications", `${app.userId}_${jobId}_rejected`),
        {
          userId: app.userId,
          jobId,
          companyId,
          status: "rejected",
          timestamp: new Date(),
          seen: false,
          message: "Your application has been rejected.",
        }
      );
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
      await setDoc(
        doc(db, "notifications", `${app.userId}_${jobId}_selected`),
        {
          userId: app.userId,
          jobId,
          companyId,
          status: "selected",
          timestamp: new Date(),
          seen: false,
          message: "Congratulations! You have been selected for the job.",
        }
      );
      toast.success("User marked as Selected.");
    } catch (err) {
      console.error("Select error:", err);
      toast.error("Failed to update selection.");
    }
  };

  const handleStartMeeting = async (date, applicationId, meetingURL) => {
    if (!date) {
      toast.error("Scheduled date or time is missing.");
      return;
    }
    try {
      await updateDoc(doc(db, "jobApplications", applicationId), {
        isMeetingStarted: true,
        isMeetingEnded: false,
        status: 6,
      });
      toast.success("Meeting started!");
      window.open(meetingURL, "_blank");
    } catch (err) {
      console.error("Error starting meeting:", err);
      toast.error("Failed to start the meeting.");
    }
  };

  const handleEndMeeting = async (applicationId) => {
    try {
      await updateDoc(doc(db, "jobApplications", applicationId), {
        isMeetingStarted: false,
        isMeetingEnded: true,
        status: 7,
      });
      toast.success("Meeting ended.");
    } catch (err) {
      console.error("Error ending meeting:", err);
      toast.error("Failed to end meeting.");
    }
  };

  const handleChange = async (applicationId, status) => {
    try {
      await updateDoc(doc(db, "jobApplications", applicationId), {
        status,
      });
      toast.success("Status updated.");
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status.");
    }
  };

  return (
    <>
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
                <Link to="/company">Home</Link>{" "}
                <span className="mx-2 slash"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-5">
        {load ? (
          <div className="text-center my-5">
            <SyncLoader
              color="#89BA16"
              size={30}
              cssOverride={{ display: "block", margin: "0 auto" }}
              loading={load}
            />
          </div>
        ) : (
          <div className="row">
            {applications.length === 0 ? (
              <div className="col-12 text-center">
                <p>No applications submitted yet.</p>
              </div>
            ) : (
              applications.map((app) => {
                const currentTime = new Date();
                const scheduledTime = app.date?.seconds
                  ? new Date(app.date.seconds * 1000)
                  : null;

                return (
                  <div className="col-md-4 mb-4" key={app.id}>
                    <div className="card shadow rounded p-3 text-center d-flex flex-column h-100">
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

                      <div className="mt-auto">
                        <div className="row">
                          <div className="col-12">
                            {app.status === 1 && (
                              <div className="d-flex justify-content-center gap-3">
                                <Link
                                  className="btn btn-outline-success mx-2"
                                  to={`/company/schedule-interview/${app.jobId}/${app.id}`}
                                >
                                  Shortlist
                                </Link>
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => handleReject(app)}
                                >
                                  Reject
                                </button>
                              </div>
                            )}

                            {app.status === 2 && app.meetingURL && (
                              <div className="d-flex justify-content-center">
                                <button
                                  className="btn btn-outline-primary "
                                  disabled={!scheduledTime || currentTime < scheduledTime}
                                  onClick={() =>
                                    handleStartMeeting(app.date, app.id, app.meetingURL)
                                  }
                                >
                                  {!scheduledTime || currentTime < scheduledTime
                                    ? "Interview Not Yet Started"
                                    : "Start Interview"}
                                </button>
                              </div>
                            )}

                            {app.status === 6 && (
                              <div className="d-flex justify-content-center">
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => handleEndMeeting(app.id)}
                                >
                                  End Interview
                                </button>
                              </div>
                            )}

                            {app.status === 7 && (
                              <div className="d-flex justify-content-center gap-3 ">
                                <button
                                  className="btn btn-outline-success mx-2"
                                  onClick={() => handleChange(app.id, 3)}
                                >
                                  Placed
                                </button>
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => handleChange(app.id, 5)}
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {app.status === 2 && scheduledTime && (
                          <div className="mt-3 text-start">
                            <p>
                              <strong>Date:</strong>{" "}
                              {scheduledTime.toLocaleString()}
                            </p>
                            <p>
                              <strong>Link:</strong>{" "}
                              <a href={app.meetingURL} target="_blank" rel="noopener noreferrer">
                                {app.meetingURL}
                              </a>
                            </p>
                          </div>
                        )}

                        {[3, 5].includes(app.status) && (
                          <div className="mt-3">
                            <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                              {app.status === 3 ? "Selected" : "Rejected"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </>
  );
}
