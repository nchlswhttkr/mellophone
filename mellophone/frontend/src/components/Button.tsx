import React from "react";
import classnames from "classnames";

import classes from "./Button.module.css";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
  "aria-label"?: string;
}

function Button(props: Props) {
  return (
    <button
      onClick={props.onClick}
      className={classnames(classes.button, props.className)}
      type={props.type || "button"} // explicit type avoids issues with <form>
      aria-label={props["aria-label"]}>
      {props.children}
    </button>
  );
}

export default Button;
