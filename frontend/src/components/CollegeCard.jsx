import "../styles/CollegeCard.css";
import { Heart, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next"; // ✅ add translation

const CollegeCard = ({ college }) => {
  const { t } = useTranslation(); // 🔹 t hook

  return (
    <div className="college-card">
      {/* ===== TOP ===== */}
      <div className="card-top">
        <h3>{college.name}</h3>
        <Heart size={18} className="heart-icon" />
      </div>

      <p className="location">
        <MapPin size={14} /> {college.location}
      </p>

      {/* ===== TAG + RATING ===== */}
      <div className="meta">
        <span className={`badge ${college.type.toLowerCase()}`}>
          {college.type}
        </span>
        <span className="rating">⭐ {college.rating}</span>
        <span className="est">{t("collegeCard.est", "Est.")} {college.est}</span>
      </div>

      {/* ===== STATS ===== */}
      <div className="stats">
        <div>
          <p className="label">{t("collegeCard.annualFees", "Annual Fees")}</p>
          <p className="value">₹ {college.fees.toLocaleString()}</p>
        </div>
        <div>
          <p className="label">{t("collegeCard.cutoff", "Cutoff")}</p>
          <p className="cutoff">{college.cutoff}</p>
        </div>
      </div>

      {/* ===== COURSES ===== */}
      <div className="courses">
        <p className="label">{t("collegeCard.popularCourses", "Popular Courses")}</p>
        <div className="course-tags">
          {college.courses.slice(0, 3).map((c, i) => (
            <span key={i}>{c}</span>
          ))}
          {college.courses.length > 3 && (
            <span>
              +{college.courses.length - 3} {t("collegeCard.more", "more")}
            </span>
          )}
        </div>
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="actions">
        <button className="link">{t("collegeCard.viewDetails", "View Details")}</button>
        <a href={college.website} target="_blank" rel="noreferrer">
          <button className="visit">{t("collegeCard.visit", "Visit")} ↗</button>
        </a>
        <button className="compare">{t("collegeCard.compare", "Compare")}</button>
      </div>
    </div>
  );
};

export default CollegeCard;
