import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/authScreens.css";

import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { getOTP } from "../api/api";

export default function ForgotPass() {
  const customStyle = { marginTop: "30px" };

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    if (email.trim() === "")
      return { valid: false, error: "Email is required" };
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email))
      return { valid: false, error: "Invalid email" };
    return { valid: true, error: "" };
  };

  const handleButtonClick = () => {
    const { valid, error } = validateEmail();
    if (!valid) return setError(error);
    getOTP({ email }).then((response) => {
      localStorage.setItem("otp", response.otp);
      localStorage.setItem("email", email);

      window.location.href = "/forgot-password/validate";
    });
  };

  return (
    <div className="container">
      <div className="card-wrapper">
        <div className="content-card">
          <div className="side">
            <div className="form-container">
              <span className="forgot-pass-clarification">
                If your email is in our database, we'll send you a unique code
                <b> (OTP) </b>to reset your password. Check your inbox and spam
                folder for the code and follow the instructions to reset your
                password securely.
              </span>
              <TextInput
                label="Email"
                type="email"
                placeholder="john@xyz.com"
                action={handleEmailChange}
                error={error}
              />

              <Button
                text="Send OTP"
                customStyle={customStyle}
                action={handleButtonClick}
              />
            </div>
          </div>
          <div className="side image-side">
            <div className="image-side-content">
              <span className="title">Reset your password</span>
              <div className="link-container">
                Remember the password?{" "}
                <Link to="/" className="link">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
