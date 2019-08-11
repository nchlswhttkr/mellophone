import React from "react";
import { observer } from "mobx-react-lite";

import classes from "./SignInForm.module.css";
import Input from "./Input";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";

interface Props {
  signIn: (email: string, password: string) => Promise<void>;
}

function SignInForm(props: Props) {
  const [error, setError] = React.useState<Error>();
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    const username = usernameRef.current;
    const password = passwordRef.current;
    if (!username || !password) return;
    props.signIn(username.value, password.value).catch(setError);
  };

  return (
    <form
      className={classes.form}
      onKeyDown={e => e.key === "Enter" && onSubmit()}>
      <Input ref={usernameRef} label="Email" />
      <Input ref={passwordRef} label="Password" type="password" />
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
      <ErrorMessage error={error} />
      <Button className={classes.button} onClick={onSubmit}>
        Sign in
      </Button>
    </form>
  );
}

export default observer(SignInForm);
