import React, { Component } from "react";
//导入路由依赖和组件
import { Route, Link, Redirect, Switch } from "react-router-dom";
import User from "./User";

class App extends Component {
  render () {
    return (
      <>
        <ul>
          <li>
            <Link to="/user">用户中心</Link>
          </li>
        </ul>
        {/* 配置路由规则  exact表示精确匹配，防止匹配其他页面的时候匹配到/，也就是首页*/}
        {/* Switch表示如果匹配到了路由，就不再往下面匹配了，如果不写Switch，则一直会匹配到404页面 */}
        <Switch>
          {/* 如果访问个人中心页面，则重定向到列表页面 */}
          <Redirect from="/user" to="/list"></Redirect>
          {/* 没有写path表示匹配到所有的路径 */}
          <Route component={Error}></Route>
        </Switch>
      </>
    );
  }
}
export default App;
