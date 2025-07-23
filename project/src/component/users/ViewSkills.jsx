import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";

export default function ViewSkills() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "postJob"), (snap) => {
      const jobs = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setAllJobs(jobs);

      // Extract unique skills from all job documents
      const skillSet = new Set();
      jobs.forEach((job) => {
        job.skills?.forEach((skill) => skillSet.add(skill));
      });

      setSkills([...skillSet]);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (selectedSkill) {
      const matched = allJobs.filter((job) =>
        job.skills?.includes(selectedSkill)
      );
      setFilteredJobs(matched);
    } else {
      setFilteredJobs([]);
    }
  }, [selectedSkill, allJobs]);

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
              <h1 className="text-white font-weight-bold">Search Jobs by Skills</h1>
              <div className="custom-breadcrumbs">
                <Link to="/user">Home</Link>
                <span className="mx-2 slash">/</span>
                <span className="text-white">Jobs by Skills</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Filter Section */}
      <section className="site-section services-section bg-light block__62849" id="next-section">
        <div className="container">
          <h2 className="mb-4 text-center">Select a Skill</h2>
          <div className="mb-5 d-flex flex-wrap gap-2 justify-content-center">
            {skills.length === 0 && <p>No skills found.</p>}
            {skills.map((skill, idx) => (
              <button
                key={idx}
                className={`btn ${
                  selectedSkill === skill ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setSelectedSkill(skill)}
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Filtered Jobs */}
          {selectedSkill && (
            <>
              <h4 className="mb-4 text-center">
                Jobs for: <strong>{selectedSkill}</strong>
              </h4>
              <div className="row">
                {filteredJobs.length === 0 ? (
                  <div className="col-12 text-center">
                    <p className="text-danger">No jobs found for "{selectedSkill}"</p>
                  </div>
                ) : (
                  filteredJobs.map((job) => (
                    <div className="col-12 col-sm-6 col-lg-4 mb-4" key={job.id}>
                      <div className="block__16443 d-block p-4 bg-white shadow rounded h-100">
                        <div className="text-center mb-3">
                          <img
                            className="img-fluid"
                            src={job.image}
                            alt={job.title}
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
                        <p><strong>Skills:</strong> {job.skills?.join(", ")}</p>
                        <button
                          className="btn btn-success mt-3 w-100"
                          onClick={() => alert("Apply feature coming soon!")}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
