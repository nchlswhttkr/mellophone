import React from "react";

import styles from "./Section.module.css";

interface Props {
  children: React.ReactNode;
}

function Section(props: Props) {
  return <section className={styles.section}>{props.children}</section>;
}

export default Section;
