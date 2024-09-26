import React from "react";
import { useState,  useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

import { AiOutlineLineChart } from 'react-icons/ai';

const Order = () => {

  const [count, setCount] = useState("");
  const [token, setToken] = useState();
  useEffect(() => {
    function getproduct() {
      const token = localStorage.getItem("authToken"); // Get token from localStorage

      if (token) {
        setToken(token);
      }}
      getproduct();
    }, []);
  useEffect(() => {
    function getcount() {
      const token = localStorage.getItem("authToken");
      axios.get("http://localhost:8070/order/count",{
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        }}).then((res) => {
        // ;
        setCount(res.data);
        (orders[1]);
      });
    }
    getcount();
  }, []);

    return (
        <div style={{display:"flex"}}>
        <div style={{flexGrow: '6',minWidth:'25%',maxWidth:'40%'}}>< AiOutlineLineChart style={{fontSize:'65px',marginTop:'15px',marginLeft:'13px'}}/></div>
        <div style={{flexGrow: '1'}}>
        <Card.Title><label style={{fontSize:'20px'}}>Orders</label></Card.Title>
        <Card.Text>
           <label style={{fontSize:'30px'}}>{count}</label><br/>
           <label style={{fontSize:'12px',color:'green'}}>^2.6%</label> 
           <label style={{fontSize:'12px'}}>Since last month</label>
            

        </Card.Text>
        </div>
    </div>
  )
};
export default Order;
