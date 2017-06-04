import React, { Component } from 'react'
import PlayerX from '../player/PlayerX'
import PlayerO from '../player/PlayerO'

import './Square.css'

export default class Square extends Component {
  render () {
    const { isWinner, value, onClick } = this.props
    const playerX = <PlayerX isWinner={isWinner} />
    const playerO = <PlayerO isWinner={isWinner} />
    const isPlayerX = value === 1
    const player = isPlayerX ? playerX : playerO
    const valueRep = value === 0 ? '' : player
    return (
      <div className='square' onClick={onClick}>
        {valueRep}
      </div>
    )
  }
}
