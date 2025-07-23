import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";

export default function ViewJob() {
  const [jobs, setJobs] = useState([]);

  const fetchData = () => {
    const q = query(collection(db, "postJob"));

    onSnapshot(q, (job) => {
      setJobs(
        job.docs?.map((doc) => ({...doc.data(),id: doc.id,}))
      );
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

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

      {/* Jobs Display Section */}
      <section
        className="site-section services-section bg-light block__62849"
        id="next-section"
      >
        <div className="container">
          <div className="row">
            {jobs.map((job) => (
              <div
                className="col-12 col-sm-6 col-lg-4 mb-4 mb-lg-5"
                key={job.id}
              >
                <div className="block__16443 d-block p-4 bg-white shadow rounded">
                  <div className="text-center mb-3">
                    <img
                      className="img-fluid"
                      src={job.image}
                      alt=""
                      style={{ borderRadius: "50%", maxHeight: "100px" }}
                    />
                  </div>
                  <h3 className="text-center">{job.title}</h3>

                  <p>
                    <i className="bi bi-geo-alt" style={{ marginRight: "6px" }}></i>
                    {job.location}
                  </p>

                  <p>
                    <i className="bi bi-clock" style={{ marginRight: "6px" }}></i>
                    {job.jobType}
                  </p>

                  <p>
                    <i className="bi bi-currency-rupee" style={{ marginRight: "6px" }}></i>
                    {job.salary}
                  </p>

                  <p>
                    <i className="bi bi-mortarboard" style={{ marginRight: "6px" }}></i>
                    {job.qualification}
                  </p>

                  <p>
                    <i className="bi bi-briefcase" style={{ marginRight: "6px" }}></i>
                    {job.experience} Year Experience
                  </p>

                  <p>
                    <i className="bi bi-person-lines-fill" style={{ marginRight: "6px" }}></i>
                    {job.vacancies} Vacancies
                  </p>
                   <button
                    className="btn btn-primary mt-3 w-100"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
