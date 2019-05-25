import React from "react";
import { render } from "react-testing-library";
import { ApplicationStores, StoresContext } from "../stores";
import SessionStore from "../stores/SessionStore";
import TeamStore from "../stores/TeamStore";

export function renderWithStores(
  children: React.ReactNode,
  stores: Partial<ApplicationStores>
) {
  const value = {
    sessionStore: new SessionStore(),
    teamStore: new TeamStore(),
    ...stores,
  };
  return render(
    <StoresContext.Provider value={value}>{children}</StoresContext.Provider>
  );
}
