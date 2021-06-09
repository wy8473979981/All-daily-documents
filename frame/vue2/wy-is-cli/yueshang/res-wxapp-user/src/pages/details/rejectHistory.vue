<template>
  <!-- 驳回历史 -->
  <ui-main class="rejectHistory-box">
    <label class="btn default" @click="$router.go(-1)">返回</label>
    <ul>
      <li v-for="(item, index) in approveDetail.approveRejectList" :key="index">
        <div class="rejectHistory-icon">
          <van-icon name="checked" />
        </div>
        <div class="rejectHistory-content">
          <p class="name">
            <span>{{ item.approveUserName }}</span>
            <span> | {{ item.stepName }}</span>
          </p>
          <p class="date">
            <span>{{ item.updatedDate }}</span>
            <span>{{ item.approveOpinion }}</span>
            <!-- <span>相关中心会签</span> -->
          </p>
          <p v-if="item.approveRemark" class="remark">{{ item.approveRemark }}</p>
        </div>
      </li>
    </ul>
    <div v-if="!approveDetail.approveHistoryList" class="rejectHistory-no">
      <h2>无数据</h2>
    </div>
  </ui-main>
</template>
<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      fast: false,
      message: null,
    }
  },
  computed: {
    ...mapState(['approveDetail'])
  },
  components: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";

.rejectHistory-box {
  background-color: #FFFFFF;
  padding: 5px 0 0 10px;
  ul {
    padding: 0;
    li {
      display: flex;
      // justify-content: space-between;
      padding: 20px 20px 20px 0;
      border-bottom: 1px solid #ECF0F2;
      .rejectHistory-icon {
        font-size: 18px;
        color: #3F8DE9;
      }
      .rejectHistory-content {
        width: 100%;
        padding-left: 8px;
        .name {
          line-height: 16px;
          font-weight: 400;
          margin-bottom: 5px;
          span:nth-child(1) {
            font-size: 16px;
          }
          span:nth-child(2) {
            font-size: 12px;
          }
        }
        .date {
          font-size: 12px;
          color: #999999;
          margin-bottom: 8px;
          span {
            margin-right: 5px;
          }
        }
        .remark {
          font-size: 12px;
          color: #656565;
          background-color: #F4F5F5;
          padding: 10px;
        }
      }
    }
  }
  .rejectHistory-no {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
      font-weight: 400;
      font-size: 18px;
    }
  }
}
</style>
