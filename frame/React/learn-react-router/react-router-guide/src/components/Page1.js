import React, { Component } from 'react';

export default class Page1 extends Component {
  goRouter (url) {
    this.props.history.push({ pathname: url, state: { 'day': '所传参数' } })
  }
  render () {
    return (
      <div>
        <h1>这是page1页面组件</h1>
        <button onClick={this.goRouter.bind(this, '/page2')}>goPage2</button>
      </div>
    )
  }
}