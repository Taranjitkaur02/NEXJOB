import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getCountFromServer,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";
import Switch from "react-switch";
import Swal from "sweetalert2";
import { FaCheck, FaEye } from "react-icons/fa";

export default function ManageCompany() {
  const [companies, setCompanies] = useState([]);
  const [load, setLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 10;
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "users"), where("userType", "==", 2));
    const unsub = onSnapshot(q, async (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCompanies(data);
      setLoad(false);

      const countSnap = await getCountFromServer(q);
      setTotalPages(Math.ceil(countSnap.data().count / LIMIT));
    });

    return () => unsub();
  }, []);

  const changeStatus = async (companyId, currentStatus) => {
    Swal.fire({
      title: `Are you sure you want to ${currentStatus ? "block" : "unblock"} this company?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${currentStatus ? "Block" : "Unblock"} it`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateDoc(doc(db, "users", companyId), {
            status: !currentStatus,
          });
          Swal.fire({
            icon: "success",
            title: `Company has been ${currentStatus ? "blocked" : "unblocked"}.`,
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Error updating status",
            text: err.message,
          });
        }
      }
    });
  };

  return (
    <div>
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
                <Link to="/admin">Home</Link>
                <span className="mx-2 slash"></span>
                <span className="text-white">Companies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-5">
        {load ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <SyncLoader color="#89BA16" size={20} />
          </div>
        ) : companies.length === 0 ? (
          <p className="text-center">No companies found.</p>
        ) : (
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
                    <th>Action</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {companies
                    .slice((currentPage - 1) * LIMIT, currentPage * LIMIT)
                    .map((el, index) => (
                      <tr key={el.id}>
                        <td>{(currentPage - 1) * LIMIT + index + 1}</td>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>{el.contact || "—"}</td>
                        <td>{el.location || "—"}</td>
                        <td>{el.status ? "Active" : "Inactive"}</td>
                        <td>
                          <Switch
                            checked={el.status || false}
                            onChange={() => changeStatus(el.id, el.status)}
                            onColor="#006400"
                            offColor="#888"
                            onHandleColor="#fff"
                            offHandleColor="#fff"
                            uncheckedIcon={false}
                            checkedIcon={
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  height: "100%",
                                  color: "white",
                                  fontSize: 14,
                                }}
                              >
                                <FaCheck />
                              </div>
                            }
                            className="ml-2"
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => navigate(`/admin/company/applications/${el.id}`)}
                            title="View Applications"
                          >
                            <FaEye />
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
        )}
      </div>
    </div>
  );
}
