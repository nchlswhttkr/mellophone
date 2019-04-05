import React from "react";

import Input from "../elements/Input";
import Button from "../elements/Button";
import { observer } from "mobx-react";
import { ISessionStore, IMeetingToBeCreated } from "../../types";

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
    const { sessionStore } = this.props;
    const { errorMessage } = this.state;

    if (!sessionStore.user) return null;

    return (
      <form>
        <Input label="Meeting name" ref={this.nameRef} />
        <Input label="Venue (optional)" ref={this.venueRef} />

        {errorMessage && <p>{errorMessage}</p>}

        <Button onClick={this.onSubmit}>Create meeting</Button>
      </form>
    );
  }
}

export default CreateTeamForm;
