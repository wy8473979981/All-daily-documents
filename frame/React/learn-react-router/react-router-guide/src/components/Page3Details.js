import React, { Component } from 'react';

export default class Page3Details extends Component {
  render () {
    return (
      <div>
        <h1>这是page3页面的详情组件{this.props.match.params.id}</h1>
      </div>
    )
  }
}