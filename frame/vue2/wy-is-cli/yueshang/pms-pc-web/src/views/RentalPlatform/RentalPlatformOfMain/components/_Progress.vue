<template>
  <div class="progress-info">
    <div class="progress">
      <div  v-for="(item, index) in currentConfig" :class="['progress-item', { done: item.status === '1', active:  item.status === '2' }]" :key="index" @click="handleToOtherPage(item.redirectUrl, item.stepNo, item.status)">
        <div class="progress-item--circle">
          <span>{{item.stepNo}}</span>
          <el-tooltip placement="bottom" effect="light" v-if="unbindShow && item.redirectUrl && item.stepNo === '解约'">
            <div slot="content" class="content">
              <div class="content-item" @click="handleClick(item.redirectUrl)">到期解约</div>
              <div class="content-item" @click="handleClickBefore(item.redirectUrl)">提前解约</div>
            </div>
            <img class="progress-item--icon" src="@/assets/icons/add.png" />
          </el-tooltip>

          <img  v-if="unbindShow && item.redirectUrl && item.status === '2'" class="progress-item--icon" @click="handleClickToAdd(item.redirectUrl, item.status)" src="@/assets/icons/add.png" />
        </div>
        <div class="progress-item--time">{{item.realCompletedDate}}</div>
      </div>
    </div>

    <div class="progress-steps" v-if="showContract">
      <div class="progress-steps--item active"  @click="supplement(contractUrl)">
        <span>{{unbindShow ? '添加补充条款' : '补充条款'}}</span>
        <img v-if="unbindShow" class="progress-steps--icon" src="@/assets/icons/add.png" />
      </div>
      <div class="progress-steps--content">
        <div class="progress-steps--content-item" v-for="(item, index) in clauseArr" :key="index"  @click="supplement(item.redirectUrl)">
          <span class="progress-steps--content-code one-ellipsis">{{item.displayNo}}</span>
          <span class="progress-steps--content-status">已完成</span>
        </div>
      </div>
      <div class="progress-steps--item" @click="supplement(contractUrl)">
        <span>{{ (unbindShow && !contract) ? '添加装补合同' : '装补合同'}}</span>
        <img v-if="unbindShow && !contract" class="progress-steps--icon" src="@/assets/icons/add.png" />
      </div>
      <div class="progress-steps--content" v-if="contract">
        <div class="progress-steps--content-item" @click="supplement(contract.redirectUrl)">
          <span class="progress-steps--content-code one-ellipsis">{{contract.displayNo}}</span>
          <span class="progress-steps--content-status">已完成</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'Progress',

  props: {
    config: {
      type: Array,
      default: () => []
    },

    active: {
      type: [String, Number],
      default: ''
    },

    unbindShow: { // 解绑按钮显示
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      currentActive: this.active
    }
  },

  computed: {
    currentConfig() {
      return this.config
    },
    // authTypeCd=STGS_ZBHT 装补合同审批（通过合同号关联）  authTypeCd=SYGS_ZSGL_ZLHTYX_25补充条款审批（通过合同id关联）
    contract() {
      return this.config[2]?.resApproveDetailVoList?.find(item => item.authTypeCd == 'STGS_ZBHT') || null
    },
    clauseArr() {
      return this.config[2]?.resApproveDetailVoList?.filter(item => item.authTypeCd == 'SYGS_ZSGL_ZLHTYX_25') || []
    },
    contractUrl() {
      return 'http://pd.powerlong.com/res/res-approve-info.action' // this.config[2]?.redirectUrl || ''
    },
    showContract() {
      return this.config[2]?.status === '1'
    }
  },

  methods: {
    handleToOtherPage(url, name, status) { // 已完成，点击 ⭕️ 去详情页面
      if (status === '1' && url) {
        window.open(url)
      }
    },

    handleClickToAdd(url, status) { // 进行中点击 + 去新增
      if (url && status === '2'){
        window.open(url)
      }
    },

    supplement(url) { // 合同 已经进行了， 补充信息
      if (this.unbindShow && url) {
        window.open(url)
      }
    },
    handleClick(url) { // 进行捷星
      console.log('到期')
      this.$emit('click', '到期')
      window.open(url)
    },

    handleClickBefore(url) {
      console.log('提前')
      this.$emit('click', '提前')
      window.open(url)
    }
  },

  watch: {
    active(val) {
      this.currentActive = val
    }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &-item {
    width: 82px;
    height: 82px;
    font-size: 14px;
    border-radius: 50%;
    box-sizing: border-box;
    background: #BECBD2;
    border: 6px solid #DAE7EE;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
      &:after {
        display: none;
      }
    }

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      margin-top: -2px;
      right: -50px;
      height: 4px;
      width: 44px;
      background-color: #DFE4E7;
    }

    &--icon {
      height: 40px;
      width: 40px;
      position: absolute;
      top: -10px;
      right: -16px;
      cursor: pointer;
    }
    
    &--time {
      position: absolute;
      bottom: -28px;
      left: -15%;
      font-size: 14px;
      width: 130%;
      text-align: center;
    }
  }

  &-item.done {
    background-color: #D5E4F3;
    border-color: #9ABBDD;
  }

  &-item.active {
    background-color: #8BB2DA;
    border-color: #C3E0FF;

    &--circle {
      color: #fff;
    }
  }
}

.progress-steps {
  display: flex;
  flex-direction: column;
  padding-left: 260px;
  margin-top: 50px;

  &--item {
    position: relative;
    display: flex;
    align-items: center;
    color: $subMenuHover;
    cursor: pointer;
    font-size: 14px;

    &:before {
      content: '';
      width: 24px;
      height: 24px;
      border-radius: 50%;
      box-sizing: border-box;
      border: 6px solid #9ABBDD;
      display: block;
      margin-right: 10px;
    }

    &.active::before {
      background-color: #D5E4F3;
    }
  }

  &--content {
    min-height: 46px;
    border-left: 4px solid #DFE4E7;
    margin-left: 10px;
    padding-left: 28px;
    display: flex;
    flex-wrap: wrap;

    &-item {
      background: rgba(181, 212, 224, 0.17);
      height: 34px;
      line-height: 34px;
      font-size: 14px;
      padding: 0 14px;
      border-radius: 16px;
      margin-right: 8px;
      margin-bottom: 8px;
      display: flex;
      cursor: pointer;
    }

    &-code {
      color: $activeColor;
      margin-right: 16px;
      max-width: 140px;
    }
    &-status {
      color: $font-word-color;
    }
  }

  &--icon {
    height: 20px;
    width: 20px;
  }
}

::v-deep.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 0;
    cursor: pointer;

    &-item {
      height: 32px;
      line-height:32px;
      padding: 0 10px;

      &:hover {
        background: $subMenuBg;
      }
    }
  }

</style>