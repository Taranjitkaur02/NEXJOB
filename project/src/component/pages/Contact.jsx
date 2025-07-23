import { useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../Firebase"; // adjust path as needed
import Navbar from "../layout/Navbar";
// import Footer from "../layout/Footer";
import { toast } from "react-toastify";

export default function Contact() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const isLogin = sessionStorage.getItem("isLogin") === "true";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      toast.error("Please login first to send a message.");
      return;
    }

    if (!fname || !lname || !email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "contactMessages"), {
        firstName: fname,
        lastName: lname,
        email,
        subject,
        message,
        createdAt: Timestamp.now(),
      });

      toast.success("Message sent successfully and saved to Firebase!");

      // Clear form
      setFname("");
      setLname("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to save message: " + error.message);
    }
  };

  return (
    <>
      <Navbar />

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
                  <Link to="/">Home</Link>
                  <span className="mx-2 slash">/</span>
                  <span className="text-white">
                    <strong>Contact Us</strong>
                  </span>
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
                <form onSubmit={handleSubmit}>
                  <div className="row form-group">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="fname">First Name</label>
                      <input
                        type="text"
                        id="fname"
                        className="form-control"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="text-black" htmlFor="lname">Last Name</label>
                      <input
                        type="text"
                        id="lname"
                        className="form-control"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                      />
                    </div>
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

        {/* Testimonials */}
        <section className="site-section bg-light">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center" data-aos="fade">
                <h2 className="section-title mb-3">Happy Candidates Say</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="block__87154 bg-white rounded">
                  <blockquote>
                    <p className="text-justify">
                      “This platform made my job search so easy. I applied to a few roles and got shortlisted within days. The process was smooth and fast. Highly recommend it to anyone looking for serious opportunities.”
                    </p>
                  </blockquote>
                  <div className="block__91147 d-flex align-items-center">
                    <figure className="mr-4">
                      <img src="/assets/images/person_1.jpg" alt="Image" className="img-fluid" />
                    </figure>
                    <div>
                      <h3>Priya Desai</h3>
                      <span className="position">Creative Director</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="block__87154 bg-white rounded">
                  <blockquote>
                    <p>
                      “Posting jobs here has been very effective. We received quality applications quickly and filled key roles faster than expected. A great platform for hiring across India.”
                    </p>
                  </blockquote>
                  <div className="block__91147 d-flex align-items-center">
                    <figure className="mr-4">
                      <img src="/assets/images/person_2.jpg" alt="Image" className="img-fluid" />
                    </figure>
                    <div>
                      <h3>Rahul Verma</h3>
                      <span className="position">Web Designer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <Footer /> */}
      </div>
    </>
  );
}
