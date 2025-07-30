import { useEffect, useState } from "react";
import { db } from "../../Firebase";
import {
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateCompany() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    contact: "",
    location: "",
    logo: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "users"), where("userId", "==", userId));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const userData = snap.docs[0].data();
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            website: userData.website || "",
            contact: userData.contact || "",
            location: userData.location || "",
            logo: userData.logo || "",
          });
        } else {
          navigate("/company");
        }
      } catch (error) {
        toast.error("Error loading profile");
        navigate("/company");
      }
    };
    fetchData();
  }, [userId, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (image) {
      const formUpload = new FormData();
      formUpload.append("file", image);
      formUpload.append("upload_preset", "images");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dhvmmiipj/image/upload",
          formUpload
        );
        await updateData(res.data.secure_url);
      } catch (err) {
        toast.error("Image upload failed.");
        setLoading(false);
      }
    } else {
      await updateData(formData.logo);
    }
  };

  const updateData = async (logoURL) => {
    try {
      const q = query(collection(db, "users"), where("userId", "==", userId));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const docId = snap.docs[0].id;
        const docRef = doc(db, "users", docId);

        await updateDoc(docRef, {
          ...formData,
          logo: logoURL,
        });

        toast.success("Profile updated successfully!");
        navigate("/company");
      } else {
        toast.error("User not found");
        navigate("/company");
      }
    } catch (err) {
      toast.error("Failed to update profile.");
      navigate("/company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto text-center">
              <h1 className="text-white font-weight-bold">
                Update Company Profile
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <div className="container mt-5 mb-5">
        <div className="card p-5 shadow-lg border border-2 rounded-4 bg-light col-md-8 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Company Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Website</label>
              <input
                type="url"
                className="form-control"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Contact</label>
              <input
                type="tel"
                className="form-control"
                name="contact"
                maxLength={10}
                pattern="[0-9]{10}"
                required
                value={formData.contact}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary px-4 py-2 shadow">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
