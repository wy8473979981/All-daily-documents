import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addAction } from '@/react-redux-store-module/module1/actionCreators';

class ReactReduxModule1 extends Component {
  // eslint-disable-next-line no-useless-constructor
  // constructor(props) {
  //   super(props)
  // }
  static propTypes = {
    count: PropTypes.number,
    addAction: PropTypes.func
  }


  render () {
    let { count, addAction } = this.props;
    return (
      <div>
        <button onClick={addAction}>react-redux-module-1---测试Redux</button>
        <h2>{count}</h2>
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    count: state.count
  }
}

const dispatchToProps = (dispatch) => {
  return {
    addAction (e) {
      const action = addAction(1)
      dispatch(action)
    },
  }
}

export default connect(stateToProps, dispatchToProps)(ReactReduxModule1);
