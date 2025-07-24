import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
  getCountFromServer,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import Swal from "sweetalert2";
import Switch from "react-switch";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";

export default function ManageCompany() {
  const [companies, setCompanies] = useState([]);
  const [load, setLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 10;
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = () => {
    const q = query(collection(db, "users"), where("userType", "==", 2));
    onSnapshot(q, async (userCol) => {
      const data = userCol.docs.map((el) => ({
        ...el.data(),
        id: el.id,
      }));
      setCompanies(data);
      setLoad(false);

      const countSnap = await getCountFromServer(q);
      setTotalPages(Math.ceil(countSnap.data().count / LIMIT));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const DeleteCompany = (companyId) => {
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
        await deleteDoc(doc(db, "users", companyId));
        Swal.fire("Deleted!", "Company has been deleted.", "success");
      }
    });
  };

  const changeStatus = (companyId, status) => {
    Swal.fire({
      title: `Are you sure you want to ${status ? "block" : "unblock"} this company?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status ? "Block" : "Unblock"}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateDoc(doc(db, "users", companyId), {
          status: !status,
        });
        Swal.fire("Success!", `Company has been ${status ? "blocked" : "unblocked"}.`, "success");
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
              <h1 className="text-white font-weight-bold">Manage Company</h1>
              <div className="custom-breadcrumbs">
                <Link to="/admin">Home</Link> <span className="mx-2 slash"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <div className="container my-5">
        {load ? (
          <SyncLoader
            color="#89BA16"
            size={20}
            cssOverride={{ display: "block", margin: "50px auto" }}
          />
        ) : companies.length === 0 ? (
          <p className="text-center">No companies found.</p>
        ) : (
          <>
            <div className="row">
              <div className="col table-responsive">
                <table className="table table-hover table-striped">
                  <thead style={{ backgroundColor: "#89BA16", color: "white" }}>
                    <tr>
                      <th>Sno</th>
                      <th>Company Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Toggle</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies
                      .slice((currentPage - 1) * LIMIT, currentPage * LIMIT)
                      .map((el, index) => (
                        <tr key={el.id}>
                          <td>{(currentPage - 1) * LIMIT + index + 1}</td>
                          <td>{el?.name}</td>
                          <td>{el?.email}</td>
                          <td>{el?.contact}</td>
                          <td>{el?.location}</td>
                          <td>{el?.status ? "Active" : "Inactive"}</td>
                          <td>
                            <Switch
                              checked={el?.status || false}
                              onChange={() => changeStatus(el.id, el?.status)}
                            />
                          </td>
                          <td>
                            <button
                              onClick={() => DeleteCompany(el.id)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={8}>
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
          </>
        )}
      </div>
    </>
  );
}
