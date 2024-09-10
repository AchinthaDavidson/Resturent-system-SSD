import React from "react";
import "../styles/textInput.css";

export default function TextArea({ label, type, placeholder, action, error }) {
  return (
    <div className="input-container">
      <span className="input-label">{label}</span>
      <textarea
        type={type}
        placeholder={placeholder}
        onChange={action}
        className="dark-input textarea"
        rows={5}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
