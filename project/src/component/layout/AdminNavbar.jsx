import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminNavbar() {
  const isLogin = sessionStorage.getItem("isLogin") === "true";
  const name = sessionStorage.getItem("name");
  const nav = useNavigate();

  const logout = () => {
    Swal.fire({
      title: "Are you sure you want to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        nav("/login");
        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle" />
          </div>
        </div>
        <div className="site-mobile-menu-body" />
      </div>

      <header className="site-navbar mt-3">
        <div className="container-fluid">
          <div className="row no-gutters align-items-center">
            {/* Logo */}
            <div className="site-logo col-6">
              <Link to="/">NEXJOB</Link>
            </div>

            {/* Navigation */}
            <nav className="mx-auto site-navigation">
              <ul
                className="site-menu js-clone-nav d-none d-xl-flex align-items-center ml-0 pl-0"
                style={{ whiteSpace: "nowrap" }}
              >
                <li>
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li>
                  <Link to="/total-users">Total Users</Link>
                </li>
                <li>
                  <Link to="/total-jobs">Total Jobs</Link>
                </li>
                <li>
                  <Link to="/total-company">Total Company</Link>
                </li>
                <li>
                  <Link to="/accepted-application">Accepted Application</Link>
                </li>
                <li className="has-children">
                  <Link to="#">Recent Jobs</Link>
                  <ul className="dropdown">
                    <li><Link to="#">Frontend - Infosys</Link></li>
                    <li><Link to="#">UI/UX - TCS</Link></li>
                    <li><Link to="#">Backend - Wipro</Link></li>
                  </ul>
                </li>
                <li className="d-lg-none">
                  {isLogin ? (
                    <Link to="#" onClick={logout}>
                      Logout ({name})
                    </Link>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </li>
              </ul>
            </nav>

            
            <div className="right-cta-menu text-right d-flex align-items-center col-6">
              <div className="ml-auto">
                {isLogin ? (
                  <button
                    onClick={logout}
                    className="btn border-width-2 d-none d-lg-inline-block ml-3"
                    style={{
                      backgroundColor: "#89BA16",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      fontSize: "16px",
                      fontWeight: "500",
                      border: "none",
                    }}
                  >
                    <span className="mr-2 icon-lock_outline" />
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-primary border-width-2 d-none d-lg-inline-block ml-3"
                  >
                    <span className="mr-2 icon-lock_outline" />
                    Log In
                  </Link>
                )}
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
  );
}

