import React from 'react';
import renderer from 'react-test-renderer';
import SignUpScreen from '../src/screens/SignUpScreen.js';

let props: any;

it('SignUpScreen renders without crashing', () => {
  const rendered = renderer.create(<SignUpScreen {...props} />).toJSON();
  expect(rendered).toBeTruthy();
});
it('Tests SignUpScreen against snapshot', () => {
  const tree = renderer.create(<SignUpScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
