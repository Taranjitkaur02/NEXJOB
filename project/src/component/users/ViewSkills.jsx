import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

export default function TrendingSkillsCarousel() {
  const navigate = useNavigate();

  const skillsOptions = [
    { label: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { label: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { label: "JavaScript", icon: "https://static.vecteezy.com/system/resources/previews/027/127/463/non_2x/javascript-logo-javascript-icon-transparent-free-png.png" },
    { label: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { label: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { label: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { label: "Node.js", icon: "https://img.icons8.com/fluent/512/node-js.png" },
    { label: "AI", icon: "https://cdn-icons-png.flaticon.com/512/4630/4630645.png" },
  ];

  const handleClick = (skill) => {
    navigate(`/view-job?skill=${encodeURIComponent(skill)}`);
  };

  return (
    <>
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">Trending Skills</h1>
              <div className="custom-breadcrumbs">
                <Link to="/">Home</Link> <span className="mx-2 slash" /> 
                <span>/</span>
                <span>Skills</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section services-section bg-light" id="next-section" style={styles.section}>
        <div style={styles.container}>
          <Swiper
            modules={[Autoplay]}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            style={styles.swiper}
          >
            {skillsOptions.map((skill, index) => (
              <SwiperSlide key={index} style={styles.slide}>
                {({ isActive }) => (
                  <div
                   style={{
                        ...styles.card,
                        transform: isActive ? "scale(1.07)" : "scale(0.9)",
                        boxShadow: isActive
                          ? "0 20px 40px rgba(0, 0, 0, 0.25)"
                          : "4px 4px 10px rgba(0,0,0,0.15), -4px -4px 10px rgba(255,255,255,0.6)",
                      }}

                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = isActive
                        ? "scale(1.1)"
                        : "scale(0.95)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = isActive
                        ? "scale(1.07)"
                        : "scale(0.9)")
                    }
                  >
                    <img src={skill.icon} alt={skill.label} style={styles.icon} />
                    <h4 style={styles.label}>{skill.label}</h4>
                    <button
                      style={styles.button}
                      onClick={() => handleClick(skill.label)}
                    >
                      Explore Jobs
                    </button>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}

const styles = {
  section: {
    padding: "60px 0",
    background: "#f8f9fa",
  },
  container: {
    maxWidth: "1140px",
    margin: "0 auto",
    padding: "0 15px",
  },
  swiper: {
    padding: "20px 0",
  },
  slide: {
    width: "320px",
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "40px 25px",
    textAlign: "center",
    height: "400px",
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
  },
  icon: {
    width: "130px",
    height: "130px",
    margin: "0 auto 20px auto",
    objectFit: "contain",
  },
  label: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#89BA16",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    outline: "none",
    boxShadow: "0 4px 10px rgba(137,186,22,0.3)",
  },
};








