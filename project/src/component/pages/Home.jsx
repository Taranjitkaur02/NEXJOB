import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { Link } from "react-router-dom";
export default  function Home(){
    return(
        <>
        {/* <Navbar/> */}
 

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
      className="home-section section-hero overlay bg-image"
      style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
      id="home-section"
    >
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-12">
            <div className="mb-5 text-center">
              <h1 className="text-white font-weight-bold">
                The Easiest Way To Get Your Dream Job
              </h1>
              <p>
                Jobs that match your skills. Careers that match your dreams.
              </p>
            </div>
            <form method="post" className="search-jobs-form">
              <div className="row mb-5">
                <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Job title, Company..."
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                  <select
                  className="form-control form-control-lg"
                    // className="selectpicker"
                    // data-style="btn-white btn-lg"
                    // data-width="100%"
                    // data-live-search="true"
                    // title="Select Region"
                  >
                  <option>Anywhere</option>
                  <option>Maharashtra</option>
                  <option>Punjab</option>
                  <option>Karnatka</option>
                  <option>Uttar Pradesh</option>
                  <option>Delhi</option>
                  <option>West Bengal </option>
                  <option>Gujarat</option>
                  <option>Uttrakhand</option>
                  </select>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                  <select
                  className="form-control form-control-lg"
                    // className="selectpicker"
                    // data-style="btn-white btn-lg"
                    // data-width="100%"
                    // data-live-search="true"
                    // title="Select Job Type"
                  >
                    <option>Part Time</option>
                    <option>Full Time</option>
                  </select>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block text-white btn-search"
                  >
                    <span className="icon-search icon mr-2" />
                    Search Job
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 popular-keywords">
                  <h3>Trending Keywords:</h3>
                  <ul className="keywords list-unstyled m-0 p-0">
                    <li>
                      <a href="#" className="">
                        UI Designer
                      </a>
                    </li>
                    <li>
                      <a href="#" className="">
                        Python
                      </a>
                    </li>
                    <li>
                      <a href="#" className="">
                        Developer
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <a href="#next" className="scroll-button smoothscroll">
        <span className=" icon-keyboard_arrow_down" />
      </a>
    </section>
    <section
      className="py-5 bg-image overlay-primary fixed overlay"
      id="next"
      style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
    >
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-md-7 text-center">
            <h2 className="section-title mb-2 text-white">
              JobBoard Site Stats
            </h2>
            <p className="lead text-white">
              We’re growing every day and helping more people find the right job. Here’s a quick look at what we’ve achieved so far:
            </p>
          </div>
        </div>
        <div className="row pb-0 block__19738 section-counter">
          <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <strong className="number" data-number={1930}>
                0
              </strong>
            </div>
            <span className="caption">Candidates</span>
          </div>
          <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <strong className="number" data-number={54}>
                0
              </strong>
            </div>
            <span className="caption">Jobs Posted</span>
          </div>
          <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <strong className="number" data-number={120}>
                0
              </strong>
            </div>
            <span className="caption">Jobs Filled</span>
          </div>
          <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <strong className="number" data-number={550}>
                0
              </strong>
            </div>
            <span className="caption">Companies</span>
          </div>
        </div>
      </div>
    </section>
    <section className="site-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-md-7 text-center">
            <h2 className="section-title mb-2">43,167 Job Listed</h2>
          </div>
        </div>
         <ul className="job-listings mb-5">
          <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <Link to={"/job-single"} />
            <div className="job-listing-logo">
              <img
                src="/assets/images/job_logo_1.jpg"
                alt="Image"
                className="img-fluid"
              />
            </div>
            <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
              <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>Product Designer</h2>
                <strong>Adidas</strong>
              </div>
              <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span className="icon-room" /> Bangalore,Karnataka
              </div>
              <div className="job-listing-meta">
                <span className="badge badge-danger">Part Time</span>
              </div>
            </div>
          </li>
          <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <Link to={"/job-single"} />
            <div className="job-listing-logo">
              <img
                src="/assets/images/job_logo_2.jpg"
                alt="Image"
                className="img-fluid"
              />
            </div>
            <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
              <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>Digital Marketing Director</h2>
                <strong>Sprint</strong>
              </div>
              <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span className="icon-room" /> Delhi
              </div>
              <div className="job-listing-meta">
                <span className="badge badge-success">Full Time</span>
              </div>
            </div>
          </li>
          <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <Link to={"/job-single"} />
            <div className="job-listing-logo">
              <img
                src="/assets/images/job_logo_3.jpg"
                alt="Image"
                className="img-fluid"
              />
            </div>
            <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
              <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>Back-end Engineer (Python)</h2>
                <strong>Amazon</strong>
              </div>
              <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span className="icon-room" /> Mumbai,Maharashtra
              </div>
              <div className="job-listing-meta">
                <span className="badge badge-success">Full Time</span>
              </div>
            </div>
          </li>
          <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <Link to={"/job-single"} />
            <div className="job-listing-logo">
              <img
                src="/assets/images/job_logo_4.jpg"
                alt="Image"
                className="img-fluid"
              />
            </div>
            <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
              <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>Senior Art Director</h2>
                <strong>Microsoft</strong>
              </div>
              <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span className="icon-room" /> Anywhere
              </div>
              <div className="job-listing-meta">
                <span className="badge badge-success">Full Time</span>
              </div>
            </div>
          </li>
          <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <Link to={"/job-single"} />
            <div className="job-listing-logo">
              <img
                src="/assets/images/job_logo_5.jpg"
                alt="Image"
                className="img-fluid"
              />
            </div>
            <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
              <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>Product Designer</h2>
                <strong>Puma</strong>
              </div>
              <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span className="icon-room" /> Mumbai, Maharashtra
              </div>
              <div className="job-listing-meta">
                <span className="badge badge-success">Full Time</span>
              </div>
            </div>
          </li>
          <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <Link to={"/job-single"} />
            <div className="job-listing-logo">
              <img
                src="/assets/images/job_logo_1.jpg"
                alt="Image"
                className="img-fluid"
              />
            </div>
            <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
              <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>Product Designer</h2>
                <strong>Adidas</strong>
              </div>
              <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span className="icon-room" /> Mohali,Punjab
              </div>
              <div className="job-listing-meta">
                <span className="badge badge-danger">Part Time</span>
              </div>
            </div>
          </li>
          <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
            <Link to={"/job-single"} />
            <div className="job-listing-logo">
              <img
                src="/assets/images/job_logo_2.jpg"
                alt="Image"
                className="img-fluid"
              />
            </div>
            <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
              <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                <h2>Digital Marketing Director</h2>
                <strong>Sprint</strong>
              </div>
              <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                <span className="icon-room" /> Lucknow,Uttar Pradesh
              </div>
              <div className="job-listing-meta">
                <span className="badge badge-success">Full Time</span>
              </div>
            </div>
          </li>
        </ul>
        <div className="row pagination-wrap">
          <div className="col-md-6 text-center text-md-left mb-4 mb-md-0">
            <span>Showing 1-7 Of 43,167 Jobs</span>
          </div>
          <div className="col-md-6 text-center text-md-right">
            <div className="custom-pagination ml-auto">
              <a href="#" className="prev">
                Prev
              </a>
              <div className="d-inline-block">
                <a href="#" className="active">
                  1
                </a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
              </div>
              <a href="#" className="next">
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      className="py-5 bg-image overlay-primary fixed overlay"
      style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h2 className="text-white">Looking For A Job?</h2>
            <p className="mb-0 text-white lead">
              “Your next opportunity is just one click away.”
            </p>
          </div>
          <div className="col-md-3 ml-auto">
            <Link to={"/register"} className="btn btn-warning btn-block btn-lg">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </section>
    <section className="site-section py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 text-center mt-4 mb-5">
            <div className="row justify-content-center">
              <div className="col-md-7">
                <h2 className="section-title mb-2">Company We've Helped</h2>
                <p className="lead text-justify">
                  We’ve proudly partnered with companies across industries — from startups to global brands — to help them find the right talent quickly and efficiently. Here are just a few of the many companies that trust our platform:
                </p>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img
              src="/assets/images/logo_mailchimp.svg"
              alt="Image"
              className="img-fluid logo-1"
            />
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img
              src="/assets/images/logo_paypal.svg"
              alt="Image"
              className="img-fluid logo-2"
            />
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img
              src="/assets/images/logo_stripe.svg"
              alt="Image"
              className="img-fluid logo-3"
            />
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img
              src="/assets/images/logo_visa.svg"
              alt="Image"
              className="img-fluid logo-4"
            />
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img
              src="/assets/images/logo_apple.svg"
              alt="Image"
              className="img-fluid logo-5"
            />
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img
              src="/assets/images/logo_tinder.svg"
              alt="Image"
              className="img-fluid logo-6"
            />
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img
              src="/assets/images/logo_sony.svg"
              alt="Image"
              className="img-fluid logo-7"
            />
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img
              src="/assets/images/logo_airbnb.svg"
              alt="Image"
              className="img-fluid logo-8"
            />
          </div>
        </div>
      </div>
    </section>
    <section className="bg-light pt-5 testimony-full">
      <div className="owl-carousel single-carousel">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center text-center text-lg-left">
              <blockquote>
                <p>
                  “Soluta quasi cum delectus eum facilis recusandae nesciunt
                  molestias accusantium libero dolores repellat id in dolorem
                  laborum ad modi qui at quas dolorum voluptatem voluptatum
                  repudiandae.”
                </p>
                <p>
                  <cite> — Corey Woods, @Dribbble</cite>
                </p>
              </blockquote>
            </div>
            <div className="col-lg-6 align-self-end text-center text-lg-right">
              <img
                src="/assets/images/person_transparent_2.png"
                alt="Image"
                className="img-fluid mb-0"
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center text-center text-lg-left">
              <blockquote>
                <p>
                  “Soluta quasi cum delectus eum facilis recusandae nesciunt
                  molestias accusantium libero dolores repellat id in dolorem
                  laborum ad modi qui at quas dolorum voluptatem voluptatum
                  repudiandae.”
                </p>
                <p>
                  <cite> — Chris Peters, @Google</cite>
                </p>
              </blockquote>
            </div>
            <div className="col-lg-6 align-self-end text-center text-lg-right">
              <img
                src="/assets/images/person_transparent.png"
                alt="Image"
                className="img-fluid mb-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      className="pt-5 bg-image overlay-primary fixed overlay"
      style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
    >
      <div className="container">
        
      </div>
    </section>
    {/* <Footer/> */}
  </div>
</>

    )
}