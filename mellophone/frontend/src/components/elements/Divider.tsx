import React from "react";
import classnames from "classnames";

import classes from "./Divider.module.css";

interface Props {
  className?: string;
}

function Divider(props: Props) {
  return <hr className={classnames(classes.divider, props.className)} />;
}

export default Divider;
