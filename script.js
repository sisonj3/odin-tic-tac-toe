// Gameboard object
let gameBoard = (() => {
    let board = [['', '', ''],
                ['', '', ''],
                ['', '', '']];
})();

// Player factory
const playerFactory = (token) => {
    return {token};
};
