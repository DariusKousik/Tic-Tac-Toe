const playerProfile=document.querySelector('.player-status');
const boxes=document.querySelectorAll('.box');
const button=document.querySelector('.btn');

let currentPlayer="";
let gameGrid;
const winningPos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
initialize();
function initialize() {
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    button.classList.remove('active');
    for (let i=0;i<9;i++){
        boxes[i].innerText="";
        boxes[i].classList.remove("marked");
        boxes[i].style.pointerEvents="initial";
    }
    playerProfile.innerText=`Current Player - ${currentPlayer}`;
}

function swapTurn(){
    if (currentPlayer==="X"){
        currentPlayer="O";
        playerProfile.innerText=`Current Player - ${currentPlayer}`;
    }
    else {
        currentPlayer="X";
        playerProfile.innerText=`Current Player - ${currentPlayer}`;
    }
}

function handleGame(index){
    if (boxes[index].innerText===''){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        swapTurn();
    }   
}

function checkGame(){
    let winner="";
    for (let positions of winningPos){
        if (gameGrid[positions[0]]!="" && gameGrid[positions[1]]!="" && gameGrid[positions[2]]!=""
        &&(gameGrid[positions[0]]===gameGrid[[positions[1]]] && gameGrid[positions[1]]===gameGrid[[positions[2]]])){
            winner=gameGrid[positions[0]];
            boxes[positions[0]].classList.add('marked');
            boxes[positions[1]].classList.add('marked');
            boxes[positions[2]].classList.add('marked');

            break;
        }
    }

    if (winner!=""){
        playerProfile.innerText=`Winner Player - ${winner}`;
        for (let box of boxes){
            box.style.pointerEvents="none";
        }

        button.classList.add('active');
        return;
    }

        let fillCnt=0;
        for (let value of gameGrid){
            if (value!=="") fillCnt++;
        }

        if (fillCnt==9){
            for (let box of boxes){
                box.style.pointerEvents="none";
            }
            playerProfile.innerText="Game Tied !";
            button.classList.add('active');
    }
}

button.addEventListener('click',initialize);

for (let i=0;i<9;i++){
    boxes[i].addEventListener("click",()=> {
        handleGame(i);
        checkGame();
    });
}