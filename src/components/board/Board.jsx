import React, { Component } from 'react'
import Square from '../square/Square'
import { Link } from 'react-router-dom'

import '../App.css'
import './Board.css'

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

export default class Board extends Component {
  constructor (props) {
    super(props)
    const size = props.size
    this.state = {
      board: initBoard(size),
      rowScores: Array(size).fill(0),
      columnScores: Array(props.size).fill(0),
      forwardDiagonal: 0,
      backwardDiagonal: 0,
      currentPlayer: player1,
      outcome: undefined,
      winner: undefined
    }
  }

  componentDidMount () {

  }

  updateScores (x, y) {
    const { board } = this.state
    const { rowScores, columnScores } = this.state
    const sum = (acc, item) => acc + item

    rowScores[y] = board[y].reduce(sum, 0)
    columnScores[x] = getColumn(board, x).reduce(sum, 0)

    const newForwardDiagonal = getDiagonal(board).reduce(sum, 0)
    const newBackwardDiagonal = getDiagonal(board, true).reduce(sum, 0)

    const size = board.length
    const rowWinner = rowScores
      .map(s => isLineWon(size, s, player1, player2))
      .filter(s => s !== undefined)
    const colWinner = columnScores
      .map(s => isLineWon(size, s, player1, player2))
      .filter(s => s !== undefined)
    const diagFWinner = isLineWon(size, newForwardDiagonal, player1, player2)
    const diagBWinner = isLineWon(size, newBackwardDiagonal, player1, player2)

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
      rowScores,
      columnScores,
      outcome,
      winner,
      forwardDiagonal: newForwardDiagonal,
      backwardDiagonal: newBackwardDiagonal
    }
  }

  toggleTurn () {
    const currentPlayer = this.state.currentPlayer === player2
      ? player1
      : player2
    return { currentPlayer }
  }

  makeMove (x, y) {
    const { outcome } = this.state
    if (outcome !== undefined) return

    const { board, currentPlayer } = this.state
    const squareValue = board[y][x]
    const isSquareFree = squareValue === free
    if (isSquareFree) {
      board[y][x] = isSquareFree ? currentPlayer : squareValue
      this.setState((state, props) => this.updateScores(x, y))
      this.setState((state, props) => this.toggleTurn())
    }
  }

  onSquareClick (x, y) {
    this.makeMove(x, y)
  }

  render () {
    const { outcome, winner, currentPlayer } = this.state
    const turnComp = outcome === undefined && <h1>It's {currentPlayer === player1 ? 'X' : 'O'} turn</h1>
    const winnerComp = winner && <h1>Winner: {winner === player1 ? 'X' : 'O'}</h1>
    const drawComp = outcome && <h1>It's a draw!</h1>
    const outcomeComp = outcome && outcome === draw ? drawComp : winnerComp
    const replayButton = <Link replace className='button' to='/replay'>Replay</Link>
    const replay = outcome && replayButton
    return (
      <div className='screen'>
        <div className='board-container'>
          {this.state.board.map((row, y) =>
            row.map((c, x) => {
              const k = `${x}-${y}`
              const value = this.state.board[y][x]
              return (
                <Square
                  key={k}
                  value={value}
                  onClick={() => this.onSquareClick(x, y)}
                />
              )
            })
          )}
        </div>
        { turnComp }
        { outcomeComp}
        { replay }
      </div>
    )
  }
}
