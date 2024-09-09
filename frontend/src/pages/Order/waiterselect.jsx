import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

function Waiterlist() {
const [waiter, setwaiter] = useState([]);

    useEffect(() => {
        function getwaiter() {
          axios.get("http://localhost:8070/waiter/").then((res) => {
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