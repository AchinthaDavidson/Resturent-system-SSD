import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Foodlist = (props) => {
  const [token, setToken] = useState();
  const id=props.id;
  const url="http://localhost:8070/orderfood/findone/"+id
  const[foodlists,setFoodlists] = useState([]);
  useEffect(() => {
    function getproduct() {
      const token = localStorage.getItem("authToken"); // Get token from localStorage

      if (token) {
        setToken(token);
      }}
      getproduct();
    }, []);
  useEffect(() => {
      function getfoodlist(){
        const token = localStorage.getItem("authToken");
          axios.get(url,{
            headers: {
              Authorization: `Bearer ${token}`, // Send token in Authorization header
            }}).then(res=>{
            ;
            setFoodlists(res.data);
           (orders[1])
            
          });
      }
      getfoodlist();
  },[])

return (
    <div>
            {foodlists.map((foodlists, index) => (
                 <>
                     <p>{foodlists.food_id}{foodlists.qty}</p>
                     
                     <br/>
                     </>
                 
                ))}
       
      
      
        </div>
      
  );
};

export default Foodlist ;
