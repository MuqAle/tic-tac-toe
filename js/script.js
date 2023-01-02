
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
        for (const element of gameBoard.game){
            const displayBox = document.createElement('div');
            const imgMarker = document.createElement('img');
            imgMarker.classList.add('marker_img');
            displayBox.classList.add('display_box');
            displayBox.classList.add('empty_box');
            displayBox.appendChild(imgMarker)
            imgMarker.style.display = 'none'
            displayContainer.appendChild(displayBox);
        };
    }
    const addMarker = (e) => {
        const parent = e.target.parentElement;
        const index = Array.prototype.indexOf.call(parent.children, e.target)
        if (e.target.classList[0] === 'display_box' && Player1.turn === true && e.target.classList[1] === 'empty_box'){
            gameBoard.game.splice(index,1,Player1.marker);
            e.target.childNodes[0].src = './imgs/x_icon.png'
            e.target.childNodes[0].style.display = 'flex'
            markerX.push(Number(index));
            e.target.classList.add('x_marker')
            e.target.classList.remove('empty_box');
            Player1.turn = false;
            Player2.turn = true;
            console.log(markerX)
        }else if (e.target.classList[0] === 'display_box' && Player2.turn === true && e.target.classList[1] === 'empty_box'){
            gameBoard.game.splice(index,1,Player2.marker)
            e.target.childNodes[0].src = './imgs/heart_icon.png'
            e.target.childNodes[0].style.display = 'flex'
            markerO.push(Number(index));
            e.target.classList.add('o_marker')
            e.target.classList.remove('empty_box');
            Player2.turn = false;
            Player1.turn = true;
            console.log(markerO)
        }
    };

    const resetBoard = () => {
        gameBoard.game.forEach((element, index) =>{
            gameBoard.game[index] = ''
        })
        displayContainer.childNodes.forEach((box) => {
            box.childNodes[0].style.display = 'none'
            box.classList.add('empty_box');
            box.classList.remove('x_marker');
            box.classList.remove('o_marker');
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
    return {createBoard, markerX, markerO, displayContainer, resetBtn};
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

    const removeClass = () => {
        for (const child of displayController.displayContainer.childNodes){
            child.classList.remove('empty_box');
            
        }
    };

    const winChecker = () => {
        for (const win of winningPatterns){
            const winnerX = win.every(elem => displayController.markerX.includes(elem)); 
            const winnerO = win.every(elem => displayController.markerO.includes(elem));

            if(winnerX){
                winnerContainer.textContent = 'Player 1 wins!';
                removeClass()
                console.log(winnerX)
                displayController.resetBtn.style.display = 'flex'
            }
            else if(winnerO){
                winnerContainer.textContent = 'Player 2 wins!'
                removeClass()
                displayController.resetBtn.style.display = 'flex'
            }
            else if(tieChecker()){
                winnerContainer.textContent = "It's a tie!"
                removeClass()
                displayController.resetBtn.style.display = 'flex'
                console.log(winnerX)
            }
        }
    }

    const tieChecker = () => {
        for (const i of gameBoard.game){
            if(i === ''){
                return false;
            }
        }
        return true;
    };

    displayController.resetBtn.addEventListener('click',() => {winnerContainer.textContent =''})
    displayController.displayContainer.addEventListener('click', winChecker)
    return{winnerContainer}
})();


displayController.createBoard()



