<template>
  <!-- 预算编制-费用支出-工资福利费 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col :span="12">
        <el-select v-if="!isEdit" placeholder="请选择业态" size="mini" v-model="query.bizTypeId" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in bizTypeIdList" :key="item.dictCd" :label="item.dictName" :value="item.dictCd">
          </el-option>
        </el-select>
        <el-select v-if="!isEdit" placeholder="请选择级别" size="mini" v-model="query.level" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in levelList" :key="item.dictCd" :label="item.dictName" :value="item.dictCd">
          </el-option>
        </el-select>
        <el-button v-if="!isEdit" @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <!-- <ys-import v-if="!isEdit" :params="importParams" @update="getList"></ys-import> -->
        <ys-export v-if="!isEdit" :params="exportParams"></ys-export>
        <el-button v-if="!isEdit" @click="edit" :disabled="query.level ? true : false" size="mini" type="success">编辑</el-button>
        <el-button v-if="isEdit" @click="save" size="mini" type="success">保存</el-button>
        <el-button v-if="isEdit" @click="cancel" size="mini" type="warning" plain>取消</el-button>
      </el-col>
    </el-row>
    <el-table class="table-input-box" ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
      <el-table-column fixed min-width="140" label="业态" show-overflow-tooltip prop="bizType">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ scope.row.bizType || '/' }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="140" label="部门" show-overflow-tooltip prop="deptName">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ scope.row.deptName || '/' }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="150" label="岗位" show-overflow-tooltip prop="positionName">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ scope.row.positionName || '/' }}</p>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="标准人工福利(元/月/人)" align="center">
        <el-table-column min-width="140" label="编制人数" :show-overflow-tooltip="!isEdit" prop="standardNum" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.standardNum" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'standardNum',true,false,'bizType',0) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="工资" :show-overflow-tooltip="!isEdit" prop="standardSalary" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.standardSalary" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'standardSalary') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="社保" :show-overflow-tooltip="!isEdit" prop="standardInsurance" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.standardInsurance" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'standardInsurance') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="公积金" :show-overflow-tooltip="!isEdit" prop="standardFunds" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.standardFunds" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'standardFunds') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="车补" :show-overflow-tooltip="!isEdit" prop="standardCar" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.standardCar" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'standardCar') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="餐补" :show-overflow-tooltip="!isEdit" prop="standardFood" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.standardFood" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'standardFood') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="通讯" :show-overflow-tooltip="!isEdit" prop="standardCommunication" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.standardCommunication" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'standardCommunication') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="住房" :show-overflow-tooltip="!isEdit" prop="standardHousing" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.standardHousing" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'standardHousing') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="电脑" :show-overflow-tooltip="!isEdit" prop="standardComputer" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.standardComputer" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'standardComputer') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="月合计" show-overflow-tooltip prop="standardTotal" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'standardTotal',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="实际人工成本(元/月/人)" align="center">
        <el-table-column min-width="140" label="实际到岗" :show-overflow-tooltip="!isEdit" prop="actualNum" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.actualNum" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'actualNum',true,false,'bizType',0) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="工资" :show-overflow-tooltip="!isEdit" prop="actualSalary" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.actualSalary" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'actualSalary') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="社保" :show-overflow-tooltip="!isEdit" prop="actualInsurance" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.actualInsurance" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'actualInsurance') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="公积金" :show-overflow-tooltip="!isEdit" prop="actualFunds" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.actualFunds" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'actualFunds') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="车补" :show-overflow-tooltip="!isEdit" prop="actualCar" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.actualCar" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'actualCar') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="餐补" :show-overflow-tooltip="!isEdit" prop="actualFood" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.actualFood" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'actualFood') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="通讯" :show-overflow-tooltip="!isEdit" prop="actualCommunication" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.actualCommunication" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'actualCommunication') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="住房" :show-overflow-tooltip="!isEdit" prop="actualHousing" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.actualHousing" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'actualHousing') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="电脑" :show-overflow-tooltip="!isEdit" prop="actualComputer" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.actualComputer" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'actualComputer') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="月合计" show-overflow-tooltip prop="actualTotal" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'actualTotal',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="补贴、福利、奖金" align="center">
        <el-table-column min-width="140" label="年终奖金倍数" :show-overflow-tooltip="!isEdit" prop="multiple" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.multiple" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'multiple') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="年终奖金金额" :show-overflow-tooltip="!isEdit" prop="amount" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'amount',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="优秀员工" :show-overflow-tooltip="!isEdit" prop="excellentStaff" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.excellentStaff" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'excellentStaff') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="加班工资" :show-overflow-tooltip="!isEdit" prop="overtimePay" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.overtimePay" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'overtimePay') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="活动费" :show-overflow-tooltip="!isEdit" prop="activitiesFee" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.activitiesFee" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'activitiesFee') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="中秋博饼" :show-overflow-tooltip="!isEdit" prop="autumn" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.autumn" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'autumn') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="尾牙" :show-overflow-tooltip="!isEdit" prop="weiYa" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.weiYa" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'weiYa') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="生日" :show-overflow-tooltip="!isEdit" prop="birthday" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.birthday" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'birthday') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="体检" :show-overflow-tooltip="!isEdit" prop="physical" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.physical" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'physical') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="3.8节" :show-overflow-tooltip="!isEdit" prop="section38" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.section38" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'section38') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="高温补贴" :show-overflow-tooltip="!isEdit" prop="highTemperature" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.highTemperature" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'highTemperature') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="商业保险费(员工)" :show-overflow-tooltip="!isEdit" prop="commercialInsurance" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.commercialInsurance" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'commercialInsurance') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="婚伤探亲" :show-overflow-tooltip="!isEdit" prop="hstq" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.hstq" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'hstq') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="赔偿金" :show-overflow-tooltip="!isEdit" prop="damages" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.damages" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'standardamagesdCar') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="小计" show-overflow-tooltip prop="subtotal" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'subtotal',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="1月" :show-overflow-tooltip="!isEdit" prop="welfareJan" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.welfareJan" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'welfareJan') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="2月" :show-overflow-tooltip="!isEdit" prop="welfareFeb" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.welfareFeb" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'welfareFeb') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="3月" :show-overflow-tooltip="!isEdit" prop="welfareMarch" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.welfareMarch" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'welfareMarch') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="4月" :show-overflow-tooltip="!isEdit" prop="welfareApril" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.welfareApril" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'welfareApril') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="5月" :show-overflow-tooltip="!isEdit" prop="welfareMay" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.welfareMay" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'welfareMay') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="6月" :show-overflow-tooltip="!isEdit" prop="welfareJune" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.welfareJune" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'welfareJune') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="7月" :show-overflow-tooltip="!isEdit" prop="welfareJuly" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.welfareJuly" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'welfareJuly') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="8月" :show-overflow-tooltip="!isEdit" prop="welfareAug" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.welfareAug" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'welfareAug') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="9月" :show-overflow-tooltip="!isEdit" prop="welfareSep" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.welfareSep" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'welfareSep') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="10月" :show-overflow-tooltip="!isEdit" prop="welfareOct" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.welfareOct" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'welfareOct') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="11月" :show-overflow-tooltip="!isEdit" prop="welfareNov" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.welfareNov" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'welfareNov') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="12月" :show-overflow-tooltip="!isEdit" prop="welfareDec" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.welfareDec" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'welfareDec') }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column :label="`${getBudgetYear}年薪资调整(%)`" align="center">
        <el-table-column min-width="140" label="检验" show-overflow-tooltip prop="welfareCheck" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'welfareCheck',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="工资调整" :show-overflow-tooltip="!isEdit" prop="adjustmentSalary" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.adjustmentSalary" v-filter-check-input4 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'adjustmentSalary') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="工资调整月份" :show-overflow-tooltip="!isEdit" prop="adjustmentSalaryMonth" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.adjustmentSalaryMonth" v-filter-check-input2 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'adjustmentSalaryMonth') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="社保调整" :show-overflow-tooltip="!isEdit" prop="adjustmentInsurance" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.adjustmentInsurance" v-filter-check-input4 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'adjustmentInsurance') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="社保调整月份" :show-overflow-tooltip="!isEdit" prop="adjustmentInsuranceMonth" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.adjustmentInsuranceMonth" v-filter-check-input2 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'adjustmentInsuranceMonth') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="公积金调整" :show-overflow-tooltip="!isEdit" prop="adjustmentFunds" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.adjustmentFunds" v-filter-check-input4 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'adjustmentFunds') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="130" label="公积金调整月份" :show-overflow-tooltip="!isEdit" prop="adjustmentFundsMonth" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.adjustmentFundsMonth" v-filter-check-input2 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'adjustmentFundsMonth') }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column :label="`${getBudgetYear}年实际人数增减(人数/月)`" align="center">
        <el-table-column min-width="140" label="1月" :show-overflow-tooltip="!isEdit" prop="unitJan" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.unitJan" v-filter-check-input5 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'unitJan',true,false,'bizType',0) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="2月" :show-overflow-tooltip="!isEdit" prop="unitFeb" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.unitFeb" v-filter-check-input5 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'unitFeb',true,false,'bizType',0) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="3月" :show-overflow-tooltip="!isEdit" prop="unitMarch" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.unitMarch" v-filter-check-input5 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'unitMarch',true,false,'bizType',0) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="4月" :show-overflow-tooltip="!isEdit" prop="unitApril" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.unitApril" v-filter-check-input5 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'unitApril',true,false,'bizType',0) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="5月" :show-overflow-tooltip="!isEdit" prop="unitMay" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.unitMay" v-filter-check-input5 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'unitMay',true,false,'bizType',0) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="6月" :show-overflow-tooltip="!isEdit" prop="unitJune" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.unitJune" v-filter-check-input5 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'unitJune',true,false,'bizType',0) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="7月" :show-overflow-tooltip="!isEdit" prop="unitJuly" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.unitJuly" v-filter-check-input5 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'unitJuly',true,false,'bizType',0) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="8月" :show-overflow-tooltip="!isEdit" prop="unitAug" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.unitAug" v-filter-check-input5 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'unitAug',true,false,'bizType',0) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="9月" :show-overflow-tooltip="!isEdit" prop="unitSep" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.unitSep" v-filter-check-input5 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'unitSep',true,false,'bizType',0) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="10月" :show-overflow-tooltip="!isEdit" prop="unitOct" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.unitOct" v-filter-check-input5 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'unitOct',true,false,'bizType',0) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="11月" :show-overflow-tooltip="!isEdit" prop="unitNov" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.unitNov" v-filter-check-input5 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'unitNov',true,false,'bizType',0) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="12月" :show-overflow-tooltip="!isEdit" prop="unitDec" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.unitDec" v-filter-check-input5 maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'unitDec',true,false,'bizType',0) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column :label="`${getBudgetYear}年人工成本(元/月)`" align="center">
        <el-table-column min-width="140" label="1月" :show-overflow-tooltip="!isEdit" prop="jan" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.jan" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'jan') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="2月" :show-overflow-tooltip="!isEdit" prop="feb" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.feb" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'feb') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="3月" :show-overflow-tooltip="!isEdit" prop="march" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.march" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'march') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="4月" :show-overflow-tooltip="!isEdit" prop="april" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.april" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'april') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="5月" :show-overflow-tooltip="!isEdit" prop="may" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.may" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'may') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="6月" :show-overflow-tooltip="!isEdit" prop="june" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.june" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'june') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="7月" :show-overflow-tooltip="!isEdit" prop="july" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.july" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'july') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="8月" :show-overflow-tooltip="!isEdit" prop="aug" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.aug" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'aug') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="9月" :show-overflow-tooltip="!isEdit" prop="sep" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.sep" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'sep') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="10月" :show-overflow-tooltip="!isEdit" prop="oct" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.oct" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'oct') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="11月" :show-overflow-tooltip="!isEdit" prop="nov" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.nov" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'nov') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="12月" :show-overflow-tooltip="!isEdit" prop="dece" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.dece" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'dece') }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column :label="`${getBudgetYear}年人工福利(总额)`" align="center">
        <el-table-column min-width="140" label="年合计" :show-overflow-tooltip="!isEdit" prop="ytd" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.ytd" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'ytd') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="工资" :show-overflow-tooltip="!isEdit" prop="preSalaryYtd" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.preSalaryYtd" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'preSalaryYtd') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="社保" :show-overflow-tooltip="!isEdit" prop="preInsuranceYtd" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.preInsuranceYtd" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'preInsuranceYtd') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="公积金" :show-overflow-tooltip="!isEdit" prop="preFundsYtd" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.preFundsYtd" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'preFundsYtd') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="补贴" :show-overflow-tooltip="!isEdit" prop="preSubsidyYtd" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.preSubsidyYtd" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'preSubsidyYtd') }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <!-- <el-table-column min-width="140" label="车库面积(㎡)" align="right">
        <template slot-scope="scope">
          <span>{{ scope.row.garage_area | formatVal }}</span>
        </template>
      </el-table-column> -->
    </el-table>

    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, returnValue } from '@/utils/index'
