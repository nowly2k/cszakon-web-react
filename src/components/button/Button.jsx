import React from "react";
import "./Button.css";

function Button(props) {
  return <button {...props} className={"button " + props.className} />;
}

export default Button;
