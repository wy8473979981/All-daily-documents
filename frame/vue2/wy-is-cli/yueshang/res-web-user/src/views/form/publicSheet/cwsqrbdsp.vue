<template>
  <!-- 财务双签人变动审批 -->
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
      </el-row>
      <el-row :gutter="24" class="padding-row">
        <el-col :span="24" class="title-col topRight-col">
          <h2>
            <el-checkbox v-model="item.firstDoubleSigner.isFirstDoubleSigner">第一双签人</el-checkbox>
          </h2>
        </el-col>
        <div v-if="item.firstDoubleSigner.isFirstDoubleSigner">
          <el-col :span="12">
            <div class="d-min">
              <span>变动前</span>
              <el-input v-model="item.firstDoubleSigner.doubleSignerName" @focus="doubleSignerNameFocus(index)" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
          </el-col>
          <el-col :span="12" class="right-col">
            <div class="d-min">
              <span>变动后</span>
              <el-input :class="{'novalue': !item.firstDoubleSigner.doubleSignerAfter, 'required': !form.bizEntityJson.disabled}" v-model="item.firstDoubleSigner.doubleSignerAfter" @focus="doubleSignerAfterFocus(index)" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="d-min">
              <span>职务</span>
              <el-input :class="{'novalue': !item.firstDoubleSigner.post, 'required': !form.bizEntityJson.disabled}" v-model="item.firstDoubleSigner.post" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
          </el-col>
          <el-col :span="12" class="right-col">
            <div class="d-min">
            </div>
          </el-col>
          <el-col :span="24" class="right-col">
            <div class="d-min d-min-100">
              <span class="span-auto">附件</span>
              <div class="d-red" :class="{'novalue': !item.firstDoubleSigner.fileId, 'required': !form.bizEntityJson.disabled}">
                <el-upload
                  name="fileName"
                  :headers="{'Authorization': userInfo.token}"
                  :accept="$action"
                  :action="uploadUrl"
                  :data="{userName: form.userInfo.username,bizFileName: 'fileId',bizId:form.bizId}"
                  :before-remove="beforeRemoveGlobal"
                  :before-upload="beforeUploadGlobal"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :on-error="handleErrorGlobal"
                  :on-preview="downLoadFileGlobal"
                  :file-list="showFileList(item.firstDoubleSigner.fileId)"
                  style="display: flex;">
                  <el-button v-if="!form.bizEntityJson.disabled" @click="handleClick(index)" type="text" size="mini">添加附件</el-button>
                </el-upload>
              </div>
            </div>
          </el-col>
          <el-col :span="24" class="right-col">
            <div class="d-min">
              <span class="span-auto">
                说明
                <el-tooltip class="item" effect="dark" content="第一双签人非本单位第一负责人时填写" placement="top-start">
                  <i class="el-icon-warning"></i>
                </el-tooltip>
              </span>
              <t-textarea class="t-textarea-auto" :class="{'novalue': !item.firstDoubleSigner.explain, 'required': !form.bizEntityJson.disabled}" v-model="item.firstDoubleSigner.explain" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
            </div>
          </el-col>
        </div>
      </el-row>
      <el-row :gutter="24" class="padding-row">
        <el-col :span="24" class="title-col topRight-col">
          <h2>
            <el-checkbox v-model="item.finSecondDoubleSigner.isFinSecondDoubleSigner">第二双签人</el-checkbox>
          </h2>
        </el-col>
        <div v-if="item.finSecondDoubleSigner.isFinSecondDoubleSigner">
          <el-col :span="12">
            <div class="d-min">
              <span>变动前</span>
              <el-input v-model="item.finSecondDoubleSigner.doubleSignerName" @focus="doubleSignerName2Focus(index)" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
          </el-col>
          <el-col :span="12" class="right-col">
            <div class="d-min">
              <span>变动后</span>
              <el-input :class="{'novalue': !item.finSecondDoubleSigner.doubleSignerAfter, 'required': !form.bizEntityJson.disabled}" v-model="item.finSecondDoubleSigner.doubleSignerAfter" @focus="doubleSignerAfter2Focus(index)" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="d-min">
              <span>职务</span>
              <el-input :class="{'novalue': !item.finSecondDoubleSigner.post, 'required': !form.bizEntityJson.disabled}" v-model="item.finSecondDoubleSigner.post" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
          </el-col>
          <el-col :span="12" class="right-col">
            <div class="d-min">
              <span>入职时间</span>
              <el-date-picker
                v-model="item.finSecondDoubleSigner.entryDate"
                value-format="yyyy-MM-dd"
                clearable
                :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                :disabled="form.bizEntityJson.disabled">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="d-min">
              <span>入集团时间</span>
              <el-date-picker
                v-model="item.finSecondDoubleSigner.entryCliqueDate"
                value-format="yyyy-MM-dd"
                clearable
                :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                :disabled="form.bizEntityJson.disabled">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="12" class="right-col">
            <div class="d-min">
              <span>最后一次绩效</span>
              <el-input v-model="item.finSecondDoubleSigner.lastAchievements" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
          </el-col>
          <el-col :span="24" class="right-col">
            <div class="d-min">
              <span class="span-auto">变更理由</span>
              <t-textarea class="t-textarea-auto" :class="{'novalue': !item.finSecondDoubleSigner.reasonsForChange, 'required': !form.bizEntityJson.disabled}" v-model="item.finSecondDoubleSigner.reasonsForChange" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
            </div>
          </el-col>
          <el-col :span="24" class="right-col">
            <div class="d-min">
              <span class="span-auto">推荐理由</span>
              <t-textarea class="t-textarea-auto" :class="{'novalue': !item.finSecondDoubleSigner.recommendForChange, 'required': !form.bizEntityJson.disabled}" v-model="item.finSecondDoubleSigner.recommendForChange" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
    <div v-if="!form.bizEntityJson.disabled" style="width: 100%; margin-top: 20px; display: flex; justify-content: center;">
      <el-button type="primary" size="mini" @click="add">新增</el-button>
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
  data() {
    return {
      // form: {},
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
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].firstDoubleSigner.doubleSignerName = val.userName
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].firstDoubleSigner.doubleSignerNameCd = val.userCd
      }
      this.showSearchUser1 = false
    },
    doubleSignerAfterFocus(index) {
      this.showSearchUser2 = true
      this.isSelectIndex = index
    },
    closeSearhUser2(val) {
      if (val) {
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].firstDoubleSigner.doubleSignerAfter = val.userName
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].firstDoubleSigner.doubleSignerAfterCd = val.userCd
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].firstDoubleSigner.post = val.positionName
      }
      this.showSearchUser2 = false
    },
    doubleSignerName2Focus(index) {
      this.showSearchUser3 = true
      this.isSelectIndex = index
    },
    closeSearhUser3(val) {
      if (val) {
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].finSecondDoubleSigner.doubleSignerName = val.userName
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].finSecondDoubleSigner.doubleSignerNameCd = val.userCd
      }
      this.showSearchUser3 = false
    },
    doubleSignerAfter2Focus(index) {
      this.showSearchUser4 = true
      this.isSelectIndex = index
    },
    closeSearhUser4(val) {
      if (val) {
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].finSecondDoubleSigner.doubleSignerAfter = val.userName
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].finSecondDoubleSigner.doubleSignerAfterCd = val.userCd
        this.form.bizEntityJson.finDoubleSignInfos[this.isSelectIndex].finSecondDoubleSigner.post = val.positionName
      }
      this.showSearchUser4 = false
    },
    // 必填判断
    validate() {
      for (let key in this.form.bizEntityJson.finDoubleSignInfos) {
        if(!this.form.bizEntityJson.finDoubleSignInfos[key].finDoubleSignDcgsBean.companyName) return this.$message.error('请选择申请单位'), false
        if(!this.form.bizEntityJson.finDoubleSignInfos[key].firstDoubleSigner.doubleSignerAfter) return this.$message.error('请选择第一双签人变动后人员'), false
        if(!this.form.bizEntityJson.finDoubleSignInfos[key].firstDoubleSigner.post) return this.$message.error('请输入第一双签人职务'), false
        if(!this.form.bizEntityJson.finDoubleSignInfos[key].firstDoubleSigner.explain) return this.$message.error('请输入说明'), false
        if(!this.form.bizEntityJson.finDoubleSignInfos[key].finSecondDoubleSigner.doubleSignerAfter) return this.$message.error('请选择第二双签人变动后人员'), false
        if(!this.form.bizEntityJson.finDoubleSignInfos[key].finSecondDoubleSigner.post) return this.$message.error('请输入第二双签人职务'), false
        if(!this.form.bizEntityJson.finDoubleSignInfos[key].finSecondDoubleSigner.reasonsForChange) return this.$message.error('请输入变更理由'), false
        if(!this.form.bizEntityJson.finDoubleSignInfos[key].finSecondDoubleSigner.recommendForChange) return this.$message.error('请推荐理由'), false
      }
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
