import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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

export default function SkillAutoCarousel() {
  const navigate = useNavigate();

  const styles = {
    wrapper: {
      backgroundColor: "#f5f5f5",
      padding: "3rem 1rem",
      textAlign: "center",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "2rem",
    },
    card: {
      background: "#fff",
      borderRadius: "20px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
      padding: "30px 20px",
      textAlign: "center",
      transition: "all 0.3s ease-in-out",
      cursor: "pointer",
    },
    image: {
      width: "80px",
      height: "80px",
      objectFit: "contain",
      marginBottom: "20px",
    },
    label: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#333",
    },
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}> Explore In-Demand Skills</h2>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        spaceBetween={40}
        slidesPerView={2}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
      >
        {skillsOptions.map((skill, index) => (
          <SwiperSlide key={index}>
            <div
              style={styles.card}
              onClick={() => navigate(`/skill/${skill.value}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(0,0,0,0.1)";
              }}
            >
              <img
                src={`https://cdn.simpleicons.org/${skill.icon}/4A90E2`}
                alt={skill.label}
                style={styles.image}
              />
              <div style={styles.label}>{skill.label}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
