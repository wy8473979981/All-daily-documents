import React, { Component } from 'react';
import reduxStore from '@/redux-store'
import {
  addAction,
} from '@/redux-store/actionCreators.js';

class ReduxCpn extends Component {

  constructor(props){
    super(props)
    const storeState = reduxStore.getState()
    this.state = {
      count: storeState.counter,
      name: ''
    }
    reduxStore.subscribe(() => {
      this.setState({
        count: reduxStore.getState().counter
      })
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.testRedux.bind(this)}>测试Redux</button>
        <h2>{this.state.count}</h2>
      </div>
    );
  }

  testRedux(){
    const action = addAction(2)
    reduxStore.dispatch(action)
  }
}

export default ReduxCpn;
