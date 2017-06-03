import React, { Component } from 'react'
import './Game.css'

export default class Square extends Component {
  render () {
    const value = this.props.value
    const valueRep = value === 0 ? '' : value === 1 ? 'X' : '0'
    return (
      <div className='position' onClick={this.props.onClick}>
        {valueRep}
      </div>
    )
  }
}
