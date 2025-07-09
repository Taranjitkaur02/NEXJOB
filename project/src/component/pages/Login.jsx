import Navbar from "../layout/Navbar";

export default function Login(){
    return(
        
        <>
        <Navbar/>
  <div id="overlayer" />
 
  <div className="site-wrap">
    <div className="site-mobile-menu site-navbar-target">
      <div className="site-mobile-menu-header">
        <div className="site-mobile-menu-close mt-3">
          <span className="icon-close2 js-menu-toggle" />
        </div>
      </div>
      <div className="site-mobile-menu-body" />
    </div>{" "}
    {/* .site-mobile-menu */}
    {/* NAVBAR */}
      {/* <Navbar/> */}
    {/* HOME */}
    <section
      className="section-hero overlay inner-page bg-image"
      style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
      id="home-section"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <h1 className="text-white font-weight-bold">Sign Up/Login</h1>
            <div className="custom-breadcrumbs">
              <a href="#">Home</a> <span className="mx-2 slash">/</span>
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
        <div className="row">
          <div className="col-lg-6 mb-5">
            <h2 className="mb-4">Sign Up To JobBoard</h2>
            <form action="#" className="p-4 border rounded">
              <div className="row form-group">
                <div className="col-md-12 mb-3 mb-md-0">
                  <label className="text-black" htmlFor="fname">
                    Email
                  </label>
                  <input
                    type="text"
                    // id="fname"
                    className="form-control"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-md-12 mb-3 mb-md-0">
                  <label className="text-black" htmlFor="fname">
                    Password
                  </label>
                  <input
                    type="password"
                    // id="fname"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="row form-group mb-4">
                <div className="col-md-12 mb-3 mb-md-0">
                  <label className="text-black" htmlFor="fname">
                    Re-Type Password
                  </label>
                  <input
                    type="password"
                    // id="fname"
                    className="form-control"
                    placeholder="Re-type Password"
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
          </div>
          <div className="col-lg-6">
            <h2 className="mb-4">Log In To JobBoard</h2>
            <form action="#" className="p-4 border rounded">
              <div className="row form-group">
                <div className="col-md-12 mb-3 mb-md-0">
                  <label className="text-black" htmlFor="fname">
                    Email
                  </label>
                  <input
                    type="text"
                    // id="fname"
                    className="form-control"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div className="row form-group mb-4">
                <div className="col-md-12 mb-3 mb-md-0">
                  <label className="text-black" htmlFor="fname">
                    Password
                  </label>
                  <input
                    type="password"
                    // id="fname"
                    className="form-control"
                    placeholder="Password"
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
          </div>
        </div>
      </div>
    </section>
    <footer className="site-footer">
      <a href="#top" className="smoothscroll scroll-top">
        <span className="icon-keyboard_arrow_up" />
      </a>
      <div className="container">
        <div className="row mb-5">
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3>Search Trending</h3>
            <ul className="list-unstyled">
              <li>
                <a href="#">Web Design</a>
              </li>
              <li>
                <a href="#">Graphic Design</a>
              </li>
              <li>
                <a href="#">Web Developers</a>
              </li>
              <li>
                <a href="#">Python</a>
              </li>
              <li>
                <a href="#">HTML5</a>
              </li>
              <li>
                <a href="#">CSS3</a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3>Company</h3>
            <ul className="list-unstyled">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Career</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Resources</a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3>Support</h3>
            <ul className="list-unstyled">
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3>Contact Us</h3>
            <div className="footer-social">
              <a href="#">
                <span className="icon-facebook" />
              </a>
              <a href="#">
                <span className="icon-twitter" />
              </a>
              <a href="#">
                <span className="icon-instagram" />
              </a>
              <a href="#">
                <span className="icon-linkedin" />
              </a>
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-12">
            <p className="copyright">
              <small>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                Copyright © All rights reserved | This template is made with{" "}
                <i className="icon-heart text-danger" aria-hidden="true" /> by{" "}
                <a href="https://colorlib.com" target="_blank">
                  Colorlib
                </a>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              </small>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</>

        
    )
}