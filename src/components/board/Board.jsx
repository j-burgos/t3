import React, { Component } from 'react'
import Row from '../row/Row'

import '../App.css'
import './Board.css'

export default class Board extends Component {
  render () {
    const { board, winCoords, onSquareClick } = this.props
    const rows = board.map((rowItems, rowIndex) => {
      const items = rowItems.map((item, columnIndex) => {
        const isWinner = winCoords.includes(item)
        return {
          value: item,
          isWinner: isWinner
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
