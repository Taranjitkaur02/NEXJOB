import { Link } from "react-router-dom"

export default function Navbar(){
    return(
        <>
        <div className="site-mobile-menu site-navbar-target">
      <div className="site-mobile-menu-header">
        <div className="site-mobile-menu-close mt-3">
          <span className="icon-close2 js-menu-toggle" />
        </div>
      </div>
      <div className="site-mobile-menu-body" />
    </div>{" "}
        <header className="site-navbar mt-3">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="site-logo col-6">
            <Link to="/">NEXJOB</Link>
          </div>
          <nav className="mx-auto site-navigation">
            <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li className="has-children">
                <Link to="/job-listings">Job Listings</Link>
                <ul className="dropdown">
                  <li>
                    <Link to="/job-single">Job Single</Link>
                  </li>
                  <li>
                    <Link to="/post-job">Post a Job</Link>
                  </li>
                </ul>
              </li>
              <li className="has-children">
                <Link to="/services">Pages</Link>
                <ul className="dropdown">
                  <li>
                    <Link to="/services">Services</Link>
                  </li>
                  <li>
                    <Link to="/service-single">Service Single</Link>
                  </li>
                  <li>
                    <Link to="/blog-single">Blog Single</Link>
                  </li>
                  <li>
                    <Link to="/portfolio">Portfolio</Link>
                  </li>
                  <li>
                    <Link to="/portfolio-single">Portfolio Single</Link>
                  </li>
                  <li>
                    <Link to="/testimonials">Testimonials</Link>
                  </li>
                  <li>
                    <Link to="/faq">Frequently Ask Questions</Link>
                  </li>
                  <li>
                    <Link to="/gallery">Gallery</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/blog" className="active">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li className="d-lg-none">
                <Link to="/post-job">
                  <span className="mr-2">+</span> Post a Job
                </Link>
              </li>
              <li className="d-lg-none">
                <Link to="/login">Log In</Link>
              </li>
            </ul>
          </nav>
          <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
            <div className="ml-auto">
              <Link
                to="/post-job"
                className="btn btn-outline-white border-width-2 d-none d-lg-inline-block"
              >
                <span className="mr-2 icon-add" />
                Post a Job
              </Link>
              <Link
                to="/login"
                className="btn btn-primary border-width-2 d-none d-lg-inline-block"
              >
                <span className="mr-2 icon-lock_outline" />
                Log In
              </Link>
            </div>
            <Link
              to="/*"
              className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"
            >
              <span className="icon-menu h3 m-0 p-0 mt-2" />
            </Link>
          </div>
        </div>
      </div>
    </header>
        </>
    )
}