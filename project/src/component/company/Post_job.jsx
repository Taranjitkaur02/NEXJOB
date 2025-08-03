import { useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../Firebase";
import { toast } from "react-toastify";
import axios from "axios";
import Select from "react-select";  
const jobTitleOptions = [
  { value: 'software-engineer', label: 'Software Engineer' },
  { value: 'frontend-developer', label: 'Frontend Developer' },
  { value: 'backend-developer', label: 'Backend Developer' },
  { value: 'full-stack-developer', label: 'Full Stack Developer' },
  { value: 'data-scientist', label: 'Data Scientist' },
  { value: 'data-analyst', label: 'Data Analyst' },
  { value: 'devops-engineer', label: 'DevOps Engineer' },
  { value: 'machine-learning-engineer', label: 'Machine Learning Engineer' },
  { value: 'web-developer', label: 'Web Developer' },
  { value: 'mobile-developer', label: 'Mobile Developer' },
  { value: 'cloud-engineer', label: 'Cloud Engineer' },
  { value: 'cybersecurity-specialist', label: 'Cybersecurity Specialist' },
  { value: 'ui-ux-designer', label: 'UI/UX Designer' },
  { value: 'network-engineer', label: 'Network Engineer' },
  { value: 'qa-engineer', label: 'QA Engineer' },
  { value: 'business-intelligence', label: 'Business Intelligence Analyst' },
  { value: 'game-developer', label: 'Game Developer' },  
  { value: 'product-manager', label: 'Product Manager' },  
  { value: 'scrum-master', label: 'Scrum Master' },  
  { value: 'database-administrator', label: 'Database Administrator (DBA)' },  
  { value: 'cloud-architect', label: 'Cloud Architect' },  
  { value: 'it-support-specialist', label: 'IT Support Specialist' },  
  { value: 'digital-marketing-specialist', label: 'Digital Marketing Specialist' },  
  { value: 'seo-specialist', label: 'SEO Specialist' },  
  { value: 'content-strategist', label: 'Content Strategist' },  
  { value: 'salesforce-developer', label: 'Salesforce Developer' },  
  { value: 'business-analyst', label: 'Business Analyst' },  
  { value: 'data-engineer', label: 'Data Engineer' },  
  { value: 'it-consultant', label: 'IT Consultant' },  
  { value: 'hr-manager', label: 'HR Manager' },  
  { value: 'cybersecurity-analyst', label: 'Cybersecurity Analyst' },  
  { value: 'quality-assurance-analyst', label: 'Quality Assurance Analyst' },  
  { value: 'ios-developer', label: 'iOS Developer' },  
  { value: 'android-developer', label: 'Android Developer' },  
  { value: 'blockchain-developer', label: 'Blockchain Developer' },  
  { value: 'aws-solutions-architect', label: 'AWS Solutions Architect' },  
  { value: 'software-architect', label: 'Software Architect' },  
  { value: 'network-administrator', label: 'Network Administrator' },  
  { value: 'system-administrator', label: 'System Administrator' },  
  { value: 'business-development-manager', label: 'Business Development Manager' },  
  { value: 'it-security-manager', label: 'IT Security Manager' },  
];

const skillsOptions = [
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
  { value: 'csharp', label: 'C#' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'docker', label: 'Docker' },
  { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'cloud', label: 'Cloud Computing (AWS, Azure, GCP)' },
  { value: 'ml', label: 'Machine Learning' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'data-analysis', label: 'Data Analysis' },
  { value: 'ai', label: 'Artificial Intelligence' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'communication', label: 'Communication' },
  { value: 'teamwork', label: 'Teamwork' },
  { value: 'problem-solving', label: 'Problem Solving' },
  { value: 'time-management', label: 'Time Management' },
  { value: 'adaptability', label: 'Adaptability' },
  { value: 'empathy', label: 'Empathy' },
  { value: 'creativity', label: 'Creativity' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'conflict-resolution', label: 'Conflict Resolution' },
  { value: 'critical-thinking', label: 'Critical Thinking' },
  { value: 'presentation', label: 'Presentation' },

  { value: 'software-engineer', label: 'Software Engineering' },
  { value: 'frontend-development', label: 'Frontend Development' },
  { value: 'backend-development', label: 'Backend Development' },
  { value: 'full-stack-development', label: 'Full Stack Development' },
  { value: 'data-analysis', label: 'Data Analysis' },
  { value: 'data-engineering', label: 'Data Engineering' },
  { value: 'devops', label: 'DevOps' },
  { value: 'cloud-computing', label: 'Cloud Computing' },
  { value: 'network-security', label: 'Network Security' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-development', label: 'Mobile Development' },
  { value: 'machine-learning', label: 'Machine Learning' },
  { value: 'api-development', label: 'API Development' },
  { value: 'system-design', label: 'System Design' },
  { value: 'testing-and-debugging', label: 'Testing & Debugging' },
  { value: 'game-development', label: 'Game Development' },
  { value: 'agile-methodology', label: 'Agile Methodology' },
  { value: 'blockchain', label: 'Blockchain Development' },
  { value: 'seo', label: 'SEO' },
  { value: 'project-management', label: 'Project Management' },
  { value: 'scrum', label: 'Scrum' },
  { value: 'business-analysis', label: 'Business Analysis' },
  { value: 'database-management', label: 'Database Management' },
  { value: 'ios-development', label: 'iOS Development' },
  { value: 'android-development', label: 'Android Development' }
];


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
const cityOptions = [
  { value: 'amritsar', label: 'Amritsar' },
  { value: 'jalandhar', label: 'Jalandhar' },
  { value: 'ludhiana', label: 'Ludhiana' },
  { value: 'patiala', label: 'Patiala' },
  { value: 'bathinda', label: 'Bathinda' },
  { value: 'mohali', label: 'Mohali' },
  { value: 'hoshiarpur', label: 'Hoshiarpur' },
  { value: 'moga', label: 'Moga' },
  { value: 'ferozepur', label: 'Ferozepur' },
  { value: 'kapurthala', label: 'Kapurthala' },
  { value: 'tarn-taran', label: 'Tarn Taran' },
  { value: 'faridkot', label: 'Faridkot' },
  { value: 'rupnagar', label: 'Rupnagar' },
  { value: 'sangrur', label: 'Sangrur' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'chennai', label: 'Chennai' },
  { value: 'kolkata', label: 'Kolkata' },
  { value: 'hyderabad', label: 'Hyderabad' },
  { value: 'pune', label: 'Pune' },
  { value: 'ahmedabad', label: 'Ahmedabad' },
  { value: 'chandigarh', label: 'Chandigarh' },
  { value: 'surat', label: 'Surat' },
  { value: 'jaipur', label: 'Jaipur' },
  { value: 'lucknow', label: 'Lucknow' },
  { value: 'indore', label: 'Indore' },
  { value: 'patna', label: 'Patna' },
  { value: 'bhopal', label: 'Bhopal' },
  { value: 'nagpur', label: 'Nagpur' },
  { value: 'kanpur', label: 'Kanpur' },
  { value: 'vadodara', label: 'Vadodara' },
  { value: 'coimbatore', label: 'Coimbatore' },
  { value: 'trivandrum', label: 'Trivandrum' },
  { value: 'rajkot', label: 'Rajkot' },
  { value: 'ranchi', label: 'Ranchi' },
  { value: 'vijayawada', label: 'Vijayawada' },
  { value: 'noida', label: 'Noida' },
  { value: 'mysore', label: 'Mysore' },
  { value: 'patiala', label: 'Patiala' },
  { value: 'jamshedpur', label: 'Jamshedpur' },
  { value: 'aurangabad', label: 'Aurangabad' },
  { value: 'belgaum', label: 'Belgaum' },
  { value: 'tamilnadu', label: 'Tamil Nadu' },
  { value: 'meerut', label: 'Meerut' },
  { value: 'faridabad', label: 'Faridabad' },
  { value: 'howrah', label: 'Howrah' },
  { value: 'dhanbad', label: 'Dhanbad' },
  { value: 'ludhiana', label: 'Ludhiana' },
  { value: 'jodhpur', label: 'Jodhpur' },
  { value: 'kanchipuram', label: 'Kanchipuram' },
  { value: 'ghaziabad', label: 'Ghaziabad' },
  { value: 'gwalior', label: 'Gwalior' },
  { value: 'shimla', label: 'Shimla' },
  { value: 'mussoorie', label: 'Mussoorie' },
  { value: 'kannur', label: 'Kannur' },
  { value: 'nagapattinam', label: 'Nagapattinam' },
  { value: 'puducherry', label: 'Puducherry' },
  { value: 'tirunelveli', label: 'Tirunelveli' },
  { value: 'mangalore', label: 'Mangalore' },
  { value: 'ujjain', label: 'Ujjain' },
  { value: 'bhubaneswar', label: 'Bhubaneswar' },
  { value: 'imphal', label: 'Imphal' },
  { value: 'agartala', label: 'Agartala' },
  { value: 'gangtok', label: 'Gangtok' },
  { value: 'portblair', label: 'Port Blair' },
  { value: 'dehradun', label: 'Dehradun' }
];

export default function Post_job() {
  const [title, setTitle] = useState(""); 
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Full Time");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState([]); 
  const [qualification, setQualification] = useState([]); 
  const [experience, setExperience] = useState("");
  const [vacancies, setVacancies] = useState("");
  const [description, setDescription] = useState("");
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState({});

  const companyEmail = sessionStorage.getItem("email");
  const userId = sessionStorage.getItem("userId");

  const handleForm = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User not logged in. Cannot post job.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "images");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dhvmmiipj/image/upload",
        formData
      );
      saveData(response.data.secure_url);
    } catch (error) {
      toast.error("Image upload failed: " + error.message);
    }
  };

  const saveData = async (imageUrl) => {
    try {
      const data = {
        title,
        location,
        jobType,
        salary,
        skills: skills.map((skill) => skill.value).join(', '), 
        qualification: qualification.map((qual) => qual.value).join(', '), 
        experience,
        vacancies,
        description,
        status: true,
        image: imageUrl,
        email: companyEmail,
        userId,
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "postJob"), data);
      toast.success("Job Posted Successfully");
      setTitle("");
      setLocation("");
      setJobType("Full Time");
      setSalary("");
      setSkills([]);
      setQualification([]);
      setExperience("");
      setVacancies("");
      setDescription("");
      setImage({});
      setImageName("");
    } catch (err) {
      toast.error("Error saving job: " + err.message);
    }
  };

  const changeImage = (e) => {
    setImageName(e.target.value);
    setImage(e.target.files[0]);
  };

  return (
    <div className="site-wrap">
      {/* Hero Section */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="text-white font-weight-bold">Post A Job</h1>
              <div className="custom-breadcrumbs">
                <Link to="/company">Home</Link> <span className="mx-2 slash">/</span>
                <Link to="/company/manage-jobs">Job</Link> <span className="mx-2 slash">/</span>
                <span className="text-white"><strong>Post a Job</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="site-section">
        <div className="container col-8">
          <form
            className="p-4 p-md-5 border rounded shadow-lg bg-white"
            onSubmit={handleForm}
            style={{ borderRadius: "20px" }}
          >
            <h3 className="text-black mb-4 border-bottom pb-2">Job Details</h3>

            {/* Job Title & Location */}
            <div className="form-row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Job Title</label>
                  <Select
                    name="job-title"
                    options={jobTitleOptions}
                    value={title ? { value: title, label: title } : null}
                    onChange={(selectedOption) => setTitle(selectedOption?.value || "")}
                    placeholder="Select Job Title"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Location</label>
                  <Select
                    name="location"
                    options={cityOptions}
                    value={location ? { value: location, label: location } : null}
                    onChange={(selectedOption) => setLocation(selectedOption?.value || "")}
                    placeholder="Select Location"
                  />
                </div>
              </div>
            </div>

            {/* Job Type, Salary & Experience */}
            <div className="form-row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Job Type</label>
                  <select
                    className="form-control"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Salary (Monthly)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g. 40000"
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Experience (Years)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 2"
                  />
                </div>
              </div>
            </div>

            {/* Skills, Qualification & Vacancies */}
            <div className="form-row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Required Skills</label>
                  <Select
                    isMulti
                    name="skills"
                    options={skillsOptions}
                    value={skills}
                    onChange={setSkills}
                    placeholder="Select skills"
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Qualification</label>
                  <Select
                    isMulti
                    name="qualification"
                    options={qualificationOptions}
                    value={qualification}
                    onChange={setQualification}
                    placeholder="Select qualifications"
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Number of Vacancies</label>
                  <input
                    type="number"
                    className="form-control"
                    value={vacancies}
                    onChange={(e) => setVacancies(e.target.value)}
                    placeholder="e.g. 3"
                  />
                </div>
              </div>
            </div>

            {/* Job Description & Image Upload */}
            <div className="form-group">
              <label>Job Description</label>
              <textarea
                className="form-control"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write the job description here..."
              ></textarea>
            </div>

            <div className="form-group">
              <label>Upload Featured Image</label>
              <input
                type="file"
                className="form-control-file"
                value={imageName}
                onChange={changeImage}
              />
            </div>

            {/* Submit Button */}
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block py-3">
                Post Job
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}