function checkWinner() {
 //how do?
}

function getAvailableMoves(board) {
  let availableMoves = [];
  let move;
  for( let i = 0; i < 7 ; i++) {
    move = columnMove(i);
    if(move != [-1, -1]) {
      availableMoves.push(move);
    }
  }

  return availableMoves;
}

function columnMove(column) {

  for( let i = 0; i < 6; i++) {
    if(board[i][column] === 0) {
      return [i, column];
    }
  }

  return [-1, -1];
}

function getMove(player, board) {
  // TODO: Determine valid moves
  // TODO: Calculate best move
  console.log(player);
  console.log(board);

  console.log(getAvailableMoves(board));

  //find available moves

  //loop through and find scores using algorithm

  //pick best one

  return {column: 1};
}

function prepareResponse(move) {
  const response = `${JSON.stringify(move)}\n`;
  console.log(`Sending response ${response}`);
  return response;
}

module.exports = { getMove, prepareResponse };
