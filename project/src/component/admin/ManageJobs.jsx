import {
  collection,
  onSnapshot,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { SyncLoader } from "react-spinners";
import Swal from "sweetalert2";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";

export default function ManageJobs() {
  const [user, setUser] = useState([]);
  const [load, setLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 10;

  // Fetch jobs data
  const fetchData = () => {
    const q = query(collection(db, "postJob"));
    onSnapshot(q, (userCol) => {
      const userList = userCol.docs.map((el) => ({
        ...el.data(),
        id: el.id,
      }));
      setUser(userList);
      setLoad(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete job
  const DeleteJob = (JobId) => {
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
          text: "Your job post has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const totalPages = Math.ceil(user.length / LIMIT);
  const paginatedUsers = user.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);

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
                <Link to="/admin">Home</Link>{" "}
                <span className="mx-2 slash">/</span>
                <span className="text-white">Manage Jobs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container my-5">
        {load ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <SyncLoader color="#89BA16" size={20} />
          </div>
        ) : user.length === 0 ? (
          <p className="text-center">No jobs found.</p>
        ) : (
          <div className="row">
            <div className="col table-responsive">
              <table className="table table-hover table-striped">
                <thead
                  className="table-dark"
                  style={{ backgroundColor: "#89BA16", color: "white" }}
                >
                  <tr>
                    <th>Sno</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Job Type</th>
                    <th>Salary</th>
                    <th>Qualification</th>
                    <th>Experience</th>
                    <th>Vacancies</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((el, index) => (
                    <tr key={index}>
                      <td>{(currentPage - 1) * LIMIT + index + 1}</td>
                      <td>
                        <img
                          src={el?.image}
                          alt="job"
                          style={{ height: "50px", width: "50px" }}
                        />
                      </td>
                      <td>{el?.title}</td>
                      <td>{el?.location}</td>
                      <td>{el?.jobType}</td>
                      <td>
                        <i className="bi bi-currency-rupee"></i>
                        {el?.salary}
                      </td>
                      <td>{el?.qualification}</td>
                      <td>{el?.experience}</td>
                      <td>{el?.vacancies}</td>
                      <td>
                        <button
                          onClick={() => DeleteJob(el.id)}
                          className="btn btn-danger"
                        >
                          <i className="bi bi-trash me-1"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="10">
                      <ResponsivePagination
                        current={currentPage}
                        total={totalPages}
                        onPageChange={setCurrentPage}
                      />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
