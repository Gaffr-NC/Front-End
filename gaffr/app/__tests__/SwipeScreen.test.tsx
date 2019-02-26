import React from 'react';
import renderer from 'react-test-renderer';
import SwipeScreen from '../src/screens/SwipeScreen';
let props: any;
it('SwipeScreen renders without crashing', () => {
  const rendered = renderer.create(<SwipeScreen {...props} />).toJSON();
  expect(rendered).toBeTruthy();
});
it('Tests SwipeScreen against snapshot', () => {
  const tree = renderer.create(<SwipeScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
