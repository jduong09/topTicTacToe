/*
  1. Game object needs two players, it needs a board object.
  2. Needs a variable to know whose turn it is.
  

  Game Walkthrough
  Game decides who will go first, either player 1 or player 2.
  Game console.logs whose turn it is.
  User selects spot on board to place marker.
  Game checks if spot is valid.
  If spot is valid, game updates board.
  If spot is invalid, game does nothing but notifies that user's input is incorrect.
  After updating board, game checks if game is over.
  If game is not over, then game ends round and goes to next turn.
*/

const playerFactory = (name, marker) => {
  const _name = name;
  const _marker = marker;

  return { _name, _marker };
}

const gameBoard = () => {
  let _board = ['', '', '', '', '', '', '', '', ''];

  const displayBoard = () => {
    // Display board on browser.
    console.log(_board);
  }

  const updateBoard = (marker, location) => {
    // Place player marker on board
    const spanGameTile = document.querySelector(`.game-tile[data-pos="${location}"]`);

    const arraySplitLocation = location.split(' ').map(string => parseInt(string));
    _board[arraySplitLocation[0] * 3 + arraySplitLocation[1]] = marker;

    spanGameTile.innerHTML = marker;
    console.log(_board);
  }

  const resetBoard = () => {
    _board = ['', '', '', '', '', '', '', '', ''];
  }

  const gameOver = () => {
    /*
    [] [] []
    [] [] []
    [] [] []
    */
    // function to check if game is over.
    for (let i = 0; i < _board.length; i++) {
      const marker = _board[i];
      if (marker === '') {
        continue;
      }

      if (i === 0) {
        if (_board[1] === marker && _board[2] === marker) {
          return true;
        } else if (_board[3] === marker && _board[6] === marker) {
          return true;
        } else if (_board[4] === marker && _board[8] === marker) {
          return true;
        }
      } else if (i === 1) {
        if (_board[0] === marker && _board[2] === marker) {
          return true;
        } else if (_board[4] === marker && _board[7] === marker) {
          return true;
        }
      } else if (i === 2) {
        if (_board[0] === marker && _board[1] === marker) {
          return true;
        } else if (_board[4] === marker && _board[6] === marker) {
          return true;
        } else if (_board[5] === marker && _board[7] === marker) {
          return true;
        }
      } else if (i === 3) {
        if (_board[0] === marker && _board[6] === marker) {
          return true;
        } else if (_board[4] === marker && _board[5] === marker) {
          return true;
        }
      } else if (i === 4) {
        if (_board[0] === marker && _board[8] === marker) {
          return true;
        } else if (_board[1] === marker && _board[7] === marker) {
          return true;
        } else if (_board[2] === marker && _board[6] === marker) {
          return true;
        } else if (_board[3] === marker && _board[5] === marker) {
          return true;
        }
      } else if (i === 5) {
        if (_board[2] === marker && _board[8] === marker) {
          return true;
        } else if (_board[3] === marker && _board[4] === marker) {
          return true;
        }
      } else if (i === 6) {
        if (_board[0] === marker && _board[3] === marker) {
          return true;
        } else if (_board[4] === marker && _board[2] === marker) {
          return true;
        } else if (_board[7] === marker && _board[8] === marker) {
          return true;
        }
      } else if (i === 7) {
        if (_board[6] === marker && _board[8] === marker) {
          return true;
        } else if (_board[1] === marker && _board[4] === marker) {
          return true;
        }
      } else if (i === 8) {
        if (_board[0] === marker && _board[4] === marker) {
          return true;
        } else if (_board[2] === marker && _board[5] === marker) {
          return true;
        } else if (_board[6] === marker && _board[7] === marker) {
          return true;
        }
      }
    }

    // Check if board is completely filled up.
   

    return false;
  }

  return { displayBoard, updateBoard, resetBoard, gameOver };
};

const game = () => {
  const _playerOne = playerFactory('Justin', 'X');
  const _playerTwo = playerFactory('Dustin', 'O');
  const board = gameBoard();
  const btnPlayAgain = document.getElementById('btn-play-again');
  const gameOverDiv = document.getElementById('div-game-over-message');
  const currentPlayerTurn = document.getElementById('div-current-player-turn');
  let playersTurn;


  // private methods for game object
  const switchTurns = () => {
    playersTurn = (playersTurn === _playerOne) ? _playerTwo : _playerOne;
    currentPlayerTurn.innerHTML = `${playersTurn._name} turn!`;
  }

  const randomizeCurrentTurn = () => {
    // Compute random number, either 0 or 1 for which player will go first.
    const randomNumber = (Math.floor(Math.random() * (1 - 0 + 1)) + 0 === 0) ? 0 : 1;
    playersTurn = (randomNumber === 0) ? _playerOne : _playerTwo;
  }

  const setCurrentPlayer = () => {
    // Prompt user to pick a spot.
    currentPlayerTurn.innerHTML = `${playersTurn._name} turn!`;
  }

  const placeMarker = (stringPos) => {
    board.updateBoard(playersTurn._marker, stringPos)
  }

  // Public Methods for game object
  const gameStart = () => {
    randomizeCurrentTurn();
    setCurrentPlayer();
  }

  const displayErrorMessage = () => {
    console.log('User choice is invalid, choose again.');
  }

  const computeTurn = (stringPos) => {
    placeMarker(stringPos);

    if (board.gameOver() === true) {
      // Game is over, unhide game over div to show game over message.
      gameOverDiv.innerHTML = `${playersTurn._name} wins!`;
      gameOverDiv.classList.remove('hide');

      // Hide whose turn it is.
      currentPlayerTurn.classList.add('hide');
      // Unhide play again button.
      btnPlayAgain.classList.remove('hide');
    } else {
      switchTurns();
      setCurrentPlayer();
    }
  }

  const resetGame = () => {
    // Reset Game Function
    // reset board array
    board.resetBoard();
    // Hide Play Again button
    btnPlayAgain.classList.add('hide');
    // Hide Game Over Div
    gameOverDiv.classList.add('hide');
    // Randomize player turn
    randomizeCurrentTurn();
    setCurrentPlayer();
    // Unhide player turn div
    currentPlayerTurn.classList.remove('hide');
  }

  return { gameStart, displayErrorMessage, computeTurn, resetGame };
}

const setTileListeners = (gameState) => {
  const spanTiles = document.getElementsByClassName('game-tile');

  for (let i = 0; i < spanTiles.length; i++) {
    const spanTile = spanTiles[i];

    spanTile.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.currentTarget.innerHTML) {
        gameState.displayErrorMessage();
      } else {
        gameState.computeTurn(e.currentTarget.getAttribute('data-pos'));
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btnPlayAgain = document.getElementById('btn-play-again');
  const gameState = game();

  setTileListeners(gameState);

   // Btn Game Over Event Listener
   btnPlayAgain.addEventListener('click', (e) => {
    e.preventDefault();
    const spanTiles = document.getElementsByClassName('game-tile');
    
    gameState.resetGame();

    for (let i = 0; i < spanTiles.length; i++) {
      const spanTile = spanTiles[i];
      spanTile.innerHTML = '';
    }
  });

  gameState.gameStart();
});