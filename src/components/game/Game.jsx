import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Board from '../board/Board'

import Turn from '../turn/Turn'
import Result from '../result/Result'
import PlayerX from '../player/PlayerX'
import PlayerO from '../player/PlayerO'

import './Game.css'

const free = 0
const player1 = 1
const player2 = -1
const draw = 'draw'

const initBoard = (size) => Array(size).fill(0).map(e => Array(size).fill(0))

const getRow = (board, rowIndex) => board[rowIndex].map((item, colIndex) => {
  return {
    x: rowIndex,
    y: colIndex,
    v: item
  }
})
const getColumn = (board, colIndex) => board.map((row, rowIndex) => {
  return {
    x: rowIndex,
    y: colIndex,
    v: row[colIndex]
  }
})

const getDiagonal = (board, backward) => board.reduce((acc, row, rowIndex) => {
  const backwardCondition = (rowIndex, columnIndex) => {
    return columnIndex === Math.abs(rowIndex - (board.length - 1))
  }
  const forwardCondition = (rowIndex, columnIndex) => columnIndex === rowIndex

  const condition = backward ? backwardCondition : forwardCondition
  const element = row.reduce((acc, column, columnIndex) => {
    const isInDiag = condition(rowIndex, columnIndex)
    const square = isInDiag ? [{x: columnIndex, y: rowIndex, v: column}] : []
    return acc.concat(square)
  }, [])

  return acc.concat(element)
}, [])

const getForwardDiagonal = (board) => getDiagonal(board)
const getBackwardDiagonal = (board) => getDiagonal(board, true)

const isLineWon = (size, lineScore, p1, p2) => {
  const p1Won = lineScore === size
  const p2Won = -lineScore === size
  return p1Won ? p1 : p2Won ? p2 : undefined
}

const sum = (acc, { v }) => acc + v

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
      winner: undefined,
      winCoords: []
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
    rows[y] = getRow(board, y).reduce(sum, 0)
    cols[x] = getColumn(board, x).reduce(sum, 0)
    return {
      rows,
      cols
    }
  }

  updateDiagonalScores () {
    const { board } = this.state
    const fdiagCoords = getForwardDiagonal(board)
    const bdiagCoords = getBackwardDiagonal(board)
    const fdiag = fdiagCoords.reduce(sum, 0)
    const bdiag = bdiagCoords.reduce(sum, 0)
    return {
      fdiagCoords,
      bdiagCoords,
      fdiag,
      bdiag
    }
  }

  updateResult (scores) {
    const { board } = this.state
    const { rows, cols, fdiag, bdiag, fdiagCoords, bdiagCoords } = scores

    const size = board.length

    const getLineWinner = score => isLineWon(size, score, player1, player2)
    const isWinner = winner => winner !== undefined

    const rowWinners = rows.map(getLineWinner)
    const rowWinner = rowWinners.filter(isWinner)
    const rowWinIndex = rowWinners.findIndex(isWinner)

    const colWinners = cols.map(getLineWinner)
    const colWinner = colWinners.filter(isWinner)
    const colWinIndex = colWinners.findIndex(isWinner)

    const fdiagWinner = isLineWon(size, fdiag, player1, player2)
    const bdiagWinner = isLineWon(size, bdiag, player1, player2)

    const winCoords =
      fdiagWinner ? fdiagCoords
      : bdiagWinner ? bdiagCoords
      : rowWinIndex > -1 ? getRow(board, rowWinIndex)
      : colWinIndex > -1 ? getColumn(board, colWinIndex) : []

    const winner = rowWinner
      .concat(colWinner)
      .concat([fdiagWinner])
      .concat([bdiagWinner])
      .reduce((acc, i) => i || acc)

    const remainingSquares = board.reduce((acc, row) => {
      return acc + row.filter(col => col === free).length
    }, 0)

    const noMoreSpaces = remainingSquares === 0
    const noWinner = winner === undefined
    const outcome = noMoreSpaces && noWinner ? draw : winner

    return {
      result: {
        outcome,
        winner,
        winCoords
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
    const { outcome, winner, winCoords } = result

    const CurrentTurn = () => {
      const isPlayer1 = currentPlayer === player1
      const notFinished = outcome === undefined
      const player = isPlayer1 ? <PlayerX /> : <PlayerO />
      return notFinished && <Turn player={player} />
    }

    const ResultWithPlayer = () => {
      const isDraw = outcome === draw
      const isWinnerPlayer1 = winner === player1
      const player = isWinnerPlayer1 ? <PlayerX /> : <PlayerO />
      return <Result isDraw={isDraw} winner={player} />
    }

    const Rematch = () => {
      const next = `/play/${board.length}`
      const rematchLink = (
        <Link replace className='button primary' to={next}>
          Rematch
        </Link>
      )
      return rematchLink
    }

    const Quit = () => (
      <Link replace className='button secondary' to='/quit'>Quit</Link>
    )

    return (
      <div className='screen'>
        <div className='game'>
          <div className='board-container'>
            <Board board={board} finished={outcome}
              onSquareClick={this.onSquareClick.bind(this)}
              winCoords={winCoords} />
          </div>
          <div className='hud'>
            <CurrentTurn />
            { outcome && <ResultWithPlayer /> }
            { outcome && <Rematch /> }
            { outcome && <Quit /> }
          </div>
        </div>
      </div>
    )
  }
}
