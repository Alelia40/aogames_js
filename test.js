const ai = require('./ai');

test('returns a valid response', () => {
  expect(ai.prepareResponse({column: 1})).toEqual(`{"column":1}\n`)
});

test('edge case for next available moves', () => {
  expect(ai.getAvailableMoves([[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1]])).toEqual([]);
})

test('horizontalwin check', () => {
  expect(ai.checkWinner([[1,1,1,1,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]])).toEqual("1");
})

test('horizontal check #2', () => {
  expect(ai.checkWinner([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,2,2,2,2],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]])).toEqual("2");
})
test('horizontal check #3', () => {
  expect(ai.checkWinner([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,2,2,2,1],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]])).toEqual(null);
})
test('horizontal check #2', () => {
  expect(ai.checkWinner([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[2,1,2,1,2,1,2],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]])).toEqual(null);
})
test('horizontal check #2', () => {
  expect(ai.checkWinner([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,2,1,2,2],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]])).toEqual(null);
})


test('verticalwin check', () => {
  expect(ai.checkWinner([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,0,0,0,0,0,0],[1,0,0,0,0,0,0],[1,0,0,0,0,0,0],[1,0,0,0,0,0,0]])).toEqual("1");
})

test('verticalwin check #2', () => {
  expect(ai.checkWinner([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,2,0,0,0,0,0],[0,2,0,0,0,0,0],[0,2,0,0,0,0,0],[0,2,0,0,0,0,0]])).toEqual("2");
})
test('verticalwin check #3', () => {
  expect(ai.checkWinner([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,2,2,2,1],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]])).toEqual(null);
})

test('diagonalwin check', () => {
  expect(ai.checkWinner([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,0,0,2,0,0,0],[1,0,2,0,0,0,0],[1,2,0,0,0,0,0],[2,0,0,0,0,0,0]])).toEqual("2");
})

test('diagonalwin check', () => {
  expect(ai.checkWinner([[2,2,2,2,2,2,2],[2,2,2,2,2,2,2],[2,2,2,2,2,2,2],[2,2,2,2,2,2,2],[2,2,2,2,2,2,2],[2,2,2,2,2,2,2]])).toEqual("2");
})

test('diagonalwin check #2', () => {
  expect(ai.checkWinner([[1,0,0,0,0,0,0],[0,1,0,0,0,0,0],[0,1,1,0,0,0,0],[0,0,0,1,0,0,0],[0,2,0,0,2,2,0],[0,2,0,0,0,0,2]])).toEqual("1");
})
test('diagonalwin check #3', () => {
  expect(ai.checkWinner([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,2,2,2,1],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]])).toEqual(null);
})

test('block check h', () => {
  expect(ai.checkForBlock([[0,1,1,1,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]], 2)).toEqual(null);
})

test('block check h 2', () => {
  expect(ai.checkForBlock([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,0,2,2,2],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]], 2)).toEqual(null);
})
test('block check h 3', () => {
  expect(ai.checkForBlock([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,2,2,2,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]], 1)).toEqual(null);
})


test('vertical block check', () => {
  expect(ai.checkForBlock([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,0,0,0,0,0,0],[1,0,0,0,0,0,0],[1,0,0,0,0,0,0]], 2)).toEqual([2,0]);
})

test('vertical block check #2', () => {
  expect(ai.checkForBlock([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,2,0,0,0,0,0],[0,2,0,0,0,0,0],[0,2,0,0,0,0,0]], 1)).toEqual([2,1]);
})

test('diagonal block check', () => {
  expect(ai.checkForBlock([[2,0,0,2,0,0,0],[1,0,0,1,0,0,0],[1,0,0,1,0,0,0],[1,1,0,1,0,0,0],[2,2,0,2,0,0,0],[2,2,0,1,0,0,0]], 2)).toEqual(null);
})
