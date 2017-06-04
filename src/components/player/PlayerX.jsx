import React, { Component } from 'react'
import './Player.css'

export default class PlayerX extends Component {
  render () {
    return (
      <svg className='mark' viewBox='0 0 100 100'>
        <line className='line' x1='20' y1='20' x2='80' y2='80' />
        <line className='line crossing' x1='20' y1='80' x2='80' y2='20' />
      </svg>
    )
  }
}