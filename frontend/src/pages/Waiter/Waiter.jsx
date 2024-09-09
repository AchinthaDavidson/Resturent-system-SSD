import React , {useEffect , useState} from 'react';
import axios from 'axios'
import Niv from '../../components/Niv';
import "./waiter.css"
import { useNavigate , Link} from 'react-router-dom';


const Waiter = () => {

    const [waiter , setWaiter] = useState([]) ;
    //const history = useNavigate();
   

    useEffect(() => {
        function getWaiter() {

            axios.get("http://localhost:8070/waiter/").then((res) =>{
                setWaiter(res.data)
            });

        }
        getWaiter() ;
    },[]);

    function DeleteRow(id) {
       
        

        const dlt = "http://localhost:8070/waiter/delete/" + id ;

        axios.delete(dlt).then(()=>{
            alert('Deleted Successfully!');
           
            //history('/Waiter/addwaiter')
            //history('/waiter')
        })
        .catch(err => {
            alert(err)
        });
    };

    return (
        <div>
        <Niv name='Waiter'/>
        
        <h1 className='title'>Waiters</h1>
        <div class="tbl-header">
          <a href="Waiter/AddWaiter">
          <button class="add_waiter">+ New Waiter</button>
          </a>

          <table className="waiter-tbl" cellpadding="0" cellspacing="0" border="0">
            <thead>
                <tr>
                <th className='waiter-th'>Waiter ID </th>
                <th className='waiter-th'>Name</th>
                <th className='waiter-th'>Email</th>
                <th className='waiter-th'>address</th>
                <th className='waiter-th'>Phone Number</th>
                <th className='waiter-th'>password</th>
                <th className='waiter-th'>status</th>
                <th className='waiter-th'>Action</th>
                </tr>
            </thead>

            <tbody>
              {waiter.map((waiter) => (
              <tr>
              <td>{waiter.W_Id}</td>
              <td>{waiter.name}</td>
              <td>{waiter.Email}</td>
              <td>{waiter.address}</td>
              <td>{waiter.phone_no}</td>
              <td>{waiter.password}</td>
              <td>{waiter.status}</td>
              <td>
                <Link to={`/Waiter/UpdateWaiter/${waiter._id} `}>
                <button className='edit'>Edit</button>
                </Link>
                <a href = "/waiter" >
                <button className='del' onClick={(e)=> DeleteRow(waiter._id)}>Delete</button>
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

export default Waiter;