import { createStore } from "redux";
import reducer, {
  setTeamsPending,
  setTeamsFulfilled,
  setTeamsRejected,
  loadTeamsThunk,
} from "../teams";
import mock from "../../utils/mock";
import { clearSession } from "../session";

it("Is in a pending state by default", () => {
  const store = createStore(reducer);

  expect(store.getState().status).toBe("pending");
});

it("Sets the reducer to a pending state when it was previously errored", () => {
  const store = createStore(reducer, {
    status: "rejected",
    teams: [],
    error: new Error(),
  });

  store.dispatch(setTeamsPending());

  expect(store.getState().status).toBe("pending");
  expect(store.getState().error).toBe(undefined);
});

it("Sets the reducer to a pending state when it was previously fulfilled", () => {
  const store = createStore(reducer, {
    status: "fulfilled",
    teams: [mock.team()],
    error: undefined,
  });

  store.dispatch(setTeamsPending());

  expect(store.getState().status).toBe("pending");
  expect(store.getState().teams).toHaveLength(0);
});

it("Sets the reducer to fulfilled", () => {
  const store = createStore(reducer);
  const teams = [mock.team()];

  store.dispatch(setTeamsFulfilled(teams));

  expect(store.getState().status).toBe("fulfilled");
  expect(store.getState().teams).toEqual(teams);
});

it("Sets the reducer to rejected", () => {
  const store = createStore(reducer);

  store.dispatch(setTeamsRejected(new Error("Something went wrong")));

  expect(store.getState().status).toBe("rejected");
  expect(store.getState().error!.message).toBe("Something went wrong");
});

it("Reacts to the session being cleared", () => {
  const store = createStore(reducer, {
    status: "fulfilled",
    teams: [mock.team()],
    error: undefined,
  });

  store.dispatch(clearSession());

  expect(store.getState().status).toBe("pending");
  expect(store.getState().teams).toHaveLength(0);
});

it("loadTeamsThunk() - Dispatches a pending and fulfilled action on green path", async () => {
  const dispatch = jest.fn();
  const teams = [mock.team()];
  const expectedPendingAction = setTeamsPending();
  const expectedFulfilledAction = setTeamsFulfilled(teams);

  await loadTeamsThunk(Promise.resolve(teams))(dispatch);

  expect(dispatch).toBeCalledTimes(2);
  expect(dispatch.mock.calls[0]).toEqual([expectedPendingAction]);
  expect(dispatch.mock.calls[1]).toEqual([expectedFulfilledAction]);
});

it("loadTeamsThunk() - Dispatches a pending and rejected action on red path", async () => {
  const dispatch = jest.fn();
  const error = new Error("Something went wrong");
  const expectedPendingAction = setTeamsPending();
  const expectedRejectedAction = setTeamsRejected(error);

  await loadTeamsThunk(Promise.reject(error))(dispatch);

  expect(dispatch).toBeCalledTimes(2);
  expect(dispatch.mock.calls[0]).toEqual([expectedPendingAction]);
  expect(dispatch.mock.calls[1]).toEqual([expectedRejectedAction]);
});
