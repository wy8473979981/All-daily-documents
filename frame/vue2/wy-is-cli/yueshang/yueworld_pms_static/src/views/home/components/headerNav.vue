<template>
  <div class="header-nav">
    <div
      v-for="(item, index) in navList"
      :key="index"
      :class="item.active ? 'active' : ''"
      @click="handleNavClick(item.title, index)"
    >
      {{ item.title }}
    </div>
    <div class="nav">
      <div class="arrow" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 1,
      deg: 0,
      navList: [
        { title: 'AMP', active: false },
        { title: '排名', active: true },
        { title: '列表', active: false },
        { title: '地图', active: false }
      ]
    }
  },
  methods: {
    handleNavClick(title, index) {
      const self = this
      // 获取箭头
      const dom = document.querySelector('.nav .arrow')
      // 处理箭头偏离
      if (index === 1) {
        dom.style.top = '46%'
      } else {
        dom.style.top = '50%'
      }
      // 处理旋转问题
      if (index - self.index === 1 || index - self.index === -3) {
        dom.style.transform = `rotate(${self.deg - 90}deg)`
        self.deg -= 90
      } else if (index - self.index === -1 || index - self.index === 3) {
        dom.style.transform = `rotate(${self.deg + 90}deg)`
        self.deg += 90
      } else if (index - self.index === 2 || index - self.index === -2) {
        dom.style.transform = `rotate(${self.deg - 180}deg)`
        self.deg -= 180
      }
      self.index = index
      self.navList.forEach(ele => {
        if (ele.title === title) {
          ele.active = true
          return
        }
        ele.active = false
      })
      this.$emit('handleShow', title)
    }
  }
}
</script>
<style lang="scss" scoped>
.header-nav {
    width: 150px;
    height: 120px;
    padding: 20px;
    position: relative;
    div {
        width: 44px;
        line-height: 24px;
        border-radius: 12px;
        position: absolute;
        font-size: $font-base-size;
        color: $font-word-color;
        cursor: pointer;
        text-align: center;
        &.active {
            background: #1C4C7F;
            color: #fff;
        }
        &:nth-child(1) {
            left: 50%;
            transform: translateX(-50%);
            top: 0;
        }
        &:nth-child(2) {
            top: 50%;
            transform: translateY(-50%);
            left: 0;
        }
        &:nth-child(3) {
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
        }
        &:nth-child(4) {
            top: 50%;
            transform: translateY(-50%);
            right: 0;
        }
    }
    .nav {
        position: absolute;
        width: 56px;
        height: 56px;
        background-color: #fff;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 3px 0 #000;
        position: relative;
        .arrow {
            width: 0;
            height: 0;
            border-top: 3px solid transparent;
            border-right: 28px solid #1C4C7F;
            border-bottom: 3px solid transparent;
            border-radius: 0;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            transform-origin: 28px 2px;
            transition: all .5s linear;
        }
    }
}
</style>
