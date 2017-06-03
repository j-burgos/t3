import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default class Home extends Component {
  render () {
    return (
      <div className='home'>
        <h1 className='main-title'>Tic Tac Toe</h1>
        <div className='button-container'>
          <Link to='/game' className='primary'>Start</Link>
        </div>
        <p className='copyright'>© 2017 Jorge Burgos</p>
      </div>
    )
  }
}
