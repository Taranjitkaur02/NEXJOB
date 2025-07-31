import {
  collection,
  deleteDoc,
  onSnapshot,
  query,
  where,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import Swal from "sweetalert2";

export default function ManageCompanyJobs() {
  const [user, setUser] = useState([]);
  const [load, setLoad] = useState(true);
  const email = sessionStorage.getItem("email");

  const fetchData = () => {
    const q = query(collection(db, "postJob"), where("email", "==", email));
    onSnapshot(q, (userCol) => {
      setUser(
        userCol.docs?.map((el) => {
          return { ...el.data(), id: el.id };
        })
      );
      setLoad(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const DeleteJob = async (JobId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "postJob", JobId));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
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
                <Link to={"/company"}>Home</Link>{" "}
                <span className="mx-2 slash">/</span>
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
          {load ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "300px" }}
            >
              <SyncLoader color="#89BA16" size={30} loading={load} />
            </div>
          ) : user.length === 0 ? (
            <p className="text-center">No jobs posted yet.</p>
          ) : (
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
                        style={{
                          borderRadius: "50%",
                          maxHeight: "100px",
                        }}
                      />
                    </div>
                    <h3 className="text-center">{el.title}</h3>

                    <p>
                      <i className="bi bi-geo-alt me-2"></i>
                      {el.location}
                    </p>

                    <p>
                      <i className="bi bi-clock me-2"></i>
                      {el.jobType}
                    </p>

                    <p>
                      <i className="bi bi-currency-rupee me-2"></i>
                      {el.salary}
                    </p>

                    <p>
                      <i className="bi bi-mortarboard me-2"></i>
                      {el.qualification}
                    </p>

                    <p>
                      <i className="bi bi-briefcase me-2"></i>
                      {el.experience} Year Experience
                    </p>

                    <p>
                      <i className="bi bi-person-lines-fill me-2"></i>
                      {el.vacancies} Vacancies
                    </p>

                    <div className="d-flex flex-column flex-md-row justify-content-between mt-4 gap-2">
                      <button
                        onClick={() => DeleteJob(el.id)}
                        className="btn btn-danger w-100 w-md-50"
                      >
                        <i className="bi bi-trash-fill me-1 mx-2"></i> Delete
                      </button>
                      <Link
                        to={`/company/update-job/${el.id}`}
                        className="btn btn-primary w-100 w-md-50"
                      >
                        <i className="bi bi-pencil-square me-1 mx-2"></i> Update
                      </Link>
                    </div>
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


