import React, { Component } from 'react'
import './Square.css'

export default class Square extends Component {
  render () {
    const value = this.props.value
    const valueRep = value === 0 ? '' : value === 1 ? 'X' : '0'
    return (
      <div className='square' onClick={this.props.onClick}>
        {valueRep}
      </div>
    )
  }
}
