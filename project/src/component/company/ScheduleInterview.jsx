import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";

export default function ScheduleInterview() {
  const { jobId, applicationId } = useParams();
  const navigate = useNavigate(); // ✅ for redirection

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [meetingURL, setMeetingURL] = useState("");
  const [loading, setLoading] = useState(true);
  const [companyId, setCompanyId] = useState("");
  const [userId, setUserId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInterviewScheduled, setIsInterviewScheduled] = useState(false);

  // Fetch application data
  useEffect(() => {
    const fetchApplication = async () => {
      if (!applicationId) {
        toast.error("Missing applicationId.");
        setLoading(false);
        return;
      }

      try {
        const appRef = doc(db, "jobApplications", applicationId);
        const appSnap = await getDoc(appRef);
        if (!appSnap.exists()) {
          toast.error("Application not found.");
          setLoading(false);
          return;
        }

        const data = appSnap.data();
        setCompanyId(data.companyId || "");
        setUserId(data.userId || "");
      } catch (error) {
        console.error("Error fetching application:", error);
        toast.error("Failed to fetch application.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId]);

  // Load existing interview data
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const interviewRef = doc(db, "interviews", applicationId);
        const interviewSnap = await getDoc(interviewRef);
        if (interviewSnap.exists()) {
          const data = interviewSnap.data();
          const interviewDate = data.date?.toDate();
          if (interviewDate) {
            setDate(interviewDate.toISOString().slice(0, 10));
            setTime(interviewDate.toTimeString().slice(0, 5));
            setMeetingURL(data.link || "");
            setIsInterviewScheduled(true);
          }
        }
      } catch (err) {
        console.error("Error fetching interview:", err);
        toast.error("Failed to fetch interview.");
      }
    };

    if (applicationId) fetchInterview();
  }, [applicationId]);

  // Schedule or update interview
  const handleSchedule = async (e) => {
    e.preventDefault();

    if (!date || !time || !companyId || !userId) {
      toast.error("Please fill all fields.");
      return;
    }

    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    if (isNaN(selectedDateTime.getTime())) {
      toast.error("Invalid date/time format.");
      return;
    }

    if (selectedDateTime <= now) {
      toast.error("Cannot schedule/update interview for a past date or time.");
      return;
    }

    const roomName = `swap_${companyId}_${userId}`;
    const jitsiLink = `https://meet.jit.si/${roomName}`;

    setIsSubmitting(true);
    try {
      await setDoc(doc(db, "interviews", applicationId), {
        jobId: jobId || "",
        applicationId,
        companyId,
        userId,
        date: Timestamp.fromDate(selectedDateTime),
        link: jitsiLink,
        isMeetingStarted: false,
        isMeetingEnded: false,
        createdAt: new Date().toISOString(),
      });

      setMeetingURL(jitsiLink);
      setIsInterviewScheduled(true);
      toast.success("Interview scheduled successfully.");
    } catch (err) {
      console.error("Error scheduling interview:", err);
      toast.error("Failed to schedule interview.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start meeting
  const handleStartMeeting = async () => {
    if (!date || !time) {
      toast.error("Scheduled date or time is missing.");
      return;
    }

    const scheduledTime = new Date(`${date}T${time}`);
    const now = new Date();

    if (isNaN(scheduledTime.getTime())) {
      toast.error("Invalid scheduled date/time.");
      return;
    }

    if (scheduledTime > now) {
      toast.error("You can only start the interview on or after the scheduled time.");
      return;
    }

    try {
      await updateDoc(doc(db, "interviews", applicationId), {
        isMeetingStarted: true,
        isMeetingEnded: false,
      });

      toast.success("Meeting started!");
      window.open(meetingURL, "_blank");
    } catch (err) {
      console.error("Error starting meeting:", err);
      toast.error("Failed to start the meeting.");
    }
  };

  // ✅ End meeting and redirect
  const handleEndMeeting = async () => {
    try {
      await updateDoc(doc(db, "interviews", applicationId), {
        isMeetingStarted: false,
        isMeetingEnded: true,
      });
      toast.success("Meeting ended.");
      navigate("/company/view-application"); 
    } catch (err) {
      console.error("Error ending meeting:", err);
      toast.error("Failed to end meeting.");
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
                <Link to="/admin">Home</Link>{" "}
                <span className="mx-2 slash"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-5 col-md-8">
        <h2 className="mb-4 text-center">
          {isInterviewScheduled ? "Update Interview" : "Schedule Interview"}
        </h2>

        {loading ? (
          <SyncLoader
            color="#89BA16"
            size={15}
            cssOverride={{ display: "block", margin: "50px auto" }}
          />
        ) : (
          <div className="card shadow p-4">
            <form onSubmit={handleSchedule}>
              <div className="form-group mb-3">
                <label className="form-label fw-bold">Interview Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label fw-bold">Interview Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={isSubmitting}
              >
                {isInterviewScheduled
                  ? isSubmitting
                    ? "Updating..."
                    : "Update Interview"
                  : isSubmitting
                  ? "Scheduling..."
                  : "Schedule Interview"}
              </button>
            </form>

            {meetingURL && (
              <div className="mt-4 text-center">
                <button className="btn btn-primary me-2" onClick={handleStartMeeting}>
                  Start Interview
                </button>
                <button className="btn btn-danger ms-2" onClick={handleEndMeeting}>
                  End Interview
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
