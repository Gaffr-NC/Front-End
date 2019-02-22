import React from "react";
import renderer from "react-test-renderer";
import PropertyScreen from "../screens/PropertyScreen";

it("PropertyScreen renders without crashing", () => {
  const rendered = renderer.create(<PropertyScreen />).toJSON();
  expect(rendered).toBeTruthy();
});
it("Tests PropertyScreen against snapshot", () => {
  const tree = renderer.create(<PropertyScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
