export default function Post_job(){
    return(
        <>
  <div id="overlayer" />
  <div className="loader">
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
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
    <header className="site-navbar mt-3">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="site-logo col-6">
            <a href="index.html">JobBoard</a>
          </div>
          <nav className="mx-auto site-navigation">
            <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
              <li>
                <a href="index.html" className="nav-link active">
                  Home
                </a>
              </li>
              <li>
                <a href="about.html">About</a>
              </li>
              <li className="has-children">
                <a href="job-listings.html" className="active">
                  Job Listings
                </a>
                <ul className="dropdown">
                  <li>
                    <a href="job-single.html">Job Single</a>
                  </li>
                  <li>
                    <a href="post-job.html" className="active">
                      Post a Job
                    </a>
                  </li>
                </ul>
              </li>
              <li className="has-children">
                <a href="services.html">Pages</a>
                <ul className="dropdown">
                  <li>
                    <a href="services.html">Services</a>
                  </li>
                  <li>
                    <a href="service-single.html">Service Single</a>
                  </li>
                  <li>
                    <a href="blog-single.html">Blog Single</a>
                  </li>
                  <li>
                    <a href="portfolio.html">Portfolio</a>
                  </li>
                  <li>
                    <a href="portfolio-single.html">Portfolio Single</a>
                  </li>
                  <li>
                    <a href="testimonials.html">Testimonials</a>
                  </li>
                  <li>
                    <a href="faq.html">Frequently Ask Questions</a>
                  </li>
                  <li>
                    <a href="gallery.html">Gallery</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="blog.html">Blog</a>
              </li>
              <li>
                <a href="contact.html">Contact</a>
              </li>
              <li className="d-lg-none">
                <a href="post-job.html">
                  <span className="mr-2">+</span> Post a Job
                </a>
              </li>
              <li className="d-lg-none">
                <a href="login.html">Log In</a>
              </li>
            </ul>
          </nav>
          <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
            <div className="ml-auto">
              <a
                href="post-job.html"
                className="btn btn-outline-white border-width-2 d-none d-lg-inline-block"
              >
                <span className="mr-2 icon-add" />
                Post a Job
              </a>
              <a
                href="login.html"
                className="btn btn-primary border-width-2 d-none d-lg-inline-block"
              >
                <span className="mr-2 icon-lock_outline" />
                Log In
              </a>
            </div>
            <a
              href="#"
              className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"
            >
              <span className="icon-menu h3 m-0 p-0 mt-2" />
            </a>
          </div>
        </div>
      </div>
    </header>
    {/* HOME */}
    <section
      className="section-hero overlay inner-page bg-image"
      style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
      id="home-section"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <h1 className="text-white font-weight-bold">Post A Job</h1>
            <div className="custom-breadcrumbs">
              <a href="#">Home</a> <span className="mx-2 slash">/</span>
              <a href="#">Job</a> <span className="mx-2 slash">/</span>
              <span className="text-white">
                <strong>Post a Job</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="site-section">
      <div className="container">
        <div className="row align-items-center mb-5">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <div className="d-flex align-items-center">
              <div>
                <h2>Post A Job</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="row">
              <div className="col-6">
                <a href="#" className="btn btn-block btn-light btn-md">
                  <span className="icon-open_in_new mr-2" />
                  Preview
                </a>
              </div>
              <div className="col-6">
                <a href="#" className="btn btn-block btn-primary btn-md">
                  Save Job
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-lg-12">
            <form className="p-4 p-md-5 border rounded" method="post">
              <h3 className="text-black mb-5 border-bottom pb-2">
                Job Details
              </h3>
              <div className="form-group">
                <label htmlFor="company-website-tw d-block">
                  Upload Featured Image
                </label>{" "}
                <br />
                <label className="btn btn-primary btn-md btn-file">
                  Browse File
                  <input type="file" hidden="" />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="you@yourdomain.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="job-title"
                  placeholder="Product Designer"
                />
              </div>
              <div className="form-group">
                <label htmlFor="job-location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="job-location"
                  placeholder="e.g. New York"
                />
              </div>
              <div className="form-group">
                <label htmlFor="job-region">Job Region</label>
                <select
                  className="selectpicker border rounded"
                  id="job-region"
                  data-style="btn-black"
                  data-width="100%"
                  data-live-search="true"
                  title="Select Region"
                >
                  <option>Anywhere</option>
                  <option>San Francisco</option>
                  <option>Palo Alto</option>
                  <option>New York</option>
                  <option>Manhattan</option>
                  <option>Ontario</option>
                  <option>Toronto</option>
                  <option>Kansas</option>
                  <option>Mountain View</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="job-type">Job Type</label>
                <select
                  className="selectpicker border rounded"
                  id="job-type"
                  data-style="btn-black"
                  data-width="100%"
                  data-live-search="true"
                  title="Select Job Type"
                >
                  <option>Part Time</option>
                  <option>Full Time</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="job-description">Job Description</label>
                <div className="editor" id="editor-1">
                  <p>Write Job Description!</p>
                </div>
              </div>
              <h3 className="text-black my-5 border-bottom pb-2">
                Company Details
              </h3>
              <div className="form-group">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="company-name"
                  placeholder="e.g. New York"
                />
              </div>
              <div className="form-group">
                <label htmlFor="company-tagline">Tagline (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  id="company-tagline"
                  placeholder="e.g. New York"
                />
              </div>
              <div className="form-group">
                <label htmlFor="job-description">
                  Company Description (Optional)
                </label>
                <div className="editor" id="editor-2">
                  <p>Description</p>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="company-website">Website (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  id="company-website"
                  placeholder="https://"
                />
              </div>
              <div className="form-group">
                <label htmlFor="company-website-fb">
                  Facebook Username (Optional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company-website-fb"
                  placeholder="companyname"
                />
              </div>
              <div className="form-group">
                <label htmlFor="company-website-tw">
                  Twitter Username (Optional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company-website-tw"
                  placeholder="@companyname"
                />
              </div>
              <div className="form-group">
                <label htmlFor="company-website-tw">
                  Linkedin Username (Optional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company-website-tw"
                  placeholder="companyname"
                />
              </div>
              <div className="form-group">
                <label htmlFor="company-website-tw d-block">Upload Logo</label>{" "}
                <br />
                <label className="btn btn-primary btn-md btn-file">
                  Browse File
                  <input type="file" hidden="" />
                </label>
              </div>
            </form>
          </div>
        </div>
        <div className="row align-items-center mb-5">
          <div className="col-lg-4 ml-auto">
            <div className="row">
              <div className="col-6">
                <a href="#" className="btn btn-block btn-light btn-md">
                  <span className="icon-open_in_new mr-2" />
                  Preview
                </a>
              </div>
              <div className="col-6">
                <a href="#" className="btn btn-block btn-primary btn-md">
                  Save Job
                </a>
              </div>
            </div>
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