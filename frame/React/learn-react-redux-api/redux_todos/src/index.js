/**
 * Created by mapbar_front on 2017/6/6.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducer/reducer';
import Main from "./components/Main";
const store = createStore(todoApp);
render(<Provider store={store}><Main /></Provider>,document.getElementById('root'));

