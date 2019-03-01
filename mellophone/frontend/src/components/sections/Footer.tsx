import React from "react";

import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div>
        <p>&copy; Mellophone</p>
        <p>
          Contribute on{" "}
          <a href="https://github.com/nchlswhttkr/mellophone">GitHub</a>!
        </p>
      </div>
    </footer>
  );
}

export default Footer;
