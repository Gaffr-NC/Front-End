import React from "react";
import renderer from "react-test-renderer";
import LoginScreen from "../screens/LoginScreen";

it("LoginScreen renders without crashing", () => {
  const rendered = renderer.create(<LoginScreen />).toJSON();
  expect(rendered).toBeTruthy();
});
it("Tests LoginScreen against snapshot", () => {
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
