import React from "react";

import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div>
        <p>Mellophone is currently under development</p>
        <p>
          <a href="https://github.com/nchlswhttkr/mellophone">GitHub</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
