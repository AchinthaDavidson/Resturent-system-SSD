import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


  
const Income = () => {

const [salesrate, setsalesrate] = useState([]);
const[salecost,setsalecost]= useState([]);
const [type,setType]=useState(true)
const [salesm, setsalesm] = useState(0);
const [costm1, setcostm1] = useState(0);
const [costm2, setcostm2] = useState(0);
const [salesd, setsalesd] = useState(0);
const [costd1, setcostd1] = useState(0);
const [costd2, setcostd2] = useState(0)
const d=new Date()
const day=  d.getDate() +"-" +(d.getMonth() + 1) +"-" +d.getFullYear()
const month= (d.getMonth() + 1) +"-" +d.getFullYear()


const [url,setUrl] =useState("http://localhost:8070/order/sum/"+day)
const [url1,setUrl1] =useState("http://localhost:8070/Inventoryfood/sum/"+day)
const [url2,setUrl2] =useState("http://localhost:8070/order/sum/"+month)
const [url3,setUrl3] =useState("http://localhost:8070/Inventoryfood/sum/"+month)
const [url4,setUrl4] =useState("http://localhost:8070/Bardata/sum/"+day)
const [url5,setUrl5] =useState("http://localhost:8070/Bardata/sum/"+month)

      axios.get(url).then((res) => {
        setsalesrate(res.data);
        if (salesrate.length === 0) {
         
        } else {
          setsalesd(res.data[0].price);
        }
      });

      axios.get(url1).then((res) => {
        setsalecost(res.data)
        if (salecost.length === 0) {
          
        } else {
          setcostd1(res.data[0].price);
        }
        
      });
      axios.get(url2).then((res) => {
        setsalesrate(res.data);
        if (salesrate.length === 0) {
         
        } else {
          setsalesm(res.data[0].price);
        }
      });
  
      axios.get(url3).then((res) => {
        setsalecost(res.data)
        if (salecost.length === 0) {
         
        } else {
          setcostm1(res.data[0].price);
        }
        
      });
      axios.get(url4).then((res) => {
        setsalecost(res.data)
        if (salecost.length === 0) {
         
        } else {
          setcostd2(res.data[0].price);
        }
        
      });
  
      axios.get(url5).then((res) => {
        setsalecost(res.data)
        if (salecost.length === 0) {
         
        } else {
          setcostm2(res.data[0].price);
        }
        
      });




function findmonth() {

    setType(false)

   
 

    
}
function findday(){
  
setType(true)


}


    return (
        <div style={{ display: "flex" }}>
        <div style={{ flexGrow: "1" }}>
          <Typography
            style={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Sales Value
          </Typography>
          <Typography variant="h5" component="div">
            <label style={{ fontSize: "30px" }}>Rs {type?salesd:salesm}.00</label>
          </Typography>
          <Typography style={{ mb: 1.5 }} color="text.secondary">
          {type?"Today":"Month"}
            
          </Typography>
        </div>

        <div style={{ flexGrow: "1" }}>
          <Typography
            style={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Cost of sales
          </Typography>
          <Typography variant="h5" component="div">
            <label style={{ fontSize: "30px" }}>Rs {type?costd1+costd2:costm1+costm2}.00</label>
          </Typography>
          <Typography style={{ mb: 1.5 }} color="text.secondary">
          {type?"Today":"Month"}
           
          </Typography>
        </div>

        <div style={{ flexGrow: "1" }}>
          <Typography
            style={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Sales Income
          </Typography>
          <Typography variant="h5" component="div">
            <label style={{ fontSize: "30px" }}>Rs {type?salesd-(costd1+costd2):salesm-(costm1+costm2)}.00</label>
          </Typography>
          <Typography style={{ mb: 1.5 }} color="text.secondary">
          {type?"Today":"Month"}
           
          </Typography>
        </div>

        <div style={{ flexGrow: "1" }}>
        <Box sx={{ textAlign: "right" }}>
      <Button
        variant="contained"
        id ="month"
        style={{ marginRight: 3, backgroundColor: "#1c003f" }}
        onClick={() => findmonth()}
      >
        month
      </Button>
      <Button
        variant="contained"
        id ="month"
        style={{ marginRight: 3, backgroundColor: "#1c003f" }}
        onClick={() => findday()}
      >
        day
      </Button>
     
      
    </Box>



        </div>
      </div>
  
  )
};
export default Income;