<template>
  <!-- 预算查看-利润表 -->
  <div class="list-page plait">
    <el-row class="tool-bar">
      <el-row class="page-txt">
        <el-col :p="16">
          <el-select placeholder="请选择物业类型" size="mini" @change="search" v-model="query.mallType" filterable style="margin-right: 5px; width: 220px;">
            <el-option v-for="item in propertyTypeList" :key="item.id" :label="item.dictName" :value="item.dispOrderNo" :disabled="item.disabled">
            </el-option>
          </el-select>
          <el-select placeholder="请选择科目级次" size="mini" @change="searchLevel" v-model="subjectLevel" filterable style="margin-right: 5px; width: 180px;">
            <el-option v-for="item in profitLevelList" :key="item.id" :label="item.dictName" :value="item.dispOrderNo" :disabled="item.disabled">
            </el-option>
          </el-select>
          <el-button @click="reset" size="mini">重置</el-button>
        </el-col>
      </el-row>
    </el-row>
    <el-table class="table-input-box" ref="table" :row-key="getRowKeys" :expand-row-keys="expands" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" @cell-click="getCell" @row-click="expandChange" @expand-change="expandChange">
      <el-table-column min-width="120" fixed label="序号" show-overflow-tooltip prop="showSubjectSerial">
        <template slot-scope="scope">
          <span :class="[scope.row.showSubjectSerial == 0? 'pointer noSubjectSerial':'pointer']">{{ scope.row.showSubjectSerial  }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="188" fixed label="科目" show-overflow-tooltip prop="subjectName">
        <template slot-scope="scope">
          <p class="pointer">{{ scope.row.subjectName || '-' }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="上年预算指标" show-overflow-tooltip prop="budgetCurrentYear" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnRowEdit(scope,2)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'budgetCurrentYear')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'budgetCurrentYear')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.budgetCurrentYear" @input="valueChange(scope,'budgetCurrentYear')" @focus="focus(scope,'budgetCurrentYear')" @blur="blur(scope,'budgetCurrentYear')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: hasInput(scope.row.subjectSerial,true) }">{{ hasInput(scope.row.subjectSerial,true)?returnValue(scope.row,'budgetCurrentYear',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetCurrentYear',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="上年预计完成" show-overflow-tooltip prop="budgetCurrentYearComplete" align="right">
        <template slot-scope="scope">
          <p>{{ ['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetCurrentYearComplete',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" :label="`上年1-${dateBol?9:10}月实际数`" show-overflow-tooltip prop="threeQaActual" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnRowEdit(scope,4)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'threeQaActual')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'threeQaActual')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.threeQaActual" @input="valueChange(scope,'threeQaActual')" @focus="focus(scope,'threeQaActual')" @blur="blur(scope,'threeQaActual')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: hasInput(scope.row.subjectSerial,true) }">{{ hasInput(scope.row.subjectSerial,true)?returnValue(scope.row,'threeQaActual',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'threeQaActual',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" :label="`上年${dateBol?10:11}-12月预计完成`" show-overflow-tooltip prop="lastQaPredict" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnRowEdit(scope,5)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'lastQaPredict')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'lastQaPredict')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.lastQaPredict" @input="valueChange(scope,'lastQaPredict')" @focus="focus(scope,'lastQaPredict')" @blur="blur(scope,'lastQaPredict')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: hasInput(scope.row.subjectSerial,true)}">{{ hasInput(scope.row.subjectSerial,true)?returnValue(scope.row,'lastQaPredict',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'lastQaPredict',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="本年预算" show-overflow-tooltip prop="budgetNextYear" align="right">
        <template slot-scope="scope">
          <p>{{ ['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetNextYear',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="1月" show-overflow-tooltip prop="budgetJan" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnTimeRowEdit(scope,7)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'budgetJan')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'budgetJan')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.budgetJan" @input="valueChange(scope,'budgetJan')" @focus="focus(scope,'budgetJan')" @blur="blur(scope,'budgetJan')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: monthHasInput(scope.row.subjectSerial) }">{{ monthHasInput(scope.row.subjectSerial) ?returnValue(scope.row,'budgetJan',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetJan',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="2月" show-overflow-tooltip prop="budgetFeb" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnTimeRowEdit(scope,8)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'budgetFeb')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'budgetFeb')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.budgetFeb" @input="valueChange(scope,'budgetFeb')" @focus="focus(scope,'budgetFeb')" @blur="blur(scope,'budgetFeb')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: monthHasInput(scope.row.subjectSerial) }">{{ monthHasInput(scope.row.subjectSerial) ?returnValue(scope.row,'budgetFeb',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetFeb',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="3月" show-overflow-tooltip prop="budgetMar" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnTimeRowEdit(scope,9)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'budgetMar')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'budgetMar')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.budgetMar" @input="valueChange(scope,'budgetMar')" @focus="focus(scope,'budgetMar')" @blur="blur(scope,'budgetMar')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: monthHasInput(scope.row.subjectSerial) }">{{ monthHasInput(scope.row.subjectSerial) ?returnValue(scope.row,'budgetMar',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetMar',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="4月" show-overflow-tooltip prop="budgetApril" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnTimeRowEdit(scope,10)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'budgetApril')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'budgetApril')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.budgetApril" @input="valueChange(scope,'budgetApril')" @focus="focus(scope,'budgetApril')" @blur="blur(scope,'budgetApril')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: monthHasInput(scope.row.subjectSerial) }">{{ monthHasInput(scope.row.subjectSerial) ?returnValue(scope.row,'budgetApril',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetApril',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="5月" show-overflow-tooltip prop="budgetMay" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnTimeRowEdit(scope,11)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'budgetMay')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'budgetMay')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.budgetMay" @input="valueChange(scope,'budgetMay')" @focus="focus(scope,'budgetMay')" @blur="blur(scope,'budgetMay')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: monthHasInput(scope.row.subjectSerial) }">{{ monthHasInput(scope.row.subjectSerial) ?returnValue(scope.row,'budgetMay',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetMay',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="6月" show-overflow-tooltip prop="budgetJun" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnTimeRowEdit(scope,12)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'budgetJun')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'budgetJun')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.budgetJun" @input="valueChange(scope,'budgetJun')" @focus="focus(scope,'budgetJun')" @blur="blur(scope,'budgetJun')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: monthHasInput(scope.row.subjectSerial) }">{{ monthHasInput(scope.row.subjectSerial) ?returnValue(scope.row,'budgetJun',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetJun',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="7月" show-overflow-tooltip prop="budgetJuly" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnTimeRowEdit(scope,13)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'budgetJuly')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'budgetJuly')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.budgetJuly" @input="valueChange(scope,'budgetJuly')" @focus="focus(scope,'budgetJuly')" @blur="blur(scope,'budgetJuly')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: monthHasInput(scope.row.subjectSerial) }">{{ monthHasInput(scope.row.subjectSerial) ?returnValue(scope.row,'budgetJuly',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetJuly',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="8月" show-overflow-tooltip prop="budgetAugust" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnTimeRowEdit(scope,14)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'budgetAugust')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'budgetAugust')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.budgetAugust" @input="valueChange(scope,'budgetAugust')" @focus="focus(scope,'budgetAugust')" @blur="blur(scope,'budgetAugust')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: monthHasInput(scope.row.subjectSerial) }">{{ monthHasInput(scope.row.subjectSerial) ?returnValue(scope.row,'budgetAugust',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetAugust',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="9月" show-overflow-tooltip prop="budgetSep" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnTimeRowEdit(scope,15)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'budgetSep')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'budgetSep')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.budgetSep" @input="valueChange(scope,'budgetSep')" @focus="focus(scope,'budgetSep')" @blur="blur(scope,'budgetSep')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: monthHasInput(scope.row.subjectSerial) }">{{ monthHasInput(scope.row.subjectSerial) ?returnValue(scope.row,'budgetSep',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetSep',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="10月" show-overflow-tooltip prop="budgetOct" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnTimeRowEdit(scope,16)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'budgetOct')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'budgetOct')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.budgetOct" @input="valueChange(scope,'budgetOct')" @focus="focus(scope,'budgetOct')" @blur="blur(scope,'budgetOct')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: monthHasInput(scope.row.subjectSerial) }">{{ monthHasInput(scope.row.subjectSerial) ?returnValue(scope.row,'budgetOct',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetOct',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="11月" show-overflow-tooltip prop="budgetNov" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnTimeRowEdit(scope,17)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'budgetNov')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'budgetNov')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.budgetNov" @input="valueChange(scope,'budgetNov')" @focus="focus(scope,'budgetNov')" @blur="blur(scope,'budgetNov')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: monthHasInput(scope.row.subjectSerial) }">{{ monthHasInput(scope.row.subjectSerial) ?returnValue(scope.row,'budgetNov',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetNov',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="12月" show-overflow-tooltip prop="budgetDec" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnTimeRowEdit(scope,18)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'budgetDec')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'budgetDec')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.budgetDec" @input="valueChange(scope,'budgetDec')" @focus="focus(scope,'budgetDec')" @blur="blur(scope,'budgetDec')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: monthHasInput(scope.row.subjectSerial) }">{{ monthHasInput(scope.row.subjectSerial)?returnValue(scope.row,'budgetDec',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetDec',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="上年预计完成VS预算" show-overflow-tooltip prop="completeBudget" align="right">
        <template slot-scope="scope">
          <p>{{ ['1','2'].includes(scope.row.subjectSerial)?'/':returnPercentageValue(scope.row,'completeBudget',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="80" label="本年VS上年递增率" show-overflow-tooltip prop="increaseNextYear" align="right">
        <template slot-scope="scope">
          <p>{{ ['1','2'].includes(scope.row.subjectSerial)?'/':returnPercentageValue(scope.row,'increaseNextYear',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="80" label="次年VS本年递增率" show-overflow-tooltip prop="increaseNextTwoYear" align="right">
        <template slot-scope="scope">
          <p>{{ ['1','2'].includes(scope.row.subjectSerial)?'/':returnPercentageValue(scope.row,'increaseNextTwoYear',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="次年" show-overflow-tooltip prop="budgetNextTwoYear" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnRowEdit(scope,22) && ['1.2.5','2.7'].includes(scope.row.subjectSerial)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'budgetNextTwoYear')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'budgetNextTwoYear')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.budgetNextTwoYear" @input="valueChange(scope,'budgetNextTwoYear')" @focus="focus(scope,'budgetNextTwoYear')" @blur="blur(scope,'budgetNextTwoYear')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: ['1.2.5','2.7'].includes(scope.row.subjectSerial) }">{{ ['1.2.5','2.7'].includes(scope.row.subjectSerial)?returnValue(scope.row,'budgetNextTwoYear',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetNextTwoYear',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="第三年VS次年递增率" show-overflow-tooltip prop="increaseNextThreeYear" align="right">
        <template slot-scope="scope">
          <p>{{ ['1','2'].includes(scope.row.subjectSerial)?'/':returnPercentageValue(scope.row,'increaseNextThreeYear',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="第三年" show-overflow-tooltip prop="budgetNextThreeYear" align="right">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnRowEdit(scope,24) &&['1.2.5','2.7'].includes(scope.row.subjectSerial)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'budgetNextThreeYear')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'budgetNextThreeYear')">取消</el-button>
            </div>
            <el-input slot="reference" v-filter-check-input maxlength="12" v-model="scope.row.budgetNextThreeYear" @input="valueChange(scope,'budgetNextThreeYear')" @focus="focus(scope,'budgetNextThreeYear')" @blur="blur(scope,'budgetNextThreeYear')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: ['1.2.5','2.7'].includes(scope.row.subjectSerial) }">{{ ['1.2.5','2.7'].includes(scope.row.subjectSerial)?returnValue(scope.row,'budgetNextThreeYear',true,true):['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'budgetNextThreeYear',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="本年预算VS上年预计完成" show-overflow-tooltip prop="completeBudget1" align="right">
        <template slot-scope="scope">
          <p>{{ ['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'completeBudget1',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="200" label="差异原因(有差异必填)" show-overflow-tooltip prop="diffReason1">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnMarkRowEdit(scope,26)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'diffReason1')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'diffReason1')">取消</el-button>
            </div>
            <el-input slot="reference" v-model="scope.row.diffReason1" @input="valueChange(scope,'diffReason1')" @focus="focus(scope,'diffReason1')" @blur="blur(scope,'diffReason1')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: !['1','2'].includes(scope.row.subjectSerial) }">{{ ['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'diffReason1',true,true) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="上年预计完成VS上年预算" show-overflow-tooltip prop="completeBudget2" align="right">
        <template slot-scope="scope">
          <p>{{ ['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'completeBudget2',true,false) }}</p>
        </template>
      </el-table-column>

      <el-table-column min-width="200" label="差异原因(有差异必填)" show-overflow-tooltip prop="diffReason2">
        <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="focus" popper-class="option-popper" v-if="returnMarkRowEdit(scope,28)">
            <div style="text-align: left; margin: 0">
              <el-button size="mini" type="primary" class="el-button-btn" :disabled="!returnBol" @click="save(scope,'diffReason2')">保存</el-button>
              <el-button size="mini" type="text" class="el-button-btn" @click="cancel(scope,'diffReason2')">取消</el-button>
            </div>
            <el-input slot="reference" v-model="scope.row.diffReason2" @input="valueChange(scope,'diffReason2')" @focus="focus(scope,'diffReason2')" @blur="blur(scope,'diffReason2')" placeholder="请输入" size="mini"></el-input>
          </el-popover>
          <p v-else @click="showInput(scope.$index)" :class="{ isInput: !['1','2'].includes(scope.row.subjectSerial) }">{{ ['1','2'].includes(scope.row.subjectSerial)?'/':returnValue(scope.row,'diffReason2',true,true) }}</p>
        </template>
      </el-table-column>

      <!-- <el-table-column fixed="right" min-width="150" label="对应业务表">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="goDetail(scope.row)">查看利润表</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>
<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, viewChartGather, getNowFormatDate, subjectSerial, returnValue } from '@/utils/index'
import BudgetViewApi from '@/apis/apis/budgetViewApi'
import GlobalApi from '@/apis/apis/global'
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  mixins: [handle_paginator],
  data () {
    return {
      returnBol: false,
      selectIndex: null,//行
      cellIndex: null,//列
      viewChartGather: viewChartGather,
      subjectSerialAry: subjectSerial,
      query: { instanceId: null, mallType: 7 },
      subjectLevel: 2,
      tableData: [],
      oldTableData: [],
      routerQuery: null,
      dateBol: false,
      currentOldCellValue: null,
      currentNewCellValue: null,
      propertyTypeList: [
        {
          dictCd: "11111111111111",
          dictName: "请选择物业类型",
          dispOrderNo: 111111111111111,
          id: "368111111111111111",
          disabled: true
        }
      ],//物业类型
      profitLevelList: [{
        dictCd: "11111111111111",
        dictName: "请选择科目级次",
        dispOrderNo: 111111111111111,
        id: "368111111111111111",
        disabled: true
      }],//层级
      expands: [],//数组元素类型是字符串
      scrollTop: 0,
    }
  },
  watch: {},
  computed: {
    ...mapState(["viewInstanceId"])
  },
  created () {
    this.routerQuery = this.$route.query;
    this.query.instanceId = this.viewInstanceId;
    this.dateBol = this.getNowFormatDate().substr(5) < '11-01' ? true : false;
    this.getSelectList('profitBizType');//物业类型
    this.getSelectList('profitLevel');//层级
    this.getList();

  },
  mounted () {
    // this.dom = this.$refs.table.bodyWrapper;
    // this.dom.addEventListener('scroll', () => {
    //   this.scrollTop = this.dom.scrollTop;// 滚动距离
    //   console.log(this.scrollTop, 'this.scrollTop')
    // })
  },
  filters: {
  },
  methods: {
    // ...mapMutations([
    //   'setCompanyName',
    //   'setInstanceId'
    // ]),
    getNowFormatDate,
    returnValue,
    getRowKeys (row) {
      return row.id;
    },
    search () {
      this.scrollTop = 0;
      this.getList();
    },
    // 查询列表数据
    async getList () {
      try {
        const params = {
          ...this.query,
          instanceId: this.routerQuery.companyId,
        }
        this.resetIndex();
        await BudgetViewApi.find(params).then(res => {
          if (res.code == 0) {
            let { data } = res;
            let serverArray = (arr) => {
              let newArr = [];
              for (let index = 0; index < arr.length; index++) {
                const { id, subjectSerial, showSubjectSerial, subjectLevel, budgetCurrentYear, budgetCurrentYearComplete, threeQaActual, lastQaPredict, budgetNextYear, budgetJan, budgetFeb, budgetMar, budgetApril, budgetMay, budgetJun, budgetJuly, budgetAugust, budgetSep, budgetOct, budgetNov, budgetDec, budgetNextTwoYear, budgetNextThreeYear, completeBudget1, completeBudget2 } = arr[index];

                let obj = {
                  ...arr[index],
                  showSubjectSerial: showSubjectSerial == 0 ? '' : showSubjectSerial,
                  subjectLevel: showSubjectSerial == 0 ? 0 : subjectLevel,
                  budgetCurrentYear: this.getValueIsNumber(budgetCurrentYear) ? this.getValueToUnit(budgetCurrentYear, showSubjectSerial, '%') : budgetCurrentYear,//上年预算指标
                  budgetCurrentYearComplete: this.getValueIsNumber(budgetCurrentYearComplete) ? this.getValueToUnit(budgetCurrentYearComplete, showSubjectSerial, '%') : budgetCurrentYearComplete,//上年预计完成
                  threeQaActual: this.getValueIsNumber(threeQaActual) ? this.getValueToUnit(threeQaActual, showSubjectSerial, '%') : threeQaActual,
                  lastQaPredict: this.getValueIsNumber(lastQaPredict) ? this.getValueToUnit(lastQaPredict, showSubjectSerial, '%') : lastQaPredict,
                  budgetNextYear: this.getValueIsNumber(budgetNextYear) ? this.getValueToUnit(budgetNextYear, showSubjectSerial, '%') : budgetNextYear,//本年预算
                  budgetJan: this.getValueIsNumber(budgetJan) ? this.getValueToUnit(budgetJan) : budgetJan,
                  budgetFeb: this.getValueIsNumber(budgetFeb) ? this.getValueToUnit(budgetFeb) : budgetFeb,
                  budgetMar: this.getValueIsNumber(budgetMar) ? this.getValueToUnit(budgetMar) : budgetMar,
                  budgetApril: this.getValueIsNumber(budgetApril) ? this.getValueToUnit(budgetApril) : budgetApril,
                  budgetMay: this.getValueIsNumber(budgetMay) ? this.getValueToUnit(budgetMay) : budgetMay,
                  budgetJun: this.getValueIsNumber(budgetJun) ? this.getValueToUnit(budgetJun) : budgetJun,
                  budgetJuly: this.getValueIsNumber(budgetJuly) ? this.getValueToUnit(budgetJuly) : budgetJuly,
                  budgetAugust: this.getValueIsNumber(budgetAugust) ? this.getValueToUnit(budgetAugust) : budgetAugust,
                  budgetSep: this.getValueIsNumber(budgetSep) ? this.getValueToUnit(budgetSep) : budgetSep,
                  budgetOct: this.getValueIsNumber(budgetOct) ? this.getValueToUnit(budgetOct) : budgetOct,
                  budgetNov: this.getValueIsNumber(budgetNov) ? this.getValueToUnit(budgetNov) : budgetNov,
                  budgetDec: this.getValueIsNumber(budgetDec) ? this.getValueToUnit(budgetDec) : budgetDec,
                  budgetNextTwoYear: this.getValueIsNumber(budgetNextTwoYear) ? this.getValueToUnit(budgetNextTwoYear, showSubjectSerial, '%') : budgetNextTwoYear,//次年
                  budgetNextThreeYear: this.getValueIsNumber(budgetNextThreeYear) ? this.getValueToUnit(budgetNextThreeYear, showSubjectSerial, '%') : budgetNextThreeYear,//第三年
                  completeBudget1: this.getValueIsNumber(completeBudget1) ? this.getValueToUnit(completeBudget1) : completeBudget1,
                  completeBudget2: this.getValueIsNumber(completeBudget2) ? this.getValueToUnit(completeBudget2) : completeBudget2
                }
                newArr.push(obj);

                if (arr[index].children) {
                  newArr[index]['children'] = serverArray(arr[index].children)
                } else {
                  newArr[index]['children'] = []
                }
              }
              return newArr
            }
            let options = serverArray(data);
            this.tableData = options;
            this.oldTableData = JSON.stringify(options)
            this.getExpands();
            setTimeout(() => {
              getDynamicTableHeight(this)
            }, 500)
          }
        })

        this.$nextTick(function () {
          // 表格更新后滚动滚动条
          this.$refs.table.bodyWrapper.scrollTop = this.scrollTop == 0 ? 0 : this.scrollTop - 1;
          console.log(this.scrollTop, 'scrollTop-getList')
        })
      } catch (e) {
        console.log(e)
      }
    },
    searchLevel () {
      this.scrollTop = 0;
      this.tableData = [];
      this.expands = [];
      this.getList();
    },
    getExpands () {
      try {
        this.treeForeach(this.tableData, node => {
          this.$nextTick(function () {
            let { id, subjectLevel, showSubjectSerial } = node;
            if (subjectLevel < this.subjectLevel && !['1', '2', '3', '7'].includes(showSubjectSerial) || this.subjectLevel >= 4 && subjectLevel < this.subjectLevel) {
              this.expands.push(String(id));
            }
          })
        })
      } catch (e) {
        console.log(e)
      }
    },
    treeForeach (tree, func) {
      let node, list = [...tree]
      while (node = list.shift()) {
        func(node)
        node.children && list.push(...node.children)
      }
    },
    treeFilter (tree, func) {
      return tree.map(node => ({ ...node })).filter(node => {
        node.children = node.children && this.treeFilter(node.children, func)
        return func(node) || (node.children && node.children.length)
      })
    },
    treeFind (tree, func) {
      for (const data of tree) {
        if (func(data)) return data
        if (data.children) {
          const res = this.treeFind(data.children, func)
          if (res) return res
        }
      }
      return null
    },
    expandChange (row, index, e) {
      try {
        this.expands = [];
        if (index && index.fixed) {
          this.$nextTick(function () {
            // 展开或者折叠点击行
            this.$refs.table.toggleRowExpansion(row)
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    getValueIsNumber (value) {
      return (isNaN(value) || [null, undefined, ''].includes(value)) ? false : true
    },
    getValueToUnit (value, serial, unit) {
      var showSubjectSerial = ['7.1.1.3', '7.1.1.4', '7.1.1.5']
      if (unit) {
        if (showSubjectSerial.includes(serial)) {
          return (Number(value) * 100).toFixed(2) + unit
        } else {
          return (Number(value) / 10000).toFixed(2)
        }
      } else {
        return (Number(value) / 10000).toFixed(2)
      }
    },
    async getSelectList (type) {
      const params = {
        selectType: type
      }
      await GlobalApi.getSelectList(params).then(res => {
        if (res.code === 0) {
          if (type == 'profitBizType') {//物业类型
            this.propertyTypeList = [...this.propertyTypeList, ...res.data]
          } else if (type == 'profitLevel') {
            this.profitLevelList = [...this.profitLevelList, ...res.data]
          }
        }
      })
    },
    returnRowEdit (scope, cellIndex) {
      // 判断当前单元格是否可编辑
      const { row, $index } = scope
      const { subjectSerial } = row
      const mallType = this.query.mallType;
      if (this.subjectSerialAry.includes(subjectSerial) && $index == this.selectIndex && cellIndex == this.cellIndex && ![5, 6, 7].includes(mallType)) {
        return true;
      } else {
        return false
      }
    },
    returnTimeRowEdit (scope, cellIndex) {
      // 判断当前单元格是否可编辑
      const { row, $index } = scope
      const { subjectSerial } = row
      if (subjectSerial == '2.7' && $index == this.selectIndex && cellIndex == this.cellIndex) {
        return true;
      } else {
        return false
      }
    },
    returnMarkRowEdit (scope, cellIndex) {
      // 判断当前单元格是否可编辑
      const { row, $index } = scope
      const { subjectSerial } = row
      if ($index == this.selectIndex && cellIndex == this.cellIndex) {
        return true;
      } else {
        return false
      }
    },
    hasInput (subjectSerial) {
      // 判断当前列是否有输入框
      const mallType = this.query.mallType;
      if (this.subjectSerialAry.includes(subjectSerial) && ![5, 6, 7].includes(mallType)) {
        return true;
      } else {
        return false
      }
    },
    monthHasInput (subjectSerial) {
      // 判断月份是否有输入框
      const mallType = this.query.mallType;
      return subjectSerial == '2.7' && ![5, 6, 7].includes(mallType)
    },
    yearHasInput (subjectSerial) {
      // 判断年是否有输入框
      const mallType = this.query.mallType;
      return ['1.2.5', '2.7'].includes(subjectSerial) && ![5, 6, 7].includes(mallType)
    },
    reset () {
      this.tableData = [];
      this.expands = [];
      this.query = { ...this.query, mallType: 7 };
      this.subjectLevel = 2;
      this.scrollTop = 0;
      this.getList()
    },
    getCell (row, column, cell, event) {
      this.cellIndex = cell.cellIndex;
    },
    showInput (index) {
      if ((this.selectIndex || this.cellIndex) && this.currentNewCellValue) {
        this.resetIndex();
      }
      // 获取当前单元格 行的下标
      this.selectIndex = index
    },
    valueChange (scope, type) {
      // 当前输入框数据变更，保存 按钮可以点击使用
      if (scope.row[type] != '' && scope.row[type] != null) {
        this.returnBol = true;
        this.currentNewCellValue = scope.row[type];
      } else {
        this.returnBol = false;
      }
    },
    focus (scope, type) {
      // 获取焦点时，保存原始值
      // console.log(scope.row[type], 'focus')
      this.currentOldCellValue = scope.row[type];
    },
    blur (scope, type) {
      // console.log(scope.row[type], 'blur')
      scope.row[type] = null
    },
    save (scope, type) {
      try {
        if (this.returnBol) {
          scope.row[type] = this.currentNewCellValue
        } else {
          scope.row[type] = this.currentOldCellValue
        }
        let params = {
          serialCode: scope.row['subjectSerial'],//  序号
          updateName: type,//  改的字段的名称
          value: scope.row[type],//      改的字段的值
          mallType: this.query.mallType,
          instanceId: this.routerQuery.companyId,
        };

        this.scrollTop = this.$refs.table.bodyWrapper.scrollTop;//点击保存时记录滚动条的位置

        console.log(this.scrollTop, 'scrollTop-save')

        BudgetViewApi.profitSave(params).then(res => {
          if (res.code == 0) {
            this.resetIndex();
            this.getList()
          }
        })
      } catch (e) {
        console.log(e);
      }
    },
    cancel (scope, type) {
      this.resetIndex();
      // this.tableData = JSON.parse(this.oldTableData);
      scope.row[type] = this.currentOldCellValue
    },
    resetIndex () {
      this.selectIndex = null;
      this.cellIndex = null;
      this.returnBol = false;
    },
    returnPercentageValue (scope, key) {
      // 添加百分比
      let precise = 2;
      let value = scope[key];
      if ([null, undefined, '', '-'].includes(value)) {
        return '-';
      }
      value = ![null, undefined, '', '-'].includes(value) ? (value * 100) : value;
      let text = Number(value).toFixed(precise);
      let bit = text.indexOf('.') < 0 ? '' : text.substr(text.indexOf('.'));
      let f = text.replace(/\..*$/, '').split('').reverse().join('').replace(/(\d{3})\B/g, function (_, c) { return _ + ','; }).split('').reverse().join('') + bit;
      return f + '%'
    }
  }
}
</script>
<style type="text/css" lang="scss" >
@import "~@styles/common.scss";
.plait {
  .table-input-box {
    p {
      width: 100%;
      height: 24px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .pointer {
      cursor: pointer;
    }
  }
  .el-table__row--level-0 td:first-child .cell {
    visibility: hidden;
  }
  .cell .el-button {
    padding: 4px 17px 4px 0;
  }
  .isInput {
    background-color: #ededed8c;
  }
  .tool-bar {
    display: flex;
    flex-direction: column;
    .page-txt {
      .el-col {
        margin-bottom: 15px;
        font-size: 14px;
      }
      .plait-title {
        color: #468ceb;
      }
    }
    .page-txt-tab {
      .el-col {
        margin-bottom: 5px;
        font-size: 14px;
      }
      .plait-title {
        color: #468ceb;
      }
    }
    .el-tabs__content {
      display: none;
    }
    .el-tabs__active-bar {
      display: none;
    }
    .select-title {
      display: flex;
      justify-content: flex-start;
      .select-cutover {
        p {
          display: inline-block;
          font-size: 14px;
          padding: 0 20px;
          border-right: 1px solid #000;
          cursor: pointer;
        }
        p:first-child {
          padding-left: 0;
        }
        p:last-child {
          border: 0;
        }
        .select-blue {
          color: #468ceb;
          font-size: 18px;
        }
      }
      .select-data {
        font-size: 12px;
        color: #666666;
        line-height: 18px;
      }
    }
  }
  .el-tabs__item:after {
    content: "";
    width: 1px;
    height: 40%;
    background-color: #585353;
    position: absolute;
    left: 99%;
    top: 11px;
  }
  .el-tabs__item:last-child:after {
    display: none;
    content: "";
    width: 1px;
    height: 40%;
    background-color: #fff;
    position: absolute;
    left: 99%;
    top: 11px;
  }
  .el-tabs__nav-next,
  .el-tabs__nav-prev {
    position: absolute;
    cursor: pointer;
    line-height: 40px;
    font-size: 22px;
    color: #000;
  }
  .el-tabs__nav-wrap.is-scrollable {
    padding: 0 32px;
    box-sizing: border-box;
  }
  .el-table__indent {
    padding-left: 0px !important;
  }
  .el-table__placeholder {
    width: 23px;
  }
}
</style>
