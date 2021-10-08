import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeRandom } from '@/react-redux-store-module/module2/actionCreators';

class ReactReduxModule2 extends Component {
  // eslint-disable-next-line no-useless-constructor
  // constructor(props){
  //   super(props)
  // }

  render() {
    let { random, changeRandom } = this.props;
    debugger
    return (
      <div>
        <button onClick={changeRandom}>react-redux-module-2---测试Redux</button>
        <h2>{random}</h2>
      </div>
    );
  }
}

const stateToProps = (state) => {
  debugger
  return {
    random: state.random
  }
}

const dispatchToProps = (dispatch) => {
  return {
    changeRandom (e) {
      const action = changeRandom(Math.random())
      dispatch(action)
    },
  }
}

export default connect(stateToProps, dispatchToProps)(ReactReduxModule2);

