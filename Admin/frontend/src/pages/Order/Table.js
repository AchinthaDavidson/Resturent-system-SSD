import { padding } from "@mui/system";
import React from "react";
import "./Order.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios"; 
export default function Table({ list, total, invoiceNumber, invoiceDate }) {


  return (
    <div style={{ maxWidth: "174px", fontSize: "11px" }}>
      <center>
        <h6>Palladium</h6>
        <br />
        Lawson street,
        <br />
        Nuwaraeliya <br />
      </center>
      {invoiceDate}&emsp;&emsp;&emsp; NO:{invoiceNumber}
      <br />
      <label>---------------------------------------------------------</label>
      <p> ITEM&emsp; QTY&emsp; PRICE&emsp;&emsp; AMOUNT</p>
      <label>---------------------------------------------------------</label>
      <table style={{ maxWidth: "188px", fontSize: "11px" }}>
        {list.map(({ id, description, quantity, price, amount,Iid }) => (
          <>
          <React.Fragment key={id}>
            {description}
            <br />
            <div
              style={{
                display: "flex",
                position: "relative",
                minWidth: "173px",
              }}
            >
              <div className="billdata1">{quantity}</div>
              <div className="billdata2">{price}.00</div>
              <div className="billdata3">{amount}.00</div>
             
            </div>
           
          </React.Fragment>
          
          </>
        ))}
      </table>
      <label>---------------------------------------------------------</label>
      <div style={{ display: "flex", position: "relative" }}>
        <div>Net Total</div>
        <div style={{ position: "absolute", right: "0px" }}>
          {" "}
          <b>LKR: {total.toLocaleString()}.00</b>
        </div>
      </div>
      <label>---------------------------------------------------------</label>
      <br />
      <br />
      <br />
      <center style={{ fontSize: "11" }}>
        Please call our hotline
        <br /> 0771413299 for your valued <br />
        suggestions and comments.
      </center>
    </div>
  );
}
