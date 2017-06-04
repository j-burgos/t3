import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import Home from './home/Home'
import Board from './board/Board'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/play' render={() => <Board size={3} />} />
          <Route path='/replay'>
            <Redirect to='/play' />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App
