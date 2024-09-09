import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaCarSide,
    FaPizzaSlice,
    FaBeer,
    FaQuestionCircle,
    FaMap
}from "react-icons/fa";
import{ImSpoonKnife}from "react-icons/im";
import{BiFoodMenu}from "react-icons/bi";
import { NavLink } from 'react-router-dom';

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
   
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/Menu",
            name:"Menu",
            icon:<BiFoodMenu/>
        },
        {
            path:"/Order",
            name:"Order",
            icon:<FaUserAlt/>
        },
        {
            path:"/Restaurant ",
            name:"Restaurant Inventory ",
            icon:<ImSpoonKnife/>
        },
        {
            path:"/Bar",
            name:"Bar Inventory",
            icon:<FaBeer/>
        },
        {
            path:"/viewDish",
            name:"Food",
            icon:<FaPizzaSlice/>
        },
        {
            path:"/Waiter",
            name:"Waiter",
            icon:<FaUserAlt/>
        },
       
        
        {
            path:"/Driver",
            name:"Driver",
            icon:<FaCarSide/>
        },
        {
            path:"/Map",
            name:"Map",
            icon:<FaMap/>
        },
        {
            path:"/QandA",
            name:"Q&A",
            icon:<FaQuestionCircle/>
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Palladium</h1>
                   <div style={{marginLeft: isOpen ? "35px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassname="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           
           <main>
           
          
            
                {children}
         
            
            
            </main>
           
        </div>
    );
};

export default Sidebar;