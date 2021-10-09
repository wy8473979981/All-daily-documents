import React, { Component } from "react";
//导入路由依赖和组件
import { Route, Link } from "react-router-dom";
import Reg from "./pages/User/Reg";
import Login from "./pages/User/Login";

class User extends Component {
  render() {
    return (
      <>
        <h1>用户中心</h1>
        <ul>
          <li>
            <Link to="/user/reg">注册</Link>
          </li>
          <li>
            <Link to="/user/login">登录</Link>
          </li>
        </ul>

        {/* 配置路由 */}
        <Route path="/user/reg" component={Reg}></Route>
        <Route path="/user/login" component={Login}></Route>
      </>
    );
  }
}
export default User;
