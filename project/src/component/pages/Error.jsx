
export default function Error() {
  return (

    <>
    <Navbar/>
      <div className="error-bg d-flex align-items-center justify-content-center text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 animate__animated animate__fadeIn">
              <div className="error-icon mb-4">
                <span className="icon-sad display-3 text-primary" />
              </div>
              <h1 className="error-code display-1 font-weight-bold text-primary">404</h1>
              <h3 className="error-message mb-4">Oops! Page not found.</h3>
              <p className="mb-5 text-muted">
                The page you're looking for might have been removed or is temporarily unavailable.
              </p>
              <a
                href="/"
                className="btn btn-primary btn-lg px-4 py-2 rounded-pill"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

 
  