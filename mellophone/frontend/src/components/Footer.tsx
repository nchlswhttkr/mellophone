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
        <p>
          You are using release <em>{getRelease()}</em> of Mellophone
        </p>
      </div>
    </footer>
  );
}

function getRelease() {
  if (process.env.REACT_APP_RELEASE_ID) return process.env.REACT_APP_RELEASE_ID;
  switch (process.env.NODE_ENV) {
    case "development":
      return "DEV";
    case "test":
      return "TST";
    case "production":
      return "PRD";
  }
}

export default Footer;
