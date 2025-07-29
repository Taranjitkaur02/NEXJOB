import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "contactMessages"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleResolve = async (id) => {
    try {
      await deleteDoc(doc(db, "contactMessages", id));
    } catch (error) {
      console.error("Failed to resolve message:", error.message);
    }
  };

  return (
    <>
    {/* style */}
      <style>{`
        .block__16443 {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .block__16443:hover {
          transform: perspective(1000px) translateZ(20px) scale(1.03);
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1), 0 0 20px rgba(137, 186, 22, 0.2);
        }

        @media (hover: none) {
          .block__16443:hover {
            transform: none;
            box-shadow: none;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("/assets/images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">Contact Messages</h1>
              <div className="custom-breadcrumbs">
                <Link to="/">Home</Link>
                <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Contact Messages</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Messages Section */}
      <section className="site-section services-section bg-light block__62849" id="next-section">
        <div className="container">
          {loading ? (
            <SyncLoader
              color="#89BA16"
              size={20}
              cssOverride={{ display: "block", margin: "50px auto" }}
            />
          ) : messages.length === 0 ? (
            <p className="text-center">No messages found.</p>
          ) : (
            <div className="row">
              {messages.map((msg) => (
                <div className="col-12 col-sm-6 col-lg-4 mb-4 mb-lg-5" key={msg.id}>
                  <div className="block__16443 d-block p-4 bg-white shadow rounded">
                    <h3 className="text-center mb-3">{msg.subject}</h3>

                    <p>
                      <i className="bi bi-person-fill me-2"></i>
                      <strong>{" "}
                        {msg.companyName
                          ? msg.companyName
                          : `${msg.firstName || ""} ${msg.lastName || ""}`}
                      </strong>
                    </p>

                    <p>
                      <i className="bi bi-envelope me-2"></i>{" "}
                      {msg.email}
                    </p>

                    <p>
                      <i className="bi bi-chat-left-text me-2"></i>{" "}
                      {msg.message}
                    </p>

                    <button
                      onClick={() => handleResolve(msg.id)}
                      className="btn w-100 mt-3"
                      style={{ backgroundColor: "#89BA16", color: "white" }}
                    >
                       Resolved
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
