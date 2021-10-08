import React from 'react';
import { connect } from 'react-redux'

// 无状态组件
const TodoList = (props) => {
  let { inputValue, inputChange, addListData, deleateItem } = props
  return (
    <div>
      <div>
        <input placeholder='请输入内容'
          value={inputValue}
          onChange={inputChange} />
        <button onClick={addListData}>提交</button>
      </div>
      <ul>
        {
          props.list.map((item, index) => {
            return (
              <li key={index} onClick={() => deleateItem(index)}>{item}</li>
            )
          })
        }
      </ul>
    </div>
  );
}

const stateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

const dispatchToProps = (dispatch) => {
  return {
    inputChange (e) {
      const action = {
        type: 'inputVlueChange',
        value: e.target.value
      }
      dispatch(action);
    },

    addListData () {
      const action = {
        type: 'addListData',
      }
      dispatch(action);
    },

    deleateItem (index) {
      const action = {
        type: 'deleateItem',
        value: index
      }
      dispatch(action);
    }
  }
}

export default connect(stateToProps, dispatchToProps)(TodoList);