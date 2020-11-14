
function checkWinner(board) {
 //how do?
 let winner = "";

 if(getAvailableMoves(board).length == 0 && winner == "") {
  return "Tie";
 }
}

function getAvailableMoves(board) {
  let availableMoves = [];
  let move;
  for( let i = 0; i < 7 ; i++) {
    move = columnMove(board, i);
    if(move != [-1, -1]) {
      availableMoves.push(move);
    }
  }

  return availableMoves;
}

function columnMove(board, column) {

  for( let i = 5; i >= 0; i--) {
    if(board[i][column] === 0) {
      return [i, column];
    }
  }

  return [-1, -1];
}

function getMove(player, board) {
  // TODO: Determine valid moves
  // TODO: Calculate best move
  //console.log(player);
  //console.log(board);

  //find available moves
  let availableMoves = getAvailableMoves(board);

  let randomColumn = availableMoves[Math.floor(Math.random() * availableMoves.length)][1];

  //loop through and find scores using algorithm

  //pick best one

  return {column: randomColumn};
}

function prepareResponse(move) {
  const response = `${JSON.stringify(move)}\n`;
  console.log(`Sending response ${response}`);
  return response;
}

module.exports = { getMove, prepareResponse };
