import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Auth, db } from "../../Firebase";
import { Timestamp, setDoc, doc } from "firebase/firestore";
import Select from "react-select";


// Assuming you already have the cities array
const cityOptions = [
  { value: 'amritsar', label: 'Amritsar' },
  { value: 'jalandhar', label: 'Jalandhar' },
  { value: 'ludhiana', label: 'Ludhiana' },
  { value: 'patiala', label: 'Patiala' },
  { value: 'bathinda', label: 'Bathinda' },
  { value: 'mohali', label: 'Mohali' },
  { value: 'hoshiarpur', label: 'Hoshiarpur' },
  { value: 'moga', label: 'Moga' },
  { value: 'ferozepur', label: 'Ferozepur' },
  { value: 'kapurthala', label: 'Kapurthala' },
  { value: 'tarn-taran', label: 'Tarn Taran' },
  { value: 'faridkot', label: 'Faridkot' },
  { value: 'rupnagar', label: 'Rupnagar' },
  { value: 'sangrur', label: 'Sangrur' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'chennai', label: 'Chennai' },
  { value: 'kolkata', label: 'Kolkata' },
  { value: 'hyderabad', label: 'Hyderabad' },
  { value: 'pune', label: 'Pune' },
  { value: 'ahmedabad', label: 'Ahmedabad' },
  { value: 'chandigarh', label: 'Chandigarh' },
  { value: 'surat', label: 'Surat' },
  { value: 'jaipur', label: 'Jaipur' },
  { value: 'lucknow', label: 'Lucknow' },
  { value: 'indore', label: 'Indore' },
  { value: 'patna', label: 'Patna' },
  { value: 'bhopal', label: 'Bhopal' },
  { value: 'nagpur', label: 'Nagpur' },
  { value: 'kanpur', label: 'Kanpur' },
  { value: 'vadodara', label: 'Vadodara' },
  { value: 'coimbatore', label: 'Coimbatore' },
  { value: 'trivandrum', label: 'Trivandrum' },
  { value: 'rajkot', label: 'Rajkot' },
  { value: 'ranchi', label: 'Ranchi' },
  { value: 'vijayawada', label: 'Vijayawada' },
  { value: 'noida', label: 'Noida' },
  { value: 'mysore', label: 'Mysore' },
  { value: 'patiala', label: 'Patiala' },
  { value: 'jamshedpur', label: 'Jamshedpur' },
  { value: 'aurangabad', label: 'Aurangabad' },
  { value: 'belgaum', label: 'Belgaum' },
  { value: 'tamilnadu', label: 'Tamil Nadu' },
  { value: 'meerut', label: 'Meerut' },
  { value: 'faridabad', label: 'Faridabad' },
  { value: 'howrah', label: 'Howrah' },
  { value: 'dhanbad', label: 'Dhanbad' },
  { value: 'ludhiana', label: 'Ludhiana' },
  { value: 'jodhpur', label: 'Jodhpur' },
  { value: 'kanchipuram', label: 'Kanchipuram' },
  { value: 'ghaziabad', label: 'Ghaziabad' },
  { value: 'gwalior', label: 'Gwalior' },
  { value: 'shimla', label: 'Shimla' },
  { value: 'mussoorie', label: 'Mussoorie' },
  { value: 'kannur', label: 'Kannur' },
  { value: 'nagapattinam', label: 'Nagapattinam' },
  { value: 'puducherry', label: 'Puducherry' },
  { value: 'tirunelveli', label: 'Tirunelveli' },
  { value: 'mangalore', label: 'Mangalore' },
  { value: 'ujjain', label: 'Ujjain' },
  { value: 'bhubaneswar', label: 'Bhubaneswar' },
  { value: 'imphal', label: 'Imphal' },
  { value: 'agartala', label: 'Agartala' },
  { value: 'gangtok', label: 'Gangtok' },
  { value: 'portblair', label: 'Port Blair' },
  { value: 'dehradun', label: 'Dehradun' }
];

export default function CompanyRegister() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(Auth, email, password)
      .then((userCredential) => {
        let userId = userCredential.user.uid;
        saveData(userId);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const saveData = async (userId) => {
    try {
      let data = {
        name: companyName,
        website: website,
        contact: contact,
        email: email,
        location: location,
        userType: 2,
        userId: userId,
        status: true,
        createdAt: Timestamp.now(),
      };
      await setDoc(doc(db, "users", userId), data);
      toast.success("Registered successfully");
      nav("/company");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="site-wrap">
        <section
          className="section-hero overlay inner-page bg-image"
          style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
          id="home-section"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <h1 className="text-white font-weight-bold">Company Sign Up</h1>
                <div className="custom-breadcrumbs">
                  <Link to="/">Home</Link>
                  <span className="mx-2 slash">/</span>
                  <span className="text-white"><strong>Register</strong></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="site-section">
          <div className="container">
            <div className="row align-items-center">
              {/* Left: Form */}
              <div className="col-lg-6 mb-5">
                <h2 className="mb-4">Register Your Company on NEXJOB</h2>
                <form
                  onSubmit={handleForm}
                  className="p-4"
                  style={{
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)",
                    borderRadius: "12px",
                    backgroundColor: "#ffffff",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <div className="form-group">
                    <label className="text-black">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company Name"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-black">Company Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Company Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-black">Website (optional)</label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="https://example.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-black">Contact Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Contact Number"
                      required
                      maxLength={10}
                      minLength={10}
                      pattern="[0-9]{10}"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-black">Company Location</label>
                    <select
                      className="form-control"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="">Select a city</option>
                      {cityOptions.map((city) => (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="text-black">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="submit"
                      value="Register"
                      className="btn px-4 btn-primary text-white"
                    />
                  </div>
                </form>

                <div className="text-center mt-3">
                  <p>
                    Already registered?{" "}
                    <Link to="/login" className="text-primary">
                      Log In
                    </Link>
                  </p>
                </div>
              </div>

              {/* Right: Illustration */}
              <div className="col-lg-6 text-center">
                <img
                  src="/assets/images/register.png"
                  alt="Company Register"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "12px",
                  }}
                />
                <p className="mt-0" style={{ fontSize: "1.1rem", color: "#555" }}>
                  <strong>Start hiring smarter.</strong><br />
                  Manage your listings with NEXJOB.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
