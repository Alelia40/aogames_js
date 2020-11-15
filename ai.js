/**
 * ai.js contains all functions necessary for usage of AI
 * @author Alex Li, Jacob Williams
 */

/**
 * Function that checks a win in all directions
 * @param {*} board 
 */
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
      }
      if (p2count === 4) {
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
      }
      if (p2count === 4) {
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
 * searches 3 spaces from each value in the table in diagonal directions for connect 4
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
 * searches 3 spaces from each value in the table in diagonal directions for possible connect 4 for the opponent, returns location to block
 * @param {*} board 
 */
function checkForBlock(board, currentPlayer) {

  let opposingPlayer = 1; //get the opposing player number
  if (currentPlayer == 1) {
    opposingPlayer = 2;
  }

  let block = null;

  let directions = [[0, -1], [1, 0], [1, -1], [-1, -1]]; //2 diagonal directions, top left to bottom right + top right to bottom left, horizontal left to right and vertical top to bottom
  let currentDirection;
  for (let d = 0; d < 4; d++) {
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
          let space1 = board[i][j];
          let space2 = board[i + slanty][j + slantx];
          let space3 = board[i + (2 * slanty)][j + (2 * slantx)];
          let space4 = board[yend][xend];
          if (space1 == opposingPlayer && space2 == opposingPlayer && space3 == opposingPlayer && space4 == 0) { //if there's a potential win for the opponent then there is danger
            block = [yend, xend]; //column to block
          } else if (space1 == 0 && space2 == opposingPlayer && space3 == opposingPlayer && space4 == opposingPlayer) {
            block = [i, j]; //column to block
          } else if (space1 == opposingPlayer && space2 == 0 && space3 == opposingPlayer && space4 == opposingPlayer) {
            block = [i + slanty, j + slantx]; //column to block
          } else if (space1 == opposingPlayer && space2 == opposingPlayer && space3 == 0 && space4 == opposingPlayer) {
            block = [i + (2 * slanty), j + (2 * slantx)]; //column to block
          }
        }
      }
    }
  }

  if (block != null) { //check that the block we found is in the list of potential moves
    let availableMoves = getAvailableMoves(board);
    let blockIsAvailable = false;
    for (let i = 0; i < availableMoves.length; i++) {
      if (availableMoves[i][0] == block[0] && availableMoves[i][1] == block[1]) {
        blockIsAvailable = true;
      }
    }

    if (!blockIsAvailable) {
      block = null;
    }
  }


  return block;
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
 * helper function for getAvailableMoves that returns the first available move on one column
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
 * Function that runs random moves DEPRECATED
 * @param {*} player 
 * @param {*} board 
 */
function getRandomMove(player, board) {
  let availableMoves = getAvailableMoves(board);
  console.log(availableMoves);

  let randomColumn = availableMoves[Math.floor(Math.random() * availableMoves.length)][1];

  return { column: randomColumn };
}

var MOVES_LEFT = 35; //constant that tracks number of moves left in a decision tree


/**
 * Function that runs moves
 * @param {*} player 
 * @param {*} board 
 */
function getMove(player, board) {

  let block = checkForBlock(board, player); //check for an available block
  if (block != null) {
    return { column: block[1] }; //make the blocking move
  } else { //otherwise find the best move for us

    //find available moves
    let availableMoves = getAvailableMoves(board);

    let bestMove;
    let bestScore = Number.NEGATIVE_INFINITY;
    
    MOVES_LEFT--;
    console.log("depth:" + MOVES_LEFT);

    for (let i = 0; i < availableMoves.length; i++) {
      //evaluate each move with algorithm
      let move = availableMoves[i];

      board[move[0]][move[1]] = player;

      let score = minimaxab(player, board, MOVES_LEFT, true, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);

      //check for imminent danger if doing this move
      if (checkForBlock(board, player) != null) {
        score = Number.NEGATIVE_INFINITY; //if this move will kill us then try to disqualify it
      }

      board[move[0]][move[1]] = 0;

      console.log(move + " - " + score);

      if (score > bestScore) { //if the score is optimal then change the move to the one found
        bestScore = score;
        bestMove = move;
      } else if (score == bestScore) { //favor the middle column if the algorithm determines 2 moves have the same value
        if (move[1] === 3) {
          bestScore = score;
          bestMove = move;
        }
      }
    }

    return { column: bestMove[1] };
  }
}


/**
 * Minimax algorithm
 * @param {*} board 
 * @param {*} depth 
 * @param {*} player 
 */
function minimaxab(playerNo, board, depth, maxplayer, alpha, beta) {
  let winner = checkWinner(board);
  if (depth === 0) {
    return 0;
  }
  if (winner !== null) {
    return heuristicVal(winner, depth, playerNo);
  }

  if (maxplayer) { //maximizingplayer - player1

    let bestScore = Number.NEGATIVE_INFINITY;

    let availableMoves = getAvailableMoves(board);
    let move;
    for (let i = 0; i < availableMoves.length; i++) {
      move = availableMoves[i];

      if (playerNo == 1) {
        board[move[0]][move[1]] = 1;
      } else {
        board[move[0]][move[1]] = 2;
      }

      let score = minimaxab(playerNo, board, depth - 1, false, alpha, beta); //get score for move
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

      if (playerNo == 1) {
        board[move[0]][move[1]] = 1;
      } else {
        board[move[0]][move[1]] = 2;
      }

      let score = minimaxab(playerNo, board, depth - 1, true, alpha, beta);
      board[move[0]][move[1]] = 0;

      bestScore = Math.min(score, bestScore);//compare score to current best

      beta = Math.min(beta, bestScore); //prune
      if (beta <= alpha) {
        break;
      }
    }

    return bestScore;
  }
}


/**
 * helper function to get heuristic values of win states
 * @param {*} winner 
 */
function heuristicVal(winner, depth, playerNo) {
  if (winner == "1") {
    if (playerNo == 1) {
      return depth;
    } else {
      return depth * -7;
    }
  } else if (winner == "2") {
    if (playerNo == 2) {
      return depth;
    } else {
      return depth * -7;
    }
  } else {
    return 0;
  }
}

function prepareResponse(move) {
  const response = `${JSON.stringify(move)}\n`;
  console.log(`Sending response ${response}`);
  return response;
}

module.exports = { getMove, prepareResponse, getAvailableMoves, checkWinner, checkForBlock };
