import { navigate as reachRouterNavigate } from "@reach/router";

const SIGN_IN = "sign-in";
const ACCOUNT = "account";
const TEAMS = "teams";
const MEETINGS = "meetings";
const NEW = "new";

/**
 * Useful to check whether a given path is known, warning in development.
 *
 * Its use is optional, but suggested since it can give warnings about routing
 * at minimal cost (it minifies to an empty function in production, so it only
 * adds a few bytes).
 */
export function route(path: string): string {
  if (process.env.NODE_ENV !== "production") {
    let knownPaths = [
      `^/$`, // HOME
      `^/${SIGN_IN}$`, // SIGN IN
      `^/${ACCOUNT}$`, // MY ACCOUNT
      `^/${TEAMS}/${NEW}$`, // CREATE TEAM
      `^/${TEAMS}/[0-9]+$`, // VIEWING TEAM
      `^/${TEAMS}/[0-9]+/${MEETINGS}$`, // TEAM MEETINGS
      `^/${TEAMS}/[0-9]+/${MEETINGS}/${NEW}$`, // TEAM MEETINGS
      `^/${MEETINGS}/[0-9]+$`, // MEETING
    ];
    const didMatchPath = knownPaths.map(knownPath => !!path.match(knownPath));
    if (!didMatchPath.includes(true)) {
      console.warn(`Path ${path} doesn't match any known paths, it may 404`);
    }
  }

  return path;
}

/**
 * Navigate to the given path, wrapping the routing library and calling route()
 * to check a path.
 */
export function navigate(path: string): void {
  reachRouterNavigate(route(path));
}
