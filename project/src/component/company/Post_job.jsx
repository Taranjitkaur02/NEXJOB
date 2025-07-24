import { useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../Firebase";
import { toast } from "react-toastify";
import axios from "axios";

export default function Post_job() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Full Time");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [vacancies, setVacancies] = useState("");
  const [description, setDescription] = useState("");
  const [remote, setRemote] = useState(false);
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState({});
  const companyEmail = sessionStorage.getItem("email");
  const userId = sessionStorage.getItem("userId");

  const handleForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "images");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dhvmmiipj/image/upload`,
        formData
      );
      saveData(response.data.secure_url);
    } catch (error) {
      toast.error("Error uploading image: " + error.message);
    }
  };

  const saveData = async (Url) => {
    try {
      const data = {
        email: companyEmail,
        userId: userId, // ✅ include userId here
        title,
        location,
        jobType,
        salary,
        skills,
        qualification,
        experience,
        vacancies,
        description,
        remote,
        status: true,
        image: Url,
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "postJob"), data);
      toast.success("Job Posted Successfully");

      // Reset all fields
      setTitle("");
      setLocation("");
      setJobType("Full Time");
      setSalary("");
      setSkills("");
      setQualification("");
      setExperience("");
      setVacancies("");
      setDescription("");
      setRemote(false);
      setImage({});
      setImageName("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const changeImage = (e) => {
    setImageName(e.target.value);
    setImage(e.target.files[0]);
  };

  return (
    <div className="site-wrap">
      {/* Hero Section */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="text-white font-weight-bold">Post A Job</h1>
              <div className="custom-breadcrumbs">
                <Link to="/">Home</Link> <span className="mx-2 slash">/</span>
                <Link to="/company/post-job">Job</Link> <span className="mx-2 slash">/</span>
                <span className="text-white"><strong>Post a Job</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="site-section">
        <div className="container col-6">
          <form
            className="p-4 p-md-5 border rounded shadow-lg bg-white"
            onSubmit={handleForm}
            style={{ borderRadius: "20px" }}
          >
            <h3 className="text-black mb-4 border-bottom pb-2">Job Details</h3>

            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Software Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Delhi"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="remoteOption"
                checked={remote}
                onChange={(e) => setRemote(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="remoteOption">
                Remote Available
              </label>
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select
                className="form-control"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>

            <div className="form-group">
              <label>Salary (Monthly)</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 40000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Required Skills</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. HTML, CSS, JS"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Qualification</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. B.Tech, MCA"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Experience (Years)</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 2"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Number of Vacancies</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 3"
                value={vacancies}
                onChange={(e) => setVacancies(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Job Description</label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Write the job description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Upload Featured Image</label>
              <input
                type="file"
                className="form-control-file"
                value={imageName}
                onChange={changeImage}
              />
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block">
                  Save Job
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
