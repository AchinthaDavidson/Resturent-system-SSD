import React from "react";
import Niv from "../../components/Niv";
import "./ResturantAdd.css";
import axios from 'axios';
import { useState, useRef, useEffect } from "react";

const RestaurantAdd = () => {
  const [id , setid] = useState("");
  const [name , setname] = useState("");
  const [unit ,setunit ] = useState("");
  const [quantity, setquantity] = useState();
  const [buydate , setbuydate] = useState("");
  const [unitPrice, setunitPrice] = useState();
  const [totalCost, settotalCost] = useState(0);
  const [supplier, setsupplier] = useState("");
  const [reorderlevel, setreorderlevel] = useState("");
  const [expiredate, setexpiredate] = useState("");

  const [Item_Id1,setItem_Id1]=useState("");
  const [Item_Name1,setItem_Name1]=useState("");
  const [Stock,setstock]=useState();
  const [Total,setTotal] = useState("");
  const [level,setlevel]=useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [token, setToken] = useState();
  useEffect(() => {
    function getproduct() {
      const token = localStorage.getItem("authToken"); // Get token from localStorage
console.log(token)
      if (token) {
        setToken(token);
      }}
      getproduct();
    }, [token]);
  const show = ()=>{
    const token = localStorage.getItem("authToken");
    const Inventoryfood = {id,quantity,unitPrice,supplier,expiredate};
    axios.post("http://localhost:8070/Inventoryfood/add",Inventoryfood,{
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      }})
    .then(()=>{
      alert("data added inventoryfood");
    })
    .catch((err)=>{
      alert(err);
    })

/*add*/
    if (isEditing===false){
     const newres_add = {
       id,name,quantity,totalCost,reorderlevel,unit
     };
     axios.post("http://localhost:8070/resInventory/add",newres_add,{
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      }})
     .then(()=>{
      alert("data added successfully");
     })
     .catch((err)=>{
       alert(err);
     });
    }else{

    var qty=Number(quantity)+Number(Stock)
    var totalCost1=(Number(Total))+totalCost
      const Inventoryfood = {name,qty,totalCost1,reorderlevel,unit};
      const url="http://localhost:8070/resInventory/update/" + Item_Id1
    axios.put(url,Inventoryfood,{
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
}

const [items, setItems] = useState([]);
    useEffect(() => {
      function getItems() {
        
        axios.get("http://localhost:8070/resInventory/",{
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      }}).then((res) => {
          setItems(res.data);
        });
      }
      getItems();
    }, []);

  function findid(id){
    setid(id);
    if (id.length===4){
     
      items.map((items)=>{
        if(items.Item_Id.includes(id)===true){
          setItem_Id1(items.Item_Id);
          setItem_Name1(items.Item_Name);
          setstock(items.Quantity);
          setlevel(items.Re_Order_Level);
          setreorderlevel(items.Re_Order_Level);
          setname(items.Item_Name);
          setTotal(items.Total_Cost);
          setIsEditing(true);
        }
      })
    }
  }

  return (
    <div>
      <Niv name="Restaurant Inventory/ Add Items" />
      <div className="data">
      <div className="cardAdd">
        <header>Add Items</header>

        <form onSubmit={show} className="ResturantaddForm">
          <div className="form first">
            <div class="add detail">
              <div class="fields">

                <div class="input-field">
                  <label className="ResturantaddProductCode">Item Id</label>
                  <input type="text" placeholder="Item Id" value={id}
                  onChange={(e) => findid(e.target.value)}/>
                </div>

                <div class="input-field">
                  <label className="ResturantaddProductName">Item Name</label>
                  <input type="text" placeholder="Item Name" value={name}
                  onChange={(e) => setname(e.target.value)}/>
                </div>

                <div class="input-field">
                  <label className="ResturantaddBuyDate">Buy Date</label>
                  <input type="date" value={buydate}
                  onChange={(e) => setbuydate(e.target.value)}/>
                </div>

                <div class="input-field">
                <div className="field2">
                  <label className="ResturantaddQuantity">Quantity</label><br/>
                  <input type="number" placeholder="Quantity" value={quantity}
                  onChange={(e) => setquantity(e.target.value)}/>
                  <select name="unit" id="format" value={unit} onChange={(e) => setunit(e.target.value)}>
                    <option selected >Select Unit</option>
                    <option>Kg</option>
                    <option >g</option>
                    <option >L</option>
                    <option>ml</option>
                    <option>unit</option>
                  </select>
                </div> 
                </div>

                <div class="input-field">
                  <label className="ResturantaddBuyCost">Unit Price</label>
                  <input type="text" placeholder="Unit Price" value={unitPrice}
                  onChange={(e) => setunitPrice(e.target.value)}/>
                </div>

                <div class="input-field">
                  <label className="ResturantaddBuyCost">Total Cost</label>
                  <input type="text" placeholder="Total Cost" value={(quantity*unitPrice)||0}
                  />
                </div>

                <div class="input-field">
                  <label className="ResturantaddSupplier">Supplier</label>
                  <input type="text" placeholder="Supplier" value={supplier}
                  onChange={(e) => setsupplier(e.target.value)}/>
                </div>

                <div class="input-field">
                  <label className="ResturantaddReOrderLevel">Re-order level</label>
                  <input type="text" placeholder="Re-order level" value={reorderlevel}
                  onChange={(e) => setreorderlevel(e.target.value)}/>
                </div>

                <div class="input-field">
                  <label className="ResturantaddExpireDate">Expire Date</label>
                  <input type="date" value={expiredate}
                  onChange={(e) => setexpiredate(e.target.value)}/>
                </div>
              </div>

              <button class="Resturantbtn" type="submit" onClick={() => settotalCost(quantity*unitPrice)}>
                <span>{isEditing ? "Edit" : "Add "}</span>
              </button>
            </div>
          </div>
        </form>
          <a href="/Restaurant">
          <button class="Resturantbtn">
            <span>Go Back</span>
          </button>
        </a>
      </div>
        <div className="card1">
        <table className="ResDelDesc">
        <tr className="tbl-head">
          <td className="del-tbl-head">Item Id</td>
          <td className="del-tbl-head">Item Name</td>
          <td className="del-tbl-head">Current Stock</td>
          <td className="del-tbl-head">Total Cost</td>
          <td className="del-tbl-head">Re-order level</td>
        </tr>
        <tr>
          <td className="del-tbl-data">{Item_Id1}</td>
          <td className="del-tbl-data">{Item_Name1}</td>
          <td className="del-tbl-data">{Stock}</td>
          <td className="del-tbl-data">{Total}</td>
          <td className="del-tbl-data">{level}</td>
        </tr>
        </table>
        </div>
      </div>
    </div>

  );
};

export default RestaurantAdd;
