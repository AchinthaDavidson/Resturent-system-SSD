import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import Header from "../components/header";

// import Navbar from "../components/Navbar";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import { updateData } from "../api/api";

const genderOptions = [
  { key: "Male", value: "male" },
  { key: "Female", value: "female" },
];

export default function Dashboard() {
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  useEffect(() => {
    let res = JSON.parse(localStorage.getItem("userData"));
    if (!res) window.location.href = "/";
    console.log(res);
    setUser(res);
  }, []);
  useEffect(() => {
    if (user) {
      setName(user.user.name);
      setEmail(user.user.email);
      setPhoneNumber(user.user.phoneNumber);
      setAddress(user.user.address);
      setGender(user.user.gender);
    }
  }, [user]);

  const changePassword = () => {
    window.location.href = "/forgot-password";
  };
  const updateUser = () => {
    updateData(
      { name, email, phoneNumber, address, gender },
      user?.Authorization
    ).then((response) => {
      if (response) {
        const newData = {
          user: { name, email, phoneNumber, address, gender },
          Authorization: user.Authorization,
        };
        localStorage.setItem("userData", JSON.stringify(newData));
        window.location.href = "/dashboard";
      }
    });
  };
  return (
    <div className="dashboard-wrapper">
      <Header/>
      <div className="container dashboard-container">
        <div className="dashboard-content">
          <span className="title">Personal Details</span>
          <div className="personal-details">
            <div className="personal-details-side">
              <TextInput
                label="Name"
                placeholder={name ? name : ""}
                action={handleNameChange}
              />
              {/* <TextInput label="Password" value="" /> */}

              <Select
                label="Gender"
                options={
                  gender?.toLowerCase() === "male"
                    ? genderOptions
                    : genderOptions.reverse()
                }
                action={handleGenderChange}
              />

              <Button text="Change Password" action={changePassword} />
              <Button text="Delete Account" />
              <Button text="Update Details" action={updateUser} />
            </div>
            <div className="personal-details-side">
              <TextInput
                label="Email"
                placeholder={email ? email : ""}
                action={handleEmailChange}
              />
              <TextInput
                label="Phone Number"
                placeholder={phoneNumber ? phoneNumber : ""}
                action={handlePhoneNumberChange}
              />
              <TextArea
                label="Address"
                placeholder={address ? address : ""}
                action={handleAddressChange}
              />
            </div>
          </div>

          <div className="button-container"></div>
        </div>
      </div>
    </div>
  );
}
