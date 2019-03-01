import React from "react";

import classes from "./Main.module.css";

interface Props {
  children: React.ReactNode;
}

function Main(props: Props) {
  return (
    <main className={classes.main}>
      <div>{props.children}</div>
    </main>
  );
}
export default Main;
