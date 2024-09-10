import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Foodlist from "../Order/foodlist";
function Topsales() {

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    function getorder() {
      axios.get("http://localhost:8070/order/top").then((res) => {
        // console.log(res.data);
        setOrders(res.data);
        // console.log(orders[1]);
      });
    }
    getorder();
  }, []);
  return (
    <Table striped style={{width:'100%',borderRadius:'10px',marginTop:'10px' }}>
      <thead>
        <tr >
          <th>Id </th>
          <th>Item</th>
          <th>amount(Rs)</th>
          <th>Time</th>
          <th>Type</th>
          <th>Customer</th>
        </tr>
      </thead>
      <tbody>
      {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.order_id}</td>
                <td>
                  <Foodlist id={order.order_id} />
                </td>
                <td>{order.amout}</td>
                <td> {order.time}</td>
                
               
                <td>{order.type}</td>
                <td>{order.cus_id}</td>
              </tr>
            ))}
      </tbody>
    </Table>
  );
}
export default Topsales;  