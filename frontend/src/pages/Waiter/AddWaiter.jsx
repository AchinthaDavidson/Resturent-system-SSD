import React from "react";
import Niv from "../../components/Niv";
import "./waitercss.css";
import axios from 'axios';
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddWAiter = () => {

  const [id , setId] = useState("");
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [address , setAddress] = useState("");
  const [phone , setPhone] = useState("");
  const [password , setPassword] = useState("");
  const [status , setStatus] = useState("");
  const history = useNavigate();
  
  
  const handleSubmit=(e)=>{
    e.preventDefault();

  const Waiter = {id,name,email , address , phone , password , status};
    axios.post("http://localhost:8070/waiter/add",Waiter)
    .then(()=>{
     
      console.log('added')
      setId('')
      setName('')
      setAddress('')
      setEmail('')
      setPassword('')
      setStatus('')
      setPhone('')
      history('/waiter')
    })
    .catch((err)=>{
      alert(err);
      console.log(err)
    })
  }

  return (
    <div>
      <Niv name="Waiter/ AddWaiter" />
      <div className="data">
      <div className="waiterAdd">
        <header>Add Waiter</header>

        <form className="waiteraddForm" onSubmit={handleSubmit}>
        <div class="fields">
                <div class="input-field">
                  <label className="Id"> Waiter Id</label>
                  <input type="text" placeholder="Waiter Id"  value={id}
                  onChange={(e) => setId(e.target.value)} required/>
                </div>

                <div class="input-field">
                  <label className="Name">Waiter Name</label>
                  <input type="text" placeholder=" Waiter Name" value={name}
                  onChange={(e) => setName(e.target.value)} required/>
                </div>

                <div class="input-field">
                  <label className="email">Email</label>
                  <input type="text" value={email}  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)} required/>
                </div>

                <div class="input-field">
                  <label className="address">Address</label>
                  <input type="text" value={address}  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)} required/>
                </div>

                <div class="input-field">
                  <label className="phone">Phone Number</label>
                  <input type="text" value={phone} placeholder="Phone Number"
                  onChange={(e) => setPhone(e.target.value)} required/>
                </div>

                <div class="input-field">
                  <label className="password">Password</label>
                  <input type="text" value={password}  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)} required/>
                </div>

                <div class="input-field">
                  <label className="status">Status</label>
                  <input type="text" value={status} placeholder="Status"
                  onChange={(e) => setStatus(e.target.value)} required/>
                </div>

            </div>

          



              <button class="waiterbtn" type="submit" >
                Add
              </button>
        </form>
          <a href="/Waiter">
          <button class="waiterbtn">
            <span>Cancel</span>
          </button>
          </a>
      </div>
      </div>
    </div>

  );
};

export default AddWAiter;
