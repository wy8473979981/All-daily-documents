import { Effect, Reducer } from 'umi';

export interface ItemModelState {
  name: string;
}

export interface ItemModelType {
  namespace: 'item';
  state: ItemModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<ItemModelState>;
  };
}

const ItemModel: ItemModelType = {
  namespace: 'item',

  state: {
    name: 'item',
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

export default ItemModel;