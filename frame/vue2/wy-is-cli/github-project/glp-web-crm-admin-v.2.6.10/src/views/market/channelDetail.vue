<template>
  <div class="content" v-loading="isLoading">
    <div class="section">
      <Btns :btnsProps="btnsProps" />
      <Card :title="'渠道详情'" class="base-info-section">
        <el-row class="row-item" :gutter="20">
          <el-col :span="24">
            <label>渠道名称:</label>
            <span>{{baseInfo.name}}</span>
          </el-col>
          <el-col :span="24">
            <label>所属活动:</label>
            <span>{{baseInfo.activityName}}</span>
          </el-col>
          <el-col :span="24">
            <label>渠道二维码:</label>
            <a :href="baseInfo.qrcodeUrl">
              <img width="100" :src="baseInfo.qrcodeUrl" />
            </a>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'操作记录'">
        <el-row class="row-item" :gutter="20">
          <el-col :span="12">
            <label>信息创建:</label>
            <span class="mr">{{baseInfo.createUserName?baseInfo.createUserName:'-'}}</span>
            <span>{{baseInfo.createTime?baseInfo.createTime:'-'}}</span>
          </el-col>
          <el-col :span="12">
            <label>最后修改:</label>
            <span class="mr">{{baseInfo.updateUserName?baseInfo.updateUserName:'-'}}</span>
            <span>{{baseInfo.updateTime?baseInfo.updateTime:'-'}}</span>
          </el-col>
        </el-row>
      </Card>
    </div>
  </div>
</template>
<script type="text/javascript">
import { SelectionOptions } from "@/js/common/consts";
import DataApi from "@/api/marketService";
import { Utils } from "@/utils";
export default {
  components: {},
  data() {
    let self = this;
    return {
      belongerVisible: false,
      dateTypeString: "yyyy/MM/dd", //时间格式
      SelectionOptions,
      query: {
        //查询参数
      },
      isLoading: false, //是否正在加载
      isSubmitting: false, //是否正在提交
      btnsProps: {
        submit: {
          text: "修改",
          func: this.channelEditFunc,
          isSubmitting: false
        },
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      baseInfo: {
        name: "",
        activityId: "",
        activityName: "",
        qrcodeName: "",
        qrcodeUrl: ""
      },
      routeQuery: {},
      detailPath: "/market/index/detail", //列表路由地址
      channelEditPath: "/market/index/channelRedactEdit" //渠道修改路由地址
    };
  },
  computed: {},

  created() { },
  mounted() {
    this.routeQuery = this.$route.query;
    this.getChannelDetail();
  },
  methods: {
    getChannelDetail() {
      DataApi.getChannelDetail(this.routeQuery.channelId).then(res => {
        if (res.code == 200) {
          let ndata = res.data || {};
          this.baseInfo = {
            ...ndata,
            name: ndata.name,
            activityId: ndata.activityId,
            activityName: ndata.activityName,
            qrcodeName: ndata.qrcodeName,
            qrcodeUrl: ndata.qrcodeUrl,
            createTime: Utils.timestampToTime(ndata.createTime, 2),
            updateTime: Utils.timestampToTime(ndata.updateTime, 2)
          };
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    channelEditFunc(row) {
      this.$router.push({
        path: this.channelEditPath,
        query: {
          flag: "edit",
          viewType: "detail",
          channelId: this.routeQuery.channelId,
          activityId: this.routeQuery.activityId,
          activityName: this.routeQuery.activityName
        }
      });

      // this.$router.push({
      //   name: "channelRedactEdit",
      //   params: {
      //     flag: "edit",
      //     viewType: "detail",
      //     channelId: this.routeQuery.channelId,
      //     activityId: this.routeQuery.activityId,
      //     activityName: this.routeQuery.activityName
      //   }
      // });
    },
    cancelFunc() {
      this.$router.push({
        path: this.detailPath,
        query: {
          activeName: "second",
          channelId: this.routeQuery.channelId,
          activityId: this.routeQuery.activityId
        }
      });
      // this.$router.push({
      //   name: "channelDetail",
      //   params: {
      //     activeName: "second",
      //     channelId: this.routeQuery.channelId,
      //     activityId: this.routeQuery.activityId
      //   }
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
.base-info-section {
  label {
    font-weight: normal;
    color: #333;
  }
}
.row-item {
  font-size: 14px;
  margin-bottom: 20px;
  p {
    line-height: 24px;
    padding: 0 10px;
  }
  .el-col {
    display: flex;
    justify-content: left;
    .vm {
      vertical-align: middle;
      margin: 2px 5px 0 0;
    }
  }
  .align-center-item {
    align-items: center;
  }
  label {
    color: #3a3131;
    font-weight: normal;
    margin: 0 5px 15px 0;
    display: inline-block;
  }
  span {
    color: #888;
    word-break: break-all;
    line-height: 1.5em;
  }
}
.row-item:last-child {
  margin-bottom: 0px;
}
.green {
  color: #078e34;
}
.tc {
  text-align: center;
}
.base-info-section .row-item label {
  color: #3a3131;
  font-weight: normal;
  margin: 0 5px 15px 0;
  display: inline-block;
}
.base-info-section .row-item span {
  color: #888888;
}
.mr {
  margin-right: 15px;
}
</style>