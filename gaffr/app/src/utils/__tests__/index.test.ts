import { trimMessage } from '..';

describe('trimMessage', () => {
  it('should not alter a message under the character limit', () => {
    const shortMessage = 'hello test';
    expect(trimMessage(shortMessage)).toBe(shortMessage);
  });
  it('should trim down a string over the character limit', () => {
    const longMessage =
      'hello test, this is a long test, that runs over a long line and takes up enough characters';
    // char limit + ...
    expect(trimMessage(longMessage)).toHaveLength(43);
  });
});
