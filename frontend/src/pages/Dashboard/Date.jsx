
import React, { useState, useEffect } from 'react';


export const DateTime = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <div style={{backgroundColor:"white",borderRadius:"9px", padding:'15px'}}>
            <p> {date.toLocaleDateString()}  {date.toLocaleTimeString()}
             </p>

        </div>
    )
}

export default DateTime