<template>
  <div class="tool-bar" type="flex" justify="space-between" align="middle">

    <div class="content" v-for="(oneItem,oneIndex) in detailList" :key="oneIndex">
      <div class="serve-title">{{oneItem.serveQueue}}</div>
      <div class="sub-contet" v-for="(twoItem,twoIndex) in oneItem.serveList" :key="twoIndex">
        <div class="sub-serve-header">
          <div class="sub-serve-header-title">{{twoItem.serveName}}</div>
          <div class="sub-serve-header-oprate ">
            <ysNButton :class="'button-bg-main'" :text="'参数修改'" :styleObject="{'padding':'0 9px', 'height':'24px'}" @click="openDialogFunc(oneItem,twoItem)" />
          </div>
        </div>
        <div class="sub-serve-content">
          <el-row v-for="(threeItem,threeIndex) in twoItem.serveAttribute" :key="threeIndex" class="sub-serve-content-row">
            <el-col :span="10">
              <span class="info-label">{{threeItem.label}}</span>
            </el-col>
            <el-col :span="14">
              <el-tooltip class="item" effect="dark" :content="`${threeItem.value}`" placement="bottom" :disabled="(`${threeItem.value}`).length<36">
                <span class="info-value">{{threeItem.value}}</span>
              </el-tooltip>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <ysNDialog ref="dialog" :title="dialogTitle" :width="'382px'" :buttonList="buttonList" @confirmFunc="confirmFunc('ruleForm')" @cancelFunc="cancelFunc('ruleForm')">
      <div slot="content" class="form formNew">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="common-rules-form">
          <el-form-item label="服务名称：">
            <span>{{ruleForm.serveQueue}}</span>
          </el-form-item>
          <el-form-item label="参数名称：">
            <span>{{ruleForm.poolName}}</span>
          </el-form-item>
          <el-form-item label="核心线程数：" prop="corePoolSize" class="required">
            <el-input v-model="ruleForm.corePoolSize" placeholder="请填写" size="small"></el-input>
          </el-form-item>
          <el-form-item label="最大线程数：" prop="maximumPoolSize" class="required">
            <el-input v-model="ruleForm.maximumPoolSize" v-filter-check-input3 placeholder="请填写" size="small"></el-input>
          </el-form-item>
          <el-form-item label="队列大小：" prop="queueSize" class="required">
            <el-input v-model="ruleForm.queueSize" v-filter-check-input3 placeholder="请填写" size="small"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </ysNDialog>
  </div>
