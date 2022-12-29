

const gameBoard = (() => {
    const game = ['','','','','','','','','']
    return {game}
})();

const Player = (marker, turn) => ({marker, turn});

const displayController = (() => {
    const Player1 = Player('X', true)
    const Player2 = Player('O', false)
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
            e.target.textContent = Player1.marker
            e.target.classList.remove('empty_box')
            Player1.turn = false
            Player2.turn = true
            console.log(gameBoard.game)
        }else if (e.target.classList[0] === 'display_box' && Player2.turn === true && e.target.classList[1] === 'empty_box'){
            gameBoard.game.splice(e.target.classList[2],1,Player2.marker)
            e.target.textContent = Player2.marker
            e.target.classList.remove('empty_box')
            Player2.turn = false
            Player1.turn = true
            console.log(gameBoard.game)
        }
    };
    displayContainer.addEventListener('click', addMarker)
    return {createBoard};
})();

const gameFlow = (() => {

})();

displayController.createBoard()
