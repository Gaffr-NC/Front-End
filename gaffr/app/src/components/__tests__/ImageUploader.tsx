// components/__tests__/Hello.tsx
import React from 'react';
import renderer from 'react-test-renderer';

import ImageUploader from '../ImageUploader';

it('renders correctly with defaults', () => {
  const addImage = (img: string) => img;
  const uploader = renderer
    .create(<ImageUploader addImage={addImage} />)
    .toJSON();
  expect(uploader).toMatchSnapshot();
});
