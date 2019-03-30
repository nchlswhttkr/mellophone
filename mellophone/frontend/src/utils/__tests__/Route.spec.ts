import Route from "../Route";

describe("Utils - Route", () => {
  it("Builds a route to the home page when no chained methods are called", () => {
    const route = new Route().build();
    expect(route).toBe("/");
  });

  it("Builds a nested path when the path() method is called multiple times", () => {
    const route = new Route()
      .path(Route.TEAMS)
      .path("team-id")
      .build();
    expect(route).toBe("/teams/team-id");
  });

  it("Build a path with a query parameter when calling params()", () => {
    const route = new Route()
      .path(Route.MEETINGS)
      .query("tag", "2018-nationals")
      .build();
    expect(route).toBe("/meetings?tag=2018-nationals");
  });
});
