import React from "react";
import renderer from "react-test-renderer";
import SwipeScreen from "../screens/SwipeScreen.js";

it("SwipeScreen renders without crashing", () => {
  const rendered = renderer.create(<SwipeScreen />).toJSON();
  expect(rendered).toBeTruthy();
});
it("Tests SwipeScreen against snapshot", () => {
  const tree = renderer.create(<SwipeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
