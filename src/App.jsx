import React, { useState } from "react";
import OtpInputs from "./components/OtpInputs";
import Button from "./components/Button";

function App() {
   const [otp, setOtp] = useState("");
   const [resetPassword, setResetPassword] = useState(false);

   return (
      <div>
         {!resetPassword && (
            <div className="password-reset">
               <h1>Click here to reset password</h1>
               <Button onClick={() => setResetPassword((prev) => !prev)}>
                  Reset Password
               </Button>
            </div>
         )}
         {resetPassword && (
            <div className="otp-input-container">
               <h1>Phone Verification</h1>
               <OtpInputs
                  otp={otp}
                  onSetOtp={setOtp}
                  onReset={setResetPassword}
               />
            </div>
         )}
      </div>
   );
}

export default App;
