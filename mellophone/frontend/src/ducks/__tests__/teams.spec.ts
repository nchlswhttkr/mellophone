import { createStore } from "redux";
import reducer, { appendTeams } from "../teams";
import mock from "../../utils/mock";
import { clearSession } from "../session";

it("Has no teams loaded by default", () => {
  const store = createStore(reducer);

  expect(store.getState().teams).toHaveLength(0);
});

it("Reacts to the session being cleared", () => {
  const store = createStore(reducer, {
    teams: [mock.team()],
  });

  store.dispatch(clearSession());

  expect(store.getState().teams).toHaveLength(0);
});

it("Allows teams to appended", () => {
  const team = mock.team();
  const store = createStore(reducer);

  store.dispatch(appendTeams([team]));

  expect(store.getState().teams).toHaveLength(1);
  expect(store.getState().teams[0]).toEqual(team);
});

it("Does not append duplicate teams", () => {
  const team = mock.team();
  const store = createStore(reducer, {
    teams: [team],
  });

  store.dispatch(appendTeams([team]));

  expect(store.getState().teams).toHaveLength(1);
});
