import React from "react";

import IdentityService from "../../network/IdentityService";
import Section from "../elements/Section";
import Input from "../elements/Input";
import Button from "../elements/Button";
import Divider from "../elements/Divider";

import styles from "./SignInForm.module.css";
import Route from "../../utils/Route";

interface State {
  isNewAccount: boolean;
}

class SignInForm extends React.Component<{}, State> {
  state = {
    isNewAccount: false,
  };

  formRef = React.createRef<HTMLFormElement>();
  firstNameRef = React.createRef<HTMLInputElement>();
  lastNameRef = React.createRef<HTMLInputElement>();
  usernameRef = React.createRef<HTMLInputElement>();
  passwordRef = React.createRef<HTMLInputElement>();

  toggleNewAccount = () => {
    // We could rely on React's reconciliation, but a form reset is simple here
    this.formRef.current && this.formRef.current.reset();
    this.setState({ isNewAccount: !this.state.isNewAccount });
  };

  onSubmit = async () => {
    try {
      if (
        this.state.isNewAccount &&
        this.firstNameRef.current &&
        this.lastNameRef.current &&
        this.usernameRef.current &&
        this.passwordRef.current
      ) {
        await IdentityService.createUser(
          this.usernameRef.current.value,
          this.passwordRef.current.value,
          this.firstNameRef.current.value,
          this.lastNameRef.current.value
        );
      } else if (
        !this.state.isNewAccount &&
        this.usernameRef.current &&
        this.passwordRef.current
      ) {
        await IdentityService.authenticateUser(
          this.usernameRef.current.value,
          this.passwordRef.current.value
        );
      }
      new Route().buildAndNavigate();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { isNewAccount } = this.state;
    return (
      <Section>
        <form
          ref={this.formRef}
          className={styles.form}
          onKeyDown={event => {
            event.key === "Enter" && this.onSubmit();
          }}>
          <h3 className={styles.center}>
            {isNewAccount ? "Sign Up" : "Sign In"}
          </h3>

          {isNewAccount && <Input ref={this.firstNameRef} label="First Name" />}
          {isNewAccount && <Input ref={this.lastNameRef} label="Last Name" />}
          <Input ref={this.usernameRef} label="Email" />
          <Input ref={this.passwordRef} label="Password" type="password" />

          <p className={styles.center}>
            Are you sure your{" "}
            <a
              href="https://haveibeenpwned.com/"
              rel="noreferrer noopener"
              target="_blank">
              password is secure
            </a>
            ?
          </p>

          <Button onClick={this.onSubmit}>
            {isNewAccount ? "Create Account" : "Sign In"}
          </Button>

          <Divider />

          <Button onClick={this.toggleNewAccount}>
            {isNewAccount
              ? "Sign in to an existing account"
              : "Create an account"}
          </Button>
        </form>
      </Section>
    );
  }
}

export default SignInForm;
