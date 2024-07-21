//your JS code here. If required.
document.getElementById('submit').addEventListener('click', function() {
    var player1 = document.getElementById('player-1').value;
    var player2 = document.getElementById('player-2').value;

    if (player1 && player2) {
        document.querySelector('.input-section').style.display = 'none';
        document.querySelector('.game-section').style.display = 'block';
        
        var currentPlayer = player1;
        var currentMark = 'X';
        var board = Array(9).fill(null);

        document.querySelector('.message').textContent = `${currentPlayer}, you're up`;

        var cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', function() {
                if (!cell.textContent && !checkWinner(board)) {
                    cell.textContent = currentMark;
                    board[cell.id - 1] = currentMark;

                    if (checkWinner(board)) {
                        document.querySelector('.message').textContent = `${currentPlayer} congratulations you won!`;
                    } else if (board.every(cell => cell)) {
                        document.querySelector('.message').textContent = `It's a tie!`;
                    } else {
                        currentPlayer = currentPlayer === player1 ? player2 : player1;
                        currentMark = currentMark === 'X' ? 'O' : 'X';
                        document.querySelector('.message').textContent = `${currentPlayer}, you're up`;
                    }
                }
            });
        });
    } else {
        alert('Please enter names for both players.');
    }
});

function checkWinner(board) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombos.some(combo => {
        return board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]];
    });
}