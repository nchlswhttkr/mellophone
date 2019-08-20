import React from "react";

import classes from "./SignUpForm.module.css";
import Input from "./Input";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";

interface Props {
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
}

function SignUpForm(props: Props) {
  const [error, setError] = React.useState<Error>();
  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    const email = emailRef.current;
    const password = passwordRef.current;
    const firstName = firstNameRef.current;
    const lastName = lastNameRef.current;
    if (!email || !password || !firstName || !lastName) return;
    props
      .signUp(email.value, password.value, firstName.value, lastName.value)
      .catch(setError);
  };

  return (
    <form
      className={classes.form}
      onKeyDown={e => e.key === "Enter" && onSubmit()}>
      <Input ref={firstNameRef} label="First name" />
      <Input ref={lastNameRef} label="Last name" />
      <Input ref={emailRef} label="Email" />
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
        Sign up
      </Button>
    </form>
  );
}

export default SignUpForm;
