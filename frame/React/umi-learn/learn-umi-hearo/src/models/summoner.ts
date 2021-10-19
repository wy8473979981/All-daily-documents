import { Effect, Reducer } from 'umi';

export interface SummonerModelState {
  name: string;
}

export interface SummonerModelType {
  namespace: 'summoner';
  state: SummonerModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<SummonerModelState>;
  };
}

const SummonerModel: SummonerModelType = {
  namespace: 'summoner',

  state: {
    name: 'summoner',
  },

  effects: {
    *query({ payload }, { call, put }) {

    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default SummonerModel;