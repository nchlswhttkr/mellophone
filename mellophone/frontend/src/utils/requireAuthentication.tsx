import React from "react";
import { useSelector } from "react-redux";

import Route from "./Route";
import { AppState } from "../ducks";

/**
 * A HOC (https://reactjs.org/docs/higher-order-components.html) that enforces
 * authentication on page components before rendering them.
 *
 * If a user is not authenticated, they will be redirected to sign in or shown
 * the <Fallback/> if it is provided.
 *
 * If a user is authenticated, the <Child/> will be rendered.
 *
 * If you need to provide path parameters (eg "/teams/:teamId"), you can pass
 * an object into the WrappedComponentProps generic.
 */
function requireAuthentication<WrappedComponentProps = {}>(
  Child: React.ComponentType<WrappedComponentProps>,
  Fallback?: React.ComponentType<WrappedComponentProps>
) {
  return (props: WrappedComponentProps) => {
    const user = useSelector((state: AppState) => state.session.user);

    React.useEffect(() => {
      if (!user && !Fallback) {
        new Route(Route.SIGN_IN).navigate();
      }
    }, [user]);

    if (user) {
      return <Child {...props} />;
    }

    return Fallback ? <Fallback {...props} /> : null;
  };
}

export default requireAuthentication;
