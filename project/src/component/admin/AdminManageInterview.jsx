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
  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState("Loading...");
  const [userInfo, setUserInfo] = useState({});
  const [companyNames, setCompanyNames] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;

    const loadJobTitle = async () => {
      const jobSnap = await getDoc(doc(db, "postJob", jobId));
      setJobTitle(jobSnap.exists() ? jobSnap.data().title || "Untitled Job" : "Unknown Job");
    };

    const appQuery = query(
      collection(db, "jobApplications"),
      where("jobId", "==", jobId)
    );

    const unsubscribe = onSnapshot(appQuery, async (snapshot) => {
      const apps = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const userLookup = {};
      const companyLookup = {};

      for (const app of apps) {
        if (!userLookup[app.userId]) {
          const userSnap = await getDoc(doc(db, "users", app.userId));
          if (userSnap.exists()) {
            const data = userSnap.data();
            if (data.userType === 3) {
              userLookup[app.userId] = {
                name: data.name || "User",
                email: data.email || "N/A",
              };
            }
          }
        }

        if (!companyLookup[app.companyId]) {
          const compSnap = await getDoc(doc(db, "users", app.companyId));
          if (compSnap.exists()) {
            companyLookup[app.companyId] = compSnap.data().name || "Company";
          } else {
            companyLookup[app.companyId] = `Company ID: ${app.companyId}`;
          }
        }
      }

      setApplications(apps);
      setUserInfo(userLookup);
      setCompanyNames(companyLookup);
      setLoading(false);
    });

    loadJobTitle();
    return () => unsubscribe();
  }, [jobId]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await deleteDoc(doc(db, "jobApplications", id));
        Swal.fire("Deleted", "", "success");
      }
    });
  };

  return (
    <>
      <style>{`
        .interview-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .interview-card:hover {
          transform: perspective(1000px) translateZ(20px) scale(1.03);
          box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1), 0 0 20px rgba(137, 186, 22, 0.2);
        }
        @media (hover: none) {
          .interview-card:hover {
            transform: none;
            box-shadow: none;
          }
        }
      `}</style>

      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
      >
        <div className="container py-5">
          <h1 className="text-white">Applications for: {jobTitle}</h1>
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
        ) : applications.length === 0 ? (
          <p className="text-center">No applications found for this job.</p>
        ) : (
          <div className="row">
            {applications.map((app) => {
              const user = userInfo[app.userId] || { name: app.userId, email: "Unknown" };
              const companyName = companyNames[app.companyId] || `Company ID: ${app.companyId}`;

              // Corrected status mapping
              let statusText = "Applied";
              if (app.status === 1) statusText = "Shortlisted";
              else if (app.status === 2) statusText = "Interview Scheduled";
              else if (app.status === 3) statusText = "Placed";
              else if (app.status === 4) statusText = "Rejected";
              else if (app.status === 5) statusText = "Rejected (Final)";
              else if (app.status === 6) statusText = "Interview Started";
              else if (app.status === 7) statusText = "Interview Ended";
              else if (app.date?.seconds) statusText = "Interview Scheduled";

              const dateObj = app.date?.seconds ? new Date(app.date.seconds * 1000) : null;
              const formattedDate = dateObj ? dateObj.toLocaleDateString() : "Not Scheduled";
              const formattedTime = dateObj ? dateObj.toLocaleTimeString() : "-";

              return (
                <div className="col-md-4 mb-4" key={app.id}>
                  <div className="bg-white rounded shadow p-4 interview-card h-100">
                    <p><strong>User Name:</strong> {user.name}</p>
                    <p><strong>User Email:</strong> {user.email}</p>
                    <p><strong>Company:</strong> {companyName}</p>
                    <p><strong>Status:</strong> {statusText}</p>
                    <p><strong>Date:</strong> {formattedDate}</p>
                    <p><strong>Time:</strong> {formattedTime}</p>
                    <button
                      className="btn btn-danger btn-sm w-100"
                      onClick={() => handleDelete(app.id)}
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
