import React, { useEffect, useState } from "react";
import '../App.css';
import '../components/header.css';

import logo from '../Images/logo.png';
// import { Outlet, Link } from "react-router-dom";


console.log(logo);


function Header(){

    const [isprofile, setprofil] = useState(false);

    const [user, setUser] = useState({});

    const handleLogout = () => {
      localStorage.removeItem('userData');
      window.location.href = '/';
    };

    useEffect(() => {
      let res = JSON.parse(localStorage.getItem("userData"));
      if (!res) {
        
      }
      else{

      setprofil(true)
      console.log(res);
      setUser(res);
      }
    }, []);


    console.log()

    return(
     
      <div class="container">
      
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-black" >
        <a href="/" class="navbar-brand"><img src={logo} style={{width: "300px", height: "110px", objectFit: "cover"}} alt="logo"/></a>

            
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
            <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
                <div class="navbar-nav" style={{marginLeft:"2%"}}>
                    <a href="/" class="nav-item nav-link"style={{paddingLeft:"20%", paddingRight:"20%"}}><b>HOME</b></a>
                    <a href="/Menu" class="nav-item nav-link"style={{paddingLeft:"20%", paddingRight:"20%"}} ><b>MENU</b></a>
                    <a href="/FAQs" class="nav-item nav-link"style={{paddingLeft:"20%", paddingRight:"20%"}}><b>FAQs</b></a>
                </div>

                
                <div class="navbar-nav" style={{marginLeft:"65%"}}>
                  {/* {isprofile?user.user.name:(<a href="/Signin" class="nav-item nav-link" ><button class="lgBtn">Login</button></a>)} */}
                  {isprofile?(
                  
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                      {user.user.name}
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="/dashboard">Account</a></li>
                      <li><a class="dropdown-item" onClick={handleLogout}>Logout</a></li>
                    </ul>
                  </div>
                  ) : (
                  <div>
                    <a href="/Signin" class="nav-item nav-link" ><button class="lgBtn">Login</button></a>
                  </div>
                  )}
                </div> 
                
            </div>
       
    </nav>

      </div>
    )
}

export default Header;