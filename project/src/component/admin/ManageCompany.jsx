import { collection, onSnapshot, query, where, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { toast } from "react-toastify";

export default function ManageCompany() {
  const [user, setuser] = useState([]);

  const fetchData = () => {
    const q = query(collection(db, "users"), where("userType", "==", 2));
    onSnapshot(q, (userCol) => {
      setuser(
        userCol.docs?.map((el) => ({
          ...el.data(),
          id: el.id,
        }))
      );
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const DeleteCompany = async (companyId) => {
    try {
      await deleteDoc(doc(db, "users", companyId));
      toast.success("Company deleted");
    } catch (error) {
      toast.error("Failed to delete company");
      console.error("Delete error:", error);
    }
  };

  return (
    <>
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
        <div className="row">
          <div className="col table-responsive">
            <table className="table table-hover table-striped">
              <thead className="" style={{ backgroundColor: "#89BA16", color: "white" }}>
                <tr>
                  <th>Sno</th>
                  <th>Company Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {user?.map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el?.name}</td>
                    <td>{el?.email}</td>
                    <td>{el?.contact}</td>
                    <td>{el?.location}</td>
                    <td>
                      <button onClick={() => DeleteCompany(el.id)} className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
