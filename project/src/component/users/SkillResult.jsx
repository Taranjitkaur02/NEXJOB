import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const skillsOptions = [
  { value: "html", label: "HTML", icon: "html5" },
  { value: "css", label: "CSS", icon: "css3" },
  { value: "javascript", label: "JavaScript", icon: "javascript" },
  { value: "python", label: "Python", icon: "python" },
  { value: "java", label: "Java", icon: "java" },
  { value: "react", label: "React", icon: "react" },
  { value: "nodejs", label: "Node.js", icon: "nodedotjs" },
  { value: "mongodb", label: "MongoDB", icon: "mongodb" },
  { value: "mysql", label: "MySQL", icon: "mysql" },
  { value: "cloud", label: "Cloud", icon: "amazonaws" },
  { value: "ml", label: "Machine Learning", icon: "tensorflow" },
  { value: "ai", label: "AI", icon: "openai" },
  { value: "devops", label: "DevOps", icon: "docker" },
  { value: "data-analysis", label: "Data Analysis", icon: "tableau" },
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
      <h2 style={styles.heading}>🔥 Explore In-Demand Skills</h2>
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
