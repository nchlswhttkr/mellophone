import React from "react";

import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div>
        <p>
          <a
            href="https://github.com/nchlswhttkr/mellophone"
            target="_blank"
            rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
