import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Bardata = (props) => {
    const id = props.id;
    const [data,setdata1] = useState([]);
    const [token, setToken] = useState();

    useEffect(()=>{
        function getItems1(){
          const token = localStorage.getItem("authToken"); // Get token from localStorage

          if (token) {
            setToken(token);
          }
    
            const url="http://localhost:8070/bardata/find/"+id;

            axios.get(url, {
              headers: {
                Authorization: `Bearer ${token}`, // Send token in Authorization header
              },
            }).then((res)=>{
                setdata1(res.data);
            });
        }
        getItems1(id);
    },[])
    console.log(data);

return(

    <div>
      <table className="barData">
        <tr>
          <th>Date - Time</th>
          <th>Quantity</th>
          <th>Unit Cost</th>
          <th>Total Cost</th>
        </tr>
          {data.map((data, index) => (
            <tr>
              <td>{data.date} - {data.time}</td>
              <td>{data.Quantity}</td>
              <td>{data.Unit_Cost}</td>
              <td>{data.Quantity*data.Unit_Cost}</td>
            </tr>
          ))}
      </table>
    </div>
      
  );

};
export default Bardata;
