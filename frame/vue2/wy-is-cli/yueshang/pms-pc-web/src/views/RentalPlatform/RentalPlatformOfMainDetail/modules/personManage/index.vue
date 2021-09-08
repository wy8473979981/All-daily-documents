<template>
  <div class="page person-manage" v-loading="loading">
    <ys-n-title underline title="人员分工" class="mb-10">
      <template slot="right">
        <el-button
          type="text"
          :disabled="!managerId || managerId === 'wfp'"
          size="small"
          @click="handleSubmit()"
          >提交{{
            managerId && poiIds.length && managerId !== "wfp"
              ? `(${poiIds.length}个)`
              : ""
          }}</el-button
        >
        <el-button
          type="text"
          class="text-primary"
          size="small"
          @click="handleExit"
          >退出</el-button
        >
      </template>
    </ys-n-title>

    <div class="person">
      <div class="person-area" v-for="(list, idx) in personList" :key="idx">
        <div class="person-title">{{ list.title }}：</div>
        <div
          v-for="(item, index) in list.list"
          :class="[
            'person-item',
            { active: managerId == item.managerId && managerType == list.type },
          ]"
          :key="index"
          @click="handlePersonClick(item.managerId, list.type)"
        >
          <span>{{ item.managerName }} </span>
          <span>（</span>
          <span>
            {{ item.storeFloorManagerNum }} / {{ item.storeManagerNum }}
          </span>
          <span> ）</span>
          <div
            class="close"
            v-if="item.managerId !== 'wfp'"
            @click="(e) => handleDeletePerson(e, item.managerId, list.type)"
          ></div>
        </div>

        <x-cascader
          class="mb-10"
          @change="(val) => handleAddPerson(val, list.type)"
          @show="handlePersonSelectShow(1)"
        ></x-cascader>
      </div>
    </div>

    <x-map
      class="x-map--area"
      ref="tmap"
      :params="mapParams"
      @changeFloor="changeFloor"
      :mapConfig="mapConfig"
      @selected="handleMapSelect"
      @unSelected="handleMapunSelect"
    ></x-map>

    <!-- 人员分工只能配置本楼层，不可跨楼层操作，切换楼层时，如当前楼层选择后未提交，则切换楼层时，不自动提交，而是弹窗二次确认“该责任人分配结果尚未提交，是否提交？  提示 -->
    <x-dialog-alert
      v-model="submitVisible"
      content="该责任人分配结果尚未提交，是否提交？"
      width="484px"
      :buttonConfig="submitBtns"
      @change="handleSubmitChange"
    ></x-dialog-alert>
    <x-dialog-alert
      v-model="floorChangeVisible"
      content="该责任人分配结果尚未提交，是否提交？"
      width="484px"
      :buttonConfig="floorChangeBtns"
      @change="handleFloorChangeChange"
    ></x-dialog-alert>
    <!-- 点击“退出”，如果无“修改某个营运责任人的责任铺位范围未提交”时则直接退出人员分工页面；有则弹窗二次确认“有未提交的人员分工，确定退出人员分工吗”，点击弹窗内“取消”关闭弹窗；点击弹窗内“退出”，关闭弹窗并退出人员分工页面；  提示 -->
    <x-dialog-alert
      v-model="exitVisible"
      content="有未提交的人员分工，确定退出人员分工吗？"
      width="484px"
      :buttonConfig="exitBtns"
      @change="handleExitChange"
    ></x-dialog-alert>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getSession } from "utils/utils";
import XCascader from "./_xCascader.vue";
import XDialogAlert from "./_dialogAlert.vue";
import { rentalPlatform } from "api/modules/RentalPlatform";
import { XMap } from "views/RentalPlatform/RentalPlatformOfMain/components";
export default {
  name: "PersonManage",

  components: { XMap, XDialogAlert, XCascader },

  data() {
    return {
      loading: false,

      submitVisible: false,
      submitBtns: [
        { text: "提 交", type: "primary", action: "success" },
        { text: "不 提 交", type: "", action: "fail" },
        { text: "取 消", type: "", action: "close" },
      ],
      exitVisible: false,
      exitBtns: [
        { text: "退 出", type: "primary", action: "success" },
        { text: "取 消", type: "", action: "close" },
      ],
      floorChangeVisible: false,
      floorChangeBtns: [
        { text: "提 交", type: "primary", action: "success" },
        { text: "不 提 交", type: "", action: "close" },
      ],

      managerId: "", // 选中员工id
      managerType: "", // 选中员工的类型
      managerStoreInfo: {}, // 员工分配信息

      tmpId: "", // 缓存员工id
      tmpType: "", // 缓存员工类型
      tmpFloorId: "", // 缓存楼层
      tmpPoiIds: [], // 缓存选中铺面元素
      tmpFloorVal: "1", // 缓存楼层

      floorId: 1,
      poiIds: [],
      showLabels: ['cooperativeBrand'],
    };
  },

  computed: {
    ...mapState({
      bisProjectId: (state) => state.rentalPlatform.bisProjectId,
    }),

    // 地图参数
    mapParams() {
      return {
        bisProjectId: this.bisProjectId,
      };
    },
    mapConfig() {
      return { selectedMode: 1, floorVal: this.floorId, showLabels: this.showLabels };
    },

    personList() {
      return [
        {
          type: 1,
          title: "招商责任人",
          list: this.managerStoreInfo.enterpriseEstablishingList?.map(
            (item) => {
              return item.managerName === "未分配"
                ? Object.assign({}, item, { managerId: "wfp" })
                : item;
            }
          ),
        },
        {
          type: 2,
          title: "营运责任人",
          list: this.managerStoreInfo.serviceList?.map((item) => {
            return item.managerName === "未分配"
              ? Object.assign({}, item, { managerId: "wfp" })
              : item;
          }),
        },
      ];
    },
  },

  created() {
    this.getManagerStoreInfo();
    this.floorId = getSession("rp-rental-platform-main-detail").floorId;
    this.showLabels = getSession('rp-rental-platform-main-detail').showLabels
  },

  methods: {
    // 人员点击
    handlePersonClick(id, type) {
      const diff = !this.ArrayIsEqual(this.tmpPoiIds, this.poiIds);
      if (this.tmpId !== id || (this.tmpType !== type && this.tmpType)) {
        this.tmpId = id;
        this.tmpType = type;
        if (
          this.poiIds.length &&
          this.managerId &&
          diff &&
          this.managerId !== "wfp"
        ) {
          this.submitVisible = true;
          return false;
        }
        this.getManagerAndStoreInfo();
      }
    },

    // 获取人员分配的铺位
    getManagerAndStoreInfo() {
      this.managerId = this.tmpId;
      this.managerType = this.tmpType;

      const apiType =
        this.tmpId === "wfp" ? "getUnMatchStoreInfo" : "getManagerAndStoreInfo";

      rentalPlatform[apiType]({
        bisProjectId: this.bisProjectId,
        managerId: this.managerId,
        managerType: this.managerType,
        floorId: this.floorId,
      }).then((poiIds) => {
        this.tmpPoiIds = [...poiIds];
        this.poiIds = [...poiIds];
        this.$refs.tmap.selectMapPoiByArr([...poiIds]);
      });
    },

    // 切换的弹窗提示点击
    handleSubmitChange(action) {
      if (action === "success") {
        if (this.tmpId)
          this.handleSubmit(this.floorId, () => this.getManagerAndStoreInfo);
        else this.handleSubmit();
      } else if (action === "fail") {
        if (this.tmpId) this.getManagerAndStoreInfo();
        else {
          this.managerId = this.tmpId;
          this.managerType = this.tmpType;
        }
      } else {
        this.tmpId = this.managerId;
        this.tmpType = this.managerType;
      }
    },
    handlePersonSelectShow(type) {
      this.$nextTick(() => {
        this.tmpId = "";
        this.tmpType = type;
        if (this.poiIds.length && this.managerId) {
          this.submitVisible = true;
          return false;
        }
      });
    },

    // 获取人员列表信息
    getManagerStoreInfo() {
      this.loading = true;
      rentalPlatform
        .getManagerStoreInfo({
          bisProjectId: this.bisProjectId,
          floorId: this.floorId,
        })
        .then((managerStoreInfo) => {
          this.managerStoreInfo = managerStoreInfo;
        })
        .finally(() => (this.loading = false));
    },

    // 添加人员
    handleAddPerson(id, type) {
      this.loading = true;
      rentalPlatform
        .addManager({
          bisProjectId: this.bisProjectId,
          managerId: id,
          managerType: type,
          floorId: this.floorId,
        })
        .then((res) => {
          this.$message.success(res);
          this.getManagerStoreInfo();
        })
        .catch(() => {
          this.loading = false;
        });
    },

    // 删除人员
    handleDeletePerson(e, id, type) {
      e.preventDefault();
      e.stopPropagation();
      this.loading = true;
      rentalPlatform
        .deleteManagerById({
          bisProjectId: this.bisProjectId,
          managerId: id,
          managerType: type,
          floorId: this.floorId,
        })
        .then((res) => {
          this.managerId = "";
          this.managerType = "";
          this.$message.success(res);
          this.getManagerStoreInfo();
        })
        .catch(() => {
          this.loading = false;
        });
    },

    // 绑定人员
    handleSubmit(floorId = this.floorId, callback) {
      this.loading = true;
      rentalPlatform
        .sendStore2manager({
          bisProjectId: this.bisProjectId,
          managerId: this.managerId,
          managerType: this.managerType,
          floorId: floorId,
          storeIds: this.poiIds,
        })
        .then((res) => {
          this.$message.success(res);
          this.tmpPoiIds = [...this.poiIds];
          this.getManagerStoreInfo();
          callback && callback();
        })
        .catch(() => {
          this.loading = false;
        });
    },

    /* 地图事件 */
    // 地图楼层切换
    changeFloor(val) {
      this.floorId = val.newVal;
      this.$refs.tmap.updateSelect(false);
      this.tmpFloorVal = val.oldVal;

      const diff = !this.ArrayIsEqual(this.tmpPoiIds, this.poiIds);
      if (
        this.poiIds.length &&
        this.managerId &&
        diff &&
        this.managerId !== "wfp"
      ) {
        this.floorChangeVisible = true;
        return false;
      }
      // this.initTmpData()
      this.getManagerStoreInfo();
      this.managerId && this.getManagerAndStoreInfo();
    },
    handleFloorChangeChange(action) {
      if (action === "success") {
        this.handleSubmit(this.tmpFloorVal, () =>
          this.getManagerAndStoreInfo()
        );
      } else {
        this.getManagerStoreInfo();
        this.getManagerAndStoreInfo();
      }
    },
    // 地图选中
    handleMapSelect(data) {
      // console.log("handleMapSelect", data);
      this.poiIds = data.map((item) => {
        return typeof item == "string" ? item : item.poiId;
      });
    },

    handleMapunSelect(data) {
      // console.log('map', data)
      this.poiIds = data.filter((item) => item);
    },

    // 退出
    handleExit() {
      if (this.poiIds.length && this.managerId) {
        this.exitVisible = true;
        return false;
      }
      this.handleExitClose();
    },
    handleExitClose() {
      this.$router.back();
    },
    handleExitChange(action) {
      if (action == "success") {
        this.handleExitClose();
      }
    },

    // 判断数组是否相等
    ArrayIsEqual(a1, a2) {
      //判断2个数组是否相等
      const arr1 = a1.sort();
      const arr2 = a2.sort();
      if (arr1 === arr2) {
        //如果2个数组对应的指针相同，那么肯定相等，同时也对比一下类型
        return true;
      } else {
        if (arr1.length != arr2.length) {
          return false;
        } else {
          // 长度相同
          for (let i in arr1) {
            // 循环遍历对比每个位置的元素
            if (arr1[i] != arr2[i]) {
              // 只要出现一次不相等，那么2个数组就不相等
              return false;
            }
          } //for循环完成，没有出现不相等的情况，那么2个数组相等
          return true;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.person-manage {
  overflow: hidden;
}
.person {
  padding: 16px 18px;
  background-color: #fdfcfa;
  display: flex;
  flex-direction: column;

  .person-area {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 16px;
  }

  .person-total {
    display: flex;
    margin-right: 28px;
    margin-bottom: 10px;
    cursor: pointer;

    &:hover,
    &.active {
      color: $subMenuHover;
    }
  }

  .person-title {
    margin-bottom: 10px;
  }

  .person-item {
    display: flex;
    margin-right: 28px;
    cursor: pointer;
    margin-bottom: 10px;

    &--data {
      color: #6f120c;
    }

    .close {
      display: none;
    }

    &:hover,
    &.active {
      color: $subMenuHover;
      position: relative;

      .close {
        display: block;
        height: 16px;
        width: 16px;
        position: absolute;
        right: -10px;
        top: 4px;
        background-image: url(~assets/icons/close.png);
        background-size: cover;
      }
    }
  }
}

.x-map--area {
  flex: 1;
  height: 0;
}
</style>
