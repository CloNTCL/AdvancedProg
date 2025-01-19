import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../styles/authentification.css";
import logo from "../assets/images/Logo_Efrei_2022.svg.png";

const Authentification = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectPath, setRedirectPath] = useState("");
  const [showPassword, setShowPassword] = useState(false); // État pour afficher/masquer le mot de passe

  const handlePress = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please, fill all fields!");
      return;
    }

    try {
      let apiEndpoint = "";
      if (email.includes("student")) {
        apiEndpoint =
          "https://advancedprog-anut.onrender.com/api/v1/studentUsers/studentLogin";
      } else if (email.includes("admin")) {
        apiEndpoint =
          "https://advancedprog-anut.onrender.com/api/v1/adminUsers/adminLogin";
      } else if (email.includes("teacher")) {
        apiEndpoint =
          "https://advancedprog-anut.onrender.com/api/v1/teacherUsers/teacherLogin";
      } else {
        setErrorMessage("Invalid email format!");
        return;
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token;
        const userId = responseData.user.id;
        const role = responseData.user.role;
        const fullName = responseData.user.fullName;
        const email = responseData.user.email;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("role", role);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("email", email);

        if (role === "student") {
          setRedirectPath("/student");
        } else if (role === "admin") {
          setRedirectPath("/admin");
        } else if (role === "teacher") {
          setRedirectPath("/teacher");
        }
      } else if (response.status === 404) {
        setErrorMessage("Mail or password incorrect!");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="school-logoC">
          <img src={logo} alt="School Logo" className="school-logo" />
        </div>
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handlePress}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="auth-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentification;
