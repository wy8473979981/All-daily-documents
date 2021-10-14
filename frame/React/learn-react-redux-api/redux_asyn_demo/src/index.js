/**
 * Created by mapbar_front on 2017/6/8.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./reducers/reducer"
import App from "./containers/App";
const loggerMiddleware = createLogger();


import {fetchPosts} from './actions/action'
const store = createStore(rootReducer,applyMiddleware(thunkMiddleware,loggerMiddleware));
//store.dispatch(fetchPosts('reactjs')).then(()=> console.log(store.getState()))
render(<Provider store={store}><App /></Provider>,document.getElementById("root"));