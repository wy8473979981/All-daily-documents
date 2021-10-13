// import React, { Component } from "react";
// //使用Link
// import { Link } from "react-router-dom";
// class List extends Component {
//   render() {
//     return (
//       <>
//         <h1>列表页</h1>
//         <ul>
//           <li>
//             <Link to="/detail/1">第一号商品</Link>
//           </li>
//           <li>
//             <Link to="/detail/2">第二号商品</Link>
//           </li>
//           <li>
//             <Link to="/detail/3">第三号商品</Link>
//           </li>
//         </ul>
//       </>
//     );
//   }
// }
// export default List;

// 编程式路由
import React, { Component } from "react";
//使用Link
import { Link } from "react-router-dom";
//引入
import { createBrowserHistory } from "history";
//生成history
let history = createBrowserHistory({
  //配置强制刷新，如果不刷新，则没反应，需要手动刷新才会跳转
  forceRefresh: true,
});
class List extends Component {
  render() {
    return (
      <>
        <h1>列表页</h1>
        <ul>
          <li>
            <Link to="/detail/1">第一号商品</Link>
          </li>
          <li>
            <Link to="/detail/2">第二号商品</Link>
          </li>
          <li>
            <Link to="/detail/3">第三号商品</Link>
          </li>
          <p>......</p>
          {/* 在history中可以使用push方法进行跳转 */}
          <button onClick={() => history.push("/detail/100")}>
            第一百号商品
          </button>
        </ul>
      </>
    );
  }
}
export default List;
