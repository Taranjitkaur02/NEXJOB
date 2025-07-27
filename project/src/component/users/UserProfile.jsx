import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  getDocs
} from "firebase/firestore";
import { db } from "../../Firebase";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [shortlistedJobs, setShortlistedJobs] = useState([]);

  const userId = sessionStorage.getItem("userId");
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        toast.error("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "userProfile", userId);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const data = snap.data();
          setUserData({ id: userId, ...data });
          setNewName(data.fullName || "");
        } else {
          await setDoc(userRef, { fullName: "", email, resumeURL: "" });
          setUserData({ id: userId, fullName: "", email, resumeURL: "" });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        toast.error("Error loading profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, email]);

  useEffect(() => {
    if (!userId) return;

    const unsub = onSnapshot(
      query(
        collection(db, "notifications"),
        where("userId", "==", userId),
        where("status", "==", "shortlisted")
      ),
      async (snapshot) => {
        const results = [];
        for (const docSnap of snapshot.docs) {
          const data = docSnap.data();
          const jobId = data.jobId;
          const companyId = data.companyId;

          const jobDoc = await getDoc(doc(db, "postJob", jobId));
          const companyDoc = await getDoc(doc(db, "users", companyId));

          let interviewDate = null;
          let interviewTime = null;

          const interviewQuery = query(
            collection(db, "interviews"),
            where("jobId", "==", jobId),
            where("userId", "==", userId)
          );
          const interviewSnap = await getDocs(interviewQuery);
          if (!interviewSnap.empty) {
            const interviewData = interviewSnap.docs[0].data();
            interviewDate = interviewData.date;
            interviewTime = interviewData.time;
          }

          if (jobDoc.exists() && companyDoc.exists()) {
            results.push({
              id: docSnap.id,
              jobTitle: jobDoc.data().title,
              jobImage: jobDoc.data().image || "/assets/images/default.png",
              companyName: companyDoc.data().name || "Unknown Company",
              interviewDate,
              interviewTime,
            });
          }
        }
        setShortlistedJobs(results);
      }
    );

    return () => unsub();
  }, [userId]);

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      toast.error("Please select a resume image.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(resumeFile.type)) {
      toast.error("Only JPG, JPEG or PNG images are allowed.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", resumeFile);
      formData.append("upload_preset", "images");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dhvmmiipj/image/upload",
        formData
      );

      const imageURL = res.data.secure_url;

      await updateDoc(doc(db, "userProfile", userId), {
        resumeURL: imageURL,
      });

      setUserData((prev) => ({ ...prev, resumeURL: imageURL }));
      toast.success("Resume image uploaded!");
      setResumeFile(null);
      setResumeName("");
    } catch (err) {
      console.error("Resume upload error:", err);
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleNameUpdate = async () => {
    if (!newName.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    try {
      await updateDoc(doc(db, "userProfile", userId), {
        fullName: newName.trim(),
      });

      setUserData((prev) => ({ ...prev, fullName: newName.trim() }));
      setEditingName(false);
      toast.success("Name updated.");
    } catch (err) {
      console.error("Update name failed:", err);
      toast.error("Failed to update name.");
    }
  };

  const handleDeleteNotification = async (notifId) => {
    try {
      await deleteDoc(doc(db, "notifications", notifId));
      setShortlistedJobs((prev) => prev.filter((job) => job.id !== notifId));
      toast.success("Notification removed.");
    } catch (err) {
      console.error("Failed to delete notification:", err);
      toast.error("Failed to remove notification.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <SyncLoader color="#89BA16" />
      </div>
    );
  }

  if (!userData) return null;

  return (
    <>
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">My Profile</h1>
              <div className="custom-breadcrumbs">
                <Link to="/">Home</Link> <span className="mx-2 slash" /> <span>Profile</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-5 col-md-8">
        <div className="card shadow p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            {editingName ? (
              <>
                <input
                  type="text"
                  className="form-control me-2"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button className="btn btn-success me-2" onClick={handleNameUpdate}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setEditingName(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="mb-0">{userData.fullName || "Unnamed User"}</h3>
                <button className="btn btn-outline-primary" onClick={() => setEditingName(true)}>
                  Edit Name
                </button>
              </>
            )}
          </div>

          <p><strong>Email:</strong> {userData.email}</p>

          <hr />

          <h5 className="mb-3">Resume (Image)</h5>
          {userData.resumeURL ? (
            <div className="mb-3">
              <img
                src={userData.resumeURL}
                alt="Resume"
                className="img-fluid border rounded"
                style={{ maxHeight: "400px" }}
              />
              <p className="mt-2">
                <a href={userData.resumeURL} target="_blank" rel="noopener noreferrer">
                  View Full Image
                </a>
              </p>
            </div>
          ) : (
            <p className="text-muted">No resume uploaded yet.</p>
          )}

          <div className="mb-3">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              className="form-control"
              onChange={(e) => {
                setResumeFile(e.target.files[0]);
                setResumeName(e.target.value);
              }}
            />
          </div>

          <button
            className="btn btn-success"
            onClick={handleResumeUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : userData.resumeURL ? "Update Resume Image" : "Upload Resume Image"}
          </button>
        </div>
      </div>

      {/* Shortlisted Notification Cards */}
      <div className="container my-5">
        <h4 className="mb-4">Shortlisted Notifications</h4>
        <div className="row">
          {shortlistedJobs.length === 0 ? (
            <p className="text-muted">No shortlist notifications yet.</p>
          ) : (
            shortlistedJobs.map((item, index) => (
              <div className="col-12 col-sm-6 col-lg-4 mb-4 mb-lg-5" key={index}>
                <div className="block__16443 d-block p-4 bg-white shadow rounded text-center">
                  <img
                    className="img-fluid mb-3"
                    src={item.jobImage}
                    alt="Job"
                    style={{ borderRadius: "50%", maxHeight: "100px" }}
                  />
                  <h3>{item.jobTitle}</h3>
                  <p className="text-primary">{item.companyName}</p>
                  <p className="fw-bold text-success fs-6">You are shortlisted!</p>
                  {item.interviewDate && item.interviewTime && (
                    <p className="fw-bold text-dark fs-6">
                      Interview scheduled for <br />
                      <span className="text-info">{item.interviewDate}</span> at <span className="text-info">{item.interviewTime}</span>
                    </p>
                  )}
                  <div className="mt-2">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteNotification(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

