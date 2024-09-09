import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import Niv from '../../components/Niv';
import { GoogleMap, Marker, useJsApiLoader, Autocomplete,DirectionsRenderer } from '@react-google-maps/api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./map.css"

const center2 = {lat:6.949,lng:80.789};

export default function DriverMap() {

 

    const [map,setMap] = useState(/** @type google.maps.Map  */ (null))
    const [directionResponse, setDirectionResponse] = useState("")
    const [distance,setDistance] = useState("")
    const [duration,setDuration] = useState("")

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()

    const permOrigin = "Nuwara Eliya, Sri Lanka"

     /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef()

    const center = useMemo(() => ({lat:6.949632874163033,lng:80.78905943343568}), []);

    const {isLoaded} = useJsApiLoader({
      googleMapsApiKey: 'AIzaSyBv1H_VqIZse7f0hBdvLJThzpB-SaFfkPg',
      libraries:['places']
    });
  
    async function calculateRoute(){
       
        // if(originRef.current.value === '' || destinationRef.current.value ===''){
        //     toast.error("Please enter both pickup and deliver locations...")
        //     return
        // }

        if(destinationRef.current.value ===''){
            toast.error("Please deliver locations...")
            return
        }

         //eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService()
        const results = await directionService.route({
            origin:  permOrigin ,
           // origin: originRef.current.value,
            destination: destinationRef.current.value,
            //eslint-disable-next-line no-undef
            travelMode : google.maps.TravelMode.DRIVING

        })
        setDirectionResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
       
     }

     function clearRoutes(){
        setDirectionResponse(null)
        setDistance("")
        setDuration("")
        //originRef.current.value = ''
       // originRef.current.value = ''
        destinationRef.current.value = ''
        window.location.reload()
     }

    if(!isLoaded) return <div><h1>Loading</h1></div>;

        return(
            <div>
            <Niv name='Driver Map'/>
            <ToastContainer position="top-right" theme="colored" /> 
            <div className="data">
               
              <table style={{ width:"100%", margin:"auto auto" }}>
                    <tbody>
                        <tr>
                        <td rowSpan={5} style={{ width:"70%", margin:"auto auto" , minWidth:"50vh" }} >
                            <div className="positionDiv" style={{margin:"auto auto"}}>
                            <GoogleMap 
                                zoom={15} 
                                center={center2} 
                                mapContainerClassName="mapContainer" 
                                id="map"
                                mapContainerStyle={{margin:"äuto auto"}}
                                onLoad={map => setMap(map)}
                                options={{
                                
                                    streetViewControl:false,
                                    mapTypeControl:false,
                                    fullscreenControl:false

                                }}>    
                                <Marker position={center2} />

                                {directionResponse && <DirectionsRenderer directions={directionResponse}/>} 
    
                            </GoogleMap>
                            </div>
                            </td>

                            <td colSpan={2}>
                            {/* <Autocomplete>
                                <input type="text" 
                                    placeholder="Enter your pickup point..."  
                                    style={{height:"4rem", padding:"2rem 2rem 2rem 2rem ", width:"100%"}}
                                    ref={originRef}/>
                            </Autocomplete>    */}
                            <p>PickUp Location ; {permOrigin}</p>
                            </td>
                            
                        </tr>
                        <tr>
                            <td colSpan={2}>
                            <Autocomplete>
                                <input type="text"  
                                placeholder="Enter your drop point..."  
                                style={{height:"4rem", padding:"2rem 2rem 2rem 2rem ", width:"100%"}}
                                ref={destinationRef}/>
                            </Autocomplete>
                            </td>
                        </tr>
                      
        
                        <tr>
                        <td><p>Distance : {distance}</p></td>
                            <td><p>Duration : {duration}</p></td>
                            
                        </tr>
                        <tr>
                            <td colSpan={2}>
                            <button 
                                className="middlebtns2" 
                                onClick={calculateRoute}>   
                                Calculate Route
                            </button>  
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <button 
                                    className="middlebtns2" 
                                    onClick={clearRoutes}>   
                                    Clear
                                </button>  
                            </td>
                            <td>
                                <button 
                                    className="middlebtns2" 
                                    onClick={() => map.panTo(center)}
                                    >   
                                   Center
                                </button>  
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}


         

//   function Map(){
//     const center = useMemo(() => ({lat:6.949,lng:80.789}), []);
   
//     return (
        

//     )
// }

  
