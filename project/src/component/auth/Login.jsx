import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { Link } from "react-router-dom";

export default function Login() {
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
                <h1 className="text-white font-weight-bold">Log In</h1>
                <div className="custom-breadcrumbs">
                  <Link to="/">Home</Link>
                  <span className="mx-2 slash">/</span>
                  <span className="text-white">
                    <strong>Log In</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="site-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <h2 className="mb-4">Log In To NEXJOB</h2>
                <form action="#" className="p-4 border rounded">
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="row form-group mb-4">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <input
                        type="submit"
                        defaultValue="Log In"
                        className="btn px-4 btn-primary text-white"
                      />
                    </div>
                     </div>
                    </form>
                    <div className="text-center mt-3">
                    <p>
                          Don't have an account?{" "}
                    <Link to="/register" className="text-primary">Register here</Link>
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
