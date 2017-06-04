import React, { Component } from 'react'
import './Player.css'

export default class PlayerX extends Component {
  render () {
    const winnerClass = this.props.isWinner ? 'win' : ''
    const className = `mark x ${winnerClass}`
    return (
      <svg className={className} viewBox='0 0 100 100'>
        <line className='line' x1='20' y1='20' x2='80' y2='80' />
        <line className='line crossing' x1='80' y1='20' x2='20' y2='80' />
      </svg>
    )
  }
}
