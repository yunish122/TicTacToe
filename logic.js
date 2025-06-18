const state_variable = {
    cellState: [
        '','','',
        '','','',   
        '','',''
    ],
    currentPlayer: 'O',
    gameOver: false,
    winner: null
}

function resetGame() {
    state_variable.cellState = [
        '','','',
        '','','',   
        '','',''
    ];
    state_variable.currentPlayer = "o";
    state_variable.gameOver = false;
    state_variable.winner = null;
    const cell = document.querySelectorAll('.grid_items')
    cell.forEach(c => {c.style.backgroundImage = ""});

}

function cellUpdate(){
    document.getElementById("cellContainer").addEventListener('click',(e)=>{
        /**@type {HTMLButtonElement} */
        let btn = e.target;
        if(btn.classList.contains('grid_items')){
            console.log(state_variable.currentPlayer)
            if(state_variable.currentPlayer === "x"){
                btn.style.backgroundImage = "url('asset/icons8-x-64.png')";
                btn.style.backgroundImage
                btn.style.backgroundRepeat = "no-repeat";
                btn.style.backgroundPosition = "center";
                btn.style.backgroundSize = returnSizes();
                state_variable.cellState[btn.dataset.id] = "x"
                console.log(state_variable.cellState)


            }else
            {

                btn.style.backgroundImage = "url('asset/icons8-circle-50 (1).png')";
                btn.style.backgroundRepeat = "no-repeat";
                btn.style.backgroundPosition = "center";
                btn.style.backgroundSize = returnSizes();
                let idx = parseInt(btn.dataset.id);
                state_variable.cellState[idx] = "o";
                console.log(state_variable.cellState)
            }
            toggleTurn()
            check_winner()
        }
    })
}

function returnSizes(){
    if(window.innerWidth < 320) return '20px 20px'
    if(window.innerWidth < 640) return "40px 40px"
    if(window.innerWidth < 1024) return '60px 60px'
    if(window.innerWidth > 1024) return "80px 80px"
}

cellUpdate();
function toggleTurn(){
    if(state_variable.currentPlayer === 'x'){
        state_variable.currentPlayer = 'o'
    }
    else{
        state_variable.currentPlayer = 'x'
    }
    document.getElementById("h1_div").innerText = `Player ${state_variable.currentPlayer}'s Turn`;

}
toggleTurn()
const winnerPattern = [
    [0,1,2],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [2,5,8],
    [6,7,8],
    [3,4,5],
    [1,4,7]
]
function check_winner(){

    if(winnerPattern.some(pattern => pattern.every(n => state_variable.cellState[n] === 'x'))){
        state_variable.winner = 'x';
        state_variable.gameOver = true;
        document.getElementById('h1_div').innerText = 'X wins'
            
    }
    if(winnerPattern.some(pattern => pattern.every(n => state_variable.cellState[n] === 'o'))){
            state_variable.winner = 'o';
            state_variable.gameOver = true;
            document.getElementById('h1_div').innerText = 'O wins'
    }

}
