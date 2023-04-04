const playerFactory = (name, marker) => {
  const _name = name;
  const _marker = marker;

  return { _name, _marker };
}

const gameBoard = () => {
  let _board = ['', '', '', '', '', '', '', '', ''];

  const updateBoard = (marker, location) => {
    // Place player marker on board
    const spanGameTile = document.querySelector(`.game-tile[data-pos="${location}"]`);

    const arraySplitLocation = location.split(' ').map(string => parseInt(string));
    _board[arraySplitLocation[0] * 3 + arraySplitLocation[1]] = marker;

    spanGameTile.innerHTML = marker;
  }

  const resetBoard = () => {
    _board = ['', '', '', '', '', '', '', '', ''];
  }

  const gameOver = (currentPlayerTurn) => {
    // for loop to check if game has a winner.
    for (let i = 0; i < _board.length; i++) {
      const marker = _board[i];
      if (marker === '') {
        continue;
      }

      if (i === 0) {
        if (_board[1] === marker && _board[2] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        } else if (_board[3] === marker && _board[6] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        } else if (_board[4] === marker && _board[8] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        }
      } else if (i === 1) {
        if (_board[0] === marker && _board[2] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        } else if (_board[4] === marker && _board[7] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        }
      } else if (i === 2) {
        if (_board[0] === marker && _board[1] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        } else if (_board[4] === marker && _board[6] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        } else if (_board[5] === marker && _board[7] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        }
      } else if (i === 3) {
        if (_board[0] === marker && _board[6] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        } else if (_board[4] === marker && _board[5] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        }
      } else if (i === 4) {
        if (_board[0] === marker && _board[8] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        } else if (_board[1] === marker && _board[7] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        } else if (_board[2] === marker && _board[6] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        } else if (_board[3] === marker && _board[5] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        }
      } else if (i === 5) {
        if (_board[2] === marker && _board[8] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        } else if (_board[3] === marker && _board[4] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        }
      } else if (i === 6) {
        if (_board[0] === marker && _board[3] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        } else if (_board[4] === marker && _board[2] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        } else if (_board[7] === marker && _board[8] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        }
      } else if (i === 7) {
        if (_board[6] === marker && _board[8] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        } else if (_board[1] === marker && _board[4] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        }
      } else if (i === 8) {
        if (_board[0] === marker && _board[4] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        } else if (_board[2] === marker && _board[5] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        } else if (_board[6] === marker && _board[7] === marker) {
          return `${currentPlayerTurn._name} wins!`;
        }
      }
    }
    // Check if board is completely filled up. DRAW, end of game.
    for (let j = 0; j < _board.length; j++) {
      if (j === 8 && _board[j] !== '') return 'Game Draw!';

      if (_board[j] === '') break;
    }
    // If there is not a winner and we have reached this line of code, return false and game continues.
    return false;
  }

  return { updateBoard, resetBoard, gameOver };
};

const game = () => {
  const _playerOne = playerFactory('Justin', 'X');
  const _playerTwo = playerFactory('Dustin', 'O');
  const board = gameBoard();
  const divGameBoard = document.getElementById('div-game-board');
  const btnPlayAgain = document.getElementById('btn-play-again');
  const gameOverDiv = document.getElementById('div-game-over-message');
  const currentPlayerTurn = document.getElementById('div-current-player-turn');
  const divErrorMessage = document.getElementById('div-error-message');
  let playersTurn;

  // private methods for game object
  const switchTurns = () => {
    playersTurn = (playersTurn === _playerOne) ? _playerTwo : _playerOne;
    setCurrentPlayer(playersTurn._name);
  }

  const randomizeCurrentTurn = () => {
    // Compute random number, either 0 or 1 for which player will go first.
    const randomNumber = (Math.floor(Math.random() * (1 - 0 + 1)) + 0 === 0) ? 0 : 1;
    playersTurn = (randomNumber === 0) ? _playerOne : _playerTwo;
  }

  const setCurrentPlayer = (player) => {
    // Prompt user to pick a spot.
    currentPlayerTurn.innerHTML = `${player._name}'s turn!`;
  }

  const placeMarker = (stringPos) => {
    board.updateBoard(playersTurn._marker, stringPos);
  }

  // Public Methods for game object
  const gameStart = () => {
    randomizeCurrentTurn();
    setCurrentPlayer(playersTurn);
  }

  const displayErrorMessage = () => {
    divErrorMessage.classList.remove('hide');
  }

  const computeTurn = (stringPos) => {
    placeMarker(stringPos);

    const gameOver = board.gameOver(playersTurn);
    if (gameOver) {
      // Make board items unclickable.
      divGameBoard.classList.add('game-over');
      // Game is over, unhide game over div to show game over message.
      gameOverDiv.innerHTML = `${gameOver}`;
      gameOverDiv.classList.remove('hide');

      // Hide whose turn it is.
      currentPlayerTurn.classList.add('hide');
      // Unhide play again button.
      btnPlayAgain.classList.remove('hide');
    } else {
      switchTurns();
      setCurrentPlayer(playersTurn);
    }
  }

  const resetGame = () => {
    // Reset Game Function
    // Reset board array
    board.resetBoard();
    // Remove game-over class to allower pointer events to work
    divGameBoard.classList.remove('game-over');
    // Hide Play Again button
    btnPlayAgain.classList.add('hide');
    // Hide Game Over Div
    gameOverDiv.classList.add('hide');
    // Randomize player turn
    randomizeCurrentTurn();
    setCurrentPlayer(playersTurn);
    // Unhide player turn div
    currentPlayerTurn.classList.remove('hide');
  }

  return { gameStart, displayErrorMessage, computeTurn, resetGame };
}

const setTileListeners = (gameState) => {
  const spanTiles = document.getElementsByClassName('game-tile');
  const divErrorMessage = document.getElementById('div-error-message');

  for (let i = 0; i < spanTiles.length; i++) {
    const spanTile = spanTiles[i];

    spanTile.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.currentTarget.innerHTML) {
        gameState.displayErrorMessage();
      } else {
        gameState.computeTurn(e.currentTarget.getAttribute('data-pos'));

        if (!divErrorMessage.classList.contains('hide')) {
          divErrorMessage.classList.add('hide');
        }
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