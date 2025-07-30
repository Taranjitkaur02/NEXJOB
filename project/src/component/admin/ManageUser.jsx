import {
  collection,
  getCountFromServer,
  onSnapshot,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { SyncLoader } from "react-spinners";
import Switch from "react-switch";
import Swal from "sweetalert2";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 10;
  const [totalPages, setTotalPages] = useState(1);
  //fetch data 
  const fetchData = () => {
    const q = query(collection(db, "users"), where("userType", "==", 3));
    onSnapshot(q, async (userCol) => {
      const userList = userCol.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(userList);
      setLoad(false);

      const countSnap = await getCountFromServer(q);
      setTotalPages(Math.ceil(countSnap.data().count / LIMIT));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeStatus = (userId, currentStatus) => {
    Swal.fire({
      title: `Are you sure you want to ${currentStatus ? "block" : "unblock"} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${currentStatus ? "Block" : "Unblock"}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateDoc(doc(db, "users", userId), {
          status: !currentStatus,
        });
        Swal.fire("Success", `User has been ${currentStatus ? "blocked" : "unblocked"}.`, "success");
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
              <h1 className="text-white font-weight-bold">Manage User</h1>
              <div className="custom-breadcrumbs">
                <Link to="/admin">Home</Link> <span className="mx-2 slash"></span>
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
              height: "60vh",
            }}
          >
            <SyncLoader color="#89BA16" size={20} />
          </div>
        ) : users.length === 0 ? (
          <p className="text-center">No users found.</p>
        ) : (
          <div className="row">
            <div className="col">
              <table
                className="table table-hover table-striped w-100"
                style={{ tableLayout: "auto" }}
              >
                <thead style={{ backgroundColor: "#89BA16", color: "white" }}>
                  <tr>
                    <th>Sno</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>About</th>
                    <th>Qualification</th>
                    <th>Skills</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .slice((currentPage - 1) * LIMIT, currentPage * LIMIT)
                    .map((el, index) => (
                      <tr key={el.id}>
                        <td>{(currentPage - 1) * LIMIT + index + 1}</td>
                        <td style={{ whiteSpace: "normal" }}>{el.name}</td>
                        <td style={{ whiteSpace: "normal" }}>{el.email}</td>
                        <td>{el.contact}</td>
                        <td style={{ whiteSpace: "normal" }}>{el.about}</td>
                        <td>{el.qualification}</td>
                        <td style={{ whiteSpace: "normal" }}>{el.skills}</td>
                        <td>{el.status ? "Active" : "Inactive"}</td>
                        <td>
                          <Switch
                            checked={el.status || false}
                            onChange={() => changeStatus(el.id, el.status)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={9}>
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
