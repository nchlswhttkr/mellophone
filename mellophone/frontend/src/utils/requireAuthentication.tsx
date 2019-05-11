import React from "react";
import { autorun } from "mobx";
import Route from "./Route";
import { StoresContext } from "../stores";
import { RouteComponentProps } from "@reach/router";
import { Observer } from "mobx-react";

/**
 * A HOC (https://reactjs.org/docs/higher-order-components.html) that enforces
 * authentication on page components before rendering them.
 *
 * If a user is not authenticated, they will be redirected to sign in or shown
 * the <Fallback/> if it is provided.
 *
 * If a user is authenticated, the <Child/> will be rendered.
 */
const requireAuthentication = (
  Child: React.ElementType,
  Fallback?: React.ElementType
) => (props: RouteComponentProps) => {
  const { sessionStore } = React.useContext(StoresContext);
  if (!sessionStore) return null;

  // If a user is/becomes anonymous, redirect them to sign in
  React.useEffect(
    () =>
      autorun(() => {
        if (!sessionStore.user && !Fallback) {
          new Route(Route.SIGN_IN).navigate();
        }
      }),
    []
  );

  return (
    <Observer>
      {() => {
        if (sessionStore.user) {
          return <Child {...props} />;
        }

        return Fallback ? <Fallback {...props} /> : null;
      }}
    </Observer>
  );
};

export default requireAuthentication;
