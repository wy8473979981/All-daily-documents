
<template>
  <div>
    <!-- title组件 -->
    <ysn-title title="一铺一价综合信息">
      <div class="font-z-14" @click="pokuer = !pokuer">{{ pokuer?"收起":"展开" }}<i
        class="font-color"
        :class="!pokuer?'el-icon-arrow-down':'el-icon-arrow-up'"
      />
      </div>
    </ysn-title>

    <!-- 详情组件 -->
    <el-collapse-transition>
      <div v-if="pokuer">
        <ysn-displayInfo
          class="mt-8"
          :data="listEditAndDetails.displayInfoData"
          :config="listEditAndDetails.formDataDisplayInfo"
          :column="6"
        />
      </div>
    </el-collapse-transition>

    <!-- title组件 -->
    <ysn-title title="楼层平均价格">
      <div class="font-z-14" @click="pokuer = !pokuer">{{ pokuer?"收起":"展开" }}<i
        class="font-color"
        :class="!pokuer?'el-icon-arrow-down':'el-icon-arrow-up'"
      />
      </div>
    </ysn-title>
    <!-- 详情组件 -->
    <el-collapse-transition>
      <div v-if="pokuer">
        <ysn-displayInfo
          class="mt-8"
          :data="listEditAndDetails.averagePriceData"
          :config="listEditAndDetails.averagePrice"
          :column="6"
        />
      </div>
    </el-collapse-transition>

    <!-- title组件 -->
    <ysn-title title="一铺一价信息">
      <div class="font-z-14" @click="pokuer = !pokuer">{{ pokuer?"收起":"展开" }}<i
        class="font-color"
        :class="!pokuer?'el-icon-arrow-down':'el-icon-arrow-up'"
      /></div>
    </ysn-title>

    <!-- 表格 -->
    <el-collapse-transition>
      <div v-if="pokuer" class="mt-8">
        <slot name="formdata" />
        <!-- <el-form ref="form" :model="form" :rules="rules" > -->
        <!-- <ysn-table
      :checkbox="false"
      :data="listEditAndDetails.tableData"
      :column="listEditAndDetails.tableConfig"
      select-key="id"
      :show-slots="slotsList"
      isDisTable
      > -->

        <!-- <ysn-table
      :checkbox="false"
      :data="form.datas"
      :column="listEditAndDetails.tableConfig"
      select-key="id"
      :show-slots="slotsList"
      isDisTable
      >

      <template #StandardDeposit="scope">
               <el-form-item :prop="'datas.'+scope.$index + '.StandardDeposit'" :rules='rules.StandardDeposit'>
                <el-input size="mini" v-model.trim="scope.row.StandardDeposit" style="width: 120px;"></el-input>
              </el-form-item>
      </template> -->

      <!-- <template #StandardDeposit="scope">
        <el-input v-model="scope.row.StandardYear" placeholder="请输入内容"></el-input>
      </template> -->
        <!-- <template #StandardDeposit="scope">
             <el-form  ref="ruleForm" :model="listEditAndDetails.row"   label-position="top" size="small" >
                <ysn-formItem
                  :form="scope.row"
                  :config="configData"
                  :column="5"
                  clearable
                 >
            </ysn-formItem>
               </el-form>
     </template> -->

        <!-- <template #StandardDeposit="scope">
          <el-input v-model="scope.row.StandardYear" placeholder="请输入内容"></el-input>
     </template>

     <template #StandardDecorationDeposit="scope">
          <el-input v-model="scope.row.StandardDecorationDeposit" placeholder="请输入内容"></el-input>
     </template>

    <template #StandardRentFreePeriod="scope">
          <el-input v-model="scope.row.StandardRentFreePeriod" placeholder="请输入内容"></el-input>
     </template> -->

        <!-- </ysn-table>
 </el-form> -->
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>

export default {
  name: 'FormText',
  props: {
    listEditAndDetails: { type: Object }, // 配置和数据
    form: { type: Object }
  },
  data() {
    return {
      rules: {
        StandardDeposit: [{
          type: 'string',
          required: true,
          trigger: 'blur',
          message: '请输入姓名'
        }]
      },
      pokuer: true
      // slotsList:["StandardDeposit","StandardDecorationDeposit","StandardRentFreePeriod"],
      //   configData: [ // 新单元表单配置
      // { itemType: 'input', prop: 'StandardDeposit', label: '', placeholder: '请输入', width: '206px',}]
    }
  },

  methods: {

  }
}
</script>

<style scoped lang="scss">
   .font-z-14{
       font-size:12px;
       color:#050101;
       .font-color{
           color:#050101;
           margin-left:8px;
       }
   }
</style>
