import React, { useState } from 'react';
import Select from 'react-select';
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Auth, db } from "../../Firebase";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
const qualificationOptions = [
  { value: 'btech-cs', label: 'B.Tech in Computer Science' },
  { value: 'btech-cse', label: 'B.Tech in Computer Science and Engineering' },
  { value: 'btech-it', label: 'B.Tech in Information Technology' },
  { value: 'mtech-cs', label: 'M.Tech in Computer Science' },
  { value: 'mtech-cse', label: 'M.Tech in Computer Science and Engineering' },
  { value: 'mtech-it', label: 'M.Tech in Information Technology' },
  { value: 'bca', label: 'BCA (Bachelor of Computer Applications)' },
  { value: 'mca', label: 'MCA (Master of Computer Applications)' },
  { value: 'diploma-cs', label: 'Diploma in Computer Science' },
  { value: 'diploma-cse', label: 'Diploma in Computer Science and Engineering' },
  { value: 'diploma-it', label: 'Diploma in Information Technology' },
  { value: 'btech-cloud-computing', label: 'B.Tech in Cloud Computing' },
  { value: 'mtech-cloud-computing', label: 'M.Tech in Cloud Computing' },
  { value: 'btech-cybersecurity', label: 'B.Tech in Cybersecurity' },
  { value: 'mtech-cybersecurity', label: 'M.Tech in Cybersecurity' },
  { value: 'btech-ai', label: 'B.Tech in Artificial Intelligence' },
  { value: 'mtech-ai', label: 'M.Tech in Artificial Intelligence' },
  { value: 'msc-data-science', label: 'M.Sc. in Data Science' },
  { value: 'btech-game-development', label: 'B.Tech in Game Development' },
  { value: 'msc-game-development', label: 'M.Sc. in Game Development' },
  { value: 'msc-mobile-development', label: 'M.Sc. in Mobile Development' },
  { value: 'btech-mobile-development', label: 'B.Tech in Mobile Development' },
  { value: 'mba-business-analytics', label: 'MBA in Business Analytics' },
  { value: 'msc-statistics', label: 'M.Sc. in Statistics' },
  { value: 'bsc-computer-science', label: 'B.Sc. in Computer Science' },
  { value: 'bca-data-science', label: 'BCA in Data Science' }
];

