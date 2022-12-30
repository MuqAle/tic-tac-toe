

const gameBoard = (() => {
    const game = ['','','','','','','','','']
    return {game}
})();

const Player = (marker, turn) => ({marker, turn});

const displayController = (() => {
    const Player1 = Player('X', true)
    const Player2 = Player('O', false)
    const markerX = [];
    const markerO = [];
    const displayContainer = document.querySelector('.display_board')
    const createBoard = () => {
        for (const [index, element] of gameBoard.game.entries()){
            const displayBox = document.createElement('div');
            displayBox.classList.add('display_box');
            displayBox.classList.add('empty_box')
            displayBox.classList.add(index)
            displayContainer.appendChild(displayBox);
        };
    }
    const addMarker = (e) => {
        if (e.target.classList[0] === 'display_box' && Player1.turn === true && e.target.classList[1] === 'empty_box'){
            gameBoard.game.splice(e.target.classList[2],1,Player1.marker)
            e.target.textContent = Player1.marker;
            markerX.push(e.target.classList[2])
            e.target.classList.remove('empty_box');
            Player1.turn = false;
            Player2.turn = true;
            console.log(gameBoard.game)
            console.log(markerX)
        }else if (e.target.classList[0] === 'display_box' && Player2.turn === true && e.target.classList[1] === 'empty_box'){
            gameBoard.game.splice(e.target.classList[2],1,Player2.marker)
            e.target.textContent = Player2.marker
            markerO.push(e.target.classList[2])
            e.target.classList.remove('empty_box')
            Player2.turn = false
            Player1.turn = true
            console.log(gameBoard.game)
            console.log(markerO)
            
        }
    };
    displayContainer.addEventListener('click', addMarker)
    return {createBoard, displayContainer};
})();

const gameFlow = (() => {
    const winningPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

})();

displayController.createBoard()



