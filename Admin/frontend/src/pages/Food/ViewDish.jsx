
import Niv from '../../components/Niv';
import { Button ,Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './foodcss.css';
import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Prev } from "react-bootstrap/esm/PageItem";

   
const ViewDish = () => {
    
    const navigate = useNavigate();
    const [dishes, setDishes] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [updatedDish, setupdatedDish] = useState({});
    const [token, setToken] = useState();
    useEffect(() => {
        function getproduct() {
          const token = localStorage.getItem("authToken"); // Get token from localStorage
    
          if (token) {
            setToken(token);
          }}
          getproduct();
        }, []);
    useEffect(() =>{
        const token = localStorage.getItem("authToken");
        axios
        .get("http://localhost:8070/food/viewDish",{
            headers: {
              Authorization: `Bearer ${token}`, // Send token in Authorization header
            }})
        .then((res) => {
           // ;
            setDishes(res.data);
        })
        .catch((err) =>console.log(err))
    }, []);

    const deleteDish = (id) => {
        const token = localStorage.getItem("authToken");
      axios.delete(`http://localhost:8070/food/delete/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        }})
        .then((res)=> console.log(res))
        .catch((err) => console.log(err));
       
        window.location.reload(); 
    };

    const updateDish = (dish) => {
        setupdatedDish(dish);
        handleShow();

    };

    const handleChange = (e) => {
        const {name , value } = e.target;
       (e);
        setupdatedDish((prev) => {
            return({
                ...prev,
                [name] : value,
            });
        });
    };

    const saveUpdatedDish = () => {
        axios.put(`http://localhost:8070/food/update/${updatedDish._id}` , updatedDish,{
            headers: {
              Authorization: `Bearer ${token}`, // Send token in Authorization header
            }})
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        handleClose();
        window.location.reload();

    };

    return(

        <div className="dishDataDiv" style={{width:"100%" , margin:"auto auto" , textAlign :"center"}}>
            <Niv name="View Dishes" />
            {/* <h1>View all avaliable Dishes</h1> */}
            <div className='data'>
                <Button className='middlebtns' onClick={ () => navigate("/food")}>
                    Click here to add more Dishes
                </Button>
            
            <Modal show={show} onHide={handleClose} className="theModal" >
                <Modal.Header closeButton>
                 
                    <h3>Update the Dish</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>

                        <table className="modalTable">
                                <tr>
                                  
                                    <td className='modaltd'>
                                        <Form.Control 
                                            className="anInput"
                                            placeholder="Name" 
                                            style={{marginBottom:"1rem"}}
                                            name = "title"
                                            value = {updatedDish.title ? updatedDish.title : "" }
                                            onChange = {handleChange}
                                         />

                                    </td>
                                </tr>
                                <tr >
                            
                                    <td className='modaltd'>
                                        <Form.Control 
                                            className="anInput"
                                            placeholder="Description" 
                                            style={{marginBottom:"1rem"}}
                                            name = "description"
                                            value = {updatedDish.description ? updatedDish.description : "" }
                                            onChange = {handleChange}
                                         />

                                    </td>
                                </tr>
                                <tr>
                                    
                                    <td className='modaltd'> 
                                        <Form.Control 
                                            className="anInput"
                                            placeholder="Price" 
                                            style={{marginBottom:"1rem"}}
                                            name = "price"
                                            value = {updatedDish.price ? updatedDish.price : "" }
                                            onChange = {handleChange}
                                       />

                                    </td>
                                </tr>
                            </table>

                    

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='middlebtns' onClick={handleClose}>
                         Close
                    </Button>
                    <Button className='middlebtns' onClick={saveUpdatedDish}>
                         Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            
            {dishes ? (
                <div>
                    {dishes.map(dish => {
                        return(
                            <div key={dish._id} className="dishDataDiv " >
                                
                                <table  className="headingtable">
                                <tbody>

                                    <tr>
                                        <td id='shortTH'>Dish Name</td>
                                        <th> {dish.Name}</th>
                                    
                                    </tr>

                                    <tr>

                                        <td id='shortTH'>Description</td>
                                        <td> {dish.Description}</td>
                       
                                    </tr>

                                    <tr>

                                        <td id='shortTH'>Category</td>
                                        <td> {dish.Category}</td>
                       
                                    </tr>

                                    <tr>
                                        <td id='shortTH'>Dish Price</td>
                                        <td>{dish.Price}</td>
                                       
                                    </tr>
                                    
                                    <tr>
                                        <td id='shortTH'>
                                            <img style={{width:"100%" , padding:"1rem 1rem 1rem 1rem" , maxWidth:"20rem"}} src={dish.ImageURL} alt="" />
  
                                        </td>
                                        {/* <td>{dish.Ingredients}</td> */}

                                        <td> 
                                        <table  style={{width:"100%" , padding:"0 0 0 0" , margin:"0 0 0 0"}}>
                                         <tbody>
                                                <tr><th colSpan={4}>Ingredients </th></tr>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Name</td>
                                                    <td>Quantity</td>
                                                    <td>Unit</td>  
                                                
                                                </tr> 
                                            
                                                    {dish.Ingridients.map((ings,index)=> {
                                                return(
                                                
                                                        <tr  key={index}> 
                                                            <td > {ings.id}</td>
                                                            <td > {ings.name}</td>
                                                            <td > {ings.quantity} </td>
                                                            <td > {ings.unit} </td>
                                                        </tr>    
                                                )
                                                })} 
                                            </tbody>
                                            </table>
                                        </td>
                                        {/* <th><h3>{dish.Ingredients.name} </h3></th>
                                        <th><h3>{dish.Ingredients.quantity} </h3></th>
                                        <th><h3>{dish.Ingredients.unittype} </h3></th> */}
                                       
                                    </tr>



                                    <tr>
                                        <td>
                                    
                                                <Button 
                                                    className='middlebtns' 
                                                    onClick={() => updateDish(dish)} 
                                                    style={{marginRight:"20px"}} >
                                                        UPDATE
                                                </Button>
                                        </td>
                                        <td>
                                                <Button 
                                                    className='middlebtns' 
                                                   
                                                    onClick ={() => deleteDish(dish._id)} 
                                                    style={{marginRight:"20px"}}>
                                                        DELETE
                                                    </Button>
                                        </td> 

                                    </tr>
                                </tbody> 
                                </table>

                            </div>
                           
                        )
                    })}
                </div>
            ): "" }
            </div>
        </div>
        );









};

export default ViewDish;
