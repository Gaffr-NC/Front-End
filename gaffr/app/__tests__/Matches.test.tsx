import React from 'react';
import renderer from 'react-test-renderer';
import Matches from '../src/screens/Matches';

it('Matches renders without crashing', () => {
  const rendered = renderer.create(<Matches />).toJSON();
  expect(rendered).toBeTruthy();
});

it('Tests Matches against snapshot', () => {
  const tree = renderer.create(<Matches />).toJSON();
  expect(tree).toMatchSnapshot();
});
