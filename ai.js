
function checkWinner(board) {

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
  if (diagCheck != null) {
    return diagCheck;
  }

  //tie occurs if there are no moves and no winner yet
  if (getAvailableMoves(board).length === 0 && winner != null) {
    return "Tie";
  }

  return null; //if no cases match
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
  let directions = [[1, -1], [-1, -1]]; //2 diagonal directions, top left to bottom right + top right to bottom left
  let currentDirection;
  for (let d = 0; d < 2; d++) {
    //set slant
    currentDirection = directions[d];
    let slantx = currentDirection[0];
    let slanty = currentDirection[1];

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        //set an end coordinate 3 away in a diagonal direction
        let xend = j + (3 * slantx);
        let yend = i + (3 * slanty);

        if (0 <= xend && xend < 7 && 0 <= yend && yend < 6) { //only evaluate the node if we can get a diagonal from that position (not out of bounds)
          let spaceval = board[i][j];
          if (spaceval != 0 && spaceval == board[i + slanty][j + slantx] && spaceval == board[i + (2 * slanty)][j + (2 * slantx)] && spaceval == board[yend][xend]) { //if there's a win then set the winner
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
  let availableMoves = getAvailableMoves(board);

  let bestMove;

  let bestScore;
  if (player == 1) {
    bestScore = Number.NEGATIVE_INFINITY;
  } else {
    bestScore = Number.POSITIVE_INFINITY;
  }


  for (let i = 0; i < availableMoves.length; i++) {
    //evaluate each move with algorithm
    let move = availableMoves[i];

    board[move[0]][move[1]] = 1;
    //let score = minimax(board, 2, player);
    let score = minimaxab(board, (35 - availableMoves.length), player, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    board[move[0]][move[1]] = 0;

    console.log(move + " - " + score);

    //pick best one
    if (player == 1) {
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    } else {
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
  }

  return { column: bestMove[1] };
}


/**
 * Minimax algorithm
 * @param {*} board 
 * @param {*} depth 
 * @param {*} player 
 */
function minimaxab(board, depth, player, alpha, beta) {

  if (depth == 0) {
    return 0;
  }
  let winner = checkWinner(board);
  if (winner !== null) {
    return heuristicVal(winner, depth);
  }

  if (player === 1) { //maximizingplayer - player1

    let bestScore = Number.NEGATIVE_INFINITY;

    let availableMoves = getAvailableMoves(board);
    let move;
    for (let i = 0; i < availableMoves.length; i++) {
      move = availableMoves[i];

      board[move[0]][move[1]] = 1;
      let score = minimaxab(board, depth - 1, 2, alpha, beta);
      board[move[0]][move[1]] = 0;

      bestScore = Math.max(score, bestScore); //compare score to current best

      alpha = Math.max(alpha, bestScore); //prune
      if (alpha >= beta) {
        break;
      }
    }
    
    return bestScore;

  } else { //minimizingplayer - player2

    let bestScore = Number.POSITIVE_INFINITY;

    let availableMoves = getAvailableMoves(board);
    let move;
    for (let i = 0; i < availableMoves.length; i++) {
      move = availableMoves[i];

      board[move[0]][move[1]] = 1;
      let score = minimaxab(board, depth - 1, 1, alpha, beta);
      board[move[0]][move[1]] = 0;

      bestScore = Math.min(score, bestScore);//compare score to current best

      beta = Math.min(beta, bestScore); //prune
      if (beta >= alpha) {
        break;
      }
    }
    
    return bestScore;
  }
}

/**
 * Minimax algorithm
 * @param {*} board 
 * @param {*} depth 
 * @param {*} player 
 */
function minimax(board, depth, player) {
  if(depth == 0) {
    return 0;
  }
  let winner = checkWinner(board);
  if( winner !== null) {
   return heuristicVal(winner, depth, player);
  }

  if(player === 1) { //maximizingplayer - player1
    
    let bestScore = Number.NEGATIVE_INFINITY;

    let availableMoves = getAvailableMoves(board);
    let move;
    for(let i = 0; i < availableMoves.length; i++) {
      move = availableMoves[i];

      board[move[0]][move[1]] = 1;
      let score = minimax(board, depth-1, 2);
      board[move[0]][move[1]] = 0;

      bestScore = Math.max(score, bestScore);
    }

    return bestScore;

  } else { //minimizingplayer - player2
    
    let bestScore = Number.POSITIVE_INFINITY;

    let availableMoves = getAvailableMoves(board);
    let move;
    for(let i = 0; i < availableMoves.length; i++) {
      move = availableMoves[i];

      board[move[0]][move[1]] = 1;
      let score = minimax(board, depth-1, 1);
      board[move[0]][move[1]] = 0;

      bestScore = Math.min(score, bestScore);
    }

    return bestScore;

  }
}

/**
 * helper function to get heuristic values of win states
 * @param {*} winner 
 */
function heuristicVal(winner, depth) {
  if (winner == "1") {
    return depth * 1;
  } else if (winner == "2") {
    return depth * -1;
  } else {
    if(player === 1) {
      return depth / 2;
    } else {
      return (depth / 2) * -1;
    }
  }
}

function prepareResponse(move) {
  const response = `${JSON.stringify(move)}\n`;
  console.log(`Sending response ${response}`);
  return response;
}

module.exports = { getMove, prepareResponse, getAvailableMoves, checkWinner };
