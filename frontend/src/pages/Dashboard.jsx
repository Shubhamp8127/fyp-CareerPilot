import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { getDashboardData } from "../services/dashboardApi";
import DashboardProgressSection from "../components/DashboardProgress";
import {
  Bell,
  GraduationCap,
  Bookmark,
  Zap,
  Trophy,
  Map
} from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await getDashboardData();
        setData(dashboardData);

        if (dashboardData.notifications > 0) {
          setHasNotification(true);
        } else {
          setHasNotification(false);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard. Make sure you are logged in.");
      }
    };

    fetchData();
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!data) return <p className="loading">Loading...</p>;

  return (
    <div className="dashboard-container">

      {/* TOP RIGHT ACTIONS */}
      <div className="dashboard-actions">
        <div className="notification">
          <Bell size={18} />
          {hasNotification && <span className="dot" />}
        </div>
        <button className="view-profile">View Profile</button>
      </div>

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>
          Welcome back, <span>{data.username}</span> !
        </h1>
        <p>Continue your career discovery journey</p>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="icon blue"><GraduationCap /></div>
          <h2>{data.quizzes}</h2>
          <p>Quiz Completions</p>
        </div>

        <div className="stat-card">
          <div className="icon pink"><Bookmark /></div>
          <h2>{data.colleges}</h2>
          <p>Saved Colleges</p>
        </div>

        <div className="stat-card">
          <div className="icon purple"><Zap /></div>
          <h2>{data.skills}</h2>
          <p>Skills Acquired</p>
        </div>

        <div className="stat-card">
          <div className="icon yellow"><Trophy /></div>
          <h2>{data.achievements}</h2>
          <p>Achievements</p>
        </div>
      </div>

      {/* ROADMAP */}
      <div className="roadmap-card">
        <div className="roadmap-header">
          <h3>Your 3D Roadmap Preview</h3>
          <span className="link">Explore Full Roadmap →</span>
        </div>

        <div className="roadmap-content">
          <Map size={40} />
          <h4>Generate Your First Roadmap</h4>
          <p>
            Create an AI-powered career roadmap to visualize your learning path
            and track progress.
          </p>
          <button className="primary-btn">
            Generate Your First Roadmap
          </button>
        </div>
      </div>

      {/* 🔥 NEW SECTION: Weekly Progress + Recent Activity */}
      <DashboardProgressSection
        weeklyProgress={data.weeklyProgress}
        recentActivity={data.recentActivity}
      />

    </div>
  );
}
