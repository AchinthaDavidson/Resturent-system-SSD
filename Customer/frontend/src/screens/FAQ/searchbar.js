import React from "react";

const SearchBar = ({keyword, onChange}) => {
    const BarStyle = {width:"30rem",
    background:"#F0F0F0", 
    border:"none", 
    padding:"0.5rem",
    textAlign:"center",
    fontFamily:"Arial",
    fontSize:"20px",
    margin:"20px 0 30px 0"
    };
    return (
      <input 
       style={BarStyle}
       key="search-bar"
       value={keyword}
       placeholder={"How can we help you?"}
      //  onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  
  export default SearchBar;