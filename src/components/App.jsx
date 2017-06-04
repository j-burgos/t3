import React, { Component } from 'react'
import {CSSTransitionGroup} from 'react-transition-group'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import Home from './home/Home'
import Game from './game/Game'

class App extends Component {
  render () {
    return (
      <Router>
        <Route path='/' render={({location}) => (
          <div className='screen-container'>
            <CSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              <Switch key={location.key} location={location}>
                <Route exact path='/' component={Home} />
                <Route path='/play'>
                  <Game boardSize={3} />
                </Route>
                <Route path='/replay'>
                  <Redirect to='/play'/>
                </Route>
              </Switch>
            </CSSTransitionGroup>
          </div>
        )} />
      </Router>
    )
  }
}

export default App
