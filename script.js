// Player factory
const playerFactory = (token) => {
    const takeTurn = (e) => {
        e.target.textContent = token;
    };

    return {takeTurn, token};
};

// Game controller
const gameController = (() => {
    const playerOne = playerFactory('X');
    const playerTwo = playerFactory('O');

    let isPlayerOneTurn = true;
    let gameOver = false;
    let turnsTaken = 0;

    // Message display
    const message = document.querySelector('.congrats');

    // Gameboard div
    const boardDiv = document.querySelector('.gameboard');

    // Gameboard array for checking win condition
    let boardArr = [['', '' , ''], ['', '' , ''], ['', '' , '']];

    const checkWinner = (token) => {
        // Check every row and column
        for(let i = 0; i <= 2; i++){
            if((boardArr[i][0].textContent == token && boardArr[i][1].textContent == token && boardArr[i][2].textContent == token) ||
            (boardArr[0][i].textContent == token && boardArr[1][i].textContent == token && boardArr[2][i].textContent == token)) {
                gameOver = true;
                message.textContent = 'Player ' + token + ' wins!';
                return true;
            }
        }

        // Check diagonals
        if(boardArr[1][1].textContent == token && 
            ((boardArr[0][0].textContent == token && boardArr[2][2].textContent == token) 
            || (boardArr[2][0].textContent == token && boardArr[0][2].textContent == token))){
                gameOver = true;
                message.textContent = 'Player ' + token + ' wins!';
                return true;
        }

        return false;
    }

    const takeTurn = (e) => {
        console.log(e.target.dataset.row + ',' + e.target.dataset.column);
        console.log('Turns: ' + turnsTaken);

        if(e.target.textContent == '' && !gameOver){
            if (isPlayerOneTurn){
                // Update number of turns taken
                turnsTaken++;

                playerOne.takeTurn(e);

                // Check if won
                if(checkWinner(playerOne.token)){
                    return;
                }

            } else {
                // Update number of turns taken
                turnsTaken++;

                playerTwo.takeTurn(e);

                // Check if won
                if(checkWinner(playerTwo.token)){
                    return;
                }
            }

            // Game is a draw
            if(turnsTaken >= 9){
                gameOver = true;
                message.textContent = 'Draw!';
            }

            isPlayerOneTurn = !isPlayerOneTurn;
        }
          
    }

    const restart = () => {
        isPlayerOneTurn = true;
        gameOver = false;
        turnsTaken = 0;

        message.textContent = '';

        // Reset button text contents
        boardArr.forEach(row => row.forEach(btn => btn.textContent = ''));
    }

    // Create gameboard
    for(let i = 1; i <= 3; i++){
        for(let j = 1; j <= 3; j++){
            const btn = document.createElement('button');

            // Button properties
            btn.classList.add('cell');
            btn.dataset.row = i;
            btn.dataset.column = j;
            btn.addEventListener('click', takeTurn);

            // Add button to dom
            boardDiv.appendChild(btn);

            // Add button to array
            boardArr[i-1][j-1] = btn;
        }
    }

    // Restart button
    const restartBtn = document.querySelector('.restart');
    restartBtn.addEventListener('click', restart);

})();

