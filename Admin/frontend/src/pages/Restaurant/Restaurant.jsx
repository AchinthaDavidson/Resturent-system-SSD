import React, { useEffect, useState } from "react";
import axios from "axios";
import Niv from "../../components/Niv";
import "./stockView.css";
import { BsArrowUpCircle} from "react-icons/bs"
import Resdata from "./resturantdata.jsx"
  const Restaurent = () => {
    const [items, setItems] = useState([]);
    const [token, setToken] = useState();
    useEffect(() => {
      function getproduct() {
        const token = localStorage.getItem("authToken"); // Get token from localStorage
  
        if (token) {
          setToken(token);
        }}
        getproduct();
      }, []);

    useEffect(() => {
      function getItems() {
        const token = localStorage.getItem("authToken");
        axios.get("http://localhost:8070/resInventory/",{
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          }}).then((res) => {
          // console.log(res.data);
          setItems(res.data);
          // console.log(orders[1]);
        });
      }
      getItems();
    }, [token]);


function Finddata(index){
  // document.getElementsByClassName("data")[index].hidden=false
  document.getElementById(index).hidden=false
 
}
function close(id){
  document.getElementById(id).hidden=true
}

var count = 0;
for (var k in items) if (items.hasOwnProperty(k)) ++count;
const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Niv name="Restaurant Inventory" />
      <div className="data">
      <div style={{display:'flex', margin: '1em',borderStyle:"solid",borderLeftWidth:"5px",width:'25%',borderColor:" white white white #0077be",backgroundColor:"white",borderRadius:"9px"}}>
    <div style={{flexGrow: '1' ,paddingTop:"5px",paddingLeft:"5px",fontSize:'30px'}}>
    Stock Summary
    </div>     
    <div style={{flexGrow: '1',textAlign:'center' ,padding:'6px' ,borderLeft:"5px solid #dcdcdc"}}>
    <div style={{fontSize:'30px'}}> {count}</div>
    <div style={{fontSize:'10px'}}> Available Items In Stock</div>
    </div>  
      </div>
      <div>
      <input type="text" style={{ height: "40px" }} placeholder=" Search Items..." onChange={(event) => {
            setSearchTerm(event.target.value);
          }} />
      <a href="/Restaurant/RestaurantDelete">
        <button class="delete_btn">Delete the record</button>
      </a>
      <a href="/Restaurant/RestaurantAdd">
        <button class="add_new">+ Add New</button>
      </a>

    </div>
        <div class="table1">
          <div class="header_fixed">
            <table className="stk-table">
              <thead className="stk-tbl-head">
                <tr className="">
                  <th className="stk-view-tbl">Item Id</th>
                  <th className="stk-view-tbl">Item Name</th>
                  <th className="stk-view-tbl">Current Stock</th>
                  <th className="stk-view-tbl">Total Cost</th>
                  <th className="stk-view-tbl">Re-order level</th>
                  <th className="stk-view-tbl">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.Item_Name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            }).map((items, index) => (
                  
                  <>
                
                  <tr onClick={()=>Finddata(index)}>
                    <td>{items.Item_Id}</td>
                    <td>{items.Item_Name}</td>
                    <td>{items.Quantity}{items.Unit}</td>
                    <td>{items.Total_Cost}</td>
                    <td>{items.Re_Order_Level}</td  >
                   
                    <td>{items.Re_Order_Level<items.Quantity ? "good" : "bad "}</td>
                  
                  </tr>
                  <tr id={index} hidden>
                  <td colSpan={6}>
                  <Resdata id={items.Item_Id}/><br/>
                  <label onClick={()=>close(index)} ><BsArrowUpCircle fontSize={20}/></label>
                  </td>
                  </tr>
                  </> 
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Restaurent;
