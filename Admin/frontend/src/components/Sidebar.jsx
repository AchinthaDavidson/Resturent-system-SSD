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
import {  useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const navigate = useNavigate();
    useEffect(() => {
        // Function to validate the token and get user info
        const validateToken = async () => {
          const token = localStorage.getItem('authToken'); // Get token from localStorage
    
          if (!token) {
          
            setTimeout(() => navigate('/'), 2000); // Redirect to login
            return;
          }
    
          try {
            // Send the token in the Authorization header
            const response = await axios.get('http://localhost:8070/user/current-user', {
              headers: {
                Authorization: `Bearer ${token}`, // Send token in Authorization header
              },
            });
    
         
          } catch (err) {
            // Handle invalid token or other errors
            console.error('Token validation error:', err);
          
            setTimeout(() => navigate('/'), 2000); // Redirect to login after 2 seconds
          }
        };
    
        validateToken(); // Validate the token when the component mounts
      }, [navigate]);


    const menuItem=[
        {
            path:"/dashboard",
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