import React from "react";
import classes from "./Button.module.css";

function Button({ children, onClick }) {
   return (
      <button
         onClick={onClick}
         className={classes["verify-btn"]}
      >
         {children}
      </button>
   );
}

export default Button;
