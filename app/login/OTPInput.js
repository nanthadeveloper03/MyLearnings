import React, { useState, useRef } from 'react';

const OTPInput = ({ length, onChange, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join(''));

      // Move focus to the next input field
      if (value !== '' && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }

      // Trigger onComplete when OTP is filled
      if (index === length - 1 && newOtp.every((digit) => digit !== '')) {
        onComplete(newOtp.join(''));
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="otp-input-container pt-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputRefs.current[index] = el)}
          className="otp-input"
        />
      ))}
    </div>
  );
};

export default OTPInput;
