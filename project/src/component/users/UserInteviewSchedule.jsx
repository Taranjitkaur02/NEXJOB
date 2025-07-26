import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db, Auth } from "../../Firebase"; // Firebase setup file
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { onAuthStateChanged } from "firebase/auth"; // Importing Firebase Auth listener

export default function UserInterviewSchedule() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null); // State to store current user ID

  // Get the logged-in user's ID dynamically using Firebase Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid); // Set the current user ID
      } else {
        toast.error("Please log in to view your interviews.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUserId) {
      return; // If no user ID is set, don't proceed
    }

    console.log(" Fetching interviews for userId:", currentUserId);

    // Fetch only the interviews where the `userId` matches the logged-in user's ID
    const q = query(collection(db, "interviews"), where("userId", "==", currentUserId));

    const unsubscribe = onSnapshot(
      q,
      async (querySnapshot) => {
        if (!querySnapshot.empty) {
          const interviewList = [];
          
          // Loop through each interview and fetch the corresponding company data
          for (const docSnap of querySnapshot.docs) {
            const interviewData = docSnap.data();
            const companyRef = doc(db, "users", interviewData.companyId);  // Assuming `companyId` is stored in each interview
            const companySnap = await getDoc(companyRef);
            
            if (companySnap.exists()) {
              interviewList.push({
                id: docSnap.id,
                ...interviewData,
                companyName: companySnap.data().name,  // Add company name to the interview data
                companyLocation: companySnap.data().location, // Add company location
                companyEmail: companySnap.data().email,  // Add company email
              });
            }
          }
          
          console.log(" Found interviews with company data:", interviewList);
          setMeetings(interviewList);
        } else {
          console.warn(" No interviews found for userId:", currentUserId);
          setMeetings([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error(" Error fetching interviews:", error);
        toast.error("Failed to fetch interviews.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUserId]); // Depend on currentUserId to refetch on user change

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
          meetings.map((meeting) => (
            <div className="card shadow p-4 mb-4" key={meeting.id}>
              <h4 className="mb-3">Interview Details</h4>
              <p>
                <strong>Company:</strong> {meeting.companyName || "N/A"}
              </p>
              <p>
                <strong>Location:</strong> {meeting.companyLocation || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {meeting.companyEmail || "N/A"}
              </p>
              <p>
                <strong>Date:</strong> {meeting.date || "N/A"}
              </p>
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
              {meeting.isMeetingStarted && !meeting.isMeetingEnded ? (
                <button className="btn btn-primary" onClick={() => handleJoin(meeting.link)}>
                  Join Interview
                </button>
              ) : meeting.isMeetingEnded ? (
                <p className="text-danger">The interview has ended.</p>
              ) : (
                <p className="text-muted">The interview has not started yet.</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center">No interviews scheduled for this user.</p>
        )}
      </div>
    </>
  );
}
