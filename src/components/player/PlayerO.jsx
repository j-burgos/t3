import React, { Component } from 'react'
import './Player.css'

export default class PlayerO extends Component {
  render () {
    const winnerClass = this.props.isWinner ? 'win' : ''
    const className = `mark o ${winnerClass}`
    return (
      <svg className={className} viewBox='0 0 100 100'>
        <circle className='line' cx={50} cy={50} r={30} />
      </svg>
    )
  }
}
