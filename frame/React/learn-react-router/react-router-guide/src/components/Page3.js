import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

export default class Page3 extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }
  render () {
    let { match, routes } = this.props
    return (
      <div>
        <h1>这是page3页面组件</h1>
        <ul>
          <li>
            <Link to={`${match.url}/li1`}>路径是li1</Link>
          </li>
          <li>
            <Link to={`${match.url}/li2`}>路径是li2</Link>
          </li>
        </ul>
        {
          routes.map((route, key) => {
            if (route.exact) {
              return (
                <Route exact key={key} path={route.path} component={route.component} />
              )
            } else {
              return (
                <Route key={key} path={route.path} component={route.component} />
              )
            }
          })
        }
      </div>
    )
  }
}