</template>
<script>
import { handle_paginator, tableData } from '@/mixins';
export default {
  mixins: [handle_paginator, tableData],
  data () {
    return {
      dialogTitle: '参数修改',
      labelMap: {
        poolName: '线程池名：',
        activeCount: '活跃线程数：',
        completedTaskCount: '完成任务数：',
        corePoolSize: '核心线程数：',
        keepAliveTime: '线程最大闲置时间：',
        largestPoolSize: '历史最大线程数：',
        maximumPoolSize: '最大线程数：',
        poolSize: '线程池中当前线程数：',
        taskCount: '任务数量：',
        queueType: '队列类型：',
        queueRemainingCapacity: '队列剩余容量：',
        queueSize: '队列中元素个数：',
        threadActivity: '线程使用度：',
        queueUsage: '队列使用度：',
      },
      ruleForm: {
        serveQueue: '',//	服务名称
        instanceId: '',//	服务ID
        poolName: '',//	线程池名
        corePoolSize: '',// 核心线程数
        maximumPoolSize: '',//最大线程数
        queueSize: '',//队列大小
      },
      rules: {
        corePoolSize: [
          { required: true, message: '请填写核心线程数', trigger: ['blur', 'change'] }
        ],
        maximumPoolSize: [
          { required: true, message: '请选择最大线程数', trigger: ['blur', 'change'] }
        ],
        queueSize: [
          { required: true, message: '请填写队列大小', trigger: ['blur', 'change'] }
        ],
      },
      buttonList: [
        {
          name: '取消',
          function: 'cancelFunc',
          className: 'button-bg-common'
        },
        {
          name: '确定',
          function: 'confirmFunc',
          className: 'button-bg-main'
        },
      ],
      detailList: [],
      intervalId: null,
      // detailList: [
      //   {
      //     serveQueue: '服务一',
      //     serveList: [
      //       {
      //         serveName: 'ys-eip-logger1',
      //         serveAttribute: [
      //           { key: 'poolName', label: '线程池名：', value: 'ys-eip-logger1' },
      //           { key: 'activeCount', label: '活跃线程数：', value: 'ys-eip-logger1' },
      //           { key: 'completedTaskCount', label: '完成任务数：', value: 'ys-eip-logger1' },
      //           { key: 'corePoolSize', label: '核心线程数：', value: 'ys-eip-logger1' },
      //           { key: 'keepAliveTime', label: '线程最大闲置时间：', value: 'ys-eip-logger1' },
      //           { key: 'largestPoolSize', label: '历史最大线程数：', value: 'ys-eip-logger1' },
      //           { key: 'maximumPoolSize', label: '最大线程数：', value: 'ys-eip-logger1' },
      //           { key: 'poolSize', label: '线程池中当前线程数：', value: 'ys-eip-logger1' },
      //           { key: 'taskCount', label: '任务数量：', value: 'ys-eip-logger1' },
      //           { key: 'queueType', label: '队列类型：', value: 'ys-eip-logger1' },
      //           { key: 'queueRemainingCapacity', label: '队列剩余容量：', value: 'ys-eip-logger1' },
      //           { key: 'queueSize', label: '队列中元素个数：', value: 'ys-eip-logger1' },
      //           { key: 'threadActivity', label: '线程使用度：', value: 'ys-eip-logger1' },
      //           { key: 'queueUsage', label: '队列使用度：', value: 'ys-eip-logger1' },
      //         ],
      //       }, {
      //         serveName: 'ys-eip-logger2',
      //         serveAttribute: [
      //           { key: 'poolName', label: '线程池名：', value: 'ys-eip-logger2' },
      //           { key: 'activeCount', label: '活跃线程数：', value: 'ys-eip-logger2' },
      //           { key: 'completedTaskCount', label: '完成任务数：', value: 'ys-eip-logger2' },
      //           { key: 'corePoolSize', label: '核心线程数：', value: 'ys-eip-logger2' },
      //           { key: 'keepAliveTime', label: '线程最大闲置时间：', value: 'ys-eip-logger2' },
      //           { key: 'largestPoolSize', label: '历史最大线程数：', value: 'ys-eip-logger2' },
      //           { key: 'maximumPoolSize', label: '最大线程数：', value: 'ys-eip-logger2' },
      //           { key: 'poolSize', label: '线程池中当前线程数：', value: 'ys-eip-logger2' },
      //           { key: 'taskCount', label: '任务数量：', value: 'ys-eip-logger2' },
      //           { key: 'queueType', label: '队列类型：', value: 'ys-eip-logger2' },
      //           { key: 'queueRemainingCapacity', label: '队列剩余容量：', value: 'ys-eip-logger2' },
      //           { key: 'queueSize', label: '队列中元素个数：', value: 'ys-eip-logger2' },
      //           { key: 'threadActivity', label: '线程使用度：', value: 'ys-eip-logger2' },
      //           { key: 'queueUsage', label: '队列使用度：', value: 'ys-eip-logger2' },
      //         ],
      //       }
      //     ]
      //   },
      //   {
      //     serveQueue: '服务二',
      //     serveList: [
      //       {
      //         serveName: 'ys-eip-logger1',
      //         serveAttribute: [{ key: 'poolName', label: '线程池名：', value: 'value' },
      //         { key: 'activeCount', label: '活跃线程数：', value: 'value' },
      //         { key: 'completedTaskCount', label: '完成任务数：', value: 'value' },
      //         { key: 'corePoolSize', label: '核心线程数：', value: 'value' },
      //         { key: 'keepAliveTime', label: '线程最大闲置时间：', value: 'value' },
      //         { key: 'largestPoolSize', label: '历史最大线程数：', value: 'value' },
      //         { key: 'maximumPoolSize', label: '最大线程数：', value: 'value' },
      //         { key: 'poolSize', label: '线程池中当前线程数：', value: 'value' },
      //         { key: 'taskCount', label: '任务数量：', value: 'value' },
      //         { key: 'queueType', label: '队列类型：', value: 'value' },
      //         { key: 'queueRemainingCapacity', label: '队列剩余容量：', value: 'value' },
      //         { key: 'queueSize', label: '队列中元素个数：', value: 'value' },
      //         { key: 'threadActivity', label: '线程使用度：', value: 'value' },
      //         { key: 'queueUsage', label: '队列使用度：', value: 'value' },],
      //       }, {
      //         serveName: 'ys-eip-logger2',
      //         serveAttribute: [{ key: 'poolName', label: '线程池名：', value: 'value' },
      //         { key: 'activeCount', label: '活跃线程数：', value: 'value' },
      //         { key: 'completedTaskCount', label: '完成任务数：', value: 'value' },
      //         { key: 'corePoolSize', label: '核心线程数：', value: 'value' },
      //         { key: 'keepAliveTime', label: '线程最大闲置时间：', value: 'value' },
      //         { key: 'largestPoolSize', label: '历史最大线程数：', value: 'value' },
      //         { key: 'maximumPoolSize', label: '最大线程数：', value: 'value' },
      //         { key: 'poolSize', label: '线程池中当前线程数：', value: 'value' },
      //         { key: 'taskCount', label: '任务数量：', value: 'value' },
      //         { key: 'queueType', label: '队列类型：', value: 'value' },
      //         { key: 'queueRemainingCapacity', label: '队列剩余容量：', value: 'value' },
      //         { key: 'queueSize', label: '队列中元素个数：', value: 'value' },
      //         { key: 'threadActivity', label: '线程使用度：', value: 'value' },
      //         { key: 'queueUsage', label: '队列使用度：', value: 'value' },],
      //       }
      //     ]
      //   }
      // ]
    }
  },
  mounted () {
    this.getThreadPoolInfo()
    this.createInterval()
  },
  methods: {
    createInterval () {
      this.intervalId = setInterval(() => {
        this.getThreadPoolInfo(false)
      }, 300000)
    },
    async getThreadPoolInfo (useScreenLoadingBol) {
      try {
        let res = await this.$axios.systemServe.getThreadPoolInfo({}, {}, useScreenLoadingBol)
        let data = []
        res.map(item => {
          let serveQueue = item.instanceName
          let serveList = []
          item.poolInfoVOList && item.poolInfoVOList.map(childrenItem => {
            let serveName = childrenItem.poolName
            let serveAttribute = []
            Object.keys(this.labelMap).map((key) => {
              let obj = { key: key, label: this.labelMap[key], value: childrenItem[key] }
              serveAttribute.push(obj)
            })
            serveList.push({ serveName: serveName, serveAttribute: serveAttribute })
          })
          data.push({ serveQueue: serveQueue, instanceId: item.instanceId, serveList: serveList })
        })
        this.detailList = data

      } catch (e) {
        console.log(e)
      }
    },
    openDialogFunc (oneItem, twoItem) {
      this.ruleForm = {
        serveQueue: oneItem.serveQueue,//	服务名称
        instanceId: oneItem.instanceId,//	服务ID
        poolName: twoItem.serveName,//	线程池名
        corePoolSize: twoItem.serveAttribute[3].value,// 核心线程数
        maximumPoolSize: twoItem.serveAttribute[6].value,//最大线程数
        queueSize: twoItem.serveAttribute[8].value,//队列大小
      }
      clearInterval(this.intervalId)
      this.$refs.dialog.centerDialogVisible = true
    },
    async confirmFunc (formName) {
      try {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let res = await this.$axios.systemServe.editParamOfThreadPoolForTargetServer(this.ruleForm)
            if (res) {
              this.$message.success('修改成功')
              this.$refs.dialog.centerDialogVisible = false
              this.createInterval()
            } else {
              this.$message.error('修改失败')
            }
          }
        });
      } catch (e) {
        console.log(e)
      }
    },
    cancelFunc () {
      this.createInterval()
      this.$refs.dialog.centerDialogVisible = false
    },
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 10px 0;
  margin-bottom: 15px;
  background-color: #ffffff;
  box-shadow: 10px 10px 30px 0px rgb(224 229 235 / 50%);
  .serve-title {
    height: 36px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #1c1c1c;
    line-height: 36px;
    text-align: left;
    padding: 0 0 0 20px;
    border-bottom: 1px solid #f0f2f7;
  }
  .sub-contet {
    padding: 0 30px;
    .sub-serve-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f0f2f7;
      .sub-serve-header-title {
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #1c1c1c;
      }
    }
    .sub-serve-content {
      padding-left: 30px;
      .sub-serve-content-row {
        display: inline-block;
        width: 50%;
        border-bottom: 1px solid #f0f2f7;
      }
      .info-label {
        display: flex;
        height: 36px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #8893a3;
        line-height: 36px;
        text-align: left;
      }
      .info-value {
        display: block;
        padding-right: 30px;
        text-align: left;
        height: 36px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #1c1c1c;
        line-height: 36px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
