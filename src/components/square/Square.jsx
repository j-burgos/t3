import React, { Component } from 'react'
import PlayerX from '../player/PlayerX'
import PlayerO from '../player/PlayerO'

import './Square.css'

export default class Square extends Component {
  render () {
    const { value, onClick } = this.props
    const player = value === 1 ? <PlayerX /> : <PlayerO />
    const valueRep = value === 0 ? '' : player
    return (
      <div className='square' onClick={onClick}>
        {valueRep}
      </div>
    )
  }
}
