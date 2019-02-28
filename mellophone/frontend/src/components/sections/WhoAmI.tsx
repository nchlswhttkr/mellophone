import React, { useState } from "react";

import Section from "../elements/Section";
import Button from "../elements/Button";
import IdentityService from "../../network/IdentityService";

function WhoAmI() {
  const [message, setMessage] = useState<undefined | string>(undefined);

  return (
    <Section>
      <Button
        onClick={() => {
          IdentityService.getUsername()
            .then(username => setMessage(`Hello ${username}!`))
            .catch(() => setMessage("An error occured, are you signed in?"));
        }}>
        Who am I?
      </Button>
      {message !== undefined && <p>{message}</p>}
    </Section>
  );
}

export default WhoAmI;
