import React, { useEffect, useState } from "react";
import axios from "axios";
import Niv from '../../components/Niv';
import "./driver.css"
import { useNavigate , Link} from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Driver = () => {
  const [driver, setdriver] = useState([]);
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
    function getdriver() {
      const token = localStorage.getItem("authToken");
      axios.get("http://localhost:8070/driver/",{
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        }}).then((res) => {
        setdriver(res.data);
      });
    }
    getdriver();
  }, []);

  function deleteRow(D_Id){
    const dlte =
    "http://localhost:8070/driver/delete/" + D_Id ;
    // alert(dlte);

    axios
      .delete(dlte,{
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        }})
      .then(() => {
        toast.success("Deleted successfully");
      })
      .catch(err => {
        toast.err("Operation failed");
    });
  };

    return (
        <div>
        <Niv name='Driver'/>
        <ToastContainer position="top-right" theme="colored" /> 
        <h1 className='title'>Driver Details</h1>
        <div className="tbl-header">
          <a href="Driver/AddDriver">
          <button className="add_drvr">+ New Driver</button>
          </a>
          <table className="menu-tbl" cellPadding="0" cellSpacing="0" border="0">
            <thead>
                <tr>
                <th className='menu-th'>Driver Id</th>
                <th className='menu-th'>Driver Name</th>
                <th className='menu-th'>Email</th>
                <th className='menu-th'>Address</th>
                <th className='menu-th'>Phone Number</th>
                <th className='menu-th'>Password</th>
                <th className='menu-th'>Action</th>
                </tr>
            </thead>

            <tbody>
              {driver.map((driver,index) => (
             
              <tr key={index}>
                <td>{driver.D_Id}</td>
                <td>{driver.name}</td>
                <td>{driver.Email}</td>
                <td>{driver.address}</td>
                <td>{driver.phone_no}</td>
                <td>{driver.password}</td>
                <td>
                  <Link to={`/Driver/UpdateDriver/${driver._id} `}>
                  <button className='edit'>Edit</button>
                  </Link>
                  <a href = "/driver">
                    <button className='del' onClick={(e)=> deleteRow(driver._id)}>Delete</button>
                  </a>
                  
                </td>
              </tr>
            
              ))}
            </tbody>
          </table>       
        </div>

         

  </div>
    );
};

export default Driver;
