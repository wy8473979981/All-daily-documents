<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description: 合作项目模块
-->

<template>
  <div class="current-table">
    <!-- 表格 -->
    <ysn-formTable
      v-model="currentFormData"
      prop="project"
      :column="tableConfig"
    >
      <template v-for="(item,index) in tableConfig" :slot="Object.keys(item)[0]" slot-scope="scope">
        <div v-if="scope.row.data">
          <div v-if="!Array.isArray(scope.row.data[0][Object.keys(item)[0]])">
            <div class="overflow">
              <el-tooltip :content="scope.row.data[0][Object.keys(item)[0]]" placement="top" effect="dark">
                <span class="ml-12">{{ scope.row.data[0][Object.keys(item)[0]] }}</span>
              </el-tooltip>
            </div>
            <div class="change-info">
              <div style="display: flex;">
                <span v-if="index===0" class="left_circle_arrow" />
                <el-tooltip :content="'变更前：'+scope.row.data[1][Object.keys(item)[0]]" placement="top" effect="dark">
                  <div v-if="scope.row.data[1][Object.keys(item)[0]]" class="change-div">
                    <span>变更前：{{ scope.row.data[1][Object.keys(item)[0]]?scope.row.data[1][Object.keys(item)[0]]:'无' }}</span>
                  </div>
                  <div v-else style="height: 37px;" />
                </el-tooltip>
              </div>
            </div>
          </div>
          <div v-else>
            <div>
              <a
                v-for="(item1,index1) in scope.row.data[0][Object.keys(item)[0]]"
                :key="index1"
                class="link-type"
                target="_blank"
                :href="item1.url"
                style="color: #848382;"
              >
                <span class="el-icon-document" />
                {{ item1.name }}
              </a>
            </div>
            <div class="change-info">
              <div v-if="scope.row.data[1][Object.keys(item)[0]]" style="display: flex;">
                <span v-if="index===0" class="left_circle_arrow" />
                <div class="change-div">
                  <span>变更前：
                    <a
                      v-for="(item1,index1) in scope.row.data[1][Object.keys(item)[0]]"
                      :key="index1"
                      class="link-type"
                      target="_blank"
                      :href="item1.url"
                    >
                      <span class="el-icon-document" />
                      {{ item1.name }}
                    </a>
                  </span>
                </div>
              </div>
              <div v-else style="height: 37px;" />
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="Array.isArray(scope.row[Object.keys(item)[0]])">
            <a
              v-for="(item1,index1) in scope.row[Object.keys(item)[0]]"
              :key="index1"
              class="link-type"
              target="_blank"
              :href="item1.url"
              style="color: #848382;"
            >
              <span class="el-icon-document" />
              {{ item1.name }}
            </a>
          </div>
          <div v-else class="overflow">
            <el-tooltip :content="scope.row[Object.keys(item)[0]]" placement="top" effect="dark">
              <span class="ml-12">{{ scope.row[Object.keys(item)[0]] }}</span>
            </el-tooltip>
          </div>
        </div>
      </template>
    </ysn-formTable>
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'CooperationProject',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'countData',
    event: 'change'
  },
  props: {
    countData: { type: Object, default: () => {} }
  },
  data() {
    return {
      // 配置
      tableConfig: [
        { programName: '项目名', hasSlot: true },
        { contNo: '合同号', hasSlot: true },
        { contType: '合同类型', hasSlot: true },
        { jyType: '是否正常解约', hasSlot: true },
        { contEndDate: '到期日', hasSlot: true },
        { daysLeft: '到期天数', hasSlot: true }
      ]
    }
  },
  methods: {}
}
</script>
