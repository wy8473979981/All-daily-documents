import React, { Component } from 'react';
import { Button } from 'antd';

// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Redux1 extends Component {
  // static propTypes = {
  //   themeColor: PropTypes.string,
  //   onSwitchColor: PropTypes.func
  // }
  // constructor(props) {
  //   super(props)
  //   this.state = { themeColor: '' }
  // }
  // handleSwitchColor (color) {
  //   if (this.props.onSwitchColor) {
  //     // dispatch action 去改变颜色
  //     this.props.onSwitchColor(color)
  //   }
  // }

  render () {

    const { themeColor, count, onSwitchColor, addAction } = this.props;
    debugger
    return (
      <div>
        <p style={{ color: themeColor }}>color change</p>
        <Button
          style={{ color: themeColor }}
          onClick={() => onSwitchColor('red')}>Red</Button>
        <Button
          style={{ color: themeColor }}
          onClick={() => onSwitchColor('pink')}>Blue</Button>

        <br />

        <div>
          <button onClick={() => addAction(1)}>测试Redux</button>
          <h2>{count}</h2>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    themeColor: state.ColorReducers.themeColor,
    count: state.CountReducers.counter
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({ type: 'CHANGE_COLOR', themeColor: color })
    },
    addAction: (num) => {
      dispatch({ type: 'ADD_NUMBER', num: num })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Redux1);