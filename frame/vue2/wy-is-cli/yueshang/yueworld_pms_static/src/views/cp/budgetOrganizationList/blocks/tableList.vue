<template>
  <div class="max-area">
    <!-- 按钮弹窗 -->
    <div class="flex-ju-end mb-12">
      <ysn-dialog title="重新开启2022年度预算编制">
        <ysn-btn class="mr-8">查看租金包</ysn-btn>
        <template #contain>
          <DialogData :sequence="'1'" />
        </template>
      </ysn-dialog>
      <ysn-dialog title="重新开启2022年度预算编制">
        <ysn-btn>开启预算编制</ysn-btn>
        <template #contain>
          <DialogData :sequence="'2'" />
        </template>
      </ysn-dialog>
    </div>
    <!-- 表格组件 -->
    <ysn-table
      :checkbox="false"
      :data="tableData"
      :column="tableConfig"
      select-key="id"
      :show-slots="slotsList"
      operation-width="200px"
      show-operation
      full
    >
      <template #t4="scope">
        <div v-html="scope.row.t4">
          {{ scope.row }}
        </div>
      </template>
      <!-- 操作列插槽 -->
      <template #default>
        <ysn-btn type="text" class="mr-8">编制业务表</ysn-btn>
        <!-- 弹窗组件 -->
        <ysn-dialog title="重新开启2022年度预算编制">
          <ysn-btn type="text">修改关闭时间</ysn-btn>
          <template #contain>
            <DialogData :sequence="'3'" />
          </template>
        </ysn-dialog>
      </template>
    </ysn-table>
    <!-- 分页 -->
    <ysn-page :total="total" :page="page" @sizeChange="sizeChange" @currentChange="currentChange" />
  </div>
</template>

<script>
import DialogData from './dialogData'
export default {
  name: 'TableList',
  components: { DialogData },
  props: {
  },
  data() {
    return {
      total: 20,
      page: { // 页数
        pageNo: 1,
        pageSize: 20
      },
      slotsList: ['t4'], // 插槽名
      tableData: [ // 模拟表格假数据
        { t1: '项目一', t2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' },
        { t1: '项目一', t2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' },
        { t1: '项目一', t2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' },
        { t1: '项目一', a2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' },
        { t1: '项目一', t2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' },
        { t1: '项目一', t2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' },
        { t1: '项目一', t2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' },
        { t1: '项目一', a2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' },
        { t1: '项目一', t2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' },
        { t1: '项目一', t2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' },
        { t1: '项目一', t2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' },
        { t1: '项目一', a2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' },
        { t1: '项目一', t2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' },
        { t1: '项目一', t2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' },
        { t1: '项目一', t2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' },
        { t1: '项目一', a2: '20200', t3: '商业-上海区域-七宝年度预算-2022(经营期)', t4: ' <span>编制中</span><span>(<span class="color-red">2020-12-12 16:00 </span></span><span>定时关闭)</span>', a5: 'v1.0.1' }
      ], // 表格数据
      tableConfig: [// 表单配置
        { idx: '序号', type: 'index', width: '70px' },
        { t1: '项目', sortable: true },
        { t2: '年度预算', sortable: true },
        { t3: '预算方案名称', sortable: true, width: '280px' },
        { t4: '编辑状态', sortable: true, width: '260px', isShowSlots: true },
        { t5: '版本号', sortable: true }
      ]

    }
  },
  computed: {},
  methods: {
    sizeChange() {},
    currentChange() {}
  }
}
</script>
