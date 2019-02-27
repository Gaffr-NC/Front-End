import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../src/screens/Loading';

let props: any;
it('Loading renders without crashing', () => {
  const rendered = renderer.create(<Loading {...props} />).toJSON();
  expect(rendered).toBeTruthy();
});
it('Tests Loading against snapshot', () => {
  const tree = renderer.create(<Loading {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
