import React, {useState, useEffect}from "react";
import Header from "../../components/header";
// import Footer from "../../components/Footer";
import "./faq.css";
import { IconContext } from 'react-icons';
import {BsChevronDown,BsChevronUp } from "react-icons/bs";
import {GrSend} from "react-icons/gr"
import {CiUser, CiCreditCard2,CiDeliveryTruck, CiFries} from "react-icons/ci";
import SearchBar from "./searchbar";
import axios from "axios";


const faqcats = [
	{
		name: "Account",
		icon: <CiUser/>,
        arrow:<BsChevronDown/>
	},
	{
		name: "Payment",
		icon: <CiCreditCard2/>,
        arrow:<BsChevronDown/>
	},
	{
		name: "Orders",
		icon: <CiFries/>,
        arrow:<BsChevronDown/>
	},
	{
		name: "Delivery",
		icon:<CiDeliveryTruck/>,
        arrow:<BsChevronDown/>
	}
];

function FAQ(){

    const [toggle, setToggle] = React.useState({});
    const [selected, setSelected] = useState(-1);


    function toggleFunction(id, index) {
        setSelected(selected === index ? -1 : index);
        setToggle({
        ...toggle,
        [id]: !toggle[id],
        });
    }

    const [faq, setFaq] = useState([]);
    useEffect(() => {
    function getFaq() {
      axios.get("http://localhost:5000/faq/").then((res) => {
        setFaq(res.data);
      }).catch((err) =>{
        alert(err);
      })
    }
    getFaq();
    }, []);

    


    return(
        <>
        
        <Header/>

        
        <div className="cont">
            <div class="maintxt">
            <h1 style={{color:"#ffffff"}}>Frequently Asked Questions</h1>
            
            <SearchBar/>

            </div>
        

        <div class="container">

                {faqcats.map((faqcats, index) =>(
                    <div className="box">
                        <div className="icon">
                            {faqcats.icon}
                        </div>
                        <div className="name">
                            <p>{faqcats.name}</p>
                        </div>

                        <div className="btnE"
                            onClick={() => toggleFunction(faqcats.name, index)}>
                                <IconContext.Provider value={{ size: '1em', className: selected === index ? 'rotated' : '' }}>
                            {faqcats.arrow}
                            </IconContext.Provider>
                        </div>

                        {toggle[faqcats.name] &&
                        (
                            
                            <div className="expand">
                                {faq.filter(qa => qa.category === faqcats.name).map(filteredqa => (
                                    <div className="text">
                                    <p><b>{filteredqa.question}</b></p>
                                    <p>{filteredqa.answer}</p>
                                    <hr class="solid"></hr>
                                    </div>
                                ))}


                            </div>
                            
                        )}
                    </div>
                ))}

                <div className="btm">
                    <h3>Couldn't find what you're looking for?</h3>
                    {/* <a href="/Chat"> */}
                    <button className="button-2" >Chat with Admin  <GrSend/>
                    </button>
                  
                    
                </div>

        </div>




        </div>
       
        </>
    )
}

export default FAQ;