import React, { useState } from "react";
import Button from "./Button";

const inputs = new Array(1, 1, 1, 1, 1, 1);

function OtpInputs({ otp, onSetOtp, onReset }) {
   const items = [];

   const [error, setError] = useState(null);

   for (let i = 0; i < 6; i++) {
      if (otp[i]) {
         items[i] = otp[i].trim();
      } else {
         items.push("");
      }
   }
   const inputHandler = function (e, index) {
      const target = e.target;
      const value = target.value;
      const nextEl = target.nextSibling;
      const prevEl = target.previousSibling;
      const isDigit = Number.isInteger(+value);

      if (!isDigit || (value.length > 1 && value.length < 6)) {
         return;
      }
      if (value.length === 6) {
         onSetOtp(value.split(""));
         return;
      }

      const first = items.slice(0, index);
      const last = items.slice(index + 1);

      onSetOtp([...first, value, ...last]);

      if (nextEl && isDigit && value.trim() != "") {
         nextEl.focus();
      }

      if (value == "" && prevEl) {
         prevEl.focus();
      }
   };

   const keyDownHandler = function (e) {
      const { key, target } = e;
      const nextEl = target.nextSibling;
      const prevEl = target.previousSibling;

      target.setSelectionRange(0, 1);
      if (key === "ArrowRight" && nextEl) {
         nextEl.focus();
      }
      if (key === "ArrowLeft" && prevEl) {
         prevEl.focus();
      }
   };

   const inputFocusHandler = function (e) {
      const { target } = e;
      target.setSelectionRange(0, 1);
      setError(null);
   };

   return (
      <div className="otp-container">
         {error && <p className="error">{error}</p>}
         <div className="otp-inputs">
            {items.map((digit, i) => (
               <input
                  key={i}
                  type="text"
                  maxLength={6}
                  pattern="\d{1}"
                  autoComplete="one-time-code"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => {
                     inputHandler(e, i);
                  }}
                  onKeyDown={keyDownHandler}
                  onFocus={inputFocusHandler}
                  required
               />
            ))}
         </div>
         <div className="btns">
            <button>change number</button>
            <button>re-send OTP</button>
         </div>

         <Button
            onClick={() => {
               console.log(otp.length, otp);
               const filter =
                  otp.length > 0 && otp.filter((digit) => digit !== "");

               if (filter.length < 6 || otp.length <= 0) {
                  setError("please fill that input fields");
                  return;
               }
               onReset((prev) => !prev);
               onSetOtp("");
            }}
         >
            verify phone number
         </Button>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="cancel"
            onClick={() => onReset((prev) => !prev)}
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M6 18L18 6M6 6l12 12"
            />
         </svg>
      </div>
   );
}

export default OtpInputs;

// 645321
