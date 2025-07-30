import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const UserInterviewDetails = () => {
  const [interviews, setInterviews] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    if (id) {
      setUserId(id);
    } else {
      console.warn("No userId found in sessionStorage.");
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, "interviews"), where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      try {
        const rawData = await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const data = docSnap.data();

            const jobSnap = await getDoc(doc(db, "postJob", data.jobId));
            const companySnap = await getDoc(doc(db, "users", data.companyId));

            return {
              id: docSnap.id,
              jobId: data.jobId,
              jobTitle: jobSnap.exists() ? jobSnap.data().title : "Unknown Job",
              companyName: companySnap.exists() ? companySnap.data().name : "Unknown Company",
              interviewDate: data.date?.toDate ? data.date.toDate() : null,
              interviewLink: data.link || "",
              isMeetingStarted: data.isMeetingStarted || false,
              isMeetingEnded: data.isMeetingEnded || false,
              status: data.status ?? null,
            };
          })
        );

        const filteredData = rawData.filter(
          (item) => item.status !== 2 && item.status !== 4
        );

        const deduped = Object.values(
          filteredData.reduce((acc, curr) => {
            const existing = acc[curr.jobId];
            if (
              !existing ||
              (!existing.interviewDate && curr.interviewDate) ||
              (curr.interviewDate > existing.interviewDate)
            ) {
              acc[curr.jobId] = curr;
            }
            return acc;
          }, {})
        );

        setInterviews(deduped);
        setLoading(false);
      } catch (error) {
        console.error("Error processing interviews:", error);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const getStatus = (interview) => {
    const status = interview.status;

    if (status === 5) return "Selected";
    if (interview.isMeetingEnded) return "Ended";

    if (!interview.interviewDate) {
      if (status === 1) return "Shortlisted";
      return "Rejected";
    }

    const start = interview.interviewDate;
    const end = new Date(start.getTime() + 30 * 60 * 1000);

    if (now >= end) return "Ended";
    if (now >= start && now < end) return "Live";
    return "Upcoming";
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "interviews", id));
      setInterviews((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete interview:", error);
    }
  };

  return (
    <>
     
      <style>{`
        .interview-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 12px;
        }

        .interview-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.12);
        }

        .interview-card .btn {
          transition: transform 0.2s ease;
        }

        .interview-card .btn:hover {
          transform: scale(1.03);
        }
      `}</style>

      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">Schedule Interview</h1>
              <div className="custom-breadcrumbs">
                <Link to="/">Home</Link>
                <span className="mx-2 slash">/</span>
                <span className="text-white">Interviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-5">
        {loading ? (
          <div className="text-center my-5">
            <SyncLoader color="#89BA16" size={15} />
          </div>
        ) : interviews.length === 0 ? (
          <p>No interviews scheduled.</p>
        ) : (
          <div className="row">
            {interviews.map((interview) => {
              const status = getStatus(interview);
              const isJoinAvailable =
                status === "Live" &&
                !interview.isMeetingEnded &&
                !!interview.interviewLink;

              return (
                <div className="col-md-4 mb-4" key={interview.id}>
                  <div className="card shadow p-3 h-100 interview-card">
                    <h5>{interview.jobTitle}</h5>
                    <p><strong>Company:</strong> {interview.companyName}</p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {interview.interviewDate
                        ? interview.interviewDate.toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Time:</strong>{" "}
                      {interview.interviewDate
                        ? interview.interviewDate.toLocaleTimeString()
                        : "N/A"}
                    </p>
                    <p><strong>Status:</strong> {status}</p>

                    {isJoinAvailable ? (
                      <a
                        href={interview.interviewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn w-100 mt-2"
                        style={{ backgroundColor: "#89BA16", color: "white" }}
                      >
                        Join Interview
                      </a>
                    ) : (
                      <button
                        className="btn w-100 mt-2"
                        style={{ backgroundColor: "#89BA16", color: "white" }}
                        disabled
                      >
                        {status === "Ended"
                          ? "Interview Ended"
                          : status === "Upcoming"
                          ? "Interview Not Started Yet"
                          : status === "Shortlisted"
                          ? "Waiting for Schedule"
                          : "Not Available"}
                      </button>
                    )}

                    {(status === "Ended" || status === "Rejected") && (
                      <button
                        className="btn btn-danger w-100 mt-2"
                        onClick={() => handleDelete(interview.id)}
                      >
                        Delete Interview
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default UserInterviewDetails;



