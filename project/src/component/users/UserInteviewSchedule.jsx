import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, Auth } from "../../Firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { onAuthStateChanged } from "firebase/auth";

// Format Firebase Timestamp to readable date and time
const formatDateTime = (timestamp) => {
  if (timestamp instanceof Object && timestamp.toDate) {
    const dateObj = timestamp.toDate();
    const date = dateObj.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const time = dateObj.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return { date, time };
  }
  return { date: "-", time: "-" };
};

export default function UserInterviewSchedule() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        toast.error("Please log in to view your interviews.");
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    const q = query(
      collection(db, "interviews"),
      where("userId", "==", currentUserId)
    );

    const unsubscribe = onSnapshot(
      q,
      async (querySnapshot) => {
        if (!querySnapshot.empty) {
          try {
            const interviewList = [];

            for (const docSnap of querySnapshot.docs) {
              const interviewData = docSnap.data();

              const jobRef = doc(db, "postJob", interviewData.jobId);
              const jobSnap = await getDoc(jobRef);
              if (!jobSnap.exists()) continue;

              const companyRef = doc(db, "users", interviewData.companyId);
              const companySnap = await getDoc(companyRef);

              if (companySnap.exists()) {
                interviewList.push({
                  id: docSnap.id,
                  ...interviewData,
                  companyName: companySnap.data().name || "Unknown",
                  companyLocation: companySnap.data().location || "Unknown",
                  companyEmail: companySnap.data().email || "Unknown",
                });
              }
            }

            setMeetings(interviewList);
          } catch (error) {
            console.error("Error fetching interviews:", error);
            toast.error("Failed to fetch interviews.");
          }
        } else {
          setMeetings([]);
        }

        setLoading(false);
      },
      (error) => {
        console.error("Error in onSnapshot:", error);
        toast.error("Failed to fetch interviews.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUserId]);

  const handleJoin = (link) => {
    if (link) {
      window.open(link, "_blank");
    } else {
      toast.error("Meeting link not available.");
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
              <h1 className="text-white font-weight-bold">Your Scheduled Interviews</h1>
              <div className="custom-breadcrumbs">
                <Link to="/">Home</Link> <span className="mx-2 slash"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-5 col-md-8">
        {loading ? (
          <SyncLoader
            color="#89BA16"
            size={15}
            cssOverride={{ display: "block", margin: "50px auto" }}
          />
        ) : meetings.length > 0 ? (
          meetings.map((meeting) => {
            const { date, time } = formatDateTime(meeting.date);

            return (
              <div className="card shadow p-4 mb-4" key={meeting.id}>
                <h4 className="mb-3">Interview Details</h4>
                <p><strong>Company:</strong> {meeting.companyName}</p>
                <p><strong>Location:</strong> {meeting.companyLocation}</p>
                <p><strong>Email:</strong> {meeting.companyEmail}</p>
                <p><strong>Date:</strong> {date}</p>
                <p><strong>Time:</strong> {time}</p>

                {meeting.isMeetingEnded ? (
                  <>
                    <p className="text-danger">The interview has ended.</p>
                    <p>
                      <strong>Meeting Link:</strong>{" "}
                      <span className="text-muted">No longer available</span>
                    </p>
                  </>
                ) : meeting.isMeetingStarted ? (
                  <>
                    <p>
                      <strong>Meeting Link:</strong>{" "}
                      {meeting.link ? (
                        <a href={meeting.link} target="_blank" rel="noopener noreferrer">
                          {meeting.link}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                    <button className="btn btn-primary" onClick={() => handleJoin(meeting.link)}>
                      Join Interview
                    </button>
                  </>
                ) : (
                  <p className="text-muted">The interview has not started yet.</p>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center">No interviews scheduled for this user.</p>
        )}
      </div>
    </>
  );
}
