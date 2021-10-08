import {
  MATH_RANDOM
} from './constants.js'

const changeRandom = (random) => ({
  type: MATH_RANDOM,
  random: random
});


export {
  changeRandom
}