import React from "react";
import Niv from "../../components/Niv";
import "./BarDelete.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function BarDelete() {
  const d = new Date();
  const[items,setbar] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [delete1] = useState([]);

  const[Expire_Date1, setExpire_Date1] = useState("");
  const[Quantity1, setQuantity1] = useState(0);
  const[cost, setcost] = useState(0);
  const[Buy_Date1, setBuydate1] = useState();

  function findcode(code) {
    setCode(code);
    if(code.length === 1 || code.length === 2 || code.length === 3 || code.length === 4){

      function getItems(){
        const url = "http://localhost:8070/Bardata/find/"+code;

        axios.get(url).then((res)=>{
          setbar(res.data);
        });
      }
      getItems();
    }
  }

  function handlesubmit(index,code,qty,cost1){
    var checkBox = document.getElementsByClassName("myCheck")[index];

    if(checkBox.checked === true){
      delete1.push(code)
      setQuantity1(Quantity1+Number(qty))
      setcost(Number(cost+(cost1*qty)))

    }else if(checkBox.checked === false){
      const index = delete1.indexOf(code);
      delete1.splice(index , 1)
      setQuantity1(Quantity1-Number(qty))
      setcost(Number(cost-(cost1*qty)))
    }
  }

  function deletedata(){
    for(var i = 0 ; i<=delete1.length-1 ; i++){
      const delete2 = "http://localhost:8070/Bardata/delete/"+ delete1[i]
      axios.delete(delete2)
      .then(()=>{toast.success("Item deleted");})
      .catch((err)=>{toast.error("cannot delete data")});
    }

    const barinventorydata = {Quantity1,cost};
    // alert(Quantity1)
    // alert(cost)
    
    const url="http://localhost:8070/BarInventory/update1/"+code
    axios.post(url,barinventorydata)
    .then(()=>{toast.success("Item updated"); })
    .catch((err)=>{toast.error("failed to update"); })
  }

  
  
  return (
    <div>
    <ToastContainer position="top-right" theme="colored" />
      <Niv name="Bar Inventory" />
      <div className="data">
        <div className="carddel">
          <form action="#" className="Bardelform">
            <header className="bardelheader">Delete Detalis</header>
            <br />

            <div className="form first">
              <div class="delete details">
                <div class="fields">
                  <div class="input-field">
                    <label className="delProductCode">Product Code</label>
                    <input type="text" placeholder="Product code" value={code}
                        onChange={(e) => findcode(e.target.value)}/>
                  </div>

                  <div class="input-field">
                    <label className="delProductName">Product Name</label>
                    <input type="text" placeholder="Product name" value={name}
                        onChange={(e) => setName(e.target.value)}/>
                  </div>
                </div>
              </div>
            </div>
            <table className="barDelDesc">
              <tr className="tbl-head">
              <td className="del-tbl-head">Time</td>
                <td className="del-tbl-head">Expire Date</td>
                <td className="del-tbl-head">Quantity</td>
                <td className="del-tbl-head">Unit cost</td>
                <td className="del-tbl-head">Cost</td>
              </tr>
              {items.map((items,index)=>(
              <tr className="tbl-dta" key={index}>
                <td>{items.time}</td>
                <td>{items.Expire_Date}</td>
                <td>{items.Quantity}</td>
                <td>{items.Unit_Cost}</td>
                <td>{Number(items.Unit_Cost*items.Quantity)}</td>
                <td>
                  <input type="checkbox" className="myCheck" onClick={()=>handlesubmit(index,items._id,items.Quantity,items.Unit_Cost)}/>
                </td>
              </tr>
              ))}
            </table>
            <button class="Add" onClick={()=>deletedata()}>
              <span class="addbtn">Delete</span>
            </button>
          </form>

          <a href="/Bar">
            <button class="Barcancel" >
              <span class="addbtn">Cancel</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default BarDelete;
