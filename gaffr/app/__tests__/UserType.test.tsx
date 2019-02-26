import React from 'react';
import renderer from 'react-test-renderer';
import UserType from '../src/screens/UserType';

let props: any;

it('UserType renders without crashing', () => {
  const rendered = renderer.create(<UserType {...props} />).toJSON();
  expect(rendered).toBeTruthy();
});
it('Tests UserType against snapshot', () => {
  const tree = renderer.create(<UserType {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
