import React from 'react';
import renderer from 'react-test-renderer';
import PropertyScreen from '../src/screens/PropertyScreen';

let props: any;

it('PropertyScreen renders without crashing', () => {
  const rendered = renderer.create(<PropertyScreen {...props} />).toJSON();
  expect(rendered).toBeTruthy();
});
it('Tests PropertyScreen against snapshot', () => {
  const tree = renderer.create(<PropertyScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
