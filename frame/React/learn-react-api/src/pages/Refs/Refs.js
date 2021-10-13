// import React, { Component } from "react";
// class Refs extends Component {
//   // eslint-disable-next-line no-useless-constructor
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <>
//         <App />
//       </>
//     );
//   }
// }
// function refHoc(Component) {
//   class RefHoc extends React.Component {
//     render() {
//       const { forwardedRef, ...rest } = this.props;
//       return <Component forwardedRef={forwardedRef} {...rest} />;
//     }
//   }
//   return React.forwardRef((props, ref) => {
//     // 高阶组件转发 ref 的核心
//     return <RefHoc {...props} forwardedRef={ref} />;
//   });
// }

// class MyInput extends React.Component {
//   render() {
//     return <input type="text" ref={this.props.forwardedRef} />;
//   }
// }
// const MyInput2 = refHoc(MyInput);
// function App() {
//   // Refs 转发
//   const ref = React.createRef();
//   return (
//     <div>
//       <button
//         onClick={() => {
//           ref.current.focus();
//         }}
//       >
//         点击
//       </button>
//       <MyInput2 ref={ref} />
//     </div>
//   );
// }

// export default Refs;

// import React, { useRef } from "react";
// function TextInputWithFocusButton () {
//   const inputEl = useRef(null);
//   const onButtonClick = () => {
//     // `current` 指向已挂载到 DOM 上的文本输入元素
//     inputEl.current.focus();
//   };
//   return (
//     <>
//       <input ref={inputEl} type="text" />
//       <button onClick={onButtonClick}>Focus the input</button>
//     </>
//   );
// }
// export default TextInputWithFocusButton;


// 转发ref
// import React, { useRef, forwardRef } from "react";
// const Index = () => {
//   const inputEl = useRef(null);
//   const handleFocus = () => {
//     inputEl.current.focus();
//   };
//   return (
//     <>
//       <Child ref={inputEl} />
//       <button onClick={handleFocus}>Focus</button>
//     </>
//   );
// };

// const Child = forwardRef((props, ref) => {
//   return <input ref={ref} />;
// });
// export default Index;


// import React, { useRef, useState, forwardRef, useEffect, useImperativeHandle } from "react";
// const Index = () => {
//   const inputEl = useRef();
//   useEffect(() => {
//     console.log(inputEl.current.someValue);
//     // test
//   }, []);
//   const changeValue = () => {
//     inputEl.current.setValue((val) => {
//       return val + 1
//     })
//   }
//   // const [count, setCount] = useState(0)
//   // const countRef = useRef(0)
//   // useEffect(() => {
//   //   console.log('use effect...', count)
//   //   const timer = setInterval(() => {
//   //     console.log('timer...count:', countRef.current)
//   //     setCount(++countRef.current)
//   //   }, 1000)
//   //   return () => clearInterval(timer)
//   // }, [])
//   return (
//     <>
//       <Child ref={inputEl} />
//       <button onClick={() => changeValue()}>累加子组件的value</button>
//     </>
//   );
// };
// const Child = forwardRef((props, ref) => {
//   const inputRef = useRef();
//   const [value, setValue] = useState(4);
//   useImperativeHandle(ref, () => ({
//     setValue,
//     someValue: "test"
//   }));
//   return (
//     <>
//       <div>child-value:{value}</div>
//       <input ref={inputRef} />
//     </>
//   );
// });
// export default Index;


import React, { useRef, useState, useEffect } from "react";
const Hook = () => {
  const [count, setCount] = useState(0)
  const btnRef = useRef(null)

  useEffect(() => {
    console.log('use effect...')
    let bRef = btnRef.current;
    const onClick = () => {
      setCount(count + 1)
    }
    bRef.addEventListener('click', onClick, false)
    return () => {
      console.log('移除 use effect...')
      return bRef.removeEventListener('click', onClick, false)
    }
  }, [count])

  return (
    <div>
      <div>
        {count}
      </div>
      <button ref={btnRef}>click me </button>
    </div>
  )
}
export default Hook;