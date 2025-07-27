import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, getCountFromServer, updateDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";
import Switch from "react-switch"; // Import Switch for the toggle functionality
import Swal from "sweetalert2"; // For confirmation alerts

export default function ManageCompany() {
  const [companies, setCompanies] = useState([]);
  const [load, setLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 10;
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Fetch all companies and set pagination
  const fetchData = () => {
    const q = query(collection(db, "users"), where("userType", "==", 2));

    // This is to get the company data
    const unsub = onSnapshot(q, async (userCol) => {
      const data = userCol.docs.map((el) => ({
        ...el.data(),
        id: el.id,
      }));
      setCompanies(data);
      setLoad(false);

      // Count the total number of documents to set the total pages for pagination
      const countSnap = await getCountFromServer(q);
      setTotalPages(Math.ceil(countSnap.data().count / LIMIT));
    });

    return () => unsub(); // Cleanup subscription
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to toggle the status of the company
  const changeStatus = async (companyId, currentStatus) => {
    Swal.fire({
      title: `Are you sure you want to ${currentStatus ? "block" : "unblock"} this company?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${currentStatus ? "Block" : "Unblock"}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateDoc(doc(db, "users", companyId), {
          status: !currentStatus, // Toggle the status
        });
        Swal.fire("Success", `Company has been ${currentStatus ? "blocked" : "unblocked"}.`, "success");
      }
    });
  };

  return (
    <div>
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
                      <th>Actions</th>
                      <th>View Application</th>
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
                          <td>
                            {/* Display Status as text */}
                            {el.status ? "Active" : "Inactive"}
                          </td>
                          <td>
                            {/* Toggle Switch for status */}
                            <Switch
                              checked={el.status || false}
                              onChange={() => changeStatus(el.id, el.status)}
                              onColor="#89BA16" // Active color (green shade)
                              offColor="#888"   // Inactive color (gray shade)
                              onHandleColor="#fff" // White handle when on
                              offHandleColor="#fff" // White handle when off
                              uncheckedIcon={false}
                              checkedIcon={false}
                              className="ml-3"
                            />
                            </td>
                            <td>
                            {/* View Application Button after the toggle */}
                            <button
                              onClick={() => navigate(`/admin/company/applications/${el.id}`)} // Keep View Application button
                              className="btn btn-outline-primary ml-2"
                            >
                              <i className="bi bi-eye"></i> 
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={7}>
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
    </div>
  );
}
