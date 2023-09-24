import React from "react";

function Button(props) {
  return <button {...props} className={"button " + props.className} />;
}

export default Button;
