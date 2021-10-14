import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import AppRouter from './router'

class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          {
            AppRouter.map((route, key) => {
              if (route.exact) {
                // 严格模式返回
                return (
                  <Route exact
                    key={key}
                    path={route.path}
                    render={props => (
                      //主要是为了传递嵌套路由到子组件
                      //类似于 <User {...props} routes={route.routes} />
                      <route.component {...props} routes={route.routes} />
                    )}
                  />
                )
              } else {
                return (
                  <Route
                    key={key}
                    path={route.path}
                    render={props => (
                      //主要是为了传递嵌套路由到子组件
                      //类似于 <User {...props} routes={route.routes} />
                      <route.component {...props} routes={route.routes} />
                    )}
                  />
                )
              }
            })
          }
        </div>
      </Router>
    );
  }
}

export default App;