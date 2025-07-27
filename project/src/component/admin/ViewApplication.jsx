import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../Firebase";
import { useParams, Link } from "react-router-dom";

export default function ViewApplication() {
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [jobs, setJobs] = useState([]);  // To store job details
  const { companyId } = useParams(); // Getting the companyId from the URL

  // Fetching job applications for the company
  useEffect(() => {
    if (!companyId) return;

    const fetchApplications = () => {
      const q = query(
        collection(db, "jobApplications"),
        where("companyId", "==", companyId) // Fetch only the applications related to this company
      );

      const unsub = onSnapshot(q, (snapshot) => {
        const applicationList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(applicationList);
      });

      return () => unsub(); // Clean up the subscription
    };

    fetchApplications();
  }, [companyId]);

  // Fetching interviews related to the applications
  useEffect(() => {
    if (!companyId) return;

    const fetchInterviews = () => {
      const q = query(
        collection(db, "interviews"),
        where("companyId", "==", companyId) // Fetch only the interviews related to this company
      );

      const unsub = onSnapshot(q, (snapshot) => {
        const interviewList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInterviews(interviewList);
      });

      return () => unsub(); // Clean up the subscription
    };

    fetchInterviews();
  }, [companyId]);

  // Fetch job title using jobId from the application
  useEffect(() => {
    const fetchJobs = () => {
      applications.forEach((application) => {
        const jobRef = doc(db, "postJob", application.jobId); // Get the job document reference
        getDoc(jobRef).then((jobDoc) => {
          if (jobDoc.exists()) {
            setJobs((prevJobs) => [
              ...prevJobs,
              { jobId: application.jobId, jobTitle: jobDoc.data().title, companyName: jobDoc.data().companyName },
            ]);
          }
        });
      });
    };

    if (applications.length > 0) {
      fetchJobs();
    }
  }, [applications]);

  // Helper function to get interview date (Only showing the date without time)
  const getInterviewDate = (applicationId) => {
    const interview = interviews.find((interview) => interview.applicationId === applicationId);

    if (interview && interview.date) {
      try {
        // Check if it's a Firestore Timestamp
        if (interview.date instanceof Timestamp) {
          const date = interview.date.toDate(); // Convert to JavaScript Date

          // Only show the date, without the time
          return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
          });
        } else if (typeof interview.date === "string") {
          // If it's a string, convert it manually
          const date = new Date(interview.date);

          // Only show the date, without the time
          return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
          });
        } else {
          return "Invalid Date"; // Fallback in case of error
        }
      } catch (error) {
        console.error("Error in date conversion: ", error);
        return "Invalid Date";
      }
    } else {
      return "No interview scheduled yet."; // If no interview date is found
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
              <h1 className="text-white font-weight-bold">Applications</h1>
              <div className="custom-breadcrumbs">
                <span>Home</span> <span className="mx-2 slash"></span>
                <span>Applications</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Display Section */}
      <section
        className="site-section services-section bg-light block__62849"
        id="next-section"
      >
        <div className="container">
          <div className="row">
            {applications.length === 0 ? (
              <p className="text-center">No applications found for this company.</p>
            ) : (
              applications.map((application) => {
                // Find the job title for the specific application
                const job = jobs.find((job) => job.jobId === application.jobId);

                return (
                  <div className="col-12 col-sm-6 col-lg-4 mb-4 mb-lg-5" key={application.id}>
                    {/* Card with Hover Effect */}
                    <div className="card shadow-lg rounded p-4 bg-white hover-card">
                      <div className="card-body">
                        {/* Company Name */}
                        <h4 className="text-center mb-3">{job ? job.companyName : "Company Name"}</h4>

                        {/* Card Content */}
                        <h5 className="card-title">{application.userEmail}</h5>
                        <p className="card-text">
                          Resume: <a href={application.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
                        </p>
                        <p className="card-text">
                          Applied on: {new Date(application.createdAt.seconds * 1000).toLocaleString()}
                        </p>

                        {/* Job Title for which the application was made */}
                        <p className="card-text">
                          <strong>Applied for: </strong>{job ? job.jobTitle : "Job not found"}
                        </p>

                        {/* Interview Scheduled Date */}
                        <p className="card-text">
                          <strong>Interview Date: </strong>
                          {getInterviewDate(application.id)} {/* Fetch interview date */}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
