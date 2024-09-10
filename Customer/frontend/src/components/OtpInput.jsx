import React, { useState } from "react";
import "../styles/otpInput.css";

export default function OtpInput({ count = 4, action, error }) {
  const inputCount = Array.from({ length: count }, (_, i) => i);
  const [otp, setOtp] = useState(Array(count).fill(""));

  const handleKeyUp = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 8) {
      const prevSibling = e.target.previousSibling;
      if (prevSibling) return prevSibling.focus();
    }
    const nextSibling = e.target.nextSibling;
    if (nextSibling) return nextSibling.focus();
  };

  const handleOtpChange = (e, index) => {
    const otpCopy = [...otp];
    otpCopy[index] = e.target.value;
    setOtp(otpCopy);
    action(otpCopy.join(""));
  };

  return (
    <>
      <div className="otp-input-container">
        {inputCount.map((i) => (
          <input
            key={i}
            type="text"
            className="otp-input"
            maxLength="1"
            onKeyUp={handleKeyUp}
            onChange={(e) => handleOtpChange(e, i)}
          />
        ))}
      </div>
      {error && <span className="error-message">{error}</span>}
    </>
  );
}
