import React, { Component } from 'react'
import Row from '../row/Row'

import '../App.css'
import './Board.css'

export default class Board extends Component {
  
  render () {
    const { board, onSquareClick } = this.props
    const rows = board.map((items, rowIndex) => {
      return (
        <Row key={rowIndex}
          index={rowIndex} items={items} onSquareClick={onSquareClick} />
      )
    })
    return (
      <div className='board-container'>
        { rows }
      </div>
    )
  }
}
