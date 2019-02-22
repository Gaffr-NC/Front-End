import React from "react";
import renderer from "react-test-renderer";
import Home from "../screens/Home";

it("Home renders without crashing", () => {
  const rendered = renderer.create(<Home />).toJSON();
  expect(rendered).toBeTruthy();
});
it("Tests Home against snapshot", () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});
