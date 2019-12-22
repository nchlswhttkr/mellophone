import React from "react";
import { RouteComponentProps } from "@reach/router";
import { connect } from "react-redux";

import Main from "../components/Main";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import classes from "./SignIn.module.css";
import Button from "../components/Button";
import { navigate } from "../utils/routing";
import { useNetwork } from "../network";
import ErrorMessage from "../components/ErrorMessage";
import { AppState } from "../ducks";
import { setSessionUser } from "../ducks/session";
import { IUser } from "../types";

interface Props extends RouteComponentProps {
  isAuthenticated: boolean;
  setSessionUser(user: IUser): void;
}

function SignIn(props: Props) {
  const [error, setError] = React.useState<Error>();
  const [newAccount, setNewAccount] = React.useState<boolean>(
    !localStorage.getItem("hasAccount")
  );
  const { signIn, signUp } = useNetwork();

  // Skip signing in a user is already authenticated
  React.useEffect(() => {
    if (props.isAuthenticated) {
      navigate("/");
    }
  }, [props.isAuthenticated]);

  const onSignUp = (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    return signUp(email, password, firstName, lastName)
      .then(user => {
        props.setSessionUser(user);
        localStorage.setItem("hasAccount", "yes");
        navigate("/");
      })
      .catch(setError);
  };

  const onSignIn = (email: string, password: string) => {
    return signIn(email, password)
      .then(user => {
        props.setSessionUser(user);
        localStorage.setItem("hasAccount", "yes");
        navigate("/");
      })
      .catch(setError);
  };

  return (
    <Main className={classes.formContainer}>
      <h1 className={classes.title}>
        {newAccount ? "Sign up to Mellophone" : "Sign in to Mellophone"}
      </h1>

      {newAccount ? (
        <SignUpForm signUp={onSignUp} />
      ) : (
        <SignInForm signIn={onSignIn} />
      )}

      <ErrorMessage error={error} />

      <hr className={classes.divider} />

      <Button onClick={() => setNewAccount(!newAccount)}>
        {newAccount ? "Sign in to an existing account" : "Create an account"}
      </Button>
    </Main>
  );
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: !!state.session.user,
});

const mapDispatchToProps = { setSessionUser };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
