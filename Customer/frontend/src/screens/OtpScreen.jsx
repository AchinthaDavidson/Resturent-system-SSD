import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/authScreens.css";

import OtpInput from "../components/OtpInput";
import Button from "../components/Button";

export default function ForgotPass() {
  const otpInputCount = 4;
  const customStyle = { marginTop: "30px" };
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");

  const validateOtp = () => {
    if (otp.trim() === "") return { valid: false, error: "OTP is required" };
    if (otp.length !== otpInputCount)
      return { valid: false, error: `${otpInputCount} digits are required` };
    if (otp !== localStorage.getItem("otp"))
      return { valid: false, error: "Invalid OTP" };
    return { valid: true, error: "" };
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleButtonClick = () => {
    const { valid, error } = validateOtp();
    if (!valid) return setError(error);
    setError("");
    localStorage.setItem("otpPass", true);
    window.location.href = "/forgot-password/reset";
  };

  return (
    <div className="container">
      <div className="card-wrapper">
        <div className="content-card">
          <div className="side">
            <div className="form-container">
              <span className="forgot-pass-clarification">
                Enter the {otpInputCount}-digit code sent to your email address
              </span>
              <OtpInput
                count={otpInputCount}
                error={error}
                action={handleOtpChange}
              />
              <Button
                text="Continue"
                customStyle={customStyle}
                action={handleButtonClick}
              />
            </div>
          </div>
          <div className="side image-side">
            <div className="image-side-content">
              <span className="title">Enter 4 digit code</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
