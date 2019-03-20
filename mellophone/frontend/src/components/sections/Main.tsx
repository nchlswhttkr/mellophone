import React from "react";
import classnames from "classnames";

import classes from "./Main.module.css";

interface Props {
  className?: string;
  children: React.ReactNode;
}

function Main(props: Props) {
  return (
    <main className={classnames(classes.main, props.className)}>
      <div>{props.children}</div>
    </main>
  );
}
export default Main;
