import React from "react";
import { render } from "react-testing-library";
import { ApplicationStores, StoresContext } from "../stores";

export function renderWithStores(
  children: React.ReactNode,
  stores: Partial<ApplicationStores>
) {
  return render(
    <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
  );
}
