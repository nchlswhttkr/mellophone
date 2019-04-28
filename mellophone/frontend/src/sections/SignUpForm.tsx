import React from "react";

import { IUserToBeCreated } from "../types";
import classes from "./SignUpForm.module.css";
import Input from "../elements/Input";
import Button from "../elements/Button";

interface Props {
  signUp: (user: IUserToBeCreated, password: string) => Promise<void>;
}

interface State {
  errorMessage: string;
}

class SignUpForm extends React.Component<Props, State> {
  state = {
    errorMessage: "",
  };

  firstNameRef = React.createRef<HTMLInputElement>();
  lastNameRef = React.createRef<HTMLInputElement>();
  emailRef = React.createRef<HTMLInputElement>();
  passwordRef = React.createRef<HTMLInputElement>();

  onSubmit = async () => {
    const firstName = this.firstNameRef.current;
    const lastName = this.lastNameRef.current;
    const email = this.emailRef.current;
    const password = this.passwordRef.current;

    if (!email || !password || !firstName || !lastName) return undefined;

    try {
      await this.props.signUp(
        {
          email: email.value,
          firstName: firstName.value,
          lastName: lastName.value,
        },
        password.value
      );
    } catch (error) {
      this.setState({
        errorMessage: error.message,
      });
    }
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <form
        className={classes.form}
        onKeyDown={e => e.key === "Enter" && this.onSubmit()}>
        <Input ref={this.firstNameRef} label="First name" />
        <Input ref={this.lastNameRef} label="Last name" />
        <Input ref={this.emailRef} label="Email" />
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
          Sign up
        </Button>
      </form>
    );
  }
}

export default SignUpForm;
