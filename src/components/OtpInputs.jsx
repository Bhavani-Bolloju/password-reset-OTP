import React from "react";

const inputs = new Array(1, 1, 1, 1, 1, 1);

function OtpInputs({ otp, onSetOtp }) {
   const items = [];

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
   };

   return (
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
            />
         ))}
      </div>
   );
}

export default OtpInputs;

// 645321
