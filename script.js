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

    const takeTurn = (e) => {
        console.log(e.target.dataset.row + ',' + e.target.dataset.column);

        if(e.target.textContent == '' && !gameOver){
            if (isPlayerOneTurn){
                playerOne.takeTurn(e);

                // Check if won
            } else {
                playerTwo.takeTurn(e);

                // Check if won
            }

            isPlayerOneTurn = !isPlayerOneTurn;
        }
          
    }

    return {takeTurn};
})();

// Gameboard object
const gameBoard = (() => {
    // Gameboard div
    const boardDiv = document.querySelector('.gameboard');

    for(let i = 1; i <= 3; i++){
        for(let j = 1; j <= 3; j++){
            const btn = document.createElement('button');

            // Button properties
            btn.classList.add('cell');
            btn.dataset.row = i;
            btn.dataset.column = j;
            btn.addEventListener('click', gameController.takeTurn);

            // Add button to dom
            boardDiv.appendChild(btn);
        }
    }

    return {boardDiv};

})();
