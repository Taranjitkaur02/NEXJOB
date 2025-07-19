import { collection, onSnapshot, query, where } from "firebase/firestore";
import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { db } from "../../Firebase";

export default function ManageCompany(){
    const [user, setuser]=useState([])
    const fetchData=()=>{
      let q=  query(collection(db, "users"),where("userType","==",2));
    
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
            <h1 className="text-white font-weight-bold">Manage Compnay</h1>
            <div className="custom-breadcrumbs">
              <Link to={"/admin"}>Home</Link> <span className="mx-2 slash">/</span>
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
                        <thead className="" style={{ backgroundColor: "#89BA16", color: "white" }}>
                            <tr>
                                <th>Sno</th>
                                <th>Company Name</th>
                                <th> Email</th>
                                <th>Contact</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody >
                            {user?.map((el,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                       
                                        <td>{el?.name}</td>
                                        <td>{el?.email}</td>
                                        <td>{el?.contact}</td>
                                        <td>{el?.location}</td>
                                        
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
