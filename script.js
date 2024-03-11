new Vue({
  el: '#app',
  data: {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winningCombination: [],
    xWins: 0,
    oWins: 0,
    draggingSymbol: null,
  },
  methods: {
    animateAndReset() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.add('fade-out');
        });
        setTimeout(() => {
            this.resetGame();
            cells.forEach(cell => {
                cell.classList.remove('fade-out');
            });
        }, 1000); 
    },
    dragStart(symbol) {
      this.draggingSymbol = symbol;
    },
    drop(index) {
if (!this.board[index] || this.board[index] !== this.draggingSymbol) {
    this.$set(this.board, index, this.draggingSymbol);
    this.checkWinner();
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    this.draggingSymbol = null;
}
},
    checkWinner() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];

      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
          this.winningCombination = combination;
        }
      }
      if (this.winningCombination.length > 0) {
    if (this.currentPlayer === 'X') {
        this.xWins++;
    } else {
        this.oWins++;
    }
    this.animateAndReset(); 
} else if (this.board.every(cell => cell)) {
    this.animateAndReset(); 
}
this.winningCombination = [];
    },
    resetGame() {
      this.board = Array(9).fill(null);
      this.currentPlayer = 'X';
      this.winningCombination = [];
    },
    fullResetGame()
    {
      this.resetGame();
      this.xWins = 0;
      this.oWins = 0;
    
    }
  },
  computed: {
    gameEnded() {
        return this.winningCombination.length > 0 || this.board.every(cell => cell);
    },
},
});