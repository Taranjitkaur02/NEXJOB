import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";

export default function ViewApplication() {
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [jobsMap, setJobsMap] = useState({});
  const [companyNames, setCompanyNames] = useState({});
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  const { companyId } = useParams();
  useEffect(() => {
    if (!companyId) return;

    const q = collection(db, "jobApplications");

    const unsub = onSnapshot(q, async (snapshot) => {
      const allApps = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredApps = allApps.filter(
        (app) => app.companyId === companyId
      );

      setApplications(filteredApps);

      await fetchJobsAndCompanies(filteredApps);
      setIsFullyLoaded(true);
    });

    return () => unsub();
  }, [companyId]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "interviews"), (snapshot) => {
      const interviewList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInterviews(interviewList);
    });

    return () => unsub();
  }, []);
  //fetch job and comapny name
  const fetchJobsAndCompanies = async (apps) => {
    const newJobsMap = {};
    const newCompanyNames = {};

    for (const app of apps) {
      if (!jobsMap[app.jobId]) {
        const jobRef = doc(db, "postJob", app.jobId);
        const jobSnap = await getDoc(jobRef);

        if (jobSnap.exists()) {
          const jobData = jobSnap.data();

          newJobsMap[app.jobId] = {
            jobTitle: jobData.title || "Untitled",
          };

          if (jobData.userId && !companyNames[jobData.userId]) {
            const userRef = doc(db, "users", jobData.userId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists() && userSnap.data().userType === 2) {
              newCompanyNames[jobData.userId] =
                userSnap.data().name || "Unnamed Company";
            }
          }
        }
      }
    }

    setJobsMap((prev) => ({ ...prev, ...newJobsMap }));
    setCompanyNames((prev) => ({ ...prev, ...newCompanyNames }));
  };
  //get interview date
  const getInterviewDate = (applicationId) => {
    const interview = interviews.find((i) => i.applicationId === applicationId);
    if (interview && interview.date) {
      try {
        const dateObj =
          interview.date instanceof Timestamp
            ? interview.date.toDate()
            : new Date(interview.date);

        return dateObj.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch (err) {
        console.error("Date error:", err);
        return "Invalid Date";
      }
    } else {
      return "No interview scheduled yet.";
    }
  };
  //delete the application
  const handleDelete = async (applicationId) => {
    try {
      await deleteDoc(doc(db, "jobApplications", applicationId));
      toast.success("Application deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete application.");
    }
  };

  return (
    <>
      <style>{`
        .hover-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .hover-card:hover {
        transform: perspective(1000px) translateZ(20px) scale(1.03);
        box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1), 0 0 20px rgba(137, 186, 22, 0.2);
        }


        @media (hover: none) {
          .hover-card:hover {
            transform: none;
            box-shadow: none;
          }
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
              <h1 className="text-white font-weight-bold">Applications</h1>
              <div className="custom-breadcrumbs">
                <span>Home</span> <span className="mx-2 slash"></span>
                <span>Applications</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="site-section services-section bg-light block__62849" id="next-section">
        <div className="container">
          {!isFullyLoaded ? (
            <div
              style={{
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SyncLoader color="#89BA16" size={20} />
            </div>
          ) : (
            <div className="row">
              {applications.length === 0 ? (
                <p className="text-center w-100">No applications found for this company.</p>
              ) : (
                applications.map((application) => {
                  const job = jobsMap[application.jobId];
                  const companyName = companyNames[application.companyId];

                  if (!job || !companyName) return null;

                  return (
                    <div
                      className="col-12 col-sm-6 col-lg-4 mb-4 mb-lg-5"
                      key={application.id}
                    >
                      <div className="card hover-card p-4 bg-white rounded shadow">
                        <div className="card-body">
                          <h4 className="text-center mb-3">{companyName}</h4>
                          <h5 className="card-title">{application.userEmail}</h5>
                          <p className="card-text">
                            Resume:{" "}
                            <a
                              href={application.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Resume
                            </a>
                          </p>
                          <p className="card-text">
                            Applied on:{" "}
                            {application.createdAt?.seconds
                              ? new Date(application.createdAt.seconds * 1000).toLocaleString()
                              : "Date not available"}
                          </p>
                          <p className="card-text">
                            <strong>Applied for:</strong> {job.jobTitle}
                          </p>
                          <p className="card-text">
                            <strong>Interview Date:</strong> {getInterviewDate(application.id)}
                          </p>
                          <button
                            className="btn btn-danger btn-sm mt-3 w-100"
                            onClick={() => handleDelete(application.id)}
                          >
                            Delete Application
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
