<template>
  <!-- 预算编制-费用支出-差旅费 -->
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
        <!-- <el-button v-if="!isEdit" @click="edit" :disabled="query.level ? true : false" size="mini" type="success">编辑</el-button>
        <el-button v-if="isEdit" @click="save" size="mini" type="success">保存</el-button>
        <el-button v-if="isEdit" @click="cancel" size="mini" type="warning" plain>取消</el-button> -->
      </el-col>
    </el-row>
    <el-table ref="table" class="table-input-box" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
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
      <el-table-column :label="`${currentYear}年预计`" align="center" v-if="!isEdit">
        <el-table-column min-width="150" label="年度人均差旅费用" :show-overflow-tooltip="!isEdit" prop="annualTravelFeeAvg" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'annualTravelFeeAvg',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="人次" :show-overflow-tooltip="!isEdit" prop="estimatedNumberPersons" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'estimatedNumberPersons',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="天数" :show-overflow-tooltip="!isEdit" prop="estimatedDays" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'estimatedDays',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计住宿费" :show-overflow-tooltip="!isEdit" prop="estimatedHotelExpense" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'estimatedHotelExpense',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计交通费" :show-overflow-tooltip="!isEdit" prop="estimatedTrafficFee" align="right">
          <template slot="header">
            预计交通费
            <el-tooltip class="item" effect="dark" placement="top" content="机票/高铁/市内打车费">
              <i class="el-icon-question yellow-tip"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'estimatedTrafficFee',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计补贴" :show-overflow-tooltip="!isEdit" prop="estimatedSubsidy" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'estimatedSubsidy',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="合计费用" show-overflow-tooltip prop="sumFee" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'sumFee',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="1月" align="center">
        <el-table-column min-width="140" label="人次" :show-overflow-tooltip="!isEdit" prop="janNumberPersons" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.janNumberPersons" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'janNumberPersons') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="天数" :show-overflow-tooltip="!isEdit" prop="janDays" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.janDays" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'janDays') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计住宿费" :show-overflow-tooltip="!isEdit" prop="janHotelExpense" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.janHotelExpense" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'janHotelExpense') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计交通费" :show-overflow-tooltip="!isEdit" prop="janTrafficFee" align="right">
          <template slot="header">
            预计交通费
            <el-tooltip class="item" effect="dark" placement="top" content="机票/高铁/市内打车费">
              <i class="el-icon-question yellow-tip"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.janTrafficFee" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'janTrafficFee') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计补贴" :show-overflow-tooltip="!isEdit" prop="janSubsidy" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.janSubsidy" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'janSubsidy') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="合计费用" show-overflow-tooltip prop="janSumFee" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'janSumFee',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="2月" align="center">
        <el-table-column min-width="140" label="人次" :show-overflow-tooltip="!isEdit" prop="febNumberPersons" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.febNumberPersons" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'febNumberPersons') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="天数" :show-overflow-tooltip="!isEdit" prop="febDays" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.febDays" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'febDays') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计住宿费" :show-overflow-tooltip="!isEdit" prop="febHotelExpense" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.febHotelExpense" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'febHotelExpense') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计交通费" :show-overflow-tooltip="!isEdit" prop="febTrafficFee" align="right">
          <template slot="header">
            预计交通费
            <el-tooltip class="item" effect="dark" placement="top" content="机票/高铁/市内打车费">
              <i class="el-icon-question yellow-tip"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.febTrafficFee" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'febTrafficFee') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计补贴" :show-overflow-tooltip="!isEdit" prop="febSubsidy" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.febSubsidy" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'febSubsidy') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="合计费用" show-overflow-tooltip prop="febSumFee" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'febSumFee',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="3月" align="center">
        <el-table-column min-width="140" label="人次" :show-overflow-tooltip="!isEdit" prop="marchNumberPersons" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.marchNumberPersons" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'marchNumberPersons') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="天数" :show-overflow-tooltip="!isEdit" prop="marchDays" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.marchDays" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'marchDays') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计住宿费" :show-overflow-tooltip="!isEdit" prop="marchHotelExpense" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.marchHotelExpense" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'marchHotelExpense') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计交通费" :show-overflow-tooltip="!isEdit" prop="marchTrafficFee" align="right">
          <template slot="header">
            预计交通费
            <el-tooltip class="item" effect="dark" placement="top" content="机票/高铁/市内打车费">
              <i class="el-icon-question yellow-tip"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.marchTrafficFee" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'marchTrafficFee') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计补贴" :show-overflow-tooltip="!isEdit" prop="marchSubsidy" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.marchSubsidy" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'marchSubsidy') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="合计费用" show-overflow-tooltip prop="marchSumFee" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'marchSumFee',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="4月" align="center">
        <el-table-column min-width="140" label="人次" :show-overflow-tooltip="!isEdit" prop="aprilNumberPersons" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.aprilNumberPersons" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'aprilNumberPersons') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="天数" :show-overflow-tooltip="!isEdit" prop="aprilDays" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.aprilDays" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'aprilDays') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计住宿费" :show-overflow-tooltip="!isEdit" prop="aprilHotelExpense" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.aprilHotelExpense" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'aprilHotelExpense') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计交通费" :show-overflow-tooltip="!isEdit" prop="aprilTrafficFee" align="right">
          <template slot="header">
            预计交通费
            <el-tooltip class="item" effect="dark" placement="top" content="机票/高铁/市内打车费">
              <i class="el-icon-question yellow-tip"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.aprilTrafficFee" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'aprilTrafficFee') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计补贴" :show-overflow-tooltip="!isEdit" prop="aprilSubsidy" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.aprilSubsidy" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'aprilSubsidy') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="合计费用" show-overflow-tooltip prop="aprilSumFee" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'aprilSumFee',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="5月" align="center">
        <el-table-column min-width="140" label="人次" :show-overflow-tooltip="!isEdit" prop="mayNumberPersons" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.mayNumberPersons" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'mayNumberPersons') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="天数" :show-overflow-tooltip="!isEdit" prop="mayDays" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.mayDays" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'mayDays') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计住宿费" :show-overflow-tooltip="!isEdit" prop="mayHotelExpense" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.mayHotelExpense" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'mayHotelExpense') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计交通费" :show-overflow-tooltip="!isEdit" prop="mayTrafficFee" align="right">
          <template slot="header">
            预计交通费
            <el-tooltip class="item" effect="dark" placement="top" content="机票/高铁/市内打车费">
              <i class="el-icon-question yellow-tip"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.mayTrafficFee" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'mayTrafficFee') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计补贴" :show-overflow-tooltip="!isEdit" prop="maySubsidy" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.maySubsidy" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'maySubsidy') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="合计费用" show-overflow-tooltip prop="maySumFee" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'maySumFee',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="6月" align="center">
        <el-table-column min-width="140" label="人次" :show-overflow-tooltip="!isEdit" prop="juneNumberPersons" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.juneNumberPersons" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'juneNumberPersons') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="天数" :show-overflow-tooltip="!isEdit" prop="juneDays" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.juneDays" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'juneDays') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计住宿费" :show-overflow-tooltip="!isEdit" prop="juneHotelExpense" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.juneHotelExpense" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'juneHotelExpense') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计交通费" :show-overflow-tooltip="!isEdit" prop="juneTrafficFee" align="right">
          <template slot="header">
            预计交通费
            <el-tooltip class="item" effect="dark" placement="top" content="机票/高铁/市内打车费">
              <i class="el-icon-question yellow-tip"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.juneTrafficFee" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'juneTrafficFee') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计补贴" :show-overflow-tooltip="!isEdit" prop="juneSubsidy" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.juneSubsidy" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'juneSubsidy') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="合计费用" show-overflow-tooltip prop="juneSumFee" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'juneSumFee',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="7月" align="center">
        <el-table-column min-width="140" label="人次" :show-overflow-tooltip="!isEdit" prop="julyNumberPersons" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.julyNumberPersons" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'julyNumberPersons') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="天数" :show-overflow-tooltip="!isEdit" prop="julyDays" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.julyDays" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'julyDays') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计住宿费" :show-overflow-tooltip="!isEdit" prop="julyHotelExpense" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.julyHotelExpense" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'julyHotelExpense') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计交通费" :show-overflow-tooltip="!isEdit" prop="julyTrafficFee" align="right">
          <template slot="header">
            预计交通费
            <el-tooltip class="item" effect="dark" placement="top" content="机票/高铁/市内打车费">
              <i class="el-icon-question yellow-tip"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.julyTrafficFee" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'julyTrafficFee') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计补贴" :show-overflow-tooltip="!isEdit" prop="julySubsidy" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.julySubsidy" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'julySubsidy') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="合计费用" show-overflow-tooltip prop="julySumFee" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'julySumFee',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="8月" align="center">
        <el-table-column min-width="140" label="人次" :show-overflow-tooltip="!isEdit" prop="augNumberPersons" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.augNumberPersons" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'augNumberPersons') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="天数" :show-overflow-tooltip="!isEdit" prop="augDays" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.augDays" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'augDays') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计住宿费" :show-overflow-tooltip="!isEdit" prop="augHotelExpense" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.augHotelExpense" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'augHotelExpense') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计交通费" :show-overflow-tooltip="!isEdit" prop="augTrafficFee" align="right">
          <template slot="header">
            预计交通费
            <el-tooltip class="item" effect="dark" placement="top" content="机票/高铁/市内打车费">
              <i class="el-icon-question yellow-tip"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.augTrafficFee" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'augTrafficFee') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计补贴" :show-overflow-tooltip="!isEdit" prop="augSubsidy" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.augSubsidy" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'augSubsidy') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="合计费用" show-overflow-tooltip prop="augSumFee" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'augSumFee',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="9月" align="center">
        <el-table-column min-width="140" label="人次" :show-overflow-tooltip="!isEdit" prop="sepNumberPersons" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.sepNumberPersons" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'sepNumberPersons') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="天数" :show-overflow-tooltip="!isEdit" prop="sepDays" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.sepDays" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'sepDays') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计住宿费" :show-overflow-tooltip="!isEdit" prop="sepHotelExpense" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.sepHotelExpense" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'sepHotelExpense') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计交通费" :show-overflow-tooltip="!isEdit" prop="sepTrafficFee" align="right">
          <template slot="header">
            预计交通费
            <el-tooltip class="item" effect="dark" placement="top" content="机票/高铁/市内打车费">
              <i class="el-icon-question yellow-tip"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.sepTrafficFee" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'sepTrafficFee') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计补贴" :show-overflow-tooltip="!isEdit" prop="sepSubsidy" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.sepSubsidy" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'sepSubsidy') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="合计费用" show-overflow-tooltip prop="sepSumFee" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'sepSumFee',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="10月" align="center">
        <el-table-column min-width="140" label="人次" :show-overflow-tooltip="!isEdit" prop="octNumberPersons" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.octNumberPersons" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'octNumberPersons') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="天数" :show-overflow-tooltip="!isEdit" prop="octDays" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.octDays" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'octDays') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计住宿费" :show-overflow-tooltip="!isEdit" prop="octHotelExpense" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.octHotelExpense" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'octHotelExpense') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计交通费" :show-overflow-tooltip="!isEdit" prop="octTrafficFee" align="right">
          <template slot="header">
            预计交通费
            <el-tooltip class="item" effect="dark" placement="top" content="机票/高铁/市内打车费">
              <i class="el-icon-question yellow-tip"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.octTrafficFee" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'octTrafficFee') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计补贴" :show-overflow-tooltip="!isEdit" prop="octSubsidy" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.octSubsidy" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'octSubsidy') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="合计费用" show-overflow-tooltip prop="octSumFee" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'octSumFee',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="11月" align="center">
        <el-table-column min-width="140" label="人次" :show-overflow-tooltip="!isEdit" prop="novNumberPersons" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.novNumberPersons" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'novNumberPersons') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="天数" :show-overflow-tooltip="!isEdit" prop="novDays" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.novDays" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'novDays') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计住宿费" :show-overflow-tooltip="!isEdit" prop="novHotelExpense" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.novHotelExpense" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'novHotelExpense') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计交通费" :show-overflow-tooltip="!isEdit" prop="novTrafficFee" align="right">
          <template slot="header">
            预计交通费
            <el-tooltip class="item" effect="dark" placement="top" content="机票/高铁/市内打车费">
              <i class="el-icon-question yellow-tip"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.novTrafficFee" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'novTrafficFee') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计补贴" :show-overflow-tooltip="!isEdit" prop="novSubsidy" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.novSubsidy" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'novSubsidy') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="合计费用" show-overflow-tooltip prop="novSumFee" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'novSumFee',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="12月" align="center">
        <el-table-column min-width="140" label="人次" :show-overflow-tooltip="!isEdit" prop="decNumberPersons" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.decNumberPersons" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'decNumberPersons') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="天数" :show-overflow-tooltip="!isEdit" prop="decDays" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.decDays" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'decDays') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计住宿费" :show-overflow-tooltip="!isEdit" prop="decHotelExpense" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.decHotelExpense" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'decHotelExpense') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计交通费" :show-overflow-tooltip="!isEdit" prop="decTrafficFee" align="right">
          <template slot="header">
            预计交通费
            <el-tooltip class="item" effect="dark" placement="top" content="机票/高铁/市内打车费">
              <i class="el-icon-question yellow-tip"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.decTrafficFee" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'mardecTrafficFeech') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计补贴" :show-overflow-tooltip="!isEdit" prop="decSubsidy" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.decSubsidy" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'decSubsidy') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="合计费用" show-overflow-tooltip prop="decSumFee" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'decSumFee',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
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
  watch: {
    isEdit() {
      this.$nextTick(() => {
        this.$refs.table.doLayout() //解决表格错位
      })
    }
  },
  computed: {
    ...mapGetters(['currentYear']),
    exportParams() {
      return {
        params: {
          bean: {
            ...this.routerQuery,
            ...this.query,
          }
        },
        excelName: '差旅费',
        exportUrl: '/bizTravelFee/excelExport',
      }
    },
    importParams() {
      return {
        importUrl: '/bizTravelFee/excelImport',
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
      GlobalApi.getSelectList({ selectType: 'bizTypeDeptLevel' }).then(res => {
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
      await FeeScheduleApi.traveFind(params).then(res => {
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
        leve: null
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
      FeeScheduleApi.traveEdit(params).then(res => {
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
.yellow-tip {
  color: #f5a623;
}
::v-deep .table-input-box {
  p {
    width: 100%;
    height: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
