import React from "react";
import classnames from "classnames";

import classes from "./Input.module.css";

interface Props {
  type?: "text" | "password";
  label: string;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
}

function Input(props: Props, ref?: React.Ref<HTMLInputElement>) {
  return (
    <label className={classnames(classes.label, props.className)}>
      {props.label}
      <input
        type={props.type || "text"}
        className={classes.input}
        ref={ref}
        onInput={props.onInput}
        value={props.value}
      />
    </label>
  );
}

export default React.forwardRef(Input);
