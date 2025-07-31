import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { toast } from "react-toastify";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");

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

      {loading ? (
        <div className="text-center my-5">
          <SyncLoader color="#89BA16" />
        </div>
      ) : (
        <>
          {userData && (
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
          )}
        </>
      )}
    </>
  );
}
