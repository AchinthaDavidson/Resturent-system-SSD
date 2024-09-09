import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Bardata = (props) => {
    const id = props.id;
    const [data,setdata1] = useState([]);
    useEffect(()=>{
        function getItems1(){
            const url="http://localhost:8070/bardata/find/"+id;

            axios.get(url).then((res)=>{
                //console.log(res.data);
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