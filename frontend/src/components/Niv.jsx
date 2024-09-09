import React from 'react';
import {   Link} from 'react-router-dom';
import Notification from './Notification';
import {
    FaBell
}from "react-icons/fa";
import {
    GoPrimitiveDot
}from "react-icons/go";


function Niv(props){

    function setdata() {
        if (document.getElementById("notification").hidden==false)
        document.getElementById("notification").hidden=true;
        else
        document.getElementById("notification").hidden=false;
       
      }
    return  <div className="topbar">
    <div className="topbarWrapper">
      <div className="topLft">
          <span className="lgo">{props.name}</span>
      </div>
      <div className="topRgt">

          <div className="topIcon" onClick={() =>( setdata())}>


          <  FaBell/>
              <span className="topIconbadge"><GoPrimitiveDot/></span>
          </div>
          
          <div className="topIcon">
          Hi,Achintha
              <span className="topIconbadge"></span>
          </div>
      </div>
     
    </div>
    
  </div>
}
export default Niv;


    
