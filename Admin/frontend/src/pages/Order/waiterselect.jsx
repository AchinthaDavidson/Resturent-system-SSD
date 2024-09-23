import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

function Waiterlist() {
const [waiter, setwaiter] = useState([]);
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
        function getwaiter() {
          const token = localStorage.getItem("authToken");
          axios.get("http://localhost:8070/waiter/",{
            headers: {
              Authorization: `Bearer ${token}`, // Send token in Authorization header
            }}).then((res) => {
            // console.log(res.data);
            setwaiter(res.data);
            // console.log(orders[1]);
          });
        }
        getwaiter();
      }, []);
    return(
        <div>
                <p>select Waiter</p> 
                 <select> {waiter.map((waiter) => (<option>{waiter.name}</option> ))}</select> 


        </div>


    )
}
export default Waiterlist;