import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";

export default function UserInterviewDetails() {
  const [interviews, setInterviews] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    if (id) setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, "jobApplications"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      try {
        const rawData = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const data = docSnap.data();
            if (![2, 3, 5, 6, 7].includes(data.status)) return null;

            const jobSnap = await getDoc(doc(db, "postJob", data.jobId));
            const companySnap = await getDoc(doc(db, "users", data.companyId));

            return {
              id: docSnap.id,
              jobId: data.jobId,
              jobTitle: jobSnap.exists() ? jobSnap.data().title : "Unknown Job",
              companyName: companySnap.exists() ? companySnap.data().name : "Unknown Company",
              date: data.date?.toDate ? data.date.toDate() : null,
              meetingURL: data.meetingURL || data.link || "",
              isMeetingStarted: data.isMeetingStarted || false,
              isMeetingEnded: data.isMeetingEnded || false,
              status: data.status,
            };
          })
        );

        const cleaned = rawData.filter((item) => item !== null);
        setInterviews(cleaned);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching interviews:", err);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const getStatus = (interview) => {
    const s = interview.status;
    if (s === 3) return "Selected";
    if (s === 5) return "Rejected";
    if (!interview.date) return "Waiting for Schedule";

    const start = interview.date.getTime();
    const end = start + 30 * 60 * 1000;

    if (interview.isMeetingEnded) return "Ended";
    if (now >= start && now < end && interview.isMeetingStarted) return "Live";
    if (now >= end) return "Ended";
    if (now < start) return "Upcoming";
    return "Waiting";
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "jobApplications", id));
      setInterviews((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
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
              <h1 className="text-white font-weight-bold">Your Interviews</h1>
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
          <p className="text-center">No interviews scheduled.</p>
        ) : (
          <div className="row">
            {interviews.map((interview) => {
              const status = getStatus(interview);
              const canJoin =
                status === "Live" && !interview.isMeetingEnded && interview.meetingURL;

              return (
                <div className="col-md-4 mb-4" key={interview.id}>
                  <div className="card shadow p-3 h-100">
                    <h5>{interview.jobTitle}</h5>
                    <p><strong>Company:</strong> {interview.companyName}</p>
                    <p><strong>Date:</strong> {interview.date?.toLocaleDateString() || "N/A"}</p>
                    <p><strong>Time:</strong> {interview.date?.toLocaleTimeString() || "N/A"}</p>
                    <p><strong>Status:</strong> {status}</p>

                    {canJoin ? (
                      <a
                        href={interview.meetingURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success w-100"
                      >
                        Join Interview
                      </a>
                    ) : (
                      <button className="btn btn-secondary w-100" disabled>
                        {status === "Upcoming"
                          ? "Interview Not Started Yet"
                          : status === "Ended"
                            ? "Interview Ended"
                            : status === "Selected"
                              ? "🎉 You are Selected!"
                              : status === "Rejected"
                                ? "❌ You are Rejected"
                                : "Waiting"}
                      </button>
                    )}

                    {status === "Ended" && (
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
}





