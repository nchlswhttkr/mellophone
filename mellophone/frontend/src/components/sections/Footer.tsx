import React from "react";

import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div>
        <p>
          Find out more on{" "}
          <a href="https://github.com/nchlswhttkr/mellophone">GitHub</a>!
        </p>
      </div>
    </footer>
  );
}

export default Footer;
