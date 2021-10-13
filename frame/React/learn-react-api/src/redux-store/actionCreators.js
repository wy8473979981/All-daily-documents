import {
  ADD_NUMBER,
  SUB_NUMBER
} from './constants.js'

const addAction = (count) => ({
  type: ADD_NUMBER,
  num: count
});

const subAction = (count) => ({
  type: SUB_NUMBER,
  num: count
})

export {
  addAction,
  subAction
}