import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar() {
  const isLogin = sessionStorage.getItem("isLogin") === "true";
  const name = sessionStorage.getItem("name") || "User";
  const nav = useNavigate();

  const logout = () => {
    Swal.fire({
      title: "Are you sure you want to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        nav("/login");
        Swal.fire({
          title: "Logged Out!",
          text: "Logout successfully.",
          icon: "success"
        });
      }
    });
  };

  return (
    <>
      {/* Mobile Menu */}
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle" />
          </div>
        </div>
        <div className="site-mobile-menu-body" />
      </div>

      {/* Header Navbar */}
      <header className="site-navbar mt-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="site-logo col-6">
              <Link to="/">NEXJOB</Link>
            </div>

            {/* Navigation Links */}
            <nav className="mx-auto site-navigation">
              <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/view-skills">View Skills</Link></li>

                    <li><Link to="/view-job">View Job</Link></li>
                   <li><Link to="/interview/applicationId">Interview</Link></li>




                  

                {/* <li className="has-children">
                  <Link to="/services">Pages</Link>
                  <ul className="dropdown">
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/service-single">Service Single</Link></li>
                    <li><Link to="/blog-single">Blog Single</Link></li>
                    <li><Link to="/portfolio">Portfolio</Link></li>
                    <li><Link to="/portfolio-single">Portfolio Single</Link></li>
                    <li><Link to="/testimonials">Testimonials</Link></li>
                    <li><Link to="/faq">FAQ</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                  </ul>
                </li> */}

                {/* Mobile-only: Post Job */}
                <li className="d-lg-none">
                  <Link to="/post-job">
                    <span className="mr-2">+</span> Post a Job
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Right CTA Buttons */}
            <div className="right-cta-menu text-right d-flex align-items-center col-6">
              <div className="ml-auto d-flex align-items-center">

                {/* Post Job */}
               

                {/* If NOT Logged In: Show Register Dropdown & Login */}
                {!isLogin ? (
                  <>
                    {/* Register Dropdown */}
                    <div className="dropdown d-none d-lg-inline-block ml-3">
                      <button
                        className="btn btn-primary border-width-2 dropdown-toggle d-inline-flex align-items-center"
                        type="button"
                        id="registerDropdown"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style={{ fontWeight: "500" }}
                      >
                        <span className="mr-2 icon-person_add" />
                        Register
                      </button>
                      <div className="dropdown-menu" aria-labelledby="registerDropdown">
                        <Link className="dropdown-item" to="/register">Register as User</Link>
                        <Link className="dropdown-item" to="/company-register">Register as Company</Link>
                      </div>
                    </div>

                    {/* Login Button */}
                    <Link
                      to="/login"
                      className="btn btn-primary border-width-2 d-none d-lg-inline-block d-inline-flex align-items-center ml-3"
                    >
                      <span className="mr-2 icon-lock_outline" />
                      Log In
                    </Link>
                  </>
                ) : (
                  // If Logged In: Show Logout Only
                  <button
                    onClick={logout}
                    className="btn border-width-2 d-none d-lg-inline-block d-inline-flex align-items-center ml-3"
                    style={{
                      backgroundColor: "#89BA16",
                      color: "#fff",
                      border: "1px solid #89BA16",
                      borderRadius: "4px",
                      fontSize: "16px",
                      padding: "6px 12px",
                      cursor: "pointer",
                      fontWeight: "500"
                    }}
                  >
                    <span className="mr-2 icon-lock_outline" />
                    Logout
                  </button>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              {/* <Link
                to="#"
                className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"
              >
                <span className="icon-menu h3 m-0 p-0 mt-2" />
              </Link> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
