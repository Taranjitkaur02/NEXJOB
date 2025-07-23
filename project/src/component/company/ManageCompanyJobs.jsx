import { collection, deleteDoc, onSnapshot, query, where, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { toast } from "react-toastify"; // Ensure toast is imported

export default function ManageCompanyJobs() {
  const [user, setuser] = useState([]);
  const email = sessionStorage.getItem("email");

  const fetchData = () => {
    const q = query(collection(db, "postJob"), where("email", "==", email));

    onSnapshot(q, (userCol) => {
      setuser(
        userCol.docs?.map((el) => {
          return { ...el.data(), id: el.id };
        })
      );
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const DeleteJob = async (JobId) => {
    try {
      await deleteDoc(doc(db, "postJob", JobId));
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    }
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
              <h1 className="text-white font-weight-bold">Manage Jobs</h1>
              <div className="custom-breadcrumbs">
                <Link to={"/admin"}>Home</Link>{" "}
                <span className="mx-2 slash"></span>
                <span className="text-white">Manage Jobs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section
        className="site-section services-section bg-light block__62849"
        id="next-section"
      >
        <div className="container">
          <div className="row">
            {user.map((el) => (
              <div
                className="col-12 col-sm-6 col-lg-4 mb-4 mb-lg-5"
                key={el.id}
              >
                <div className="block__16443 d-block p-4 bg-white shadow rounded">
                  <div className="text-center mb-3">
                    <img
                      className="img-fluid"
                      src={el.image}
                      alt=""
                      style={{ borderRadius: "50%", maxHeight: "100px" }}
                    />
                  </div>
                  <h3 className="text-center">{el.title}</h3>

                  <p>
                    <i className="bi bi-geo-alt" style={{ marginRight: "6px" }}></i>
                    {el.location}
                  </p>

                  <p>
                    <i className="bi bi-clock" style={{ marginRight: "6px" }}></i>
                    {el.jobType}
                  </p>

                  <p>
                    <i className="bi bi-currency-rupee" style={{ marginRight: "6px" }}></i>
                    {el.salary}
                  </p>

                  <p>
                    <i className="bi bi-mortarboard" style={{ marginRight: "6px" }}></i>
                    {el.qualification}
                  </p>

                  <p>
                    <i className="bi bi-briefcase" style={{ marginRight: "6px" }}></i>
                    {el.experience} Year Experience
                  </p>

                  <p>
                    <i className="bi bi-person-lines-fill" style={{ marginRight: "6px" }}></i>
                    {el.vacancies} Vacancies
                  </p>

                  <button
                    onClick={() => DeleteJob(el.id)}
                    className="btn btn-danger mt-3 w-100"
                  >
                    Delete
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
