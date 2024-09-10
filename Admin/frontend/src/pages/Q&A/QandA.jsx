import React, { useEffect, useState} from 'react';
import Niv from '../../components/Niv';
import "./faq.css";
import { AiFillDelete,AiFillEdit} from "react-icons/ai";
import {BsEnvelope, BsPlusLg} from 'react-icons/bs';
import axios from "axios";

const QandA = () => {

    const [faq, setFaq] = useState([]);
    useEffect(() => {
    function getFaq() {
      axios.get("http://localhost:8070/faq/").then((res) => {
        setFaq(res.data);
      }).catch((err) =>{
        alert(err);
      })
    }
    getFaq();
    }, []);

    const [category , setcategory] = useState("");
    const [question , setquestion] = useState("");
    const [answer , setanswer] = useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();
  const faq = {category,question, answer};
  axios.post("http://localhost:8070/faq/add/", faq).then(()=>{
      alert("New FAQ added!");
      window.location.reload(false);
      setcategory('')
      setquestion('')
      setanswer('')
    }).catch((err)=>{
      alert(err);
    })
  }
  
    function deleteFaq(_id){
      const del = "http://localhost:8070/faq/delete/" + _id ;
  
      axios.delete(del).then(() => {
          alert("FAQ Deleted");
          window.location.reload(false);
      }).catch(err => {
          alert("Could not Delete");
      });
    };






    return (
        <div>
            <Niv name='Frquently Asked Questions'/>
            <div className='data'>
            <a href='/QandA/chat'>
            <button class="btn12"><BsEnvelope size={20}/>&nbsp;&nbsp;Check Customer Messages</button>
            </a>

            <form className="FormFAQ" onSubmit={handleSubmit}>
              <div class="formfiels">
                <div class="txta">
                
                  <label className="lbl">FAQ Category</label><br/>
                  <input type="radio" value="Orders" name="category" onChange={(e) => setcategory(e.target.value)} /> Orders<br/>
                  <input type="radio" value="Account" name="category" onChange={(e) => setcategory(e.target.value)} /> Account<br/>
                  <input type="radio" value="Payment" name="category" onChange={(e) => setcategory(e.target.value)}/> Payment<br/>
                  <input type="radio" value="Delivery" name="category" onChange={(e) => setcategory(e.target.value)}/> Delivery<br/>
                  {/* <textarea rows="1" cols="110" style={{resize:'none'}} placeholder="Category" value={category} onChange={(e) => setcategory(e.target.value)}/> */}
                </div>



                <div class="txta">
                  <label className="lbl">FAQ</label><br/>
                  <textarea rows="2" cols="110" style={{resize:'none'}} placeholder="Question" value={question} onChange={(e) => setquestion(e.target.value)}/>
                </div>

                <div class="txta">
                  <label className="lbl">Answer</label><br/>
                  <textarea rows="2" cols="110" style={{resize:'none'}} placeholder="Answer" value={answer} onChange={(e) => setanswer(e.target.value)}/>
                </div>
            </div>
            <br/>
              <button class="btn1" type="submit" >
                <span><BsPlusLg/>&nbsp;&nbsp;Add new FAQ</span>
              </button>
        </form>



           
          <table className="frmtable">
            <thead>
              
                <td className="thd">Category</td>
                <td className="thd">FAQ</td>
                <td className="thd">Answer</td>
                <td className="thd">Edit</td>
                <td className="thd">Delete</td>
              
            </thead>
            <tbody>
            {faq.map((faq,index) =>(
              <tr key={index}>
              <td >{faq.category}</td>
              <td >{faq.question}</td>
              <td >{faq.answer}</td>
              <td><button class="btn1"><AiFillEdit/></button></td>
              <td><button class="btn1" onClick={(e)=> deleteFaq(faq._id)}><AiFillDelete/></button></td>
            </tr>
            ))}
            </tbody>
          </table>
        </div>
            
           


            </div>
        
        
    );
};

export default QandA;