import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../src/screens/Profile';

let props: any;
it('Profile renders without crashing', () => {
  const rendered = renderer.create(<Profile {...props} />).toJSON();
  expect(rendered).toBeTruthy();
});
it('Tests Profile against snapshot', () => {
  const tree = renderer.create(<Profile {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
