import { navigate } from "@reach/router";

/**
 * This is used to build routes as needed through the application. When built
 * with no arguments, it will default to the home page.
 *
 * This could probably be a simple function but this was too much fun to write.
 */
export default class Route {
  private paths: Array<string | number>;
  private queries: Array<string>;

  constructor(...paths: Array<string | number>) {
    this.paths = paths;
    this.queries = [];
  }

  path(path: string): Route {
    this.paths.push(path);
    return this;
  }

  query(query: string, value: string): Route {
    this.queries.push(`${query}=${value}`);
    return this;
  }

  build(): string {
    let route = `/${this.paths.join("/")}`;
    if (this.queries.length > 0) {
      route += `?${this.queries.join("&")}`;
    }
    return route;
  }

  // deprecated name, prefer this.navigate()
  buildAndNavigate(): void {
    this.navigate();
  }

  navigate(): void {
    navigate(this.build());
  }

  static SIGN_IN = "sign-in";
  static ACCOUNT = "account";
  static TEAMS = "teams";
  static MEMBERS = "members";
  static MEETINGS = "meetings";
  static NEW = "new";
}
