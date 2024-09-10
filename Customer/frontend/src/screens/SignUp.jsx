import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "../styles/authScreens.css";

import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import { googleAuth, signUp } from "../api/api";

const genderOptions = [
  { key: "Male", value: "male" },
  { key: "Female", value: "female" },
];

export default function SignIn() {
  const customStyle = { marginTop: "30px" };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");
  const [error, setError] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  const validateSignUpInfo = () => {
    if (name.trim() === "") return { valid: false, error: "Name is required" };
    if (email.trim() === "")
      return { valid: false, error: "Email is required" };
    if (password.trim() === "")
      return { valid: false, error: "Password is required" };
    if (confirmPassword.trim() === "")
      return { valid: false, error: "Confirm Password is required" };
    if (phoneNumber.trim() === "")
      return { valid: false, error: "Phone Number is required" };
    if (address.trim() === "")
      return { valid: false, error: "Address is required" };

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email))
      return { valid: false, error: "Invalid email" };
    if (password !== confirmPassword)
      return { valid: false, error: "Passwords do not match" };
    return { valid: true, error: "" };
  };

  const handleButtonClick = () => {
    const { valid, error } = validateSignUpInfo();
    if (!valid) return setError(error);

    // let signUpInfo = JSON.stringify({
    //   name: name,
    //   email: email,
    //   password: password,
    //   phoneNumber: phoneNumber,
    //   address: address,
    //   gender: gender,
    // });
    signUp({
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      address: address,
      gender: gender,
    })
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

  return (
    <div className="container">
      <div className="card-wrapper">
        <div className="content-card reverse-flex">
          <div className="side">
            <div className="form-container full-width">
              <TextInput
                label="Name"
                type="text"
                placeholder="John Doe"
                action={handleNameChange}
              />
              <TextInput
                label="Email"
                type="email"
                placeholder="john@xyz.com"
                action={handleEmailChange}
              />
              <div className="flexRow">
                <TextInput
                  label="Password"
                  type="password"
                  placeholder="******"
                  action={handlePasswordChange}
                />
                <TextInput
                  label="Confirm Password"
                  type="password"
                  placeholder="******"
                  action={handleConfirmPasswordChange}
                />
              </div>
              <div className="flexRow">
                <TextInput
                  label="Phone Number"
                  type="tel"
                  placeholder="0711234567"
                  action={handlePhoneNumberChange}
                />
                <Select
                  options={genderOptions}
                  label="Gender"
                  onChange={handleGenderChange}
                />
              </div>
              <TextArea
                label="Address"
                placeholder="Enter your address"
                action={handleAddressChange}
                error={error}
              />
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
                Already have an account?{" "}
                <Link to="/Signin" className="link">
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