import GlobalApi from '@/apis/apis/global'
import FeeScheduleApi from '@/apis/apis/feeScheduleApi'
import { mapGetters } from "vuex"
export default {
  mixins: [handle_paginator],
  data() {
    return {
      isEdit: false,
      selectIndex: 0,
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      query: {
        bizTypeId: null,
        level: null,
      },
      bizTypeIdList: [], // 业态列表
      levelList: [], // 级别列表
      tableData: [],
      oldTableData: '',
      routerQuery: null,
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['getBudgetYear']),
    exportParams() {
      return {
        params: {
          bean: {
            ...this.routerQuery,
            ...this.query,
          }
        },
        excelName: '工资福利费',
        exportUrl: '/bizHrfee/excelExport',
      }
    },
    importParams() {
      return {
        importUrl: '/bizTrain/excelImport',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
      }
    }
  },
  created() {
    this.routerQuery = this.$route.query
    this.getBizTypeList()
    this.getSelectList()
    this.getList()
  },
  mounted() {

  },
  // 日期转换格式
  filters: {
    formatDate(time) {
      return time ? new Date(parseInt(time)).format('yyyy-MM-dd') : ''
    },
    formatVal(val) {
      return toThousandsClean(val)
    }
  },
  methods: {
    returnValue,
    // 获取业态列表
    getBizTypeList() {
      GlobalApi.getSelectList({ selectType: 'bizFormat' }).then(res => {
        if (res.code == 0) {
          res.data.forEach((item, index) => {
            res.data[index].dictCd = Number(item.dictCd)
          })
          this.bizTypeIdList = res.data
        }
      })
    },
    // 获取级别列表
    getSelectList() {
      GlobalApi.getSelectList({ selectType: 'bizTypeLevel' }).then(res => {
        if (res.code == 0) {
          this.levelList = res.data
        }
      })
    },
    // 查询
    async getList() {
      const params = {
        ...this.pageInfo,
        bean: {
          ...this.routerQuery,
          ...this.query,
        }
      }
      this.isEdit = false
      await FeeScheduleApi.wageFind(params).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
          this.oldTableData = JSON.stringify(res.data.list.slice(1))
          getDynamicTableHeight(this)
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange() {
      this.isEdit = false
      this.pageInfo.pageNum = 1
      this.getList()
    },
    // 选择一行显示input
    showInput(index) {
      this.selectIndex = index
    },
    reset() {
      this.query = {
        bizTypeId: null,
        department: null,
        position: null,
        level: null
      }
      this.getList()
    },
    // 编辑
    edit() {
      this.isEdit = true
      this.tableData.shift()
    },
    // 取消
    cancel() {
      let tableData = JSON.stringify(this.tableData)
      if (this.oldTableData == tableData) {
        this.getList()
        this.isEdit = false
      } else {
        this.$confirm(`是否保存已编辑内容`, {
          confirmButtonText: '是',
          cancelButtonText: '否'
        }).then(() => {
          this.save()
          this.isEdit = false
        }).catch(() => {
          this.getList()
          this.isEdit = false
        })
      }
    },
    // 保存
    save() {
      this.selectIndex = 0
      const params = {
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        list: this.tableData
      }
      FeeScheduleApi.wageEdit(params).then(res => {
        if (res.code == 0) {
          this.getList()
          this.isEdit = false
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
@import "~@styles/common.scss";
</style>
