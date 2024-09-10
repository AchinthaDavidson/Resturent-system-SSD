import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/authScreens.css";

import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { restPass } from "../api/api";

export default function ResetPass() {
  const customStyle = { marginTop: "30px" };

  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handleConfirmPassChange = (e) => {
    setConfirmPass(e.target.value);
  };

  const validatePasswords = () => {
    if (pass.trim() === "")
      return { valid: false, error: "Password is required" };
    if (pass.trim().length < 8)
      return { valid: false, error: "Password must be at least 8 characters" };
    if (pass.trim() !== confirmPass.trim())
      return { valid: false, error: "Passwords do not match" };
    return { valid: true, error: "" };
  };

  const handleButtonClick = () => {
    const { valid, error } = validatePasswords();
    if (!valid) return setError(error);
    if (localStorage.getItem("otpPass")) {
      const email = localStorage.getItem("email");
      const otp = localStorage.getItem("otp");
      restPass({ email, otp, pass }).then((response) => {
        window.location.href = "/";
      });
    }
  };

  return (
    <div className="container">
      <div className="card-wrapper">
        <div className="content-card">
          <div className="side">
            <div className="form-container">
              <span className="forgot-pass-clarification">
                Once you reset your password, you will be redirected to the
                login page.
              </span>
              <TextInput
                label="New Password"
                type="password"
                placeholder="••••••••"
                action={handlePassChange}
              />
              <TextInput
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                action={handleConfirmPassChange}
                error={error}
              />

              <Button
                text="Reset Password"
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
