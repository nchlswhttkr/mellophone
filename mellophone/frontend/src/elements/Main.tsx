import React from "react";
import classnames from "classnames";

import classes from "./Main.module.css";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Usually, pages will want a central section for the main content. You can
 * use this component as a general wrapper for this.
 *
 * It confines content to the center of a page and prevents other components
 * from growing too wide and becoming difficult to navigate.
 *
 * Do not consider its use mandatory. For example, you may way to have a splash
 * page that occupies the entire width of the screen.
 */
function Main(props: Props) {
  return (
    <main className={classnames(classes.main, props.className)}>
      {props.children}
    </main>
  );
}
export default Main;
