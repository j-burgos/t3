const player1 = 'x'
const player2 = 'o'

const initBoard = (size) => Array(size).fill(undefined).map(e => Array(size).fill(undefined))

const wonByRow = (row, player1, player2) => {
  return row.reduce((winner, position) => {
    const p1win = position === player1 && winner === player1 ? player1 : undefined
    const p2win = position === player2 && winner === player2 ? player1 : undefined
    return p1win ? player1 : p2win ? player2 : undefined
  })
}

const wonByColumn = (column, player) => {

}

const wonByDiagonal = (board, player) => {

}

const checkOutcome = (board, player) => {

}

const makeMove = (board, player, position) => {
  const {x, y} = position
  board[y][x] = player
}

module.exports = {
  player1,
  player2,
  initBoard,
  wonByRow,
  makeMove
}
