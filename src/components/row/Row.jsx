import React, { Component } from 'react'
import Square from '../square/Square'

import './Row.css'

export default class Row extends Component {
  render () {
    const { items, index, onSquareClick } = this.props
    const squares = items.map((column, columnIndex) => {
      const key = `${index}-${columnIndex}`
      const { value, isWinner } = items[columnIndex]
      const onClick = () => onSquareClick(columnIndex, index)
      return (
        <Square key={key} value={value}
          onClick={onClick}
          isWinner={isWinner} />
      )
    })
    return (
      <div className='row'>
        { squares }
      </div>
    )
  }
}
