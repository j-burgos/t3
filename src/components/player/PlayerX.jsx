import React, { Component } from 'react'
import './Player.css'

export default class PlayerX extends Component {
  render () {
    const { className } = this.props
    const classes = `mark x ${className}`
    return (
      <svg className={classes} viewBox='0 0 100 100'>
        <line className='line' x1='20' y1='20' x2='80' y2='80' />
        <line className='line crossing' x1='80' y1='20' x2='20' y2='80' />
      </svg>
    )
  }
}
