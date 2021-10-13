// import React, { useContext } from 'react';
// const themes = {
//   light: {
//     foreground: "#000000",
//     background: "pink"
//   },
//   dark: {
//     foreground: "#ffffff",
//     background: "#222222"
//   }
// };

// const ThemeContext = React.createContext(themes.light);

// function App() {
//   return (
//     <ThemeContext.Provider value={themes.light}>
//       <Toolbar />
//     </ThemeContext.Provider>
//   );
// }

// function Toolbar(props) {
//   return (
//     <div>
//       <ThemedButton />
//     </div>
//   );
// }

// function ThemedButton() {
//   const theme = useContext(ThemeContext);
//   return (
//     <button style={{ background: theme.background, color: theme.foreground }}>
//       I am styled by theme context!
//     </button>
//   );
// }
// export default App;

import React, { useContext, useState } from "react";
const MyContext = React.createContext();
function Demo5 () {
  const [value, setValue] = useState("init");
  const [time, setTime] = useState("init");
  console.log("Demo5");
  return (
    <div>
      {(() => {
        console.log("render");
        return null;
      })()}
      <button onClick={() => {
        console.log('click：更新value')
        setValue(`${Date.now()}_newValue`)
      }}>
        改变value
      </button>
      <button onClick={() => {
        console.log('click：更新time')
        setTime(`${Math.random()}`)
      }}>
        改变time
      </button>
      <MyContext.Provider value={value} time={time}>
        <Child1 />
        <Child2 />
      </MyContext.Provider>
    </div>
  );
}

function Child1 () {
  const value = useContext(MyContext);
  console.log("Child1-value", value);
  return <div>Child1-value: {value}</div>;
}

function Child2 (props) {
  console.log('Child2')
  const time = useContext(MyContext);
  console.log("Child1-value", time);
  return <div>Child2: {time}</div>;
}

export default Demo5

