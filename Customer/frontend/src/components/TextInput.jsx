import React from "react";
import "../styles/textInput.css";

export default function TextInput({ label, type, placeholder, action, error }) {
  return (
    <div className="input-container">
      <span className="input-label">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        onChange={action}
        className="dark-input"
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
