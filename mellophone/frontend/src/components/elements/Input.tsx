import React from "react";

import styles from "./Input.module.css";

interface Props {
  type?: "text" | "password";
  label: string;
}

function Input(props: Props, ref: React.Ref<HTMLInputElement>) {
  return (
    <label className={styles.label}>
      {props.label}
      <input type={props.type || "text"} className={styles.input} ref={ref} />
    </label>
  );
}

export default React.forwardRef(Input);
