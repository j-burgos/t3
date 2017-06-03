import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../App.css'
import './Home.css'

export default class Home extends Component {
  render () {
    return (
      <div className='screen home'>
        <div className='title'>
          <h1>Tic Tac Toe</h1>
        </div>
        <div className='button-container'>
          <Link to='/game'>Start</Link>
        </div>
        <div className='footer'>
          <p>© 2017 Jorge Burgos</p>
        </div>
      </div>
    )
  }
}
