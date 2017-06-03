import React, { Component } from 'react'
import Square from './Square'
import './Game.css'

const free = 0
const player1 = 1
const player2 = -1

const initBoard = (size) => Array(size).fill(0).map(e => Array(size).fill(0))

const getColumn = (board, columnIndex) => board.map(row => row[columnIndex])

const getDiagonal = (board, backward) => board.reduce((acc,row,rowIndex) => {
  const backwardCondition = (rowIndex, columnIndex) => {
    return columnIndex === Math.abs(rowIndex - (board.length - 1)) 
  }
  const forwardCondition = (rowIndex, columnIndex) => columnIndex === rowIndex
  const condition = backward ? backwardCondition : forwardCondition
  const element = row.filter((column,columnIndex) => condition(rowIndex, columnIndex))
  return acc.concat(element)
}, [])

const isLineWon = (size, lineScore, p1, p2) => {
  const p1Won = lineScore === size
  const p2Won = -lineScore === size
  return p1Won ? p1 : p2Won ? p2 : undefined
}

export default class Game extends Component {

  constructor () {
    super()
    this.state = {
      board: initBoard(3),
      rowScores: Array(3).fill(0),
      columnScores: Array(3).fill(0),
      forwardDiagonal: 0,
      backwardDiagonal: 0,
      currentPlayer: player1,
      winner: undefined
    }
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
    const rowWinner = rowScores.map(s => isLineWon(size, s, player1, player2)).filter(s => s !== undefined) 
    const colWinner = columnScores.map(s => isLineWon(size, s, player1, player2)).filter(s => s !== undefined) 
    const diagFWinner = isLineWon(size, newForwardDiagonal, player1, player2)
    const diagBWinner = isLineWon(size, newBackwardDiagonal, player1, player2) 

    const winner = 
      rowWinner
        .concat(colWinner)
        .concat([diagFWinner])
        .concat([diagBWinner])
        .reduce((acc, i) => i ? i : acc)

    console.log(winner)

    if(winner) console.log(winner)

    return {
      ...this.state, 
      rowScores, 
      columnScores,
      winner,
      forwardDiagonal: newForwardDiagonal,
      backwardDiagonal: newBackwardDiagonal,
    }
  }

  toggleTurn () {
    const currentPlayer = this.state.currentPlayer === player2 ? player1 : player2
    return { ...this.state, currentPlayer }
  }

  makeMove (x, y) {
    const { board, currentPlayer } = this.state
    const squareValue = board[y][x]
    const isSquareFree = squareValue === free
    board[y][x] = isSquareFree ? currentPlayer : squareValue
    if (isSquareFree) {
      this.setState((state, props) => this.updateScores(x,y))
      this.setState((state, props) => this.toggleTurn())
    }
  }

  onSquareClick (x, y) {
    this.makeMove(x, y)
  }

  render () {
    const a = (w) => <h1>{ w }</h1>
    return (
      <div className="screen">
        <h1 className="main-title">Game</h1>
        <div className="board-container">
        { this.state.board.map((row,y) => row.map((c,x) => {
          const k = `${x}-${y}`
          const value = this.state.board[y][x]
          return ( 
            <Square key={k} value={value} onClick={() => this.onSquareClick(x,y)} />
          )
        })) }
        </div>
        <h2>Turn: { this.state.currentPlayer === player1 ? 'X' : 'O'}</h2>
        { this.state.winner && a(this.state.winner) }
      </div>
    )
  }
}