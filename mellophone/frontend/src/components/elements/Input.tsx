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
    <label className={classes.label}>
      {props.label}
      <input
        type={props.type || "text"}
        className={classnames(classes.input, props.className)}
        ref={ref}
        onInput={props.onInput}
        value={props.value}
      />
    </label>
  );
}

export default React.forwardRef(Input);
