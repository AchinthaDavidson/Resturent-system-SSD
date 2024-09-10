import React from "react";
import "../styles/textInput.css";

export default function Select({ value, options, onChange, label }) {
  return (
    <div className="input-container">
      <span className="input-label">{label}</span>
      <select className="dark-input" value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.key}
          </option>
        ))}
      </select>
    </div>
  );
}
