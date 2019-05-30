import React from "react";
import { ApplicationStores, StoresContext } from "../stores";
import SessionStore from "../stores/SessionStore";
import TeamStore from "../stores/TeamStore";
import { INetworkLayer, NetworkLayer, NetworkContext } from "../network";
import { render, RenderResult } from "react-testing-library";

export default class TestRenderer {
  component: React.ReactNode;
  stores: Partial<ApplicationStores>;
  network: Partial<INetworkLayer>;

  constructor(component: React.ReactNode) {
    this.component = component;
    this.stores = {};
    this.network = {};
  }

  withStores(stores: Partial<ApplicationStores>): TestRenderer {
    this.stores = stores;
    return this;
  }

  withNetwork(network: Partial<INetworkLayer>): TestRenderer {
    this.network = network;
    return this;
  }

  render(): RenderResult {
    const stores = {
      sessionStore: new SessionStore(),
      teamStore: new TeamStore(),
      ...this.stores,
    };
    const network = {
      ...NetworkLayer,
      ...this.network,
    };

    return render(
      <NetworkContext.Provider value={network}>
        <StoresContext.Provider value={stores}>
          {this.component}
        </StoresContext.Provider>
      </NetworkContext.Provider>
    );
  }
}
