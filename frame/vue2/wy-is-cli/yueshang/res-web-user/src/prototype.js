import router from './router/index'

const timeoutRouter = {
  push (target, time = 1000) {
    // console.log(target, time, router, '---router')
    setTimeout(() => {
      router.push(target)
    }, time)
  }
}

export default timeoutRouter
