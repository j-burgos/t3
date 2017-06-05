import React, { Component } from 'react'
import Row from '../row/Row'

import '../App.css'
import './Board.css'

export default class Board extends Component {
  render () {
    const { board, finished, winCoords, onSquareClick } = this.props
    const rows = board.map((rowItems, rowIndex) => {
      const items = rowItems.map((item, columnIndex) => {
        const condition = ({x, y}) => x === rowIndex && y === columnIndex
        const isWinner = winCoords.find(condition)
        const className = finished && isWinner ? 'win' : finished ? 'dim' : ''
        return {
          value: item,
          className: className
        }
      })
      return (
        <Row key={rowIndex}
          index={rowIndex} items={items} onSquareClick={onSquareClick} />
      )
    })
    return (
      <div className='board'>
        { rows }
      </div>
    )
  }
}
