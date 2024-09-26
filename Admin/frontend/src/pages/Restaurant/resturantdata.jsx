 import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./stockView.css";

const Resturantdata = (props) => {
  
  const id=props.id;
  const [data, setdata] = useState([]);
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
    function getItems1() {
        const url="http://localhost:8070/Inventoryfood/find/"+id;
  
        axios.get(url,{
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          }}).then((res) => {
          setdata(res.data);
        });
      }
      getItems1();
  },[])

return (
    <div>
      <table className="resData">
        <tr>
          <th>Date - Time</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total Cost</th>
        </tr>
          {data.map((data, index) => (
            <tr>
              <td>{data.date} - {data.time}</td>
              <td>{data.Quantity}</td>
              <td>{data.Unit_Price}</td>
              <td>{data.Quantity*data.Unit_Price}</td>
            </tr>
          ))}
      </table>
    </div>
      
  );
};

export default Resturantdata ;
