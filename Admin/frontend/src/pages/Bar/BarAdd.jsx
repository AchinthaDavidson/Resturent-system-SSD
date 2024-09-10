import React from "react";
import Niv from "../../components/Niv";
import "./BarAdd.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
 import S3 from 'react-aws-s3';
import AWS from 'aws-sdk';
window.Buffer = window.Buffer || require("buffer").Buffer;



function BarAdd() {
  const d = new Date();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [catogary, setcatogary] = useState("");
  const [quantity, setquantity] = useState("");
  const [Expiredate, setExpiredate] = useState("");
  const [Totalcost, setTotalcost] = useState(0);
  const [Unitcost, setUnitcost] = useState("");
  const [Reorderlevel, setReorderlevel] = useState("");
  const [Sellprice, setSellprice] = useState("");
  const[ImageURL,setImageURL]=useState("");

  const s3 = new AWS.S3(); 
  const [file, setFile] = useState(null);
  const validFileTypes = ['image/jpg','image/jpeg','image/png'];
  AWS.config.update({
    accessKeyId: 'AKIAV3TWWOPNV5Z3UJ6X' ,
    secretAccessKey: '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',
    dirName: 'images',
    region: 'ap-south-1',
    signatureVersion: 'v4',
  });

  const handleFileSelect = (e) => {
  

    const file_ = e.target.files[0];

    if (!validFileTypes.find(type => type === file_.type)) {
    
        toast.error("Enter the dish Name first. Then select an JPG/PNG file type.");
        return;
    }else{
        setFile(e.target.files[0]);
    }   
  }

  const [Buydate, setBuydate] = useState(
    d.getUTCDate() +
      "/" +
      d.getUTCMonth() +
      1 +
      "/" +
      d.getFullYear() +
      " - " +
      d.getHours() +
      ":" +
      d.getMinutes()
  );
  const[Product_Code1, setproduct_code1] = useState("");
  const[Product_Name1, setproduct_Name1] = useState("");
  const[Product_Type1, setproduct_Type1] = useState("");
  const [Stock,setstock]=useState();
  const [Total,setTotal] = useState("");
  const[Expire_Date1, setExpire_Date1] = useState("");
  const[Quantity1, setQuantity1] = useState("");
  const[Re_Order_Level1, setRe_Order_Level1] = useState("");
  // const[Stock,setstock]=useState("");
  const[isEditing, setIsEditing] = useState(false);

  //start coding
  const show = async (e) => {

    const Bardata = {code,quantity,Expiredate,Unitcost,Sellprice};
    //console.log(Bardata);
    // console.log(isEditing);
    axios.post("http://localhost:8070/Bardata/add", Bardata)
      .then(() => {  toast.success("Bar Item added succesfully");})
      .catch((err) => { alert(err); })

    const newTotCost = quantity * Unitcost

    if (isEditing===false) {
      if (!file) {
        toast.error("Please select an image of JPG or PNG file type...");
        return;
      }
      if (!name) {
        toast.error("Please ente a valid name...");
        return;
      }
      const params = { 
        Bucket: 'paladiumdishes', 
        Key: `${Date.now()}.${name}`, 
        Body: file 
      };
        const { Location } = await s3.upload(params).promise();
        setImageURL(Location);
      
      
      const BarInventory = { code,name , type, catogary, quantity,newTotCost,Reorderlevel,Location};
      axios.post("http://localhost:8070/BarInventory/add", BarInventory)
        .then(() => {  toast.success("Item added succesfully"); })
        .catch((err) => { toast.error("Item add operation failed") });
    
    }
    else {
      const quantity2=Number(quantity)+Number(Quantity1)
      const Totalcost2=Number(Total+newTotCost)
      alert(Totalcost2)
      const url = "http://localhost:8070/BarInventory/update/"+ Product_Code1 ; 
      const BarInventory = { code,name , type, catogary, quantity2,Totalcost2,Reorderlevel};
      axios.put(url, BarInventory)
        .then(() => {  toast.success("Item updated succesfully"); })
        .catch((err) => { toast.error("Item update operation failed") });
    }
  }

  const[items, setbar] = useState([]);

  useEffect(()=>{
    const getbarval = () =>{
      axios.get("http://localhost:8070/barInventory/")
      .then((barinventories)=>{
        setbar(barinventories.data);
      }).catch((err)=>{
        alert(err);
      })
    }
    getbarval();
  },[])

  function findcode(code){
    setCode(code);
    if(code.length === 3 || code.length === 2){
      
      items.map((items)=>{
        if(items.Product_Code.includes(code)===true){
          setproduct_code1(items.Product_Code);
          setproduct_Name1(items.Product_Name); 
          setproduct_Type1(items.Product_Type);
          setQuantity1(items.Quantity);
          setTotal(items.Total_Cost);
          setExpire_Date1(items.Expire_Date);
          setRe_Order_Level1(items.Re_Order_Level);
          setIsEditing(true);
        }
      })
    }
  }

  return (
    <div>
      <Niv name="Bar Inventory" />
      <ToastContainer position="top-right" theme="colored" /> 
      <div className="data">
        <div className="cardadd">
          <header className="baraddheader">Add Details</header>

          {/* <form onSubmit={show} className="BaraddForm"> */}
          <div className="BaraddForm">
            <div className="form first">
              <div class="add detail">
                <div class="fields">
                  <div class="input-field">
                    <label className="BaraddProductCode">Product Code</label>
                    <input
                      type="text"
                      placeholder="Product code"
                      value={code}
                      onChange={(e) => findcode(e.target.value)}
                    />
                    {/* <input type="submit"  ></input> */}
                  </div>

                  <div class="input-field">
                    <label className="BaraddProductName">Product Name</label>
                    <input
                      type="text"
                      placeholder="Product name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div class="input-field">
                    <label className="BaraddProductType">Product Type</label>
                    <input
                      type="text"
                      placeholder="Product Type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </div>

                  <div class="input-field">
                    <label className="BaraddCatogary">Catogary</label>
                    <input
                      type="text"
                      placeholder="Catogary"
                      value={catogary}
                      onChange={(e) => setcatogary(e.target.value)}
                    />
                  </div>

                  <div class="input-field">
                    <label className="BaraddBuyCost">Unit cost</label>
                    <input
                      type="text"
                      placeholder="unit cost"
                      value={Unitcost}
                      onChange={(e) => setUnitcost(e.target.value)}
                    />
                  </div>

                  <div class="input-field">
                    <label className="BaraddQuantity">Quantity</label>
                    <input
                      type="text"
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(e) => setquantity(e.target.value)}
                    />
                  </div>

                  <div class="input-field">
                    <label className="BaraddBuyDate">Buy date</label>
                    <input type="date" />
                  </div>

                  <div class="input-field">
                    <label className="BaraddBuyCost">Total cost</label>
                    <input
                      type="text"
                      placeholder="ttotal cost"
                      value={(quantity*Unitcost)||0}
                      onChange={(e) => setTotalcost(e.target.value)}
                    />
                  </div>

                  <div class="input-field">
                    <label className="BaraddPReOrderLevel">
                      Re order level
                    </label>
                    <input
                      type="text"
                      placeholder="Re order level"
                      value={Reorderlevel}
                      onChange={(e) => setReorderlevel(e.target.value)}
                    />
                  </div>

                  <div class="input-field">
                    <label className="BaraddSellPrice">sell price</label>
                    <input
                      type="text"
                      placeholder="sell price"
                      value={Sellprice}
                      onChange={(e) => setSellprice(e.target.value)}
                    />
                  </div>

                  <div class="input-field">
                    <label className="BaraddExpireDate">Expire date</label>
                    <input
                      type="date"
                      value={Expiredate}
                      onChange={(e) => setExpiredate(e.target.value)}
                    />
                  </div>

                  {/*photo addonChange={handleFileSelect}*/}
                  <div class="input-field">
                    <label className="BaraddPhoto">photo</label>
                    <input type="file" onChange={handleFileSelect} />
                  </div>
                </div>

                <button class="BarAdd" type="submit" onClick={(e)=>{
                 setTotalcost(quantity*Unitcost)
                  show(e)
                  }}>
                  <span class="addbtn">{isEditing ? "Edit" : "Add"}</span>
                </button>
              </div>
            </div>
          </div>
          <a href="/Bar">
            <button class="Barcancel">
              <span class="addbtn">Cancel</span>
            </button>
          </a>
        </div>

        {/*this part is in update */}
        <div className="cardinv">
          <table className="barAddstatus">
            <tr className="Add-tbl-head">
              <td className="Add-tbl-head">Product Code</td>
              <td className="Add-tbl-head">Product Name</td>
              <td className="Add-tbl-head">Product Type</td>
              <td className="Add-tbl-head">Expire Date</td>
              <td className="Add-tbl-head">Stock</td>
              <td className="Add-tbl-head">Re_Order_Level</td>
            </tr>
            <tr>
              <td className="add-bar-inv-view">{Product_Code1}</td>
              <td className="add-bar-inv-view">{Product_Name1}</td>
              <td className="add-bar-inv-view">{Product_Type1}</td>
              <td className="add-bar-inv-view">{Expire_Date1}</td>
              <td className="add-bar-inv-view">{Quantity1}</td>
              <td className="add-bar-inv-view">{Re_Order_Level1}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BarAdd;