import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CompanyRegister() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nav = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    toast.success("Company Registered Successfully!");
    nav("/");
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
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-black">Company Location</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location or Address"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
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

                  <div className="form-group mb-4">
                    <label className="text-black">Re-Type Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Re-type Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="submit"
                      value="Register Company"
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

