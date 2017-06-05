import React, { Component } from 'react'
import './Player.css'

export default class PlayerO extends Component {
  render () {
    const { className } = this.props
    const classes = `mark o ${className}`
    return (
      <svg className={classes} viewBox='0 0 100 100'>
        <circle className='line' cx={50} cy={50} r={30} />
      </svg>
    )
  }
}
