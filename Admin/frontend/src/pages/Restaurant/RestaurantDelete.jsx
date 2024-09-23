import React from "react";
import axios from "axios";
import Niv from "../../components/Niv";
import "./RestaurantDelete.css";
import { useState, useRef, useEffect } from "react";
import { toast ,ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const RestaurantDelete = () => {
  const [id,setid] = useState("");
  const [name,setname] = useState("");
  const [Quantity,setQuantity] = useState(0);
  const [cost,setcost] = useState(0);
  const [items, setItems] = useState([]);
  const [delete1] = useState([]);
  const [token, setToken] = useState();
  useEffect(() => {
    function getproduct() {
      const token = localStorage.getItem("authToken"); // Get token from localStorage

      if (token) {
        setToken(token);
      }}
      getproduct();
    }, []);


    
    
  function Find(id){
    setid(id);
    
      if (id.length===4){
       
          function getItems() {
            const url="http://localhost:8070/Inventoryfood/find/"+id;

            axios.get(url,{
              headers: {
                Authorization: `Bearer ${token}`, // Send token in Authorization header
              }}).then((res) => {
              // console.log(res.data);
              setItems(res.data);
              // console.log(orders[1]);
            });
          }
          getItems();
        
      }
  }

  function handlesubmit(index,id,qty,cost1){
    var checkBox = document.getElementsByClassName("myCheck")[index];


    if (checkBox.checked === true){
      delete1.push(id)
      setQuantity(Quantity+Number(qty))
      setcost(Number(cost+(cost1*qty)))
     


    } else if(checkBox.checked === false){
      const index = delete1.indexOf(id);
      delete1.splice(index, 1);
      setQuantity(Quantity-Number(qty))
      setcost(Number(cost-(cost1*qty)))
      
    }
   
    
  }
  function  deletedata(){
   for(var i=0;i<=delete1.length-1;i++){
     
      const delete2="http://localhost:8070/Inventoryfood/delete/" +delete1[i]
      axios
      .delete(delete2,{
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        }})
      .then(() => {
        toast.success("food delete");
      })
      .catch((err) => {
        toast.error("cannot delete data");
      });
  }

  const Inventoryfood = {Quantity,cost};
  const url="http://localhost:8070/resInventory/update1/"+id
axios.post(url,Inventoryfood,{
  headers: {
    Authorization: `Bearer ${token}`, // Send token in Authorization header
  }})
.then(()=>{
  alert("data updated");
})
.catch((err)=>{
  alert(err);
})



  }
  return (
    <div>
      <ToastContainer position="top-right" theme="colored" />
      <Niv name="Restaurent/ Delete Records" />
      <div className="data">
        <div className="carddel">
          <form action="#" className="Resdelform">
            <header className="delheader">Delete the records</header>
            <br />
            <div className="form first">
              <div class="delete details">
                <div class="fields">
                  <div class="input-field">
                    <label className="ResdelProductCode">Item Id</label>
                    <input type="text" placeholder="Item Id" value={id}
                    onChange={(e) => Find(e.target.value)}/>
                  </div>
                  <div class="input-field">
                    <label className="ResdelProductCode">Item Name</label>
                    <input type="text" placeholder="Item Name" value={name}
                    onChange={(e) => setname(e.target.value)}/>
                  </div>
                  <div class="input-field">
                    <label>Date</label>
                    <input type="date" />
                  </div>
                </div>
              </div>
            </div>
            <br/>
              

            <table className="ResDelDesc">
              <tr className="tbl-head">
                <td className="del-tbl-head">Time</td>
                <td className="del-tbl-head">Buy Date</td>
                <td className="del-tbl-head">Quantity</td>
                <td className="del-tbl-head">Unit Cost</td>
                <td className="del-tbl-head">Buy Cost</td>
                <td className="del-tbl-head"></td>
              </tr>
              {items.map((items, index) => (
              <tr key={index}>
             
                <td className="del-tbl-data">{items.time}</td>
                <td className="del-tbl-data">{items.date}</td>
                <td className="del-tbl-data">{items.Quantity}</td>
                <td className="del-tbl-data">{items.Unit_Price}</td>
                <td className="del-tbl-data">{Number(items.Quantity*items.Unit_Price)}</td>
                <td className="del-tbl-data">
                  <input type="checkbox" className="myCheck" onClick={()=>handlesubmit(index,items._id,items.Quantity,items.Unit_Price)}/>
                </td>
              </tr>
              ))}
            </table>
            <button class="Add" onClick={()=>deletedata()}>
              <span class="addbtn">Delete</span>
            </button>
          </form>
            <a href="/Restaurant">
            <button class="back">
              <span class="bckbtn">Go Back</span>
            </button>
            </a>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDelete;
