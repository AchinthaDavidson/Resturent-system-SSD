import React from "react";
import pic4 from '../../Images/chicken2.png';
import pic3 from '../../Images/3.png';
import pic2 from '../../Images/beef.png';
import logo from '../../Images/logo.png';
import newtag from '../../Images/new.png';
import pizza from '../../Images/pizza.png';
import Header from "../../components/header";
import Footer from "../../components/Footer.jsx";
import './Homepage.css';
import { useNavigate } from "react-router-dom";

console.log(logo);



function Homepage(){

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/Menu`; 
    navigate(path);
  }

    return(
      
<div>
<Header/>
<div className="cont">
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-6">
            <img class="img-fluid"src={pizza} style={{height:"auto"}} alt="Pizza"/>
        </div>
        <div class="col-lg-6">
        <p class="text-center" style={{fontSize:"55px",color:"white"}}>Easy way to order your food</p>
          <h1 class="text-center" style={{fontSize:"100px",color:"white"}}>Tasty and<br/>Fresh Food</h1>
          <h1 class="text-center" style={{fontSize:"100px"}} id="cursive">Anytime</h1>
          <p class="text-center" style={{fontSize:"40px",color:"white"}}>Just confirm your order and enjoy our delicious fastest<br/>delivery.</p>
          <div class="col text-center">
            <button class="button-33" onClick={routeChange}>See Menu</button>
          </div>
            
        </div>
    </div>
</div>




<p class="text-center2" style={{color:"white", fontSize:"35px"}}><b><span>WHAT'S NEW</span></b></p>
    <div class="card-group" style={{margin:"-2% 3% 4% 3%"}}>
  <div class="card bg-light" style={{margin:"2%", borderRadius: "5%"}}>
    <img class="card-img-top" src={pic2} alt="Beef"/>
    <div class="card-body">
      <h5 class="card-title" >DEVILLED BEEF</h5>
      <p class="card-text" >Rs. 850 /=</p>
    </div>
    <div class="card-footer">
    <img class="card-img-new" style={{height:"50px"}} src={newtag} alt="new"/>
    <button type="button" style={{marginLeft:"60%"}} class="btn btn-success" onClick={routeChange}>Order Now</button>
    </div>
  </div>
  <div class="card bg-light" style={{margin:"2%", borderRadius: "5%"}}>
    <img class="card-img-top" src={pic3} alt="prawn"/>
    <div class="card-body">
      <h5 class="card-title">Pepper Prawns</h5>
      <p class="card-text" >Rs. 1425 /=</p>
    </div>
    <div class="card-footer">
    <img class="card-img-new" style={{height:"50px"}} src={newtag} alt="new"/>
    <button type="button" style={{marginLeft:"60%"}} class="btn btn-success" onClick={routeChange}>Order Now</button>
    </div>

  </div>
  <div class="card bg-light" style={{margin:"2%", borderRadius: "5%"}}>
    <img class="card-img-top" src={pic4} alt="Chicken"/>
    <div class="card-body">
      <h5 class="card-title">Crispy Chicken</h5>
      <p class="card-text">Rs. 790 /=</p>
    </div>
    <div class="card-footer">
    <img class="card-img-new" style={{height:"50px"}} src={newtag} alt="new"/>
    <button type="button" style={{marginLeft:"60%"}} class="btn btn-success" onClick={routeChange}>Order Now</button>
    </div>
    
  </div>
</div>


<div class="media" style={{margin:"4% 5%"}}>
  {/* <img class="rounded float-right" src={logo} style={{height:"200px"}} alt="Generic placeholder image"/> */}
  <div class="media-body">
    <h5 class="mt-0" style={{color:"white", fontSize:"35px"}}><b>About Us</b></h5>
    <p style={{color:"white", fontSize:"25px"}}>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
    <p class="mb-0" style={{color:"white", fontSize:"25px"}}>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
  </div>
</div>

</div>

<Footer/>

</div>
    )
}

export default Homepage;