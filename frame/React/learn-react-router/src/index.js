import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//引入路由依赖，并起一个别名，因为原先的名字太长了
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from 'react-redux'
import ReacReduxStore from '@/react-redux-store/index'

ReactDOM.render(
  <Router>
    <Provider store={ReacReduxStore}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
