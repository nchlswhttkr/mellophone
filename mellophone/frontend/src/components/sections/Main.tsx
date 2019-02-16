import React from "react";

import styles from "./Main.module.css";

interface Props {
  children: React.ReactNode;
}

function Main(props: Props) {
  return (
    <main className={styles.main}>
      <div>{props.children}</div>
    </main>
  );
}
export default Main;
