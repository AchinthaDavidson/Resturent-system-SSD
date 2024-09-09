import React from "react";
import Card from "react-bootstrap/Card";
import { useState,  useEffect } from "react";
import axios from "axios";
import { MdPeopleAlt} from "react-icons/md"

const Customer = () => {
  const [count, setCount] = useState("");
  useEffect(() => {
    function getcount() {
      axios.get("http://localhost:8070/customer/count").then((res) => {
        // console.log(res.data);
        setCount(res.data);
        // console.log(orders[1]);
      });
    }
    getcount();
  }, []);

    return (
  <div style={{ display: "flex" }}>
    <div style={{ flexGrow: "6", minWidth: "25%", maxWidth: "40%" }}>
      <MdPeopleAlt
        style={{ fontSize: "65px", marginTop: "15px", marginLeft: "13px" }}
      />
    </div>
    <div style={{ flexGrow: "1" }}>
      <Card.Title>
        <label style={{ fontSize: "20px" }}>Customers</label>
      </Card.Title>
      <Card.Text>
        <label style={{ fontSize: "30px" }}>{count}</label>
        <br />
        <label style={{ fontSize: "12px", color: "green" }}>^2.6%</label>
        <label style={{ fontSize: "12px" }}>Since last month</label>
      </Card.Text>
    </div>
  </div>
  )
};
export default Customer;
