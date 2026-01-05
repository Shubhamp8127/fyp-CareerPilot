import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signin.css";
import { FiMail, FiLock } from "react-icons/fi";
import axios from "axios";
import { useTranslation } from "react-i18next"; // ✅ add translation

const SignIn = ({ setUser }) => {
  const { t } = useTranslation(); // 🔹 t hook
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          email: emailValue,
          password: passwordValue,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.token) localStorage.setItem("token", res.data.token);

      setUser(res.data.user);

      alert(t("signin.loginSuccess", "Login successful!"));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || t("signin.loginFailed", "Login failed"));
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-header">
        <div className="signin-logo">CP</div>
        <h2>{t("signin.welcomeBack", "Welcome Back")}</h2>
        <p>{t("signin.signInToContinue", "Sign in to continue your career journey")}</p>
      </div>

      <div className="signin-card">
        <form onSubmit={handleSubmit}>
          <div className={`input-group ${emailValue ? "filled" : ""}`}>
            <div className="input-icon-wrapper">
              <input
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                required
              />
              <label>{t("signin.emailLabel", "Email Address")}</label>
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
              <label>{t("signin.passwordLabel", "Password")}</label>
              <span className="input-icon"><FiLock /></span>
            </div>
          </div>

          <span className="forgot">{t("signin.forgotPassword", "Forgot your password?")}</span>

          <button className="signin-btn" type="submit">
            {t("signin.signInButton", "Sign In →")}
          </button>
        </form>
      </div>

      <p className="signup-text">
        {t("signin.noAccount", "Don’t have an account?")}{" "}
        <span onClick={() => navigate("/register")}>{t("signin.signUpNow", "Sign Up Now")}</span>
      </p>
    </div>
  );
};

export default SignIn;
