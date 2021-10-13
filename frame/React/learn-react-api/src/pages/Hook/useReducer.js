
import React, { useReducer } from "react";
const initialState = {count: 0};
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
export default Counter;


// import React, { useEffect, useReducer, useCallback } from "react";
// const fetchReducer = (state, action) => {
//   switch (action.type) {
//     case "FETCH_INIT":
//       return {
//         ...state,
//         loading: true,
//         error: false
//       };
//     case "FETCH_SUCCESS":
//       return {
//         ...state,
//         loading: false,
//         error: false,
//         data: action.payload
//       };
//     case "FETCH_FAIL":
//       return {
//         ...state,
//         loading: false,
//         error: true
//       };
//     default:
//       throw new Error();
//   }
// };
// function Loading ({ loading, children }) {
//   return loading ? <div>loading...</div> : children;
// }
// function Demo6 () {
//   const [state, dispatch] = useReducer(fetchReducer, {
//     loading: false,
//     error: false,
//     msg: "",
//     data: {}
//   });
//   const getData = useCallback(async () => {
//     try {
//       dispatch({ type: "FETCH_INIT" });
//       // const response = await fetch(
//       //   "https://www.mxnzp.com/api/lottery/common/latest?code=ssq"
//       // );
//       // const res = await response.json();
//       let res = null;
//       setTimeout(()=>{
//         res = { code: 200, data: {openCode: 'openCode'}, msg: 'success' }
//         if (res.code) {
//           dispatch({ type: "FETCH_SUCCESS", payload: res.data });
//         } else {
//           dispatch({ type: "FETCH_FAIL", payload: res.msg });
//         }
//       },2000)
//     } catch (error) {
//       dispatch({ type: "FETCH_FAIL", payload: error });
//     }
//   }, []);
//   useEffect(() => {
//     getData();
//   }, [getData]);
//   return (
//     <Loading loading={state.loading}>
//       <p>开奖号码： {state.data.openCode}</p>
//     </Loading>
//   );
// }
// export default Demo6;


// useContext 和 useReducer模拟redux管理状态
// import React, { useReducer, useContext } from "react";
// const ModalContext = React.createContext();
// const visibleReducer = (state, action) => {
//   switch (action.type) {
//     case "CREATE":
//       return { ...state, ...action.payload };
//     case "EDIT":
//       return { ...state, ...action.payload };
//     default:
//       return state;
//   }
// };
// function Demo7 () {
//   const initModalVisible = {
//     create: false,
//     edit: false
//   };
//   const [state, dispatch] = useReducer(visibleReducer, initModalVisible);
//   return (
//     <ModalContext.Provider value={{ visibles: state, dispatch }}>
//       <Demo7Child />
//     </ModalContext.Provider>
//   );
// }
// function Demo7Child () {
//   return (
//     <div>
//       Demo7Child
//       <Detail />
//     </div>
//   );
// }
// function Detail () {
//   const { visibles, dispatch } = useContext(ModalContext);
//   console.log("contextValue", visibles);
//   return (
//     <div>
//       <p>create: {`${visibles.create}`}</p>
//       <button
//         onClick={() => dispatch({ type: "CREATE", payload: { create: true } })}
//       >
//         打开创建modal
//       </button>
//       <button
//         onClick={() => dispatch({ type: "EDIT", payload: { create: false } })}
//       >
//         关闭创建modal
//       </button>
//     </div>
//   );
// }
// export default Demo7;

