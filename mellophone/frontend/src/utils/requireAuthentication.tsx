import React from "react";
import { autorun } from "mobx";
import { RouteComponentProps } from "@reach/router";
import { observer } from "mobx-react-lite";

import Route from "./Route";
import { StoresContext } from "../stores";

/**
 * A HOC (https://reactjs.org/docs/higher-order-components.html) that enforces
 * authentication on page components before rendering them.
 *
 * If a user is not authenticated, they will be redirected to sign in or shown
 * the <Fallback/> if it is provided.
 *
 * If a user is authenticated, the <Child/> will be rendered.
 */
function requireAuthentication<
  RouteProps extends RouteComponentProps = RouteComponentProps
>(Child: React.ElementType, Fallback?: React.ElementType) {
  return observer((props: RouteProps) => {
    const { sessionStore } = React.useContext(StoresContext);

    React.useEffect(() => {
      // If a user is/becomes anonymous, redirect them to sign in
      return autorun(() => {
        if (!sessionStore.user.get() && !Fallback) {
          new Route(Route.SIGN_IN).navigate();
        }
      });
    }, [sessionStore]);

    if (sessionStore.user.get()) {
      return <Child {...props} />;
    }

    return Fallback ? <Fallback {...props} /> : null;
  });
}

export default requireAuthentication;
