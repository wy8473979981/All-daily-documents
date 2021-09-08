<template>
  <!-- 由商业公司发起的商务条件（2018） -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="title-col topRight-col">
        <h2>指标达成情况</h2>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>总面积</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>实时招商面积</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>本铺租金达成率</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>本铺物管费达成率</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>本铺工程改造费用</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>反推平效</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>累计招商面积达成率</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>累计租金达成率</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>累计物管费达成率</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>累计工程改造标准</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>累计工程改造费用</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>项目及商家信息</h2>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>项目名称</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>地产项目名称</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>项目归属</span>
          <el-radio-group v-model="form.bizEntityJson.unitType">
            <el-radio :label="1">地产</el-radio>
            <el-radio :label="2">置地</el-radio>
            <el-radio :label="3">轻资产</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>意向商户</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>商标注册名</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>应收意向金</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>实收意向金</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>经销商</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>店型</span>
          <el-radio-group v-model="form.bizEntityJson.unitType">
            <el-radio :label="1">主力店</el-radio>
            <el-radio :label="2">次主力店</el-radio>
            <el-radio :label="3">大商铺</el-radio>
            <el-radio :label="4">小商铺</el-radio>
            <el-radio :label="5">一般商铺</el-radio>
            <el-radio :label="6">中型商铺</el-radio>
            <el-radio :label="7">商业街</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>业态</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>在营在建</span>
          <el-radio-group v-model="form.bizEntityJson.unitType">
            <el-radio :label="1">在建</el-radio>
            <el-radio :label="2">在营</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>标准</span>
          <el-radio-group v-model="form.bizEntityJson.unitType">
            <el-radio :label="1">业态满足</el-radio>
            <el-radio :label="2">业态变更</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>品牌</span>
          <el-radio-group v-model="form.bizEntityJson.unitType">
            <el-radio :label="1">品牌满足</el-radio>
            <el-radio :label="2">品牌变更</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>商务基本信息</h2>
      </el-col>
      <el-col :span="4" class="title-col">
        <h2></h2>
      </el-col>
      <el-col :span="7" class="title-col">
        <h2>标准</h2>
      </el-col>
      <el-col :span="7" class="title-col">
        <h2>申请条件</h2>
      </el-col>
      <el-col :span="6" class="title-col right-col">
        <h2>备注</h2>
      </el-col>
      <el-col :span="4">
        <span class="span-100">1.租赁区域</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">2.合同类型/业态</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <span>合同类型</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <span>签批业态</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
        </div>
      </el-col>
      <el-col :span="4" class="rows-2col">
        <span class="span-100">3.计租面积</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <span>建筑面积(㎡)</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
        <div class="d-min top-row">
          <span>建筑面积(㎡)</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <span>实际计租面积(㎡)</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
        <div class="d-min top-row">
          <span>实际计租面积(㎡)</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input class="rows-2textarea" :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.reason" type="textarea" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">4.租期</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <p class="explain-p-one">0年0月0天</p>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">5.交付日期</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <p class="explain-p-one">无</p>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-date-picker
            :class="form.bizEntityJson.disabled ? '' : 'required'"
            v-model="form.bizEntityJson.lastOperatingDate"
            value-format="yyyy-MM-dd"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
           <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4" class="rows-3col">
        <span class="span-100">6.开业日期</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input class="rows-3textarea" :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.reason" type="textarea" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-radio-group v-model="form.bizEntityJson.unitType">
            <el-radio :label="1">同期开业</el-radio>
            <el-radio :label="2">不同期开业</el-radio>
          </el-radio-group>
        </div>
        <div class="d-min top-row">
          <span>约定最迟开业日</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
        <div class="d-min top-row">
          <span>约定最迟开业日</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input class="rows-3textarea" :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.reason" type="textarea" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">7.租赁起始规则</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <p class="explain-p-one">无</p>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-select :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'">
            <el-option label="自本合同约定的最迟开业日或乙方租赁场所实际开业日较早发生之日开始计算" value="1"></el-option>
            <el-option label="自租赁场所实际交付之日开始计算" value="2"></el-option>
            <el-option label="自乙方租赁场所实际开业日开始计算" value="3"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">8.租金起计日</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <p class="explain-p-one">无</p>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
           <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">9.返租到期日</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <p class="explain-p-one">产权性质：</p>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">10.合同结束时间</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <p class="explain-p-one">无</p>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-date-picker
            :class="form.bizEntityJson.disabled ? '' : 'required'"
            v-model="form.bizEntityJson.lastOperatingDate"
            value-format="yyyy-MM-dd"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4" class="rows-3col">
        <span class="span-100">11.免租期</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <span>第一年</span>
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
            <template slot="append">个月</template>
          </el-input>
        </div>
        <div class="d-min top-row">
          <span>第二年</span>
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
            <template slot="append">个月</template>
          </el-input>
        </div>
        <div class="d-min top-row">
          <span>第三年</span>
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
            <template slot="append">个月</template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required-onInput'">
          <span>第一年</span>
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
            <template slot="append">个月</template>
          </el-input>
        </div>
        <div class="d-min top-row" :class="form.bizEntityJson.disabled ? '' : 'required-onInput'">
          <span>第二年</span>
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
            <template slot="append">个月</template>
          </el-input>
        </div>
        <div class="d-min top-row" :class="form.bizEntityJson.disabled ? '' : 'required-onInput'">
          <span>第三年</span>
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
            <template slot="append">个月</template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input class="rows-3textarea" :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.reason" type="textarea" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">12.计费起始日</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <p class="explain-p-one">无</p>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">13.签约时间</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <p class="explain-p-one">无</p>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-date-picker
            :class="form.bizEntityJson.disabled ? '' : 'required'"
            v-model="form.bizEntityJson.lastOperatingDate"
            value-format="yyyy-MM-dd"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>租金及物管费</h2>
      </el-col>
      <el-col :span="4" class="title-col">
        <h2></h2>
      </el-col>
      <el-col :span="7" class="title-col">
        <h2>标准</h2>
      </el-col>
      <el-col :span="7" class="title-col">
        <h2>申请条件</h2>
      </el-col>
      <el-col :span="6" class="title-col right-col">
        <h2>备注</h2>
      </el-col>
      <el-col :span="4">
        <span class="span-100">租金方式</span>
      </el-col>
      <el-col :span="14">
        <div class="d-min">
          <el-radio-group v-model="form.bizEntityJson.unitType">
            <el-radio :label="1">固定租金</el-radio>
            <el-radio :label="2">提成租金</el-radio>
            <el-radio :label="3">其他方式</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">租金结算方式</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-radio-group v-model="form.bizEntityJson.unitType">
            <el-radio :label="1">月结</el-radio>
            <el-radio :label="2">半年结</el-radio>
            <el-radio :label="3">年结</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-checkbox v-model="form.bizEntityJson.strFrame" true-label="1" false-label="0">保底提成取高</el-checkbox>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">租金及免租期</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">租金支付周期</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <p class="explain-p-one">无</p>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-select :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'">
            <el-option label="月付" value="1"></el-option>
            <el-option label="季付" value="2"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">租金最迟缴费日</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <p class="explain-p-one">无</p>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-select :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'">
            <el-option label="前一个月25日前" value="1"></el-option>
            <el-option label="当月5日前" value="2"></el-option>
            <el-option label="当月15日前" value="3"></el-option>
            <el-option label="当月20日前" value="4"></el-option>
            <el-option label="下月5日前" value="5"></el-option>
            <el-option label="下月15日前" value="6"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">履约保证金-租金(元)</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">折扣原因</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <p class="explain-p-one">无</p>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4" class="rows-2col">
        <span class="span-100">补充说明</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input class="rows-2textarea" :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.reason" type="textarea" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input class="rows-2textarea" :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.reason" type="textarea" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col rows-2col">
        <div class="d-min">
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">预付租金(元)</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">物管费(元)</span>
      </el-col>
      <el-col :span="20" class="right-col">
        <div class="d-min">
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">物业费中是否含中央空调</span>
      </el-col>
      <el-col :span="20" class="right-col">
        <div class="d-min">
          <el-radio-group v-model="form.bizEntityJson.unitType">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">物业费支付周期</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <p class="explain-p-one">无</p>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-select :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'">
            <el-option label="月付" value="1"></el-option>
            <el-option label="季付" value="2"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">预付物管费(元)</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">履约保证金-物管费(元)</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">履约保证金(元)</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">最迟缴费日</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <p class="explain-p-one">无</p>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-select :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'">
            <el-option label="前一个月25日前" value="1"></el-option>
            <el-option label="当月5日前" value="2"></el-option>
            <el-option label="当月15日前" value="3"></el-option>
            <el-option label="当月20日前" value="4"></el-option>
            <el-option label="下月5日前" value="5"></el-option>
            <el-option label="下月15日前" value="6"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>其他事项</h2>
      </el-col>
      <el-col :span="4">
        <span class="span-100">条款类型</span>
      </el-col>
      <el-col :span="20" class="right-col">
        <div class="d-min">
          <el-radio-group v-model="form.bizEntityJson.unitType">
            <el-radio :label="1">重要特殊条款</el-radio>
            <el-radio :label="2">一般特殊条款</el-radio>
            <el-radio :label="3">无特殊条款</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="d-min rows-2col">
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min rows-2col">
          <p class="explain-p-one">广告位、停车位（含停车卷）、外摆、仓库等</p>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min rows-2col">
          <span style="height: auto;">年限</span>
          <el-radio-group v-model="form.bizEntityJson.unitType">
            <el-radio :label="1">1年内(含)</el-radio>
            <el-radio :label="2">1年外</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min rows-2col">
          <span style="height: auto;">年限</span>
          <el-radio-group v-model="form.bizEntityJson.unitType">
            <el-radio :label="1">10万内</el-radio>
            <el-radio :label="2">10万外</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="4" class="title-col">
        <h2></h2>
      </el-col>
      <el-col :span="7" class="title-col">
        <h2>标准</h2>
      </el-col>
      <el-col :span="7" class="title-col">
        <h2>申请条件</h2>
      </el-col>
      <el-col :span="6" class="title-col right-col">
        <h2>备注</h2>
      </el-col>
      <el-col :span="4">
        <span class="span-100">装修期开始时间</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <p class="explain-p-one">无</p>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-date-picker
            :class="form.bizEntityJson.disabled ? '' : 'required'"
            v-model="form.bizEntityJson.lastOperatingDate"
            value-format="yyyy-MM-dd"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">装修期结束时间</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <p class="explain-p-one">无</p>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-date-picker
            :class="form.bizEntityJson.disabled ? '' : 'required'"
            v-model="form.bizEntityJson.lastOperatingDate"
            value-format="yyyy-MM-dd"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4" class="rows-2col">
        <span class="span-100">装修管理费(元)</span>
      </el-col>
      <el-col :span="7" class="rows-2col">
        <div class="d-min">
          <p class="explain-p-one">无</p>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required-onInput'">
          <span>每平方米</span>
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
            <template slot="append">元/㎡</template>
          </el-input>
        </div>
        <div class="d-min top-row">
          <span>合计</span>
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
            <template slot="append">元</template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input class="rows-2textarea" :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.reason" type="textarea" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">违约金(元)</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">广告位</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">停车位</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4" class="rows-2col">
        <span class="span-100">其他事项</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input class="rows-2textarea" :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.reason" type="textarea" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input class="rows-2textarea" :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.reason" type="textarea" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input class="rows-2textarea" :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.reason" type="textarea" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>工程条件</h2>
      </el-col>
      <el-col :span="4">
        <span class="span-100">工程情况</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-radio-group v-model="form.bizEntityJson.unitType">
            <el-radio :label="1">工程不变</el-radio>
            <el-radio :label="2">工程变更</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="13" class="right-col">
        <div class="d-min">
          <span>工程改造预算</span>
          <el-input :class="form.bizEntityJson.disabled ? '' : 'required'" v-model="form.bizEntityJson.authorizeUserName" @focus="showSearchUser = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4" class="title-col">
        <h2></h2>
      </el-col>
      <el-col :span="7" class="title-col">
        <h2>标准</h2>
      </el-col>
      <el-col :span="7" class="title-col">
        <h2>申请条件</h2>
      </el-col>
      <el-col :span="6" class="title-col right-col">
        <h2>改造费用</h2>
      </el-col>
      <el-col :span="4">
        <span class="span-100">1.结构</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">2.建筑</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">3.强电</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">4.弱点</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">5.给水</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">6.排水</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">7.空调</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">8.通风</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">9.燃气</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">10.店招</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">11.装修</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="span-100">12.消防</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>
          其他
          <el-tooltip class="item" effect="dark" content="附件必须为PDF" placement="top-start">
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </h2>
      </el-col>
      <el-col :span="6">
        <span class="span-100">备注说明</span>
      </el-col>
      <el-col :span="18" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span class="span-100">附件1：品牌落位图</span>
      </el-col>
      <el-col :span="18" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span class="span-100">
          附件2：品牌介绍
          <el-tooltip class="item" effect="dark" content="品牌简介、设计效果图、材质说明等" placement="top-start">
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </span>
      </el-col>
      <el-col :span="18" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span class="span-100">
          附件3：品牌证照
          <el-tooltip class="item" effect="dark" content="商标注册及品牌授权书、营业执照及组织机构代码证和税务登记证三证合一、法人身份证" placement="top-start">
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </span>
      </el-col>
      <el-col :span="18" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span class="span-100">附件4：工程改造费明细清单</span>
      </el-col>
      <el-col :span="18" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span class="span-100">附件5：广告位位置及方案</span>
      </el-col>
      <el-col :span="18" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span class="span-100">附件6：其他</span>
      </el-col>
      <el-col :span="18" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.authorizedUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <search-user :key="1" :open="showSearchUser" @close="closeSearhUser1"></search-user>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      showSearchUser: false,
      // uploadUrl,
      // fileList: fileList || [],
    }
  },
  props: ['data'],
	watch: {
		data: {
			immediate: true,
			handler: function(val) {
				console.log(val)
				this.form = val;
			}
		}
	},
  created() {
  },
  mounted() {
  },
  methods: {
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
      let fileId = this.form.bizEntityJson.fileId
      this.form.bizEntityJson.fileId = fileId.replace(nowfile,'')
    },
    handleSuccess(response, file, fileList) {
      const fileId = response.data.fileId
      this.form.bizEntityJson.fileId += fileId
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
    closeSearhUser1(val) {
      if (val) {
        this.form.bizEntityJson.authorizeUserName = val.userName
        this.form.bizEntityJson.authorizeUserCd = val.userCd
      }
      this.showSearchUser = false
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.authorizeUserName) return this.$message.error('请选择授权人'), false
      if(!this.form.bizEntityJson.position) return this.$message.error('请输入职位'), false
      if(!this.form.bizEntityJson.authorizedUserName) return this.$message.error('请选择被授权人'), false
      if(!this.form.bizEntityJson.authorizeReason) return this.$message.error('请输入授权原因'), false
      if(!this.form.bizEntityJson.beginDate) return this.$message.error('请选择开始日期'), false
      if(!this.form.bizEntityJson.endDate) return this.$message.error('请选择结束日期'), false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
