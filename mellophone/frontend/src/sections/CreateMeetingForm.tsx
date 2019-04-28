import React from "react";
import { observer } from "mobx-react";

import { ISessionStore, IMeetingToBeCreated } from "../types";
import classes from "./CreateMeetingForm.module.css";
import Input from "../elements/Input";
import Button from "../elements/Button";

interface Props {
  sessionStore: ISessionStore;
  createMeeting: (meeting: IMeetingToBeCreated) => Promise<void>;
}

interface State {
  errorMessage: string;
}

@observer
class CreateTeamForm extends React.Component<Props, State> {
  state = {
    errorMessage: "",
  };

  nameRef = React.createRef<HTMLInputElement>();
  venueRef = React.createRef<HTMLInputElement>();

  onSubmit = async () => {
    const name = this.nameRef.current;
    const venue = this.venueRef.current;
    if (name && venue) {
      try {
        await this.props.createMeeting({
          name: name.value,
          venue: venue.value,
        });
      } catch (error) {
        this.setState({ errorMessage: error.message });
      }
    }
  };

  render() {
    const { errorMessage } = this.state;

    if (!this.props.sessionStore.user) return null;

    return (
      <form className={classes.form}>
        <Input
          className={classes.input}
          label="Meeting name"
          ref={this.nameRef}
        />
        <Input
          className={classes.input}
          label="Venue (optional)"
          ref={this.venueRef}
        />

        {errorMessage && <p className={classes.error}>{errorMessage}</p>}

        <Button className={classes.button} onClick={this.onSubmit}>
          Create meeting
        </Button>
      </form>
    );
  }
}

export default CreateTeamForm;
