import { collection, onSnapshot, query, deleteDoc,doc} from "firebase/firestore";
import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { db } from "../../Firebase";
import { toast } from "react-toastify";

export default function ManageJobs(){
    const [user, setuser]=useState([])
    const fetchData=()=>{
      let q=  query(collection(db, "postJob"));
    
      onSnapshot(q,(userCol)=>{
        setuser(userCol.docs?.map((el)=>{
            return {...el.data(), id:el.id};
        })) 
        
      })
    }
    // useEffect(fn, [dependency])
    useEffect(()=>{
        fetchData()
    },[])
    const DeleteJob = async (JobId) => {
        try {
          await deleteDoc(doc(db, "postJob", JobId));
          toast.success("Job deleted");
        } catch (error) {
          toast.error("Failed to delete Job");
          console.error("Delete error:", error);
        }
      };
    return(
        <>
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
              <Link to={"/admin"}>Home</Link> <span className="mx-2 slash"></span>
              <span className="text-white">
               
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
        <div className="container my-5">
            <div className="row">
                <div className="col table-responsive">
                    <table className="table table-hover table-striped">
                        <thead className="table-dark"  style={{ backgroundColor: "#89BA16", color: "white" }}>
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
                            {user?.map((el,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>
                                            <img src={el?.image} style={{height:"50px", width:"50px"}}/>
                                        </td>
                                        <td>{el?.title}</td>
                                        <td>{el?.location}</td>
                                        <td>{el?.jobType}</td>
                                        <td>{el?.salary}</td>
                                        <td>{el?.qualification}</td>
                                        <td>{el?.experience}</td>
                                        <td>{el?.vacancies}</td>
                                        <td>
                                            <button onClick={() => DeleteJob(el.id)} className="btn btn-danger">
                                              Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}
