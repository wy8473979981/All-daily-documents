import request from '../util/request';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise
import { message } from 'antd';

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

      try { // 加入 try catch 捕获抛错
        const { call, put } = sagaEffects;
        const endPointURI = '/api/random_joke';

        const puzzle = yield call(request, endPointURI);

        yield put({ type: 'addNewCard', payload: puzzle });

        yield call(delay, 3000);

        const puzzle2 = yield call(request, endPointURI);

        yield put({ type: 'addNewCard', payload: puzzle2 });
      } catch (e) {
        message.error('数据获取失败'); // 打印错误信息
      }

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