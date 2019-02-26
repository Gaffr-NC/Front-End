// components/__tests__/Hello.tsx
import React from 'react';
import renderer from 'react-test-renderer';

import { MatchItem } from '../MatchItem';

it('renders correctly with defaults', () => {
  const userType = 'tenants';
  const match = {
    landlordId: 'landlordTest',
    tenantId: 'tenantTest',
    chatHistory: [
      {
        speaker: 'landlords',
        message: 'first',
        timestamp: Date.now(),
        blocked: false
      }
    ]
  };
  const item = renderer
    .create(<MatchItem userType={userType} match={match} />)
    .toJSON();
  expect(item).toMatchSnapshot();
});
