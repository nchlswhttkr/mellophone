import React from "react";
import { observer } from "mobx-react-lite";

import classes from "./CreateMeetingForm.module.css";
import Input from "../elements/Input";
import Button from "../elements/Button";
import ErrorMessage from "../elements/ErrorMessage";

interface Props {
  createMeeting: (name: string, venue?: string) => Promise<void>;
}

function CreateMeetingForm(props: Props) {
  const [error, setError] = React.useState<Error>();
  const nameRef = React.useRef<HTMLInputElement>(null);
  const venueRef = React.useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    const name = nameRef.current;
    const venue = venueRef.current;
    if (name && venue) {
      props.createMeeting(name.value, venue.value).catch(setError);
    }
  };

  return (
    <form className={classes.form}>
      <Input className={classes.input} label="Meeting name" ref={nameRef} />
      <Input
        className={classes.input}
        label="Venue (optional)"
        ref={venueRef}
      />
      <ErrorMessage error={error} />
      <Button className={classes.button} onClick={onSubmit}>
        Create meeting
      </Button>
    </form>
  );
}

export default observer(CreateMeetingForm);
