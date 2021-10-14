import React, { Component } from 'react';

export default class Page2 extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.location.state.day)
  }
  render () {
    return (
      <div>
        <h1>这是page2页面组件{this.props.location.state.day}</h1>
      </div>
    )
  }
}