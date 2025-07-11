import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

export default function Gallery(){
    return(
        <>
        <>
        <Navbar/>
  {/* <div id="overlayer" /> */}

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
            <h1 className="text-white font-weight-bold">Gallery</h1>
            <div className="custom-breadcrumbs">
              <a href="index.html">Home</a>{" "}
              <span className="mx-2 slash">/</span>
              <span className="text-white">
                <strong>Gallery</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="site-section" id="next-section">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4 item">
            <a
              href="/assets/images/sq_img_1.jpg"
              className="item-wrap fancybox"
              data-fancybox="gallery2"
            >
              <span className="icon-search2" />
              <img className="img-fluid" src="/assets/images/sq_img_1.jpg" />
            </a>
          </div>
          <div className="col-md-6 col-lg-4 item">
            <a
              href="/assets/images/sq_img_2.jpg"
              className="item-wrap fancybox"
              data-fancybox="gallery2"
            >
              <span className="icon-search2" />
              <img className="img-fluid" src="/assets/images/sq_img_2.jpg" />
            </a>
          </div>
          <div className="col-md-6 col-lg-4 item">
            <a
              href="/assets/images/sq_img_3.jpg"
              className="item-wrap fancybox"
              data-fancybox="gallery2"
            >
              <span className="icon-search2" />
              <img className="img-fluid" src="/assets/images/sq_img_3.jpg" />
            </a>
          </div>
          <div className="col-md-6 col-lg-4 item">
            <a
              href="/assets/images/sq_img_4.jpg"
              className="item-wrap fancybox"
              data-fancybox="gallery2"
            >
              <span className="icon-search2" />
              <img className="img-fluid" src="/assets/images/sq_img_4.jpg" />
            </a>
          </div>
          <div className="col-md-6 col-lg-4 item">
            <a
              href="/assets/images/sq_img_5.jpg"
              className="item-wrap fancybox"
              data-fancybox="gallery2"
            >
              <span className="icon-search2" />
              <img className="img-fluid" src="/assets/images/sq_img_5.jpg" />
            </a>
          </div>
          <div className="col-md-6 col-lg-4 item">
            <a
              href="/assets/images/sq_img_6.jpg"
              className="item-wrap fancybox"
              data-fancybox="gallery2"
            >
              <span className="icon-search2" />
              <img className="img-fluid" src="/assets/images/sq_img_6.jpg" />
            </a>
          </div>
          <div className="col-md-6 col-lg-6 item">
            <a
              href="/assets/images/sq_img_11.jpg"
              className="item-wrap fancybox"
              data-fancybox="gallery2"
            >
              <span className="icon-search2" />
              <img className="img-fluid" src="/assets/images/sq_img_11.jpg" />
            </a>
          </div>
          <div className="col-md-6 col-lg-6 item">
            <a
              href="/assets/images/sq_img_2.jpg"
              className="item-wrap fancybox"
              data-fancybox="gallery2"
            >
              <span className="icon-search2" />
              <img className="img-fluid" src="/assets/images/sq_img_2.jpg" />
            </a>
          </div>
          <div className="col-md-6 col-lg-4 item">
            <a
              href="/assets/images/sq_img_7.jpg"
              className="item-wrap fancybox"
              data-fancybox="gallery2"
            >
              <span className="icon-search2" />
              <img className="img-fluid" src="/assets/images/sq_img_7.jpg" />
            </a>
          </div>
          <div className="col-md-6 col-lg-4 item">
            <a
              href="/assets/images/sq_img_8.jpg"
              className="item-wrap fancybox"
              data-fancybox="gallery2"
            >
              <span className="icon-search2" />
              <img className="img-fluid" src="/assets/images/sq_img_8.jpg" />
            </a>
          </div>
          <div className="col-md-6 col-lg-4 item">
            <a
              href="/assets/images/sq_img_9.jpg"
              className="item-wrap fancybox"
              data-fancybox="gallery2"
            >
              <span className="icon-search2" />
              <img className="img-fluid" src="/assets/images/sq_img_9.jpg" />
            </a>
          </div>
          <div className="col-md-6 col-lg-4 item">
            <a
              href="/assets/images/sq_img_10.jpg"
              className="item-wrap fancybox"
              data-fancybox="gallery2"
            >
              <span className="icon-search2" />
              <img className="img-fluid" src="/assets/images/sq_img_10.jpg" />
            </a>
          </div>
          <div className="col-md-6 col-lg-4 item">
            <a
              href="/assets/images/sq_img_11.jpg"
              className="item-wrap fancybox"
              data-fancybox="gallery2"
            >
              <span className="icon-search2" />
              <img className="img-fluid" src="/assets/images/sq_img_11.jpg" />
            </a>
          </div>
          <div className="col-md-6 col-lg-4 item">
            <a
              href="/assets/images/sq_img_12.jpg"
              className="item-wrap fancybox"
              data-fancybox="gallery2"
            >
              <span className="icon-search2" />
              <img className="img-fluid" src="/assets/images/sq_img_12.jpg" />
            </a>
          </div>
        </div>
      </div>
    </section>
    {/* <Footer/> */}
  </div>
</>

        </>
    )
}