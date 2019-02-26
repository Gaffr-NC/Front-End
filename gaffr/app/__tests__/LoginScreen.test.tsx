import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../src/screens/LoginScreen';

let props: any;
it('LoginScreen renders without crashing', () => {
  const rendered = renderer.create(<LoginScreen {...props} />).toJSON();
  expect(rendered).toBeTruthy();
});
it('Tests LoginScreen against snapshot', () => {
  const tree = renderer.create(<LoginScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
