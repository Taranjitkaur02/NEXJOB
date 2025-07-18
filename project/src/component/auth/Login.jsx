import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../Firebase";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let nav = useNavigate();

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();
   const auth = getAuth();

    signInWithEmailAndPassword(Auth,email,password)
  .then((userCredential) => {
    let userId= userCredential.user.uid
    getUserData(userId);
   // const user = userCredential.user;
    // toast.success("Login Sucessfully")
    // nav("/")
  })
  .catch((error) => {
    toast.error(error.message)
  });
  }
  const getUserData=async(userId)=>{
    let userDoc=await getDoc(doc(db,"users",userId))
    let userData = userDoc.data()
    // sessionStorage.setItem("name",userData?.name)
    sessionStorage.setItem("email",userData?.email)
    sessionStorage.setItem("userType",userData?.userType)
    sessionStorage.setItem("userId",userId)
    sessionStorage.setItem("isLogin",true)
    toast.success("Login Successfully")
    if(userData?.userType==1){
      nav("/admin")
    }
    else if(userData?.userType==2){
      nav("/company")
    }
    else{
      nav("/")
    }
    }
  const signInGoogle=()=>{
    let provider=new GoogleAuthProvider()
    signInWithPopup(Auth, provider)
    .then((userCred)=>{
        let userId=userCred.user.uid 
        getUserData(userId)
    
    })
    .catch((err)=>{
      toast.error(err.message)
    })
  }
  return (
    <>
      {/* <Navbar /> */}

      <div className="site-wrap">
       
        <section
          className="section-hero overlay inner-page bg-image"
          style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
          id="home-section"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <h1 className="text-white font-weight-bold">Log In</h1>
                <div className="custom-breadcrumbs">
                  <Link to="/">Home</Link>
                  <span className="mx-2 slash">/</span>
                  <span className="text-white">
                    <strong>Log In</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Login Section */}
        <section className="site-section">
          <div className="container">
            <div className="row align-items-center">
              {/* Left Column: Form */}
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h2 className="mb-4">Log In To NEXJOB</h2>
                <form onSubmit={handleForm} className="p-4 border rounded"
                  style={{
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)",
                    borderRadius: "12px",
                    backgroundColor: "#ffffff",
                    transition: "transform 0.3s ease"
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div className="form-group mb-3">
                    <label className="text-black">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      required
                      value={email}
                      onChange={changeEmail}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="text-black">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group ">
                    <input
                      type="submit"
                      value="Log In"
                      className="btn px-4 btn-primary text-white"
                    />
                  </div> 
                  <p>OR</p>
                   <button
                   onClick={signInGoogle}
                   style={{
                     border: "none",
                     background: "none",
                     padding: 0,
                     display: "inline-block",
                     borderRadius: "8px",
                     boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
                     transition: "transform 0.3s ease",
                   }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                <img
                   src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"
                   alt="Sign in with Google"
                   style={{
                   height: "40px",
                   display: "block",
                   borderRadius: "8px",
                   }}
                />
               </button>
                </form>
               



                <div className="text-center mt-3">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary">
                      Register here
                    </Link>
                  </p>
                </div>
              </div>

              {/* Right Column: Illustration */}
              <div className="col-lg-6 text-center">
                <img
                 src="/assets/images/log.png"
                  alt="Job Search Illustration"
                  style={{ maxWidth: "90%", height: "auto" }}
                />
                <p className="mt-4" style={{ fontSize: "1.1rem", color: "#555" }}>
                  <strong>Your dream job is just a few clicks away.</strong><br />
                  Join thousands of professionals using NEXJOB today.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* <Footer /> */}
      </div>
    </>
  );
}
