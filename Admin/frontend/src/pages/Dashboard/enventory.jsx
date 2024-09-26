import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { MdInventory} from "react-icons/md"

const Customer = () => {
    const [ressum, setRessum] = useState();
    const [barsum, setbarsum] = useState();
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
    async function getcount() {
      const token =await localStorage.getItem("authToken");
      
      axios.get("http://localhost:8070/resInventory/sum",{
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        }}).then((res) => {
        // ;
        setRessum(res.data[0].price);
      });
    }
    getcount();
  }, []);

  useEffect(() => {
    async function getcount() {

      const token =await localStorage.getItem("authToken");
      axios.get("http://localhost:8070/BarInventory/sum",{
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        }}).then((res) => {
        // ;
        setbarsum(res.data[0].price);
      });
    }
    getcount();
  }, []);


    return (
        <div style={{display:"flex"}}>
        <div style={{flexGrow: '6',minWidth:'25%',maxWidth:'40%'}}><MdInventory style={{fontSize:'65px',marginTop:'15px',marginLeft:'13px'}}/></div>
        <div style={{flexGrow: '1'}}>
        <Card.Title><label style={{fontSize:'20px'}}>Inventory stock</label></Card.Title>
        <Card.Text>
        <label style={{fontSize:'14px'}}>
            Restaurant   : Rs.{ressum}/= <br/>
            Bar         : Rs.{barsum}/=<br/>
            <div style={{color:'#7A2FF8'}}> Total stock : Rs.{ressum+barsum}/=</div>
        </label>
        </Card.Text>
        </div>
    </div>
  )
};
export default Customer;
