import { useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../Firebase";
import { toast } from "react-toastify";

export default function Contact() {
  const isLogin = sessionStorage.getItem("isLogin") === "true";
  const userType = sessionStorage.getItem("userType"); 
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      toast.error("Please login first to send a message.");
      return;
    }

    if (
      (!companyName && userType === "2") || // for company
      ((!firstName || !lastName) && userType === "3") || // for user
      !email ||
      !subject ||
      !message
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const payload =
        userType === "2"
          ? { companyName, email, subject, message, createdAt: Timestamp.now() }
          : { firstName, lastName, email, subject, message, createdAt: Timestamp.now() };

      await addDoc(collection(db, "contactMessages"), payload);

      toast.success("Message sent successfully!");
      setCompanyName("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message: " + error.message);
    }
  };

  return (
    <>
      <style>{`
        .contact-form-wrapper {
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .contact-form-wrapper:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
        }

        .contact-form-wrapper input,
        .contact-form-wrapper textarea {
          border: 1px solid #ccc;
          border-radius: 8px;
          transition: all 0.2s ease-in-out;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
        }

        .contact-form-wrapper input:focus,
        .contact-form-wrapper textarea:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 4px rgba(0,123,255,0.2);
          background-color: #f9f9ff;
        }

        .contact-form-wrapper .btn-primary {
          box-shadow: 0 4px 14px rgba(0,123,255,0.3);
          border-radius: 30px;
          transition: all 0.2s ease-in-out;
        }

        .contact-form-wrapper .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0,123,255,0.35);
        }
      `}</style>
      <div className="site-wrap">
        {/* Hero Section */}
        <section
          className="section-hero overlay inner-page bg-image"
          style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
          id="home-section"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <h1 className="text-white font-weight-bold">Contact Us</h1>
                <div className="custom-breadcrumbs">
                  <Link to="/company">Home</Link>
                  <span className="mx-2 slash">/</span>
                  <span className="text-white"><strong>Contact Us</strong></span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Contact Form Section */}
        <section className="site-section" id="next-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="contact-form-wrapper">
                  <form onSubmit={handleSubmit}>
                    <div className="row form-group">
                      {userType === "2" ? (
                        <div className="col-md-12 mb-3">
                          <label className="text-black" htmlFor="companyName">Company Name</label>
                          <input
                            type="text"
                            id="companyName"
                            className="form-control"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                          />
                        </div>
                      ) : (
                        <>
                          <div className="col-md-6 mb-3">
                            <label className="text-black" htmlFor="firstName">First Name</label>
                            <input
                              type="text"
                              id="firstName"
                              className="form-control"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="text-black" htmlFor="lastName">Last Name</label>
                            <input
                              type="text"
                              id="lastName"
                              className="form-control"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="row form-group">
                      <div className="col-md-12">
                        <label className="text-black" htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row form-group">
                      <div className="col-md-12">
                        <label className="text-black" htmlFor="subject">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          className="form-control"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row form-group">
                      <div className="col-md-12">
                        <label className="text-black" htmlFor="message">Message</label>
                        <textarea
                          name="message"
                          id="message"
                          cols={30}
                          rows={7}
                          className="form-control"
                          placeholder="Write your notes or questions here..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row form-group">
                      <div className="col-md-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn-md text-white"
                          disabled={!isLogin}
                        >
                          Send Message
                        </button>
                        {!isLogin && (
                          <p className="text-danger mt-2">You must be logged in to send a message.</p>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="col-lg-5 ml-auto">
                <div className="p-4 mb-3 bg-white">
                  <p className="mb-0 font-weight-bold">Address</p>
                  <p className="mb-4">DAV University, Jalandhar, Punjab, India</p>

                  <p className="mb-0 font-weight-bold">Phone</p>
                  <p className="mb-4"><Link to="#">+91 9872977156</Link></p>

                  <p className="mb-0 font-weight-bold">Email Address</p>
                  <p className="mb-0">
                    <Link to="mailto:metaran@gmail.com">metaran@gmail.com</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

