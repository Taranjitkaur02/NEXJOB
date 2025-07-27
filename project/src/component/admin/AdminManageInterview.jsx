import { useParams, Link } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { SyncLoader } from "react-spinners";

export default function AdminManageInterview() {
  const { jobId } = useParams();
  const [interviews, setInterviews] = useState([]);
  const [jobTitle, setJobTitle] = useState("Loading...");
  const [statusMap, setStatusMap] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [companyNames, setCompanyNames] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;

    const loadJobTitle = async () => {
      const jobSnap = await getDoc(doc(db, "postJob", jobId));
      if (jobSnap.exists()) {
        setJobTitle(jobSnap.data().title || "Untitled Job");
      } else {
        setJobTitle("Unknown Job");
      }
    };

    const interviewQuery = query(
      collection(db, "interviews"),
      where("jobId", "==", jobId)
    );

    const unsubscribe = onSnapshot(interviewQuery, async (snapshot) => {
      const allDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Deduplicate by applicationId — keep latest interview with scheduled date if available
      const latestInterviewMap = {};
      for (const doc of allDocs) {
        const existing = latestInterviewMap[doc.applicationId];
        if (
          !existing ||
          (!existing.date && doc.date) ||
          (doc.date?.toDate?.() > existing.date?.toDate?.())
        ) {
          latestInterviewMap[doc.applicationId] = doc;
        }
      }

      const interviewDocs = Object.values(latestInterviewMap);

      const statusLookup = {};
      const userLookup = {};
      const companyLookup = {};

      for (const interview of interviewDocs) {
        // ✅ Fetch jobApplication status
        const appSnap = await getDoc(doc(db, "jobApplications", interview.applicationId));
        if (appSnap.exists()) {
          const statusCode = appSnap.data().status;
          let statusText = "Applied";

          switch (statusCode) {
            case 1:
              statusText = "Shortlisted";
              break;
            case 2:
              statusText = "Rejected";
              break;
            case 3:
              statusText = "Interview Scheduled";
              break;
            case 4:
              statusText = "Rejected (Final)";
              break;
            case 5:
              statusText = "Selected";
              break;
            default:
              statusText = "Applied";
          }

          statusLookup[interview.applicationId] = statusText;
        }

        // ✅ Fetch user info
        if (!userLookup[interview.userId]) {
          const userSnap = await getDoc(doc(db, "users", interview.userId));
          if (userSnap.exists()) {
            const userData = userSnap.data();
            if (userData.userType === 3) {
              userLookup[interview.userId] = {
                name: userData.name || "User",
                email: userData.email || "N/A",
              };
            }
          }
        }

        // ✅ Fetch company name
        if (!companyLookup[interview.companyId]) {
          const compSnap = await getDoc(doc(db, "users", interview.companyId));
          if (compSnap.exists()) {
            companyLookup[interview.companyId] = compSnap.data().name || "Company";
          }
        }
      }

      setInterviews(interviewDocs);
      setStatusMap(statusLookup);
      setUserInfo(userLookup);
      setCompanyNames(companyLookup);
      setLoading(false);
    });

    loadJobTitle();
    return () => unsubscribe();
  }, [jobId]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Interview?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await deleteDoc(doc(db, "interviews", id));
        Swal.fire("Deleted", "", "success");
      }
    });
  };

  return (
    <>
      {/* Hero Section - Always Visible */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
      >
        <div className="container">
          <h1 className="text-white">Interviews for: {jobTitle}</h1>
          <Link
            to="/admin/manage-interviews"
            className="btn btn-sm mt-2"
            style={{ backgroundColor: "#89BA16", color: "#fff" }}
          >
            ⬅ Back to All Jobs
          </Link>
        </div>
      </section>

      <div className="container my-5">
        {loading ? (
          <div className="text-center my-5">
            <SyncLoader color="#89BA16" />
          </div>
        ) : interviews.length === 0 ? (
          <p className="text-center">No interviews found for this job.</p>
        ) : (
          <div className="row">
            {interviews.map((int) => {
              const user = userInfo[int.userId] || {
                name: int.userId,
                email: "Unknown",
              };
              const companyName = companyNames[int.companyId] || int.companyId;
              const status = statusMap[int.applicationId] || "Applied";

              return (
                <div className="col-md-4 mb-4" key={int.id}>
                  <div className="card shadow p-3">
                    <p>
                      <strong>User Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>User Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Company:</strong> {companyName}
                    </p>
                    <p>
                      <strong>Status:</strong> {status}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {int.date?.toDate?.().toLocaleString() || "Not Scheduled"}
                    </p>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(int.id)}
                    >
                      Delete
                    </button>
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

