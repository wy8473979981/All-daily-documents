import React, { Component } from "react";
//导入路由依赖和组件
import { Route, Link, Redirect, Switch } from "react-router-dom";
import Refs from "./pages/Refs/Refs";
import useState from "./pages/Hook/useState";
import useEffect from "./pages/Hook/useEffect";
import useContext from "./pages/Hook/useContext";
import useReducer from "./pages/Hook/useReducer";
import InputBind from "./pages/Hook/use-hook/InputBind";
import Redux1 from "./pages/redux/redux-1";
import Redux2 from "./pages/redux/react-redux-2";
import ReactReduxModule1 from "./pages/redux/react-redux-module-1";
import ReactReduxModule2 from "./pages/redux/react-redux-module-2";
import List from "./List";
import User from "./User";
import Detail from "./Detail";
import Error from "./pages/404/404";

class App extends Component {
  render () {
    return (
      <>
        <ul>
          <li>
            <Link to="/">Refs 转发</Link>
          </li>
          <li>
            <Link to="/useState">useState</Link>
          </li>
          <li>
            <Link to="/useEffect">useEffect</Link>
          </li>
          <li>
            <Link to="/useContext">useContext</Link>
          </li>
          <li>
            <Link to="/useReducer">useReducer</Link>
          </li>
          <li>
            <Link to="/inputBind">use-hook-InputBind</Link>
          </li>
          <li>
            <Link to="/Redux1">Redux使用</Link>
          </li>
          <li>
            <Link to="/Redux2">React-Redux使用</Link>
          </li>
          <li>
            <Link to="/ReactReduxModule1">ReactReduxModule1</Link>
          </li>
          <li>
            <Link to="/ReactReduxModule2">ReactReduxModule2</Link>
          </li>
          <li>
            <Link to="/list">列表页</Link>
          </li>
          <li>
            <Link to="/user">用户中心</Link>
          </li>
        </ul>
        {/* 配置路由规则  exact表示精确匹配，防止匹配其他页面的时候匹配到/，也就是首页*/}
        {/* Switch表示如果匹配到了路由，就不再往下面匹配了，如果不写Switch，则一直会匹配到404页面 */}
        <Switch>
          {/* 如果访问个人中心页面，则重定向到列表页面 */}
          <Redirect from="/user" to="/list"></Redirect>
          <Route path="/" exact component={Refs}></Route>
          <Route path="/useState" exact component={useState}></Route>
          <Route path="/useEffect" exact component={useEffect}></Route>
          <Route path="/useContext" exact component={useContext}></Route>
          <Route path="/useReducer" exact component={useReducer}></Route>
          <Route path="/inputBind" exact component={InputBind}></Route>
          <Route path="/Redux1" exact component={Redux1}></Route>
          <Route path="/Redux2" exact component={Redux2}></Route>
          <Route path="/ReactReduxModule1" exact component={ReactReduxModule1}></Route>
          <Route path="/ReactReduxModule2" exact component={ReactReduxModule2}></Route>
          <Route path="/list" component={List}></Route>
          <Route path="/user" component={User}></Route>
          <Route path="/detail/:id" component={Detail}></Route>
          {/* 没有写path表示匹配到所有的路径 */}
          <Route component={Error}></Route>
        </Switch>
      </>
    );
  }
}
export default App;
