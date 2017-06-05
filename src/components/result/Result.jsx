import React, { Component } from 'react'

import './Result.css'

export default class Result extends Component {
  render () {
    const { isDraw, winner } = this.props

    const Winner = () => {
      return (
        <div className='result'>
          <div className='result-text'>The winner is</div>
          <div className='player-container'>
            {winner}
          </div>
        </div>
      )
    }

    const Draw = () => (
      <div className='result'>
        <div className='result-text'>It's a draw!</div>
      </div>
    )

    return (
      <div className='result-container'>
        { isDraw ? <Draw /> : <Winner /> }
      </div>
    )
  }
}
