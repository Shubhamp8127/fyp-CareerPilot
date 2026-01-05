import "../styles/features.css";
import { useTranslation } from "react-i18next";

const featuresData = [
  { key: "aiGuidance", icon: "🤖" },
  { key: "careerMaps", icon: "🗺️" },
  { key: "collegeInsights", icon: "🏫" },
  { key: "scholarshipAlerts", icon: "🎓" },
];

const Features = () => {
  const { t } = useTranslation();
  return (
    <section className="features-section">
      <h2 className="features-title">{t("features.title")}</h2>
      <div className="features-container">
        {featuresData.map((feature) => (
          <div className="feature-card" key={feature.key}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{t(`features.${feature.key}.title`)}</h3>
            <p>{t(`features.${feature.key}.description`)}</p>
          </div>
        ))}
      </div>
      <div className="features-button-container">
        <button className="btn-primary">{t("features.exploreButton")}</button>
      </div>
    </section>
  );
};

export default Features;
