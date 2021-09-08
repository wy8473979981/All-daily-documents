<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description: 品牌授权模块
-->

<template>
  <div class="tenant-table">
    <!-- 表格 -->
    <ysn-formTable
      v-model="currentFormData"
      prop="tenantBrand"
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
  name: 'BrandAuthorization',
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
        { brandName: '授权品牌', hasSlot: true },
        { tenantBrandAuthorizationStartDate: '授权开始时间', hasSlot: true },
        { tenantBrandAuthorizationEndDate: '授权结束时间', hasSlot: true },
        { attachment: '授权书', hasSlot: true }
      ]
    }
  },
  methods: {}
}
</script>
