import React from "react";

import classes from "./SignInForm.module.css";
import Input from "../elements/Input";
import Button from "../elements/Button";

interface Props {
  signIn: (email: string, password: string) => Promise<void>;
}

interface State {
  errorMessage: string;
}

class SignInForm extends React.Component<Props, State> {
  state = {
    errorMessage: "",
  };

  usernameRef = React.createRef<HTMLInputElement>();
  passwordRef = React.createRef<HTMLInputElement>();

  onSubmit = async () => {
    const username = this.usernameRef.current;
    const password = this.passwordRef.current;

    if (!username || !password) return;

    try {
      await this.props.signIn(username.value, password.value);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <form
        className={classes.form}
        onKeyDown={e => e.key === "Enter" && this.onSubmit()}>
        <Input ref={this.usernameRef} label="Email" />
        <Input ref={this.passwordRef} label="Password" type="password" />

        <p className={classes.center}>
          Are you sure your{" "}
          <a
            href="https://haveibeenpwned.com/"
            rel="noreferrer noopener"
            target="_blank">
            password is secure
          </a>
          ?
        </p>

        {errorMessage && <p className={classes.error}>{errorMessage}</p>}

        <Button className={classes.button} onClick={this.onSubmit}>
          Sign in
        </Button>
      </form>
    );
  }
}

export default SignInForm;
