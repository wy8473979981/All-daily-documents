// import React from 'react';
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
// const ThemeContext = React.createContext('light');
// ThemeContext.displayName = 'MyDisplayName';
// class App extends React.Component {
//   render () {
//     // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
//     // 无论多深，任何组件都能读取这个值。
//     // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
//     return (
//       <ThemeContext.Provider value="dark">
//         <Toolbar />
//       </ThemeContext.Provider>
//     );
//   }
// }
// // 中间的组件再也不必指明往下传递 theme 了。
// function Toolbar () {
//   return (
//     <div>
//       <ThemedButton />
//     </div>
//   );
// }
// class ThemedButton extends React.Component {
//   // 指定 contextType 读取当前的 theme context。
//   // React 会往上找到最近的 theme Provider，然后使用它的值。
//   // 在这个例子中，当前的 theme 值为 “dark”。

//   static contextType = ThemeContext;//必须有这一步，this.context才有值 ，或者 <MyContext.Consumer> 包裹
//   render () {
//     console.log('contextType', this.contextType)
//     console.log('this.context', this.context)
//     return <div theme={this.context} />;
//   }
// }
// 三种使用context写法
// 1.static contextType = ThemeContext;   this.context
// 2.<MyContext.Consumer>  ;  value
// 3.ThemedButton.contextType = ThemeContext;  this.context


// ThemedButton.contextType = ThemeContext; // 或者在这里绑定contextType
// export default ThemedButton; // 一个文件中只有一个默认导出

// export default App;

import React, { useContext } from 'react';
const themes = {
  light: {
    foreground: "#000000",
    background: "pink"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};
const themesFont = {
  small: {
    fontSize: '20px'
  },
  big: {
    fontSize: '80px'
  }
};
const ThemeContext = React.createContext(themes.light);
const ThemeFontContext = React.createContext(themesFont.big);
function App () {
  return (
    <ThemeContext.Provider value={themes.light}>
      <ThemeFontContext.Provider value={themesFont.small}>
        <Toolbar />
      </ThemeFontContext.Provider>
    </ThemeContext.Provider >
  );
}
function Toolbar (props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
function ThemedButton () {
  const theme = useContext(ThemeContext);
  const themesFont = useContext(ThemeFontContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      <span style={{ fontSize: themesFont.fontSize }}>I am styled by theme context!</span>
    </button>
  );
}
export default App;



// import React, { useContext, useState } from "react";
// const MyContext = React.createContext();
// function Demo5 () {
//   const [value, setValue] = useState("init");
//   const [time, setTime] = useState("init");
//   console.log("Demo5");
//   return (
//     <div>
//       {(() => {
//         console.log("render");
//         return null;
//       })()}
//       <button onClick={() => {
//         console.log('click：更新value')
//         setValue(`${Date.now()}_newValue`)
//       }}>
//         改变value
//       </button>
//       <button onClick={() => {
//         console.log('click：更新time')
//         setTime(`${Math.random()}`)
//       }}>
//         改变time
//       </button>
//       <MyContext.Provider value={value} time={time}>
//         <Child1 />
//         <Child2 />
//       </MyContext.Provider>
//     </div>
//   );
// }
// function Child1 () {
//   const value = useContext(MyContext);
//   console.log("Child1-value", value);
//   return <div>Child1-value: {value}</div>;
// }
// function Child2 () {
//   console.log('Child2')
//   const time = useContext(MyContext);
//   console.log("Child2-value", time);
//   return <div>Child2: {time}</div>;
// }
// export default Demo5

