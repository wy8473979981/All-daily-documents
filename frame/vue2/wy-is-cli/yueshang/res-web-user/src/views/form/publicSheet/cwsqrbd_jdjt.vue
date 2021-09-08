<template>
  <!-- 财务双签人变动(酒店集团) -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <div v-for="(item, index) in form.bizEntityJson.finDoubleSignInfos" :key="index">
      <el-row :gutter="24" class="padding-row">
        <el-col v-if="index != 0 && !form.bizEntityJson.disabled" :span="24" class="title-col topRight-col">
          <h2 style="text-align: right; font-size: 18px; padding-right: 12px; color: #FB1D1D;">
            <i class="el-icon-close" style="cursor: pointer;" @click="del(index)"></i>
          </h2>
        </el-col>
        <el-col :span="24" :class="index != 0 ? 'right-col' : 'topRight-col'">
          <div class="d-min">
            <span>申请单位</span>
            <el-input :class="{'novalue': !item.finDoubleSignDcgsBean.companyName, 'required': !form.bizEntityJson.disabled}" v-model="item.finDoubleSignDcgsBean.companyName" @focus="companyNameFocus(index)" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <span>申请单位全称</span>
            <el-input v-model="item.finDoubleSignDcgsBean.companyFullName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          </div>
        </el-col>
        <el-col :span="24" class="topRight-col">
          <div class="d-min">
            <span>第一双签人（法定双签人）变动原因（附任命通知）</span>
            <el-input :class="{'novalue': !form.bizEntityJson.reason1, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.reason1" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          </div>
        </el-col>
        <el-col :span="24" class="topRight-col">
          <div class="d-min">
            <span>第二双签人（指定双签人）变动理由（简明扼要）</span>
            <el-input :class="{'novalue': !form.bizEntityJson.reason2, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.reason2" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="padding-row">
        <el-col :span="24" class="topRight-col">
         <div class="d-min">
            <span>变更情况信息</span>
          </div> 
        </el-col>
        <el-col :span="12" class="topRight-col">
         <div class="d-min">
            <span>变更前</span>
          </div> 
        </el-col>
        <el-col :span="12" class="topRight-col">
         <div class="d-min">
            <span>变更后</span>
          </div> 
        </el-col>
        <el-col :span="12">
            <div class="d-min">
              <span>第一双签人</span>
              <el-input v-model="item.firstDoubleSigner.oriSigner1" @focus="doubleSignerNameFocus(index)" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
          </el-col>
          <el-col :span="12" class="right-col">
            <div class="d-min">
              <el-input :class="{'novalue': !item.firstDoubleSigner.newSigner1, 'required': !form.bizEntityJson.disabled}" v-model="item.firstDoubleSigner.newSigner1" @focus="doubleSignerAfterFocus(index)" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="d-min">
              <span>第二双签人</span>
              <el-input v-model="item.finSecondDoubleSigner.oriSigner2" @focus="doubleSignerName2Focus(index)" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
          </el-col>
          <el-col :span="12" class="right-col">
            <div class="d-min">
              <el-input :class="{'novalue': !item.finSecondDoubleSigner.newSigner2, 'required': !form.bizEntityJson.disabled}" v-model="item.finSecondDoubleSigner.newSigner2" @focus="doubleSignerAfter2Focus(index)" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
          </el-col>
      </el-row>
    </div>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" @close="closeSearhOrg"></search-org>
    <search-user :key="1" :open="showSearchUser1 && !form.bizEntityJson.disabled" @close="closeSearhUser1"></search-user>
    <search-user :key="2" :open="showSearchUser2 && !form.bizEntityJson.disabled" @close="closeSearhUser2"></search-user>
    <search-user :key="3" :open="showSearchUser3 && !form.bizEntityJson.disabled" @close="closeSearhUser3"></search-user>
    <search-user :key="4" :open="showSearchUser4 && !form.bizEntityJson.disabled" @close="closeSearhUser4"></search-user>
  </div>
</template>

