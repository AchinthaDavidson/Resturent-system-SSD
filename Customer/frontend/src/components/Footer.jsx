import React from 'react'
import './Footer.css'
import github from '../Images/github.png';
import instagram from '../Images/instagram.png';
import linkedin from '../Images/linkedin.png';
import plogo from '../Images/plogo.png';



const Footer = () => {
  return (
    <div className="footer-container">
        <div className='footer'>
        <div className="logo-f">
                <img src={plogo} alt="" />
            </div>
            <div className="social-links">

                <img src={github} alt="" />
                <img src={instagram} alt="" />
                <img src={linkedin} alt="" />
            </div>

            
        </div>
    </div>
  )
}

export default Footer









// import React from "react";
// import '../App.css';

// function Footer(){

//     return(
//         <footer class="footer">
//           <div class="copy">&copy; 2023 Developer</div>
//           <div class="bottom-links">
//             <div class="links">
//               <span>More Info</span>
//               <a href="/">Home</a>
//               <a href="/Menu">Menu</a>
//               <a href="/FAQs">FAQs</a>
//             </div>
//           <div class="links">
//             <span>Social Links</span>
//             <a href="https://www.facebook.com/"><i class="fab fa-facebook"></i></a>
//             <a href="https://twitter.com/"><i class="fab fa-twitter"></i></a>
//             <a href="https://www.instagram.com/"><i class="fab fa-instagram"></i></a>
//           </div>
//           </div>
//         </footer>
//     )
// }

// export default Footer;