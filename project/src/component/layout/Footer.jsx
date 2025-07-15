import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <>
        <footer className="site-footer">
      <a href="#top" className="smoothscroll scroll-top">
        <span className="icon-keyboard_arrow_up" />
      </a>
      <div className="container">
        <div className="row mb-5 justify-content-center ">
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3>Search Trending</h3>
            <ul className="list-unstyled">
              <li>
                <Link to={"https://webdesigner.withgoogle.com/"}>Web Design</Link>
              </li>
              <li>
                <Link to={"https://www.behance.net/galleries/graphic-design"}>Graphic Design</Link>
              </li>
              <li>
                <Link to={"https://web.dev/"}>Web Developers</Link>
              </li>
              <li>
                <Link to={"https://www.python.org/"}>Python</Link>
              </li>
              <li>
                <Link to={"https://html5up.net/"}>HTML5</Link>
              </li>
              <li>
                <Link to={"https://www.css3.info/"}>CSS3</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3>Company</h3>
            <ul className="list-unstyled">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              {/* <li>
                <a href="#">Career</a>
              </li> */}
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              {/* <li>
                <a href="#">Resources</a>
              </li> */}
            </ul>
          </div>
          {/* <div className="col-6 col-md-3 mb-4 mb-md-0">
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
          </div> */}
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3>Contact Us</h3>
            <div className="footer-social">
              <Link to="#">
                <span className="icon-facebook" />
              </Link>
              <Link to="#">
                <span className="icon-twitter" />
              </Link>
              <Link to="https://www.instagram.com/taran_.2">
                <span className="icon-instagram" />
              </Link>
              <Link to="https://www.linkedin.com/in/taranjit-kaur-875b01282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                <span className="icon-linkedin" />
              </Link>
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-12">
            <p className="copyright">
              <small>
                
                Copyright © All rights reserved {" "}
               
                <Link to="https://o7services.com/" target="_blank">
                  O7Services
                </Link>
               
              </small>
            </p>
          </div>
        </div>
      </div>
    </footer>
        </>
    )
}