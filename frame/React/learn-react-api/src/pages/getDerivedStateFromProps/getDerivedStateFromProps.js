import React from "react";

function App() {
  return (
    <div className="App">
      <AAA />
    </div>
  );
}

class AAA extends React.Component {
  state = {
    age: 666
  };

  add = () => {
    this.setState({ age: this.state.age + 1 });
  };

  render() {
    return (
      <div>
        <ChildA onChangeParent={this.add} age={this.state.age} />
      </div>
    );
  }
}

class ChildA extends React.Component {
  state = {
    num: 888
  };
 	// 根据新的属性对象派生状态对象    
  // nextProps——新的属性对象 prevState——旧的状态对象
  static getDerivedStateFromProps(nextprops, state) {
    console.log('props',nextprops);
    // 返回一个对象来更新 state 或者返回 null 来表示接收到的 props 不需要更新 state 
    if (nextprops.age !== state.age) {
      console.log("更新吧");
      return {
        onChangeParent:nextprops.onChangeParent,
        age: nextprops.age,
        // 注意：这里不需要把组件自身的状态也放进来
        // num:state.num
      };
    }
    return null;
  }

  add = () => {
    this.setState({ num: this.state.num + 1 });
  };
  render() {
    const { onChangeParent } = this.state;
    console.log('state',this.state);
    return (
      <>
        <div onClick={onChangeParent}>change</div>
        <div onClick={this.add}>add</div>
      </>
    );
  }
}

export default App;
