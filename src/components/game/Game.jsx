import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Board from '../board/Board'

import Turn from '../turn/Turn'
import PlayerX from '../player/PlayerX'
import PlayerO from '../player/PlayerO'
import './Game.css'

const free = 0
const player1 = 1
const player2 = -1
const draw = 'draw'

const initBoard = (size) => Array(size).fill(0).map(e => Array(size).fill(0))

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
    const size = Number(boardSize)
    const board = initBoard(size)
    const scores = {
      rows: Array(size).fill(0),
      cols: Array(size).fill(0),
      fdiag: 0,
      bdiag: 0
    }
    const result = {
      outcome: undefined,
      winner: undefined
    }
    this.state = {
      board: board,
      scores: scores,
      result: result,
      currentPlayer: player1
    }
  }

  updateMatrixScores (x, y) {
    const { board, scores } = this.state
    const { rows, cols } = scores
    rows[y] = board[y].reduce(sum, 0)
    cols[x] = getColumn(board, x).reduce(sum, 0)
    return {
      rows,
      cols
    }
  }

  updateDiagonalScores () {
    const { board } = this.state
    const fdiag = getDiagonal(board).reduce(sum, 0)
    const bdiag = getDiagonal(board, true).reduce(sum, 0)
    return {
      fdiag,
      bdiag
    }
  }

  updateResult (scores) {
    const { board } = this.state
    const { rows, cols, fdiag, bdiag } = scores

    const size = board.length
    const rowWinner = rows
      .map(s => isLineWon(size, s, player1, player2))
      .filter(s => s !== undefined)
    const colWinner = cols
      .map(s => isLineWon(size, s, player1, player2))
      .filter(s => s !== undefined)
    const diagFWinner = isLineWon(size, fdiag, player1, player2)
    const diagBWinner = isLineWon(size, bdiag, player1, player2)

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
      result: {
        outcome,
        winner
      }
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
    const { board, result, currentPlayer } = this.state
    const { outcome } = result
    if (outcome !== undefined) return

    const squareValue = board[y][x]
    const isSquareFree = squareValue === free
    if (isSquareFree) {
      board[y][x] = isSquareFree ? currentPlayer : squareValue
      const scores = {
        ...this.updateMatrixScores(x, y),
        ...this.updateDiagonalScores()
      }
      const result = this.updateResult(scores)
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
    const { board, result, currentPlayer } = this.state
    const { outcome, winner } = result
    const playerComp = currentPlayer === player1 ? <PlayerX /> : <PlayerO />
    const turnComp = outcome === undefined && <Turn player={playerComp} />
    const winnerComp = winner && <h1>Winner: {winner === player1 ? 'X' : 'O'}</h1>
    const drawComp = outcome && <h1>It's a draw!</h1>
    const outcomeComp = outcome && outcome === draw ? drawComp : winnerComp
    const next = `/play/${board.length}`
    const replayButton = (
      <Link replace className='button primary animated' to={next}>
        Rematch
      </Link>
    )
    const quitButton = <Link replace className='button secondary' to='/quit'>Quit</Link>
    const replay = outcome && replayButton
    const quit = outcome && quitButton
    const winCoords = []
    return (
      <div className='screen'>
        <div className='game'>
          <div className='board-container'>
            <Board board={board} winCoords={winCoords} onSquareClick={this.onSquareClick.bind(this)} />
          </div>
          <div className='hud'>
            { turnComp }
            { outcomeComp}
            { replay }
            { quit }
          </div>
        </div>
      </div>
    )
  }
}
