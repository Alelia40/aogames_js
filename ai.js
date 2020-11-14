
function checkWinner(board) {
 //how do?
 let winner = "";

 //tie occurs if there are no moves and no winner yet
 if(getAvailableMoves(board).length == 0 && winner == "") {
  return "Tie";
 }
}

/**
 * helper function that checks for a win horizontally
 * @param {*} board 
 */
function checkForHorizontalWin(board) {
  let p1count = 0;
  let p2count = 0;
  for( let i = 5; i >= 0; i--) {
    for(let j = 0; j < 7; j++) {
      //increment counters for each element checked on the row
      if(board[i][j] == 1) {
        p2count = 0;
        p1count++;
      } else if (board[i][j] == 2) {
        p1count = 0;
        p2count++;
      } else {
        p2count = 0;
        p1count = 0;
      }

      //if there is 4 then return a win
      if(p1count == 4) {
        return "1";
      } else if(p2count === 4) {
        return "2";
      }
    }

    //reset counts before changing rows
    p1count = 0;
    p2count = 0;
  }

  return null; //if no win found
}

/**
 * function that finds all available next moves for a given board state
 * @param {*} board 
 */
function getAvailableMoves(board) {
  let availableMoves = [];
  let move;
  for( let i = 0; i < 7 ; i++) {
    move = columnMove(board, i);
    if(move !== null) {
      availableMoves.push(move);
    }
  }

  return availableMoves;
}

/**
 * helper function that returns the first available move on one column
 * @param {*} board 
 * @param {*} column 
 */
function columnMove(board, column) {

  for( let i = 5; i >= 0; i--) {
    if(board[i][column] === 0) {
      return [i, column];
    }
  }

  return null;
}

function getMove(player, board) {
  // TODO: Determine valid moves
  // TODO: Calculate best move
  //console.log(player);
  //console.log(board);

  //find available moves
  let availableMoves = getAvailableMoves(board);
  console.log(availableMoves);

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

module.exports = { getMove, prepareResponse, getAvailableMoves, checkForHorizontalWin };
