import React, {Component} from 'react'

import './Turn.css'

export default class Turn extends Component {
  render () {
    return (
      <div className='turn-container'>
        <div className='turn-text'>It's</div>
        <div className='player-container'>
          {this.props.player}
        </div>
        <div className='turn-text'>turn</div>
      </div>
    )
  }
}
