import {
  ADD_NUMBER
} from './constants.js'

const addAction = (count) => ({
  type: ADD_NUMBER,
  count: count
});

export {
  addAction
}