<script>
export default {
   data: function() {
    return{
      form: data,
      disabled: true,
     showSearchOrg: false,
      showSearchUser1: false,
      showSearchUser2: false,
      showSearchUser3: false,
      showSearchUser4: false,
      isSelectIndex: null,
      form: {
        bizEntityJson: {
          finDoubleSignInfos: [
            {
              finDoubleSignDcgsBean: {
                companyName: null,
                companyNameCd: null,
                companyFullName: null,
              },
              firstDoubleSigner: {
                isFirstDoubleSigner: false,
                doubleSignerName: null,
                doubleSignerNameCd: null,
                doubleSignerAfter: null,
                doubleSignerAfterCd: null,
                post: null,
                fileId: '',
                explain: null,
              },
              finSecondDoubleSigner: {
                isFinSecondDoubleSigner: false,
                doubleSignerName: null,
                doubleSignerNameCd: null,
                doubleSignerAfter: null,
                doubleSignerAfterCd: null,
                post: null,
                entryDate: null,
                entryCliqueDate: null,
                lastAchievements: null,
                reasonsForChange: null,
                recommendForChange: null,
              }
            }
          ]
        }
      },
      userInfo: {},
    }
  },
  // props: ['data'],
	// watch: {
	// 	data: {
	// 		immediate: true,
	// 		handler: function(val) {
	// 			console.log(val)
	// 			this.form = val;
	// 		}
	// 	}
	// },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.withinBudgetChange()
      this.add()
    }
  },
  methods: {
    showFileList(val) {
      if (this.$route.query.id) {
        let newFileList = []
        let nowFileId = val.split(',')
        nowFileId.forEach(itemId => {
          this.form.allEntityFileIds.fileId.forEach(item => {
            if (itemId == item.id) {
              newFileList.push(item)
            }
          })
        })
        return newFileList
      }
    },
    // 监听定义一个数组
    withinBudgetChange() {
      this.$set(this.form.bizEntityJson, 'finDoubleSignInfos', [])
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    },
    handleRemove(file, fileList) {
      let nowfile
      if(file.response) {
        nowfile = file.response.data.fileId
      }else {
        nowfile = file.id + ','
      }
      let fileId = this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].firstDoubleSigner.fileId
      this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].firstDoubleSigner.fileId = fileId.replace(nowfile,'')
    },
    handleSuccess(res, file, fileList) {
      if (res.code == 1) {
        const fileId = res.data.fileId
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].firstDoubleSigner.fileId += fileId
      } else {
        this.handleSuccessGlobal(res)
      }
    },
    handleClick(index) {
      this.isSelectIndex = index
    },
    downLoadFile(file) {
      if(file.showUrl) {
        window.open(file.showUrl, '_blank')
        return
      }
      const fileIds = file.response.data.fileId
      this.$file.loadFiles({fileIds}).then(res => {
        if(res.code ==1 && res.data) {
          const showUrl = res.data.fileShowVoList[0].showUrl
          window.open(showUrl, '_blank')
        }
      })
    },
    add() {
      this.form.bizEntityJson.finDoubleSignInfos.push({
        finDoubleSignDcgsBean: {
          companyName: null,
          companyNameCd: null,
          companyFullName: null,
        },
        firstDoubleSigner: {
          isFirstDoubleSigner: false,
          doubleSignerName: null,
          doubleSignerNameCd: null,
          doubleSignerAfter: null,
          doubleSignerAfterCd: null,
          post: null,
          fileId: null,
          explain: null,
        },
        finSecondDoubleSigner: {
          isFinSecondDoubleSigner: false,
          doubleSignerName: null,
          doubleSignerNameCd: null,
          doubleSignerAfter: null,
          doubleSignerAfterCd: null,
          post: null,
          entryDate: null,
          entryCliqueDate: null,
          lastAchievements: null,
          reasonsForChange: null,
          recommendForChange: null,
        }
      })
    },
    del(index) {
      this.form.bizEntityJson.finDoubleSignInfos.splice(index, 1)
    },
companyNameFocus(index) {
      this.showSearchOrg = true
      this.isSelectIndex = index
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].finDoubleSignDcgsBean.companyName = val.text
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].finDoubleSignDcgsBean.companyNameCd = val.id
      }
      this.showSearchOrg = false
    },
    doubleSignerNameFocus(index) {
      this.showSearchUser1 = true
      this.isSelectIndex = index
    },
    closeSearhUser1(val) {
      if (val) {
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].firstDoubleSigner.oriSigner1 = val.userName
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].firstDoubleSigner.oriSignerCd1 = val.userCd
      }
      this.showSearchUser1 = false
    },
    doubleSignerAfterFocus(index) {
      this.showSearchUser2 = true
      this.isSelectIndex = index
    },
    closeSearhUser2(val) {
      if (val) {
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].firstDoubleSigner.newSigner1 = val.userName
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].firstDoubleSigner.newSignerCd1 = val.userCd
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].firstDoubleSigner.newSigner1PositionCd = val.positionName
      }
      this.showSearchUser2 = false
    },
    doubleSignerName2Focus(index) {
      this.showSearchUser3 = true
      this.isSelectIndex = index
    },
    closeSearhUser3(val) {
      if (val) {
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].finSecondDoubleSigner.oriSigner2 = val.userName
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].finSecondDoubleSigner.oriSigner2Cd = val.userCd
      }
      this.showSearchUser3 = false
    },
    doubleSignerAfter2Focus(index) {
      this.showSearchUser4 = true
      this.isSelectIndex = index
    },
    closeSearhUser4(val) {
      if (val) {
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].finSecondDoubleSigner.newSigner2 = val.userName
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].finSecondDoubleSigner.newSigner2Cd = val.userCd
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].finSecondDoubleSigner.newSigner2PositionCd = val.positionName
      }
      this.showSearchUser4 = false
    },
    // 必填判断
    validate() {
      for (let key in this.form.bizEntityJson.finDoubleSignInfos) {
        if(!this.form.bizEntityJson.finDoubleSignInfos[key].finDoubleSignDcgsBean.companyName) return this.$message.error('请选择申请单位'), false
        if(!this.form.bizEntityJson.reason1) return this.$message.error('第一双签人（法定双签人）变动原因（附任命通知）'), false
        if(!this.form.bizEntityJson.reason2) return this.$message.error('第二双签人（指定双签人）变动理由（简明扼要）'), false
        if(!this.form.bizEntityJson.finDoubleSignInfos[key].firstDoubleSigner.newSigner1) return this.$message.error('第一双签人 变动后'), false
        if(!this.form.bizEntityJson.finDoubleSignInfos[key].finSecondDoubleSigner.newSigner2) return this.$message.error('第二双签人 变动后'), false
      }
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
