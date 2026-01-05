import { useEffect, useState } from "react";
import "../styles/colleges.css";
import CollegeCard from "../components/CollegeCard";
import Footer from "../components/Footer"; // Footer import
import { useTranslation } from "react-i18next"; // ✅ add translation

const Colleges = () => {
  const { t } = useTranslation(); // 🔹 t hook
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Fetch colleges from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/colleges")
      .then(res => res.json())
      .then(data => setColleges(data))
      .catch(err => console.error(err));
  }, []);

  // Null-safe filter
  const filteredColleges = colleges.filter(
    college =>
      (college.name && college.name.toLowerCase().includes(search.toLowerCase())) ||
      (college.location && college.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="colleges-page">
      
      {/* ====== HEADER ====== */}
      <div className="college-header">
        <h1>
          {t("colleges.headerTitle", "Find Your Perfect")} <span>{t("colleges.headerSpan", "College")}</span>
        </h1>
        <p>
          {t(
            "colleges.headerDesc",
            "Discover top engineering colleges across India with detailed information and insights"
          )}
        </p>
      </div>

      {/* ====== SEARCH BAR ====== */}
      <div className="search-container">
        <div className="search-box">
          <i className="ri-search-line"></i>
          <input
            type="text"
            placeholder={t("colleges.searchPlaceholder", "Search colleges or cities...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="search-actions">
            <span>{t("colleges.filters", "Filters")}</span>
            <i className="ri-layout-grid-line active"></i>
          </div>
        </div>
      </div>

      {/* ====== CARDS ====== */}
      <div className="college-grid">
        {filteredColleges.slice(0, showAll ? filteredColleges.length : 6).map(college => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </div>

      {/* ====== MORE COLLEGES BUTTON ====== */}
      {!showAll && filteredColleges.length > 6 && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <button className="more-colleges-btn" onClick={() => setShowAll(true)}>
            {t("colleges.moreBtn", "More Colleges")}
          </button>
        </div>
      )}

      {/* ====== FOOTER ====== */}
      <Footer />

    </div>
  );
};

export default Colleges;
