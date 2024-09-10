import React from "react";
import "../styles/button.css";

export default function Button({ text, action, customStyle }) {
  return (
    <div className="button-container">
      <button className="button" onClick={action} style={customStyle}>
        {text}
      </button>
    </div>
  );
}
