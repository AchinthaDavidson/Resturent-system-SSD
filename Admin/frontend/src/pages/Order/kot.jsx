
import React from "react";
import "./Order.css";
import { useState, useRef, useEffect } from "react";

export default function Table({ list, invoiceNumber, invoiceDate,type,table }) {


  const [istype, setIstype] = useState(false);
  useEffect(() => {
  if (Number(table)>=1  & type=="Dining"){
    setIstype(true)
  }
  else{
    setIstype(false)
  }
}, [table,type]);
  return (

    
    <div style={{ maxWidth: "174px", fontSize: "12px" }}>
     <br/><br/>
     <center>
     ######<b>{type}</b>######
     </center>
     <p>
      No : {invoiceNumber}<br/>
      {
        istype? (<div>Table NO : {table}<br/></div>):null
      }
     
      Printed : {invoiceDate}<br/>
      <label htmlFor="" style={{fontSize:"15px"}}>ITEM NAME</label>
      <label htmlFor="" style={{fontSize:"15px",paddingLeft:"60px"}}>UNIT</label>
     </p>


      <table style={{ fontSize: "11px" }}>
       
        {list.map(({ id, description, quantity, price, amount,Iid }) => (
          <>
          <React.Fragment key={id}>
          
           
          <div style={{ display: "flex", position: "relative", minWidth:"160px",fontSize:"15px"}}>
                <div>
                  <label htmlFor="invoiceNumber">
                  {description}
                  </label>
                </div>

                <div style={{ position: "absolute", right: "0px" }}>
                  <label htmlFor="invoiceDate">
                  {quantity}
                  </label>
                </div>
              </div>
           
          </React.Fragment>
          
          </>
        ))}
      </table>
      
      
    </div>
  );
}