import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import './Options.css'

export default class Options extends Component {
  constructor (props) {
    super(props)
    this.state = {value: '3', size: 3}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const eventValue = event.target.value
    const size = parseInt(eventValue, 10)
    this.setState((state, props) => {
      return {
        value: eventValue,
        size: !isNaN(size) && size >= 3 ? size : 3
      }
    })
  }

  render () {
    const next = `/play/${this.state.size}`
    return (
      <div className='screen options'>
        <h1 className='title'>Set a board size:</h1>
        <input type='number' min='3' value={this.state.value} onChange={this.handleChange} />
        <Link className='button primary' to={next}>Play</Link>
      </div>
    )
  }
}
