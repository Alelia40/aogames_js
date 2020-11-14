
function checkWinner(board) {
  let winner = null;

  //check horizontal and vertical for win
  let horizontalCheck = checkForHorizontalWin(board);
  if (horizontalCheck != null) {
    return horizontalCheck;
  }

  let verticalCheck = checkForVerticalWin(board);
  if (verticalCheck != null) {
    return verticalCheck;
  }

  //check diagonal for win
  let diagCheck = checkForDiagonalWin(board);
  if(diagCheck != null) {
    return diagCheck;
  }

  //tie occurs if there are no moves and no winner yet
  if (getAvailableMoves(board).length === 0 && winner != null) {
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
  for (let i = 5; i >= 0; i--) {
    for (let j = 0; j < 7; j++) {
      //increment counters for each element checked on the row
      if (board[i][j] == 1) {
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
      if (p1count === 4) {
        return "1";
      } else if (p2count === 4) {
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
 * function that checks for a win vertically
 * @param {*} board 
 */
function checkForVerticalWin(board) {
  let p1count = 0;
  let p2count = 0;
  for (let j = 0; j < 7; j++) {
    for (let i = 0; i < 6; i++) {

      //increment counters for each element checked on the column
      if (board[i][j] == 1) {
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
      if (p1count === 4) {
        return "1";
      } else if (p2count === 4) {
        return "2";
      }
    }

    //reset counts before changing columns
    p1count = 0;
    p2count = 0;
  }

  return null;
}

/**
 * searches 3 spaces from each value in the table in horizontal directions for connect 4
 * @param {*} board 
 */
function checkForDiagonalWin(board) {
  let winner = null;
  let directions = [[1,-1],[-1,-1]]; //2 diagonal directions, top left to bottom right + top right to bottom left
  let currentDirection;
  for(let d = 0; d < 2; d++) {
    //set slant
    currentDirection = directions[d];
    let slantx = currentDirection[0];
    let slanty = currentDirection[1];

    for(let i = 0; i < 6; i++) {
      for(let j = 0; j < 7; j++) {
        //set an end coordinate 3 away in a diagonal direction
        let xend = j + (3*slantx);
        let yend = i + (3*slanty); 

        if(0 <= xend && xend < 7 && 0 <= yend && yend < 6 ) { //only evaluate the node if we can get a diagonal from that position (not out of bounds)
          let spaceval = board[i][j]; 
          if( spaceval != 0  && spaceval == board[i + slanty][j + slantx] && spaceval == board[i + (2*slanty)][j + (2*slantx)] && spaceval == board[yend][xend] ){ //if there's a win then set the winner
            winner = spaceval.toString();
          }
        } 
      }
    }
  }

  return winner;
}


/**
 * function that finds all available next moves for a given board state
 * @param {*} board 
 */
function getAvailableMoves(board) {
  let availableMoves = [];
  let move;
  for (let i = 0; i < 7; i++) {
    move = columnMove(board, i);
    if (move !== null) {
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

  for (let i = 5; i >= 0; i--) {
    if (board[i][column] === 0) {
      return [i, column];
    }
  }

  return null;
}


/**
 * Function that runs random moves
 * @param {*} player 
 * @param {*} board 
 */
function getRandomMove(player, board) {
  // TODO: Determine valid moves
  // TODO: Calculate best move
  //console.log(player);
  //console.log(board);

  //find available moves
  let availableMoves = getAvailableMoves(board);
  console.log(availableMoves);

  let randomColumn = availableMoves[Math.floor(Math.random() * availableMoves.length)][1];

  return { column: randomColumn };
}

/**
 * Function that runs moves
 * @param {*} player 
 * @param {*} board 
 */
function getMove(player, board) {
  
  //find available moves

  //evaluate each with algorithm

  //pick best one

  return { column: 1 };
}

function prepareResponse(move) {
  const response = `${JSON.stringify(move)}\n`;
  console.log(`Sending response ${response}`);
  return response;
}

module.exports = { getMove, prepareResponse, getAvailableMoves, checkWinner };
