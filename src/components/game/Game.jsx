import React, { Component } from 'react'
import { player1, player2, initBoard, makeMove, wonByRow } from '../../core/core'
import Square from './Square'
import './Game.css'

export default class Game extends Component {

  constructor () {
    super()
    this.state = {
      board: initBoard(3),
      turn: player1
    }
  }

  toggleTurn () {
    this.setState({
      turn: this.state.turn === player2 ? player1 : player2
    })
  }

  onPositionClicked (x,y) {
    const turn = this.state.turn
    const board = this.state.board
    console.log("clicked",x,y,turn)
    makeMove(board, turn, {x, y})
    this.toggleTurn()
    const result = wonByRow(board[0], player1, player2)
    console.log("outcome: " + result)
  }

  render () {
    return (
      <div className="screen">
        <h1 className="main-title">Game</h1>
        <div className="board-container">
        { this.state.board.map((row,y) => row.map((c,x) => {
          const k = `${x}-${y}`
          const player = this.state.board[y][x]
          return ( 
            <Square key={k} position={{x,y}} player={player}
              onClick={() => this.onPositionClicked(x,y)} />
          )
        })) }
        </div>
      </div>
    )
  }
}