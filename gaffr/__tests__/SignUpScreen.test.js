import React from "react";
import renderer from "react-test-renderer";
import SignUpScreen from "../screens/SignUpScreen.js";

it("SignUpScreen renders without crashing", () => {
  const rendered = renderer.create(<SignUpScreen />).toJSON();
  expect(rendered).toBeTruthy();
});
it("Tests SignUpScreen against snapshot", () => {
  const tree = renderer.create(<SignUpScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
