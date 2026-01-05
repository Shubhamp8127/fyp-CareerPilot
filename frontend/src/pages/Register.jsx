import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import { FiMail, FiLock } from "react-icons/fi";
import axios from "axios";
import { useTranslation } from "react-i18next"; // ✅ Add translation

const Register = () => {
  const { t } = useTranslation(); // 🔹 t hook
  const navigate = useNavigate();
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordValue !== confirmPasswordValue) {
      alert(t("register.passwordMismatch", "Passwords do not match!"));
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          name: nameValue,
          email: emailValue,
          password: passwordValue,
        }
      );

      if (res.status === 201) {
        alert(t("register.accountCreated", "Account created successfully!"));
        navigate("/signin");
      }
    } catch (err) {
      alert(err.response?.data?.message || t("register.accountError", "Error creating account"));
    }
  };

  return (
    <div className="register-page">
      <div className="register-header">
        <div className="register-logo">CP</div>
        <h2>{t("register.createAccount", "Create Your Account")}</h2>
        <p>{t("register.signUpToContinue", "Sign up to start your career journey")}</p>
      </div>

      <div className="register-card">
        <form onSubmit={handleSubmit}>
          <div className={`input-group ${nameValue ? "filled" : ""}`}>
            <div className="input-icon-wrapper">
              <input
                type="text"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                required
              />
              <label>{t("register.fullName", "Full Name")}</label>
            </div>
          </div>

          <div className={`input-group ${emailValue ? "filled" : ""}`}>
            <div className="input-icon-wrapper">
              <input
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                required
              />
              <label>{t("register.emailLabel", "Email Address")}</label>
              <span className="input-icon"><FiMail /></span>
            </div>
          </div>

          <div className={`input-group ${passwordValue ? "filled" : ""}`}>
            <div className="input-icon-wrapper">
              <input
                type="password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                required
              />
              <label>{t("register.passwordLabel", "Password")}</label>
              <span className="input-icon"><FiLock /></span>
            </div>
          </div>

          <div className={`input-group ${confirmPasswordValue ? "filled" : ""}`}>
            <div className="input-icon-wrapper">
              <input
                type="password"
                value={confirmPasswordValue}
                onChange={(e) => setConfirmPasswordValue(e.target.value)}
                required
              />
              <label>{t("register.confirmPasswordLabel", "Confirm Password")}</label>
              <span className="input-icon"><FiLock /></span>
            </div>
          </div>

          <button className="register-btn" type="submit">
            {t("register.createAccountBtn", "Create Account →")}
          </button>
        </form>
      </div>

      <p className="signin-text">
        {t("register.alreadyAccount", "Already have an account?")}{" "}
        <span onClick={() => navigate("/signin")}>{t("register.signInNow", "Sign In")}</span>
      </p>
    </div>
  );
};

export default Register;
