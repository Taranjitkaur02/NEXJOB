import Navbar from "../layout/Navbar";

export default function Blog(){
    return(
        <>
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
            <h1 className="text-white font-weight-bold">Our Blog</h1>
            <div className="custom-breadcrumbs">
              <a href="#">Home</a> <span className="mx-2 slash">/</span>
              <span className="text-white">
                <strong>About Us</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="site-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-6 col-lg-4 mb-5">
            <a href="blog-single.html">
              <img
                src="/assets/images/sq_img_1.jpg"
                alt="Image"
                className="img-fluid rounded mb-4"
              />
            </a>
            <h3>
              <a href="blog-single.html" className="text-black">
                7 Factors for Choosing Between Two Jobs
              </a>
            </h3>
            <div>
              April 15, 2019 <span className="mx-2">|</span>{" "}
              <a href="#">2 Comments</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-5">
            <a href="blog-single.html">
              <img
                src="/assets/images/sq_img_2.jpg"
                alt="Image"
                className="img-fluid rounded mb-4"
              />
            </a>
            <h3>
              <a href="blog-single.html" className="text-black">
                How to Write a Creative Cover Letter
              </a>
            </h3>
            <div>
              April 15, 2019 <span className="mx-2">|</span>{" "}
              <a href="#">2 Comments</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-5">
            <a href="blog-single.html">
              <img
                src="/assets/images/sq_img_4.jpg"
                alt="Image"
                className="img-fluid rounded mb-4"
              />
            </a>
            <h3>
              <a href="blog-single.html" className="text-black">
                The Right Way to Quit a Job You Started
              </a>
            </h3>
            <div>
              April 15, 2019 <span className="mx-2">|</span>{" "}
              <a href="#">2 Comments</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-5">
            <a href="blog-single.html">
              <img
                src="/assets/images/sq_img_7.jpg"
                alt="Image"
                className="img-fluid rounded mb-4"
              />
            </a>
            <h3>
              <a href="blog-single.html" className="text-black">
                7 Factors for Choosing Between Two Jobs
              </a>
            </h3>
            <div>
              April 15, 2019 <span className="mx-2">|</span>{" "}
              <a href="#">2 Comments</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-5">
            <a href="blog-single.html">
              <img
                src="/assets/images/sq_img_5.jpg"
                alt="Image"
                className="img-fluid rounded mb-4"
              />
            </a>
            <h3>
              <a href="blog-single.html" className="text-black">
                How to Write a Creative Cover Letter
              </a>
            </h3>
            <div>
              April 15, 2019 <span className="mx-2">|</span>{" "}
              <a href="#">2 Comments</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-5">
            <a href="blog-single.html">
              <img
                src="/assets/images/sq_img_6.jpg"
                alt="Image"
                className="img-fluid rounded mb-4"
              />
            </a>
            <h3>
              <a href="blog-single.html" className="text-black">
                The Right Way to Quit a Job You Started
              </a>
            </h3>
            <div>
              April 15, 2019 <span className="mx-2">|</span>{" "}
              <a href="#">2 Comments</a>
            </div>
          </div>
        </div>
        <div className="row pagination-wrap mt-5">
          <div className="col-md-12 text-center ">
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

        </>
    )
}