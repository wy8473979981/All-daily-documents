import request from '../util/request';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise

const delay = (millisecond) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
};

export default {
  namespace: 'puzzlecards',
  state: {
    data: [],
    counter: 0,
  },
  effects: {
    *queryInitCards (_, sagaEffects) {
      const { call, put } = sagaEffects;
      const endPointURI = '/api/random_joke';
      debugger
      const puzzle = yield call(request, endPointURI);
      debugger
      yield put({ type: 'addNewCard', payload: puzzle });
      debugger
      yield call(delay, 3000);
      debugger
      const puzzle2 = yield call(request, endPointURI);
      debugger
      yield put({ type: 'addNewCard', payload: puzzle2 });
      debugger
    }
  },
  reducers: {
    addNewCard (state, { payload: newCard }) {
      const nextCounter = state.counter + 1;
      const newCardWithId = { ...newCard, id: nextCounter };
      const nextData = state.data.concat(newCardWithId);
      return {
        data: nextData,
        counter: nextCounter,
      };
    }
  },
};