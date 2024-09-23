import React from "react";
import Niv from "../../components/Niv";
import "./addDriver.css";
import axios from 'axios';
import { useState, useRef, useEffect } from "react";

const AddDriver = () => {

  const [id , setid] = useState("");
  const [name , setname] = useState("");
  const [email , setemail] = useState("");
  const [address , setaddress] = useState("");
  const [phone_no , setphone_no] = useState("");
  const [password , setpassword] = useState("");
  const [token, setToken] = useState();
  useEffect(() => {
    function getproduct() {
      const token = localStorage.getItem("authToken"); // Get token from localStorage

      if (token) {
        setToken(token);
      }}
      getproduct();
    }, []);
  const handleSubmit=(e)=>{
    e.preventDefault();
  const Driver = {id,name,email,address,phone_no,password};
    axios.post("http://localhost:8070/driver/add",Driver,{
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      }})
    .then(()=>{
      alert("Added successfully");
      setid('')
      setname('')
      setemail('')
      setaddress('')
      setphone_no('')
      setpassword('')
    })
    .catch((err)=>{
      alert(err);
    })
  }

  return (
    <div>
      <Niv name="Driver/ Add Driver" />
      <div className="data">
      <div className="menuAdd">
        <header>New Driver</header>

        <form className="MenuaddForm" onSubmit={handleSubmit}>
        <div class="fields">
                <div class="input-field">
                  <label className="D_Id">Driver Id</label>
                  <input type="text" placeholder="Driver Id" value={id}
                  onChange={(e) => setid(e.target.value)}/>
                </div>

                <div class="input-field">
                  <label className="D_name">Driver Name</label>
                  <input type="text" placeholder="Driver Name" value={name}
                  onChange={(e) => setname(e.target.value)}/>
                </div>

                <div class="input-field">
                  <label className="D_email">Email</label>
                  <input type="text" placeholder="Email" value={email}
                  onChange={(e) => setemail(e.target.value)}/>
                </div>

                <div class="input-field">
                  <label className="D_address">Address</label>
                  <input type="text" placeholder="Address" value={address}
                  onChange={(e) => setaddress(e.target.value)}/>
                </div>

                <div class="input-field">
                  <label className="D_phone">Phone Number</label>
                  <input type="text" placeholder="Phone Number" value={phone_no}
                  onChange={(e) => setphone_no(e.target.value)}/>
                </div>

                <div class="input-field">
                  <label className="D_password">Password</label>
                  <input type="text" placeholder="Password" value={password}
                  onChange={(e) => setpassword(e.target.value)}/>
                </div>

            </div>

              <button class="Menubtn" type="submit" >
                <span>Add</span>
              </button>
        </form>
          <a href="/Menu">
          <button class="Menubtn">
            <span>Cancel</span>
          </button>
          </a>
      </div>
      </div>
    </div>

  );
};

export default AddDriver;
