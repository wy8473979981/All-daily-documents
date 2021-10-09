import React, { Component } from "react";
class Refs extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <App />
      </>
    );
  }
}

function refHoc(Component) {
  class RefHoc extends React.Component {
    render() {
      const { forwardedRef, ...rest } = this.props;
      return <Component forwardedRef={forwardedRef} {...rest} />;
    }
  }
  return React.forwardRef((props, ref) => {
    // 高阶组件转发 ref 的核心
    return <RefHoc {...props} forwardedRef={ref} />;
  });
}

class MyInput extends React.Component {
  render() {
    return <input type="text" ref={this.props.forwardedRef} />;
  }
}

const MyInput2 = refHoc(MyInput);

function App() {
  // Refs 转发
  const ref = React.createRef();
  return (
    <div>
      <button
        onClick={() => {
          ref.current.focus();
        }}
      >
        点击
      </button>
      <MyInput2 ref={ref} />
    </div>
  );
}

export default Refs;
