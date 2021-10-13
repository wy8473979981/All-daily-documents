import React, { useState } from "react";

// function UseState() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button
//         onClick={() => {
//           console.log("click-setCount");
//           setCount(count + 1);
//         }}
//       >
//         click-setCount
//       </button>
//     </div>
//   );
// }

function Counter({initialCount}) {
  const [count, setCount] = useState(0);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}

export default Counter;