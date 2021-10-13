import React, { useState, useEffect } from 'react';

function UseEffect() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    console.log(count,'count')
    document.title = `You clicked ${count} times`;
  });
  useEffect(() => {
    console.log("订阅一些事件");
    return () => {
      console.log("执行清除操作")
    }
  },[]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default UseEffect;