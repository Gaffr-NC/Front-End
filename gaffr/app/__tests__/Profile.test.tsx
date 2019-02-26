import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../src/screens/Profile';

it('Profile renders without crashing', () => {
  const rendered = renderer.create(<Profile />).toJSON();
  expect(rendered).toBeTruthy();
});
it('Tests Profile against snapshot', () => {
  const tree = renderer.create(<Profile />).toJSON();
  expect(tree).toMatchSnapshot();
});
