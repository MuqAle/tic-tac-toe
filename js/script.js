
const gameBoard = (() => {
    const game = ['','','','','','','','',''];
    return {game}
})();

const Player = (marker, turn) => ({marker, turn});

const displayController = (() => {
    const Player1 = Player('X', true)
    const Player2 = Player('O', false)
    const markerX = [];
    const markerO = [];
    const displayContainer = document.querySelector('.display_board');
    const resetBtn = document.querySelector('.reset_btn')

    const createBoard = () => {
        for (const [index, element] of gameBoard.game.entries()){
            const displayBox = document.createElement('div');
            displayBox.classList.add('display_box');
            displayBox.classList.add(index);
            displayBox.classList.add('empty_box');
            displayContainer.appendChild(displayBox);
        };
    }
    const addMarker = (e) => {
        if (e.target.classList[0] === 'display_box' && Player1.turn === true && e.target.classList[2] === 'empty_box'){
            gameBoard.game.splice(e.target.classList[1],1,Player1.marker);
            e.target.textContent = Player1.marker;
            markerX.push(Number(e.target.classList[1]));
            e.target.classList.remove('empty_box');
            Player1.turn = false;
            Player2.turn = true;
        }else if (e.target.classList[0] === 'display_box' && Player2.turn === true && e.target.classList[2] === 'empty_box'){
            gameBoard.game.splice(e.target.classList[1],1,Player2.marker)
            e.target.textContent = Player2.marker;
            markerO.push(Number(e.target.classList[1]));
            e.target.classList.remove('empty_box');
            Player2.turn = false;
            Player1.turn = true;
        }
    };

    const resetBoard = () => {
        gameBoard.game.forEach((element, index) =>{
            gameBoard.game[index] = ''
        })
        displayContainer.childNodes.forEach((box,index) => {
            displayContainer.childNodes[index].textContent = ''
            box.classList.add('empty_box');
        })
        Player1.turn = true;
        Player2.turn = false;
        markerX.length = 0
        markerO.length = 0
        resetBtn.style.display = 'none'
    }
    resetBtn.style.display = 'none'
    displayContainer.addEventListener('click', addMarker);
    resetBtn.addEventListener('click',resetBoard)
    return {createBoard,markerX,markerO,displayContainer, resetBtn};
})();

const gameFlow = (() => {
    const winnerContainer = document.querySelector('.winner')
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
    const tieChecker = () => {
        for (const i of gameBoard.game){
            if(i ===''){
                return false;
            }
        }
        return true;
    };

    const removeClass = () => {
        for (const child of displayController.displayContainer.children){
            child.classList.remove('empty_box')
        }
    };

    const winChecker = () => {
       
        for (const win of winningPatterns){
            const winnerX = win.every(elem => displayController.markerX.includes(elem)); 
            const winnerO = win.every(elem => displayController.markerO.includes(elem));

            if(winnerX){
                winnerContainer.textContent = 'Player 1 wins';
                removeClass()
                displayController.resetBtn.style.display = 'block'
            }
            else if(winnerO){
                winnerContainer.textContent = 'Player 2 wins'
                removeClass()
                displayController.resetBtn.style.display = 'block'
            }
            else if(tieChecker()){
                winnerContainer.textContent = "It's a tie"
                removeClass()
                displayController.resetBtn.style.display = 'block'
            }
        }
    }

    displayController.resetBtn.addEventListener('click',() => {winnerContainer.textContent =''})
    displayController.displayContainer.addEventListener('click', winChecker)
    return{winnerContainer}
})();

const Computer = () => {

}

displayController.createBoard()





