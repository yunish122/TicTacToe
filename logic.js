const state_variable = {
    cellState: [
        '','','',
        '','','',   
        '','',''
    ],
    currentPlayer: 'X',
    gameOver: false,
    winner: null
}

function resetGame() {
    state_variable.cellState = [
        '','','',
        '','','',   
        '','',''
    ];
    state_variable.currentPlayer = "X";
    state_variable.gameOver = false;
    state_variable.winner = null;
    const cell = document.querySelectorAll('.grid_items')
    cell.forEach(c => {c.style.backgroundImage = ""});
    document.getElementById("h1_div").innerText = `Player ${state_variable.currentPlayer}'s Turn`;
}

function cellUpdate(){
    document.getElementById("cellContainer").addEventListener('click',(e)=>{
        /**@type {HTMLButtonElement} */
        let btn = e.target;
        if(btn.classList.contains('grid_items') && !state_variable.gameOver && !state_variable.cellState[btn.dataset.id]){
            if(state_variable.currentPlayer === "X"){
                btn.style.backgroundImage = "url('asset/icons8-x-64.png')";
                btn.style.backgroundRepeat = "no-repeat";
                btn.style.backgroundPosition = "center";
                btn.style.backgroundSize = returnSizes();
                state_variable.cellState[btn.dataset.id] = "X";
            } else {
                btn.style.backgroundImage = "url('asset/icons8-circle-50 (1).png')";
                btn.style.backgroundRepeat = "no-repeat";
                btn.style.backgroundPosition = "center";
                btn.style.backgroundSize = returnSizes();
                state_variable.cellState[btn.dataset.id] = "O";
            }
            check_winner();
            if (!state_variable.gameOver) {
                toggleTurn();
            }
        }
    })
}

function returnSizes(){
    if(window.innerWidth < 320) return '20px 20px';
    if(window.innerWidth < 640) return "40px 40px";
    if(window.innerWidth < 1024) return '60px 60px';
    return "80px 80px";
}

function toggleTurn(){
    state_variable.currentPlayer = state_variable.currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById("h1_div").innerText = `Player ${state_variable.currentPlayer}'s Turn`;
}

const winnerPattern = [
    [0,1,2], // top row
    [3,4,5], // middle row
    [6,7,8], // bottom row
    [0,3,6], // left column
    [1,4,7], // middle column
    [2,5,8], // right column
    [0,4,8], // diagonal
    [2,4,6]  // diagonal
];

function check_winner(){
    // Check for winner
    for (const pattern of winnerPattern) {
        if (pattern.every(n => state_variable.cellState[n] === 'X')) {
            state_variable.winner = 'X';
            state_variable.gameOver = true;
            document.getElementById('h1_div').innerText = 'X wins!';
            return;
        }
        if (pattern.every(n => state_variable.cellState[n] === 'O')) {
            state_variable.winner = 'O';
            state_variable.gameOver = true;
            document.getElementById('h1_div').innerText = 'O wins!';
            return;
        }
    }
    
    // Check for draw
    if (state_variable.cellState.every(cell => cell !== '')) {
        state_variable.gameOver = true;
        document.getElementById('h1_div').innerText = 'Draw!';
    }
}

// Initialize the game
cellUpdate();
document.getElementById("h1_div").innerText = `Player ${state_variable.currentPlayer}'s Turn`;
