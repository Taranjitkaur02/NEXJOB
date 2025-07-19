import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Auth, db } from "../../Firebase";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [qualification, setQualification] = useState("");
  const [skills, setSkills] = useState("");
  const [about, setAbout] = useState("");
  const nav = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(Auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        saveData(userId);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const saveData = async (userId) => {
    try {
      const data = {
        name,
        email,
        contact,
        qualification,
        skills,
        about,
        userType: 3,
        userId,
        status: true,
        createdAt: Timestamp.now(),
      };
      await setDoc(doc(db, "users", userId), data);
      toast.success("Registered successfully");
      getUserData(userId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async (userId) => {
    const userDoc = await getDoc(doc(db, "users", userId));
    const userData = userDoc.data();
    sessionStorage.setItem("name", userData.name);
    sessionStorage.setItem("email", userData.email);
    sessionStorage.setItem("userType", userData.userType);
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("isLogin", true);
    if (userData.userType === 2) {
      nav("/company");
    } else {
      nav("/");
    }
  };

  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(Auth, provider)
      .then((userCred) => {
        const userId = userCred.user.uid;
        saveData(userId);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <Navbar />

      <div className="site-wrap">
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle" />
            </div>
          </div>
          <div className="site-mobile-menu-body" />
        </div>

        <section
          className="section-hero overlay inner-page bg-image"
          style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
          id="home-section"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <h1 className="text-white font-weight-bold">Sign Up</h1>
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
              {/* Form Section */}
              <div className="col-lg-6 mb-5">
                <h2 className="mb-4">Sign Up To NEXJOB</h2>
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
                  {/* Row 1: Name */}
                  <div className="form-group mb-3">
                    <label className="text-black">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* Row 2: Email + Password */}
                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label className="text-black">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 form-group mb-3">
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
                  </div>

                  {/* Row 3: Contact + About */}
                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label className="text-black">Contact</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        maxLength={10}
                        minLength={10}
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="text-black">About</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="About"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Row 4: Qualification + Skills */}
                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label className="text-black">Qualification</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Qualification"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="text-black">Skills</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Skills"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Sign Up"
                      className="btn px-4 btn-primary text-white"
                    />
                  </div>
                  <p >OR</p>
                  <div className="">
                    <button
                      type="button"
                      onClick={signInGoogle}
                      style={{
                        border: "none",
                        background: "none",
                        padding: 0,
                        display: "inline-block",
                        borderRadius: "8px",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <img
                        src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"
                        alt="Sign in with Google"
                        style={{
                          height: "40px",
                          display: "block",
                          borderRadius: "8px",
                        }}
                      />
                    </button>
                  </div>
                </form>

                <div className="text-center mt-3">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary">
                      Log In
                    </Link>
                  </p>
                </div>
              </div>

              {/* Right Side Image */}
              <div className="col-lg-6 text-center">
                <img
                  src="/assets/images/register.png"
                  alt="Register Illustration"
                  style={{
                    maxWidth: "600px",
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                    margin: "0 auto",
                  }}
                />
                <p className="mt-0" style={{ fontSize: "1.1rem", color: "#555" }}>
                  <strong>Join thousands of job seekers.</strong><br />
                  Start your journey with NEXJOB today!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* <Footer /> */}
      </div>
    </>
  );
}

