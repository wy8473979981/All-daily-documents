<template>
  <div class="branddetails">
    <div class="left">
      <div class="rightxian" />

      <div v-for="(e,i) in tabList" :key="i" :class="tabFlag == i ? 'every active':'every'" @click="tabFlag = i">
        <span>{{ e }}</span>
      </div>

    </div>
    <div class="right">

      <div class="top">
        <button class="submit">提交OA审批</button>
        <button class="submit">提交修改</button>
        <button class="submit cancel">取消</button>
      </div>
      <el-tabs v-model="activeName" class="tabs">
        <el-tab-pane label="基本信息" name="first">
          <el-form class="colum">
            <div class="df">
              <div class="form">
                <el-form-item label="项目名称" required class="deleft">
                  <el-input
                    v-model="brandName"
                    placeholder="上海七宝"
                  />
                </el-form-item>
                <el-form-item label="品牌名">
                  <el-input
                    v-model="otherName"
                    placeholder="宝龙"
                  />
                </el-form-item>
                <el-form-item label="统收类型" required class="deleft">
                  <el-input
                    v-model="province"
                    placeholder="请输入"
                  />
                </el-form-item>
                <el-form-item label="合同签署" required class="deleft">
                  <el-input
                    v-model="nature"
                    placeholder="两方"
                  />
                </el-form-item>
              </div>
              <div class="form">
                <el-form-item label="合同名称" required class="deleft">
                  <el-input
                    v-model="code"
                    placeholder="请输入品牌品牌编码"
                  />
                </el-form-item>
                <el-form-item label="签约业务" required class="deleft">
                  <el-input
                    v-model="chain"
                    placeholder="请输入品牌品牌编码"
                  />
                </el-form-item>
                <el-form-item label="文本类型" required class="deleft">
                  <el-input
                    v-model="city"
                    placeholder="请输入主要城市分布"
                  />
                </el-form-item>
              </div>
              <div class="form">
                <el-form-item label="意向协议">
                  <el-input
                    v-model="alias"
                    placeholder="请输入品牌别名"
                  />
                </el-form-item>
                <el-form-item label="经营状态" required class="deleft">
                  <el-input
                    v-model="mode"
                    placeholder="请输入品牌别名"
                  />
                </el-form-item>
                <el-form-item label="合同属性" required class="deleft">
                  <el-input
                    v-model="money"
                    placeholder="请输入客单价(元)"
                  />
                </el-form-item>
              </div>
              <div class="form">
                <el-form-item label="商家名称" required class="deleft">
                  <el-input
                    v-model="leave"
                    placeholder="请输入集团名称"
                  />
                </el-form-item>
                <el-form-item label="计税类型" required class="deleft">
                  <el-input
                    v-model="jtname"
                    placeholder="请输入集团名称"
                  />
                </el-form-item>
                <el-form-item label="合同签署" required class="deleft">
                  <el-input
                    v-model="phone"
                    placeholder="请输入合同签署"
                  />
                </el-form-item>
              </div>
            </div>

          </el-form>
        </el-tab-pane>
      </el-tabs>

      <el-tabs v-model="activeName" class="tabs">
        <el-tab-pane label="商务信息" name="first" class="t">
          <el-form class="colum">
            <div class="df">
              <div class="form">
                <el-form-item label="租赁区域" required class="deleft">
                  <el-input
                    v-model="oneone"
                    placeholder="上海七宝"
                  />
                </el-form-item>
                <el-form-item label="规划业务" required class="deleft">
                  <el-input
                    v-model="onetwo"
                    placeholder="宝龙"
                  />
                </el-form-item>
                <el-form-item label="交付日" required class="deleft">
                  <el-input
                    v-model="onethree"
                    placeholder="请输入"
                  />
                </el-form-item>
                <el-form-item label="合同开始日期" required class="deleft">
                  <el-input
                    v-model="onefour"
                    placeholder="两方"
                  />
                </el-form-item>
                <el-form-item label="租金起计日" required class="deleft">
                  <el-input
                    v-model="onefive"
                    placeholder="两方"
                  />
                </el-form-item>
              </div>
              <div class="form">
                <el-form-item label="产权类型" required class="deleft">
                  <el-input
                    v-model="twoone"
                    placeholder="请输入品牌品牌编码"
                  />
                </el-form-item>
                <el-form-item label="建筑面积(㎡)" required class="deleft">
                  <el-input
                    v-model="twotwo"
                    placeholder="请输入品牌品牌编码"
                  />
                </el-form-item>
                <el-form-item label="装修进场日" required class="deleft">
                  <el-input
                    v-model="twothree"
                    placeholder="请输入主要城市分布"
                  />
                </el-form-item>
                <el-form-item label="合同结束日期" required class="deleft">
                  <el-input
                    v-model="twofour"
                    placeholder="请输入主要城市分布"
                  />
                </el-form-item>
                <el-form-item label="物管费起计日" required class="deleft">
                  <el-input
                    v-model="twofive"
                    placeholder="请输入主要城市分布"
                  />
                </el-form-item>
              </div>
              <div class="form">
                <el-form-item label="是否分铺计租" required class="deleft">
                  <el-input
                    v-model="threeone"
                    placeholder="请输入品牌别名"
                  />
                </el-form-item>
                <el-form-item label="套内面积(㎡)" required class="deleft">
                  <el-input
                    v-model="threetwo"
                    placeholder="请输入品牌别名"
                  />
                </el-form-item>
                <el-form-item label="装修结束日" required class="deleft">
                  <el-input
                    v-model="threethree"
                    placeholder="请输入客单价(元)"
                  />
                </el-form-item>
                <el-form-item label="装修期" required class="deleft">
                  <el-input
                    v-model="threefour"
                    placeholder="请输入客单价(元)"
                  />
                </el-form-item>
              </div>
              <div class="form">
                <el-form-item label="计租面积类型" required class="deleft">
                  <el-input
                    v-model="fourone"
                    placeholder="请输入集团名称"
                  />
                </el-form-item>
                <el-form-item label="计租面积(㎡)" required class="deleft">
                  <el-input
                    v-model="fourtwo"
                    placeholder="请输入集团名称"
                  />
                </el-form-item>
                <el-form-item label="开业日" required class="deleft">
                  <el-input
                    v-model="fourthree"
                    placeholder="请输入合同签署"
                  />
                </el-form-item>
                <el-form-item label="租期" required class="deleft">
                  <el-input
                    v-model="fourfour"
                    placeholder="请输入合同签署"
                  />
                </el-form-item>
              </div>
            </div>

            <div class="logo">
              <div class="logo1">
                <el-form-item label="平面落位图">
                  <el-input
                    v-model="ppname"
                    type="textarea"
                    resize="none"
                    placeholder="这里放图"
                  />
                </el-form-item>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div class="next">
        <button>下一步</button>
        <p>进入下一步后，将禁用基本信息和商务信息的编辑功能</p>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  name: 'BudgetaApproval',
  components: {},
  data() {
    return {
      activeName: 'first',
      tabFlag: 0,
      tabList: ['基本信息', '商务信息', '操作', '免租期', '固定租金', '一次性费用', '保证金', '首账期', '合同甲方信息', '商家开票信息', '商家合同信息'],

      show: false,
      // 基本信息竖着来
      brandName: '上海七宝',
      otherName: '宝龙',
      province: '非统税',
      code: '由商业公司发起的商务条件',
      chain: '零售',
      city: '商业标准合同',
      alias: '-',
      mode: '零售',
      money: '对外',
      leave: '上海',
      jtname: '含税',
      phone: '',
      nature: '两方',
      // 商务信息
      oneone: 'M-B1-46/48',
      onetwo: '服装-女装-少女装',
      onethree: '2021-10-11',
      onefour: '2021-10-12',
      onefive: '2021-06-10',
      twoone: '自持',
      twotwo: '98.42',
      twothree: '2021-10-31',
      twofour: '2021-12-09',
      twofive: '2021-10-18',
      threeone: '否',
      threetwo: '78.89',
      threethree: '2021-10-12',
      threefour: '-',
      fourone: '建筑面积',
      fourtwo: '67.90',
      fourthree: '2021-05-11',
      fourfour: '0年13个月31日'
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    sort() {
      this.tableData = this.tableData.reverse()
    },
    showoff() {
      console.log(1111)
      this.show = !this.show
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss'
</style>
