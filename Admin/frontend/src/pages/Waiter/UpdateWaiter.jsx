import React from "react";
import Niv from "../../components/Niv";
//import "./addWaiter.css";
import axios from 'axios';
import { useState, useRef, useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom";

const UpdateWaiter = () => {

  

    const [W_Id , setWid] = useState("");
    const [name , setName] = useState("");
    const [Email , setEmail] = useState("");
    const [address , setAddress] = useState("");
    const [phone_no , setPhone] = useState("");
    const [password , setPassword] = useState("");
    const [status , setStatus] = useState("");
    const history = useNavigate();
    const [token, setToken] = useState();
    
   const{id} = useParams();
   
   useEffect(() => {
    function getproduct() {
      const token = localStorage.getItem("authToken"); // Get token from localStorage

      if (token) {
        setToken(token);
      }}
      getproduct();
    }, []);

    /* */
   
   useEffect(()=>{
    axios.get(`http://localhost:8070/waiter/${id} `,{
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      }}).then((res)=>{
      setWid(res.data.W_Id)
      setName(res.data.name)
      setEmail(res.data.Email)
      setAddress(res.data.address)
      setPhone(res.data.phone_no)
      setPassword(res.data.password)
      setStatus(res.data.status)
    })
   } ,[]);
   
   
  /**/
   
  const waiter ={ W_Id , name , Email , phone_no  , address , password , status}
  
  function Update(e){
      e.preventDefault()
      axios.put(`http://localhost:8070/waiter/update/${id} ` ,waiter ,{
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        }}).then(()=>{

      history('/waiter')
      })
  }



  return (
    <div>
    <Niv name="Waiter/ UpdateWaiter" />
    <div className="data">
    <div className="waiterAdd">
      <header>Update Waiter</header>

      <form className="waiteraddForm" onSubmit={Update}>
      <div class="fields">
              <div class="input-field">
                <label className="Id"> Waiter Id</label>
                <input type="text" placeholder="Waiter Id"  value={ W_Id}
                onChange={(e) => setWid(e.target.value)} required/>
              </div>

              <div class="input-field">
                <label className="Name">Waiter Name</label>
                <input type="text" placeholder=" Waiter Name" value={name}
                onChange={(e) => setName(e.target.value)} required/>
              </div>

              <div class="input-field">
                <label className="email">Email</label>
                <input type="text" value={Email}  placeholder="Email"
                onChange={(e) => setEmail(e.target.value)} required/>
              </div>

              <div class="input-field">
                <label className="address">Address</label>
                <input type="text" value={address}  placeholder="Address"
                onChange={(e) => setAddress(e.target.value)} required/>
              </div>

              <div class="input-field">
                <label className="phone">Phone Number</label>
                <input type="text" value={phone_no} placeholder="Phone Number"
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

         
        <button class="waiterbtn" type="submit">
          <span>Update</span>
        </button>
        
            
      </form>
        <a href="/Waiter">
        <button class="waiterbtn">
          <span>Back</span>
        </button>
        </a>
    </div>
    </div>
  </div>


  );
};

export default UpdateWaiter;
