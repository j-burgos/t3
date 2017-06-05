import React, { Component } from 'react'
import PlayerX from '../player/PlayerX'
import PlayerO from '../player/PlayerO'

import './Square.css'

export default class Square extends Component {
  render () {
    const { className, value, onClick } = this.props
    const playerX = <PlayerX className={className} />
    const playerO = <PlayerO className={className} />
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