// Skills Options
const technicalSkillsOptions = [
  { value: 'html', label: 'HTML' }, { value: 'css', label: 'CSS' }, { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' }, { value: 'java', label: 'Java' }, { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' }, { value: 'csharp', label: 'C#' }, { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' }, { value: 'angular', label: 'Angular' }, { value: 'vue', label: 'Vue.js' },
  { value: 'nodejs', label: 'Node.js' }, { value: 'mongodb', label: 'MongoDB' }, { value: 'mysql', label: 'MySQL' },
  { value: 'graphql', label: 'GraphQL' }, { value: 'docker', label: 'Docker' }, { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'cloud', label: 'Cloud Computing (AWS, Azure, GCP)' }, { value: 'ml', label: 'Machine Learning' },
  { value: 'data-science', label: 'Data Science' }, { value: 'ai', label: 'Artificial Intelligence' },
  { value: 'devops', label: 'DevOps' }, { value: 'cloud-computing', label: 'Cloud Computing' },
  { value: 'network-security', label: 'Network Security' }, { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-development', label: 'Mobile Development' }, { value: 'machine-learning', label: 'Machine Learning' },
  { value: 'api-development', label: 'API Development' }, { value: 'system-design', label: 'System Design' },
  { value: 'game-development', label: 'Game Development' }, { value: 'blockchain', label: 'Blockchain Development' },
  { value: 'database-management', label: 'Database Management' }, { value: 'ios-development', label: 'iOS Development' },
  { value: 'android-development', label: 'Android Development' }
];

const softSkillsOptions = [
  { value: 'leadership', label: 'Leadership' }, { value: 'communication', label: 'Communication' },
  { value: 'teamwork', label: 'Teamwork' }, { value: 'problem-solving', label: 'Problem Solving' },
  { value: 'time-management', label: 'Time Management' }, { value: 'adaptability', label: 'Adaptability' },
  { value: 'empathy', label: 'Empathy' }, { value: 'creativity', label: 'Creativity' },
  { value: 'negotiation', label: 'Negotiation' }, { value: 'conflict-resolution', label: 'Conflict Resolution' },
  { value: 'critical-thinking', label: 'Critical Thinking' }, { value: 'presentation', label: 'Presentation' }
];
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [qualification, setQualification] = useState(null);
  const [skills, setSkills] = useState([]);
  const [about, setAbout] = useState("");
  const nav = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    if (contact.length !== 10) {
      toast.error("Contact number must be exactly 10 digits");
      return;
    }

    createUserWithEmailAndPassword(Auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        const data = {
          name,
          email,
          contact,
          qualification: qualification?.label,
          about,
          skills: skills?.map(skill => skill.label).join(', '),
          userType: 3,
          userId,
          status: true,
          createdAt: Timestamp.now(),
        };
        saveData(userId, data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const saveData = async (userId, data) => {
    try {
      await setDoc(doc(db, "users", userId), data);
      toast.success("Registered successfully");
      getUserData(userId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async (userId) => {
    const userDoc = await getDoc(doc(db, "users", userId));
    const userData = userDoc.data();
    if (!userData.status) {
      toast.error("Your account has been blocked!");
      return;
    }
    sessionStorage.setItem("name", userData.name);
    sessionStorage.setItem("email", userData.email);
    sessionStorage.setItem("userType", userData.userType);
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("isLogin", true);
    nav("/");
  };

  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(Auth, provider)
      .then(async (userCred) => {
        const userId = userCred.user.uid;
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (!userData.status) {
            toast.error("Your account has been blocked!");
            return;
          }
          getUserData(userId);
        } else {
          const data = {
            name: userCred.user.displayName || "",
            email: userCred.user.email || "",
            contact: userCred.user.phoneNumber || "",
            qualification: "",
            about: "",
            skills: "",
            userType: 3,
            userId,
            status: true,
            createdAt: Timestamp.now(),
          };
          await setDoc(doc(db, "users", userId), data);
          toast.success("Registered successfully");
          getUserData(userId);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <>
    
      <div className="site-wrap">
        <section className="section-hero overlay inner-page bg-image" style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <h1 className="text-white font-weight-bold">Sign Up</h1>
                <div className="custom-breadcrumbs">
                  <Link to="/">Home</Link>
                  <span className="mx-2 slash">/</span>
                  <span className="text-white"><strong>Register</strong></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="site-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-5">
                <h2 className="mb-4">Sign Up To NEXJOB</h2>
                <form
                  onSubmit={handleForm}
                  className="p-4"
                  style={{
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)",
                    borderRadius: "12px",
                    backgroundColor: "#ffffff"
                  }}
                >
                  <div className="form-group mb-3">
                    <label className="text-black">Name</label>
                    <input type="text" className="form-control" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-black">Contact</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Contact Number"
                      required
                      value={contact}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d{0,10}$/.test(val)) {
                          setContact(val);
                        }
                      }}
                      minLength={10}
                      maxLength={10}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label className="text-black">Email</label>
                      <input type="email" className="form-control" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="text-black">Password</label>
                      <input type="password" className="form-control" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-black">About</label>
                    <textarea className="form-control" placeholder="Tell us something about yourself" rows="3" required value={about} onChange={(e) => setAbout(e.target.value)} />
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-black">Qualification</label>
                    <Select options={qualificationOptions} value={qualification} onChange={setQualification} placeholder="Select your qualification" />
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-black">Skills</label>
                    <Select isMulti options={[...technicalSkillsOptions, ...softSkillsOptions]} value={skills} onChange={setSkills} placeholder="Select your skills" />
                  </div>

                  <div className="form-group">
                    <input type="submit" value="Sign Up" className="btn px-4 btn-primary text-white" />
                  </div>

                  <p>OR</p>
                  <div>
                    <button type="button" onClick={signInGoogle} style={{ border: "none", background: "none", padding: 0 }}>
                      <img src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png" alt="Sign in with Google" style={{ height: "40px", borderRadius: "8px" }} />
                    </button>
                  </div>
                </form>

                <div className="text-center mt-3">
                  <p>
                    Already have an account? <Link to="/login" className="text-primary">Log In</Link>
                  </p>
                </div>
              </div>

              <div className="col-lg-6 text-center">
                <img src="/assets/images/register.png" alt="Register Illustration" style={{ maxWidth: "600px", width: "100%", height: "auto", borderRadius: "12px", margin: "0 auto" }} />
                <p className="mt-0" style={{ fontSize: "1.1rem", color: "#555" }}>
                  <strong>Join thousands of job seekers.</strong><br />Start your journey with NEXJOB today!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
    </>
  );
}
