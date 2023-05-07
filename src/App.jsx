import React, { useState } from "react";
import OtpInputs from "./components/OtpInputs";

function App() {
   const [otp, setOtp] = useState("23".split(""));

   return (
      <div className="otp-input-container">
         <h1>Phone Verification</h1>
         <OtpInputs
            otp={otp}
            onSetOtp={setOtp}
         />
         <div className="btns">
            <button>change number</button>
            <button>re-send OTP</button>
         </div>
         <button className="verify-btn">verify phone number</button>
      </div>
   );
}

export default App;
