<template>
  <el-dialog title="发起协助" :visible.sync="assistVisible" width="860px">
    <div :class="[$style.assistWrapper]">
      <div :class="[$style.desc]">
        <div :class="[$style.label]"><span style="color:red;margin-right:5px;">*</span>协助事项描述</div>
        <div :class="[$style.textarea]">
          <el-input type="textarea" :rows="2" v-model.trim ="desc" resize="none" maxlength="500" />
        </div>
      </div>
      <div :class="[$style.label]"><span style="color:red;margin-right:5px;">*</span>选择协助用户</div>
      <div :class="[$style.assistBtn]" class="text-right">
        <el-button type="primary" size="mini" plain @click="onAssistSelect">全部选中</el-button>
        <el-button size="mini" plain @click="onAssistInverse">全部清空</el-button>
      </div>
      <div :class="[$style.assistWrap]">
        <div v-for="(item,index) in userList" :key="index">
          <div :class="[$style.departName]" @click="item.isfold=!item.isfold">
            <span
              class="el-icon-caret-bottom"
              :class="[item.isfold?$style.rotate:'',$style.transition]"
            ></span>
            <strong>{{item.departName}}</strong>
          </div>
          <el-checkbox-group
            v-model="departList[index]"
            :class="[$style.employeeList]"
            :style="`height:${calcHeight(item)}px`"
          >
            <el-checkbox
              :label="item.id"
              v-for="(item,index) in item.person"
              :key="index"
              :class="[$style.checkbox]"
            >{{item.userName}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="mt-4">注：选择需要协助的人员，系统将给对应的人员发送合同附件</div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="assistVisible=false" size="small">取 消</el-button>
      <el-button type="primary" @click="onAssistConfirm" size="small">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'

@Component({})
export default class InitiateAssistance extends Vue {
  @Prop() id!: string
  @Prop() projectId!: string
  @Watch('assistVisible')
  changeAssist(newVal: any) {
    if (!newVal) {
      this.onEmpty(1)
    } else {
      this.getData()
    }
  }

  assistVisible = false
  desc = ''
  departList: any = []
  allSelect: any = []
  userList: any = []
  calcHeight(item: any) {
    return item.isfold ? Math.ceil(item.person.length / 6) * 24 : 0
  }

  selectionItem(item: any) {
    const temp: any = []
    item.forEach((item: any) => {
      temp.push(item.id)
    })
    return temp
  }

  getUserList(data: any[]) {
    const userList: any = []
    const departList: any = []
    const allSelect: any = []
    data.forEach((item: any, index) => {
      departList.push([])
      allSelect.push(this.selectionItem(item.users))
      userList.push({
        departName: item.roleInfo.name,
        person: item.users,
        isfold: false
      })
    })
    return {
      userList,
      departList,
      allSelect
    }
  }

  getData() {
    this.$http.get<any>(`/api/backlog/launchAssist?projectId=${this.projectId}`).then(data => {
      const { userList, departList, allSelect } = this.getUserList(data)
      this.userList = userList
      this.departList = departList
      this.allSelect = allSelect
    })
  }

  onAssistSelect() {
    this.onEmpty()
    this.allSelect.forEach((item: any, index: number) => {
      this.userList[index].isfold = true
      item.forEach((element: any) => {
        this.departList[index].push(element)
      })
    })
  }

  onEmpty(unFold?: number) {
    this.departList = this.departList.map((item: any, index: number) => {
      if (unFold) {
        this.userList[index].isfold = false
        this.desc = ''
      }
      return []
    })
  }

  onAssistInverse() {
    this.onEmpty()
  }

  onAssistConfirm() {
    const content = this.desc
    const contractId = this.id
    if (content === '') {
      this.$message({
        type: 'error',
        message: '协助事项描述不能为空'
      })
      return
    }
    const userIdList = this.departList.flat()
    if (userIdList.length === 0) {
      this.$message({
        type: 'error',
        message: '请选择至少一个用户'
      })
      return
    }

    this.$http
      .post<any>('/backend/contract/askForHelp', {
        content,
        contractId,
        userIdList
      })
      .then(data => {
        this.$message({
          type: 'success',
          message: '发起协议成功'
        })
        this.assistVisible = false
      })
  }

  $style!: any
}
</script>

<style lang="scss" module>
.assistWrapper {
  margin-top: -30px;
  .desc {
    display: flex;
    margin-top: 10px;
    margin-bottom: 30px;
    .label {
      width: 100px;
      line-height: 50px;
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }
    .textarea {
      flex: 1;
    }
  }
  .label {
    font-size: 14px;
    color:#333;
    font-weight: bold;
  }
  .assistWrap {
    margin-top: 10px;
    max-height: 350px;
    overflow-y: auto;
    .departName {
      height: 30px;
      line-height: 30px;
      margin-left: 5px;
      cursor: pointer;
      .transition {
        transition: transform 0.5s;
      }
      .rotate {
        transform: rotate(-180deg);
      }
    }
    .employeeList {
      overflow: hidden;
      transition: height 0.5s;
      padding-left: 20px;
      .checkbox {
        width: 100px;
        height: 24px;
      }
    }
  }
}
</style>
<style lang="scss">
.index_employeeList_3ocyA {
  .el-checkbox__label {
    width: 60px;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
