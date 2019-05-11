import React from "react";
import { autorun } from "mobx";
import Route from "./Route";
import { StoresContext } from "../stores";
import { RouteComponentProps } from "@reach/router";
import { Observer } from "mobx-react";

/**
 * A HOC (https://reactjs.org/docs/higher-order-components.html) that enforces
 * authentication before rendering its children.
 *
 * If a user is not authenticated, they will be redirected to sign in or shown
 * the <Fallback/> if it is provided.
 *
 * If a user is authenticated, a sessionUser prop will be supplied to a <Child/>
 * component. This is useful since numerous components either depend on a user
 * being authenticated before they render, or rely on an async call to load the
 * details of said user. This HOC accomplishes both.
 */
const requireAuthentication = <Props extends RouteComponentProps>(
  Child: React.ElementType,
  Fallback?: React.ElementType
) => (props: OmitSessionUser<Props>) => {
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
          return <Child {...props} sessionUser={sessionStore.user} />;
        }

        return Fallback ? <Fallback {...props} /> : null;
      }}
    </Observer>
  );
};

/**
 * Determine what remaining props a component depends upon aside from the
 * sessionUser that requireAuthentication() provides.
 */
type OmitSessionUser<Props> = Pick<Props, Exclude<keyof Props, "sessionUser">>;

export default requireAuthentication;
