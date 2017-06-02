import React, { Component } from 'react'
import './Game.css'

export default class Square extends Component {

  onClick () {
    this.props.onClick()
  }

  showPlayer () {
    const player = this.props.player
    return player === undefined ? '' : player
  }

  render () {
    return (
      <div className="position" onClick={this.onClick.bind(this)}>
        { this.showPlayer() }
      </div>
    )
  }
}