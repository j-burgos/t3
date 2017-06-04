import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Board from '../board/Board'

const free = 0
const player1 = 1
const player2 = -1
const draw = 'draw'

const initBoard = size => Array(size).fill(0).map(e => Array(size).fill(0))

const getColumn = (board, columnIndex) => board.map(row => row[columnIndex])

const getDiagonal = (board, backward) =>
  board.reduce((acc, row, rowIndex) => {
    const backwardCondition = (rowIndex, columnIndex) => {
      return columnIndex === Math.abs(rowIndex - (board.length - 1))
    }
    const forwardCondition = (rowIndex, columnIndex) =>
      columnIndex === rowIndex
    const condition = backward ? backwardCondition : forwardCondition
    const element = row.filter((column, columnIndex) =>
      condition(rowIndex, columnIndex)
    )
    return acc.concat(element)
  }, [])

const isLineWon = (size, lineScore, p1, p2) => {
  const p1Won = lineScore === size
  const p2Won = -lineScore === size
  return p1Won ? p1 : p2Won ? p2 : undefined
}

const sum = (acc, i) => acc + i

export default class Game extends Component {
  constructor (props) {
    super(props)
    const { boardSize } = props
    this.state = {
      board: initBoard(boardSize),
      rowScores: Array(boardSize).fill(0),
      columnScores: Array(boardSize).fill(0),
      forwardDiagonal: 0,
      backwardDiagonal: 0,
      currentPlayer: player1,
      outcome: undefined,
      winner: undefined
    }
  }

  updateRowScores (x, y) {
    const { board, rowScores } = this.state
    const sum = (acc, item) => acc + item
    rowScores[y] = board[y].reduce(sum, 0)
    return {
      rowScores
    }
  }

  updateColumnScores (x, y) {
    const { board, columnScores } = this.state
    columnScores[x] = getColumn(board, x).reduce(sum, 0)
    return {
      columnScores
    }
  }

  updateDiagonalScores () {
    const { board } = this.state
    const forwardDiagonal = getDiagonal(board).reduce(sum, 0)
    const backwardDiagonal = getDiagonal(board, true).reduce(sum, 0)
    return {
      forwardDiagonal,
      backwardDiagonal
    }
  }

  updateWinner (scores) {
    const { board } = this.state
    const { rowScores, columnScores } = scores
    const { forwardDiagonal, backwardDiagonal } = scores

    const size = board.length
    const rowWinner = rowScores
      .map(s => isLineWon(size, s, player1, player2))
      .filter(s => s !== undefined)
    const colWinner = columnScores
      .map(s => isLineWon(size, s, player1, player2))
      .filter(s => s !== undefined)
    const diagFWinner = isLineWon(size, forwardDiagonal, player1, player2)
    const diagBWinner = isLineWon(size, backwardDiagonal, player1, player2)

    const remainingSquares = board.reduce((acc, r) => {
      return acc + r.filter(c => c === free).length
    }, 0)

    const winner = rowWinner
      .concat(colWinner)
      .concat([diagFWinner])
      .concat([diagBWinner])
      .reduce((acc, i) => i || acc)

    const outcome = remainingSquares === 0 && winner === undefined ? draw : winner

    return {
      outcome,
      winner
    }
  }

  toggleTurn () {
    const { currentPlayer } = this.state
    const nextPlayer = currentPlayer === player1 ? player2 : player1
    return {
      currentPlayer: nextPlayer
    }
  }

  makeMove (x, y) {
    const { board, currentPlayer, outcome } = this.state
    if (outcome !== undefined) return

    const squareValue = board[y][x]
    const isSquareFree = squareValue === free
    if (isSquareFree) {
      board[y][x] = isSquareFree ? currentPlayer : squareValue
      const scores = {
        ...this.updateRowScores(x, y),
        ...this.updateColumnScores(x, y),
        ...this.updateDiagonalScores()
      }
      const result = this.updateWinner(scores)
      const nextPlayer = this.toggleTurn()
      this.setState((state, props) => {
        return {
          ...scores,
          ...result,
          ...nextPlayer
        }
      })
    }
  }

  onSquareClick (x, y) {
    this.makeMove(x, y)
  }

  render () {
    const { board, outcome, winner, currentPlayer } = this.state
    const turnComp = outcome === undefined && <h1>It's {currentPlayer === player1 ? 'X' : 'O'} turn</h1>
    const winnerComp = winner && <h1>Winner: {winner === player1 ? 'X' : 'O'}</h1>
    const drawComp = outcome && <h1>It's a draw!</h1>
    const outcomeComp = outcome && outcome === draw ? drawComp : winnerComp
    const replayButton = <Link replace className='button' to='/replay'><i className="fa fa-repeat" aria-hidden="true"></i> Rematch</Link>
    const replay = outcome && replayButton
    const winCoords = []
    return (
      <div className='screen'>
        <Board board={board} winCoords={winCoords} onSquareClick={this.onSquareClick.bind(this)} />
        { turnComp }
        { outcomeComp}
        { replay }
      </div>
    )
  }
}
