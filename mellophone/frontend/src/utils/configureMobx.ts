import { configure } from "mobx";

/**
 * See https://mobx.js.org/refguide/api.html#configure for more information
 * about configuring MobX.
 */
export default function configureMobx() {
  configure({
    enforceActions: "observed",
  });
}
