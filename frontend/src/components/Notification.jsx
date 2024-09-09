import React from "react";
//import "./notification.css"
import Niv from '../components/Niv';
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notification = () => {

 
  return (
    <div  style={{display:"flex",minWidth:"200px",maxWidth:"200px",position:"absolute",background:"white",marginLeft:"75%",zIndex:"1000"}}
    >
      <ul hidden  id="notification" ><li>hjgjgj</li>
      <li>gjvvjhvj</li></ul>
    </div>

  );
};

export default Notification;
