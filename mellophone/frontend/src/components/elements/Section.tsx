import React from "react";
import classnames from "classnames";

import classes from "./Section.module.css";

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Section(props: Props) {
  return (
    <section className={classnames(classes.section, props.className)}>
      {props.children}
    </section>
  );
}

export default Section;
