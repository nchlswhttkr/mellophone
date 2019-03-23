import React from "react";

import classes from "./CreateTeamForm.module.css";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { observer } from "mobx-react";
import { IIdentityStore } from "../../types";

interface Props {
  identityStore: IIdentityStore;
  createTeam: (name: string, website: string) => Promise<void>;
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
  websiteRef = React.createRef<HTMLInputElement>();

  onSubmit = async () => {
    const name = this.nameRef.current;
    const website = this.websiteRef.current;
    if (name && website) {
      try {
        await this.props.createTeam(name.value, website.value);
      } catch (error) {
        this.setState({ errorMessage: error.message });
      }
    }
  };

  render() {
    const { identityStore } = this.props;
    const { errorMessage } = this.state;

    if (!identityStore.user) return null;

    return (
      <form className={classes.form}>
        <Input label="Team name" ref={this.nameRef} />
        <Input label="Website" ref={this.websiteRef} />

        {errorMessage && <p className={classes.error}>{errorMessage}</p>}

        <Button onClick={this.onSubmit}>Create team</Button>
      </form>
    );
  }
}

export default CreateTeamForm;
