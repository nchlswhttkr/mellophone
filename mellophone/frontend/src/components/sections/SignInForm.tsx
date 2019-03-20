import React from "react";
import { observer } from "mobx-react";

import Route from "../../utils/Route";
import IdentityService from "../../network/IdentityService";
import Input from "../elements/Input";
import Button from "../elements/Button";
import Divider from "../elements/Divider";
import classes from "./SignInForm.module.css";

interface State {
  isNewAccount: boolean;
  errorMessage: string;
}

@observer
class SignInForm extends React.Component<{}, State> {
  state = {
    isNewAccount: true,
    errorMessage: "",
  };

  firstNameRef = React.createRef<HTMLInputElement>();
  lastNameRef = React.createRef<HTMLInputElement>();
  usernameRef = React.createRef<HTMLInputElement>();
  passwordRef = React.createRef<HTMLInputElement>();

  toggleNewAccount = () => {
    // Using form.reset() is possible, but relying on reconcilation is fine
    this.setState({ isNewAccount: !this.state.isNewAccount });
  };

  onSubmit = async () => {
    const { isNewAccount } = this.state;
    const firstName = this.firstNameRef.current;
    const lastName = this.lastNameRef.current;
    const username = this.usernameRef.current;
    const password = this.passwordRef.current;

    try {
      if (isNewAccount && firstName && lastName && username && password) {
        await IdentityService.createUser(
          username.value,
          password.value,
          firstName.value,
          lastName.value
        );
      } else if (!isNewAccount && username && password) {
        await IdentityService.authenticateUser(username.value, password.value);
      }
      new Route().buildAndNavigate();
    } catch (error) {
      this.setState({
        errorMessage: error.message,
      });
    }
  };

  render() {
    const { isNewAccount, errorMessage } = this.state;

    return (
      <>
        <form
          className={classes.form}
          onKeyDown={e => e.key === "Enter" && this.onSubmit()}>
          <h3 className={classes.center}>
            {isNewAccount ? "Sign up" : "Sign in"}
          </h3>

          {isNewAccount && <Input ref={this.firstNameRef} label="First name" />}
          {isNewAccount && <Input ref={this.lastNameRef} label="Last name" />}
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

          <Button onClick={this.onSubmit}>
            {isNewAccount ? "Create account" : "Sign in"}
          </Button>

          <Divider />

          <Button onClick={this.toggleNewAccount} type="button">
            {isNewAccount
              ? "Sign in to an existing account"
              : "Create an account"}
          </Button>
        </form>
      </>
    );
  }
}

export default SignInForm;
