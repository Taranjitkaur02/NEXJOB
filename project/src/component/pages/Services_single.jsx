import Navbar from "../layout/Navbar";

export default function Services_single(){
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
            <h1 className="text-white font-weight-bold">Service Single</h1>
            <div className="custom-breadcrumbs">
              <a href="#">Home</a> <span className="mx-2 slash">/</span>
              <span className="text-white">
                <strong>Service Single</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="site-section block__18514" id="next-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 mr-auto">
            <div className="border p-4 rounded">
              <ul className="list-unstyled block__47528 mb-0">
                <li>
                  <span className="active">Graphic Design</span>
                </li>
                <li>
                  <a href="#">Marketing Strategy</a>
                </li>
                <li>
                  <a href="#">Web Design</a>
                </li>
                <li>
                  <a href="#">Market Leading</a>
                </li>
                <li>
                  <a href="#">Search Engine Optimization</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-8">
            <span className="text-primary d-block mb-5">
              <span className="icon-magnet display-1" />
            </span>
            <h2 className="mb-4">Graphic Design</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
              dolorum incidunt dolorem facere, officiis placeat consequuntur
              odit quasi, quam voluptates, deleniti! Neque tenetur in, omnis
              consectetur molestias expedita nostrum et.
            </p>
            <p>
              Sed odio temporibus quaerat laboriosam dicta ipsam eligendi
              deserunt architecto, aliquam in totam provident praesentium
              aperiam, id impedit aut delectus mollitia doloribus nostrum
              numquam tempore ullam reprehenderit nesciunt cumque veniam.
            </p>
            <p>
              Officia mollitia deserunt vel expedita deleniti iure eius illum
              dolor optio tempora! Fuga, voluptates omnis velit neque. Rerum
              aperiam consequatur vero, nulla dolores a. Sed, non veniam maiores
              recusandae iure.
            </p>
            <p>
              Nobis officia tempore porro incidunt quaerat commodi numquam
              exercitationem laboriosam deserunt, error excepturi et delectus
              quis explicabo repellendus obcaecati iusto. Delectus magni ducimus
              illo! Fugit quaerat debitis deserunt facere reiciendis!
            </p>
            <p>
              <a href="#" className="btn btn-primary btn-md mt-4">
                Hire Us, Our Agency
              </a>
            </p>
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