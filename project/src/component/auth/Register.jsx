import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Register() {

  const [email,setEmail] = useState(" ")
      const[password,setPassword]=useState("")
      const changeEmail=(e)=>{
        console.log(e)
        setEmail(e.target.value)
      }
      let nav= useNavigate()
      const handleForm=(e)=>{
        e.preventDefault()  //stop form reload
        // console.log("Hello user!!", e);
        if(email=="admin@gmail.com" && password=="2025"){
          toast.success("Register successfully!!")
          nav("/")
        }else{
          toast.error("Invalid credentials");
          
        }
      }
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
                  <a href="/">Home</a>
                  <span className="mx-2 slash">/</span>
                  <span className="text-white">
                    <strong>Register</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="site-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 mb-5">
                <h2 className="mb-4">Sign Up To NEXJOB</h2>
                <form onSubmit={handleForm} className="p-4 border rounded">
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email address"
                        required
                         value={email}
                        onChange={changeEmail}
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required
                         value={password}
                            onChange={(e)=>{
                              setPassword(e.target.value)
                            }}
                      />
                    </div>
                  </div>
                  <div className="row form-group mb-4">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black">Re-Type Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Re-type Password"
                        required
                         value={password}
                            onChange={(e)=>{
                              setPassword(e.target.value)
                            }}
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <input
                        type="submit"
        
                        defaultValue="Sign Up"
                        className="btn px-4 btn-primary text-white"
                      />
                    </div>
                  </div>
                </form>

                <div className="text-center mt-3">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary">Log In</Link>
                  </p>
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
