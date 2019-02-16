import React from "react";

import styles from "./Button.module.css";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

function Button(props: Props) {
  return (
    <button onClick={props.onClick} className={styles.button}>
      {props.children}
    </button>
  );
}

export default Button;
