import { useState, useEffect } from "react";
import { db } from "../../Firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Select from "react-select";
import { SyncLoader } from "react-spinners";
import { Link, useLocation } from "react-router-dom";

export default function ViewJob() {
  const [jobs, setJobs] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [companyFilter, setCompanyFilter] = useState(null);
  const [load, setLoad] = useState(true);

  const location = useLocation();

  // Fetch companies from the 'users' collection (userType = 2)
  const fetchCompanies = () => {
    const q = query(collection(db, "users"), where("userType", "==", 2));
    onSnapshot(q, (snapshot) => {
      const companies = snapshot.docs.map((doc) => ({
        value: doc.data().userId,
        label: doc.data().name,
      }));
      setCompanyOptions(companies);
    });
  };

  // Fetch jobs based on selected company filter
  const fetchData = (companyId = null) => {
    let q = query(collection(db, "postJob"));
    if (companyId) {
      q = query(q, where("userId", "==", companyId));
    }

    onSnapshot(q, (jobSnapshot) => {
      const jobsData = jobSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setJobs(jobsData);
      setLoad(false);
    });
  };

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  // Apply filter from query string (e.g., ?companyId=abc123)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const companyId = params.get("companyId");

    if (companyId && companyOptions.length > 0) {
      const matchedCompany = companyOptions.find((opt) => opt.value === companyId);
      if (matchedCompany) {
        setCompanyFilter(matchedCompany); // this will trigger fetchData via other effect
      } else {
        fetchData(); // fallback
      }
    } else {
      fetchData(); // default all jobs
    }
  }, [location.search, companyOptions]);

  // Trigger job fetch when dropdown filter changes
  useEffect(() => {
    if (companyFilter) {
      fetchData(companyFilter.value);
    }
  }, [companyFilter]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
      minWidth: "200px",
    }),
    menu: (provided) => ({
      ...provided,
      width: "100%",
      minWidth: "200px",
    }),
    option: (provided) => ({
      ...provided,
      padding: "10px",
    }),
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">All Job Listings</h1>
              <div className="custom-breadcrumbs">
                <Link to={"/user"}>Home</Link>
                <span className="mx-2 slash"></span>
                <span className="text-white">All Jobs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-3">
              <Select
                options={companyOptions}
                onChange={setCompanyFilter}
                placeholder="Filter by Company"
                value={companyFilter}
                styles={customStyles}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="site-section services-section bg-light block__62849" id="next-section">
        <div className="container">
          {load ? (
            <SyncLoader color="#89BA16" size={20} cssOverride={{ display: "block", margin: "50px auto" }} />
          ) : jobs.length === 0 ? (
            <p className="text-center">No jobs found.</p>
          ) : (
            <div className="row">
              {jobs.map((job) => (
                <div className="col-12 col-sm-6 col-lg-4 mb-4 mb-lg-5" key={job.id}>
                  <div className="block__16443 d-block p-4 bg-white shadow rounded">
                    <div className="text-center mb-3">
                      <img
                        className="img-fluid"
                        src={job.image || "/assets/images/default_company.png"}
                        alt="Job"
                        style={{ borderRadius: "50%", maxHeight: "100px" }}
                      />
                    </div>
                    <h3 className="text-center">{job.title}</h3>
                    <p><i className="bi bi-geo-alt me-2"></i>{job.location}</p>
                    <p><i className="bi bi-clock me-2"></i>{job.jobType}</p>
                    <p><i className="bi bi-currency-rupee me-2"></i>{job.salary}</p>
                    <p><i className="bi bi-mortarboard me-2"></i>{job.qualification}</p>
                    <p><i className="bi bi-briefcase me-2"></i>{job.experience} Year Experience</p>
                    <p><i className="bi bi-person-lines-fill me-2"></i>{job.vacancies} Vacancies</p>
                    <Link to={`/job-form/${job.id}`} className="btn btn-primary mt-3 w-100">Apply Now</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
