import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Home from './home/Home'
import Board from './board/Board'
import Outcome from './outcome/Outcome'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/play' component={Board} />
          <Route path='/outcome' component={Outcome} />
        </div>
      </Router>
    )
  }
}

export default App
