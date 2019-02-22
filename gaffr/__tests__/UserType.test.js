import React from "react";
import renderer from "react-test-renderer";
import UserType from "../screens/UserType.js";

it("UserType renders without crashing", () => {
  const rendered = renderer.create(<UserType />).toJSON();
  expect(rendered).toBeTruthy();
});
it("Tests UserType against snapshot", () => {
  const tree = renderer.create(<UserType />).toJSON();
  expect(tree).toMatchSnapshot();
});
