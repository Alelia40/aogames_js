const ai = require('./ai');

test('returns a valid response', () => {
  expect(ai.prepareResponse({column: 1})).toEqual(`{"column":1}\n`)
});

test('edge case for next available moves', () => {
  expect(ai.getAvailableMoves([[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1]])).toEqual([]);
})
