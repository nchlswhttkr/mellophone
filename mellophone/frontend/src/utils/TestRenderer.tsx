import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import thunk from "redux-thunk";

import { INetworkLayer, NetworkLayer, NetworkContext } from "../network";
import { IUser } from "../types";
import mock from "./mock";
import rootReducer, { AppState } from "../ducks";
import { setSessionUser } from "../ducks/session";

/**
 * When testing larger and more complex components, mocking dependencies like
 * network requests and data stores is usually necessary to assert behaviour in
 * a given scenario.
 *
 * TestRenderer provides this with builder syntax.
 */
export default class TestRenderer {
  stores: Partial<AppState>;
  network: INetworkLayer;
  user?: IUser;

  constructor() {
    this.stores = {};
    this.network = Object.assign({}, NetworkLayer);
  }

  withStores(stores: Partial<AppState>): TestRenderer {
    Object.assign(this.stores, stores);
    return this;
  }

  withNetwork(network: Partial<INetworkLayer>): TestRenderer {
    Object.assign(this.network, network);
    return this;
  }

  /**
   * Useful for avoiding the boilerplate of mocking an authenticated user.
   * @param user The user to sign in as, defaults to a simple mock user
   */
  asAuthenticatedUser(user: IUser = mock.user()): TestRenderer {
    this.user = user;
    return this;
  }

  render(component: React.ReactNode) {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    if (this.user) {
      store.dispatch(setSessionUser(this.user));
    }
    return {
      ...render(
        <NetworkContext.Provider value={this.network}>
          <Provider store={store}>{component}</Provider>
        </NetworkContext.Provider>
      ),
      store,
    };
  }
}
