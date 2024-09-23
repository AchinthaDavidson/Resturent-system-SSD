import React, { useEffect, useState } from "react";
import axios from "axios";
import Niv from "../../components/Niv";
import Foodlist from "./foodlist";

import "./Order.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
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
    function getorder() {
      const token = localStorage.getItem("authToken");
      axios.get("http://localhost:8070/order/",{
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        }}).then((res) => {
        // console.log(res.data);
        setOrders(res.data);
        // console.log(orders[1]);
      });
    }
    getorder();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Niv name="Order History" />
      <div className="data">
        <input
          type="search"
          placeholder="search food....."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <div
          style={{ maxHeight: "10%", background: "green", overflowY: "auto" }}
        >
          {orders
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.order_id.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((order, index) => (
              <div key={index}>{order.order_id}</div>
            ))}
        </div>
        <div
          style={{
            minWidth: 230,
            marginTop: "80px",
            backgroundColor: "white",
            borderRadius: "9px",
          }}
        >
          <table className="ResDelDesc">
            <thead>
              <tr className="tbl-head">
                <td className="del-tbl-head">Order ID</td>
                <td className="del-tbl-head">foods</td>
                <td className="del-tbl-head">amount</td>
                <td className="del-tbl-head">Date/time</td>
                <td className="del-tbl-head">Waiter Name</td>

                <td className="del-tbl-head">type</td>
                <td className="del-tbl-head">Customer</td>
              </tr>
            </thead>

            {orders.map((order, index) => (
              <>
              <tr key={index}>
                <td>{order.order_id}</td>
               
                <td>{order.amout}</td>
                <td>
                  {order.date} - {order.time}
                </td>
                <td>{order.w_id}</td>

                <td>{order.type}</td>
                <td>{order.cus_id}</td>
              </tr>
              <tr  hidden>
                 <td colSpan={6} id="his">
                  <Foodlist id={order.order_id} />
                </td>
              </tr>
              </>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
