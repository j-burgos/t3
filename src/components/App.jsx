import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Home from './home/Home'
import Game from './game/Game'
import Outcome from './outcome/Outcome'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="screen">
          <Route exact path="/" component={Home} />
          <Route path="/game" component={Game} />
          <Route path="/outcome" component={Outcome} />
        </div>
      </Router>
    )
  }
}

export default App
