import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "../styles/authScreens.css";
import { googleAuth, signIn } from "../api/api";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

export default function SignIn() {
  const customStyle = { marginTop: "30px" };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateLoginInfo = () => {
    if (username.trim() === "")
      return { valid: false, error: "Email is required" };
    if (password.trim() === "")
      return { valid: false, error: "Password is required" };
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(username))
      return { valid: false, error: "Invalid email" };
    return { valid: true, error: "" };
  };

  const handleButtonClick = () => {
    const { valid, error } = validateLoginInfo();
    if (!valid) return setError(error);
    signIn({ username, password })
      .then((response) => {
        localStorage.setItem("userData", JSON.stringify(response));
        window.location.href = "/";
      })
      .catch((err) => {
        setError("Invalid email or password");
      });
  };

  const responseMessage = (response) => {
    googleAuth({ token: response.credential })
      .then((response) => {
        localStorage.setItem("userData", JSON.stringify(response));
        window.location.href = "/";
      })
      .catch((err) => {
        setError("Login Error");
      });
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  useEffect(() => {
    let loginInfo = localStorage.getItem("loginInfo");
    if (!loginInfo)
      localStorage.setItem(
        "loginInfo",
        JSON.stringify({
          email: "user@email.com",
          password: "1234",
          name: "User",
        })
      );
  }, []);

  return (
    <div className="container">
      <div className="card-wrapper">
        <div className="content-card">
          <div className="side">
            <div className="form-container">
              <TextInput
                label="Email"
                type="email"
                placeholder="john@xyz.com"
                action={handleEmailChange}
              />
              <TextInput
                label="Password"
                type="password"
                placeholder="******"
                action={handlePasswordChange}
                error={error}
              />
              <Link to="/forgot-password" className="link">
                Forgot Password?
              </Link>
              <Button
                text="Sign In"
                customStyle={customStyle}
                action={handleButtonClick}
              />
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
          </div>
          <div className="side image-side">
            <div className="image-side-content">
              <span className="title">Sign In</span>
              <div className="link-container">
                Don't have an account?{" "}
                <Link to="/signup" className="link">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
