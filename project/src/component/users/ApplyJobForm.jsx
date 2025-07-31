import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../Firebase";
import {
  addDoc,
  collection,
  Timestamp,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";
import axios from "axios";
import { SyncLoader } from "react-spinners";

export default function ApplyJobForm() {
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [companyId, setCompanyId] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [jobExists, setJobExists] = useState(true);

  const { jobId } = useParams();
  const userId = sessionStorage.getItem("userId");
  const userEmail = sessionStorage.getItem("email");

  useEffect(() => {
    async function fetchJob() {
      try {
        const jobRef = doc(db, "postJob", jobId);
        const jobSnap = await getDoc(jobRef);
        if (jobSnap.exists()) {
          const jobData = jobSnap.data();
          if (!jobData.userId) {
            toast.error("Job is missing company info.");
            setJobExists(false);
          } else {
            setCompanyId(jobData.userId);
          }
        } else {
          toast.error("This job no longer exists.");
          setJobExists(false);
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        toast.error("Error loading job information.");
        setJobExists(false);
      } finally {
        setLoadingJob(false);
      }
    }

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload a resume.");
      return;
    }

    if (!companyId || !userId || !jobId) {
      toast.error("Missing required application details.");
      return;
    }

    try {
      const q = query(
        collection(db, "jobApplications"),
        where("userId", "==", userId),
        where("jobId", "==", jobId),
        where("companyId", "==", companyId)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        toast.warning("You have already applied for this job.");
        return;
      }

      const formData = new FormData();
      formData.append("file", resume);
      formData.append("upload_preset", "images");

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dhvmmiipj/image/upload",
        formData
      );

      const resumeUrl = uploadRes.data.secure_url;

      await addDoc(collection(db, "jobApplications"), {
        jobId,
        companyId,
        userId,
        userEmail,
        resume: resumeUrl,
        status: 1,
        createdAt: Timestamp.now(),
      });

      toast.success("Application submitted!");
      setResume(null);
      setResumeName("");
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Error submitting application: " + err.message);
    }
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
    setResumeName(e.target.value);
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
            <div className="col-md-6">
              <h1 className="text-white font-weight-bold">Apply for Job</h1>
              <div className="custom-breadcrumbs">
                <Link to="/">Home</Link>
                <span className="mx-2 slash">/</span>
                <Link to="/jobs">Jobs</Link>
                <span className="mx-2 slash">/</span>
                <span className="text-white"><strong>Apply</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container my-5">
        {loadingJob ? (
          <div className="d-flex justify-content-center my-5">
            <SyncLoader color="#89BA16" size={20} />
          </div>
        ) : !jobExists ? (
          <div className="alert alert-danger">This job does not exist.</div>
        ) : (
          <>
            <h2 className="mb-4">Apply Here</h2>
            <form
              onSubmit={handleSubmit}
              className="border p-4 bg-light rounded shadow-sm"
            >
              <div className="form-group mb-3">
                <label>Upload Resume</label>
                <input
                  type="file"
                  className="form-control"
                  value={resumeName}
                  onChange={handleFileChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!companyId}
              >
                Apply
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
