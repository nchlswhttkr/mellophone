import React from "react";
import { observer } from "mobx-react-lite";

import classes from "./CreateTeamForm.module.css";
import Input from "../elements/Input";
import Button from "../elements/Button";
import ErrorMessage from "../elements/ErrorMessage";

interface Props {
  createTeam: (name: string, website: string) => Promise<void>;
}

interface State {
  errorMessage: string;
}

function CreateTeamForm(props: Props) {
  const [error, setError] = React.useState<Error>();
  const nameRef = React.useRef<HTMLInputElement>(null);
  const websiteRef = React.useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    const name = nameRef.current;
    const website = websiteRef.current;
    if (name && website) {
      props.createTeam(name.value, website.value).catch(setError);
    }
  };

  return (
    <form className={classes.form}>
      <Input className={classes.input} label="Team name" ref={nameRef} />
      <Input className={classes.input} label="Website" ref={websiteRef} />
      <ErrorMessage error={error} />
      <Button className={classes.button} onClick={onSubmit}>
        Create team
      </Button>
    </form>
  );
}

export default observer(CreateTeamForm);
