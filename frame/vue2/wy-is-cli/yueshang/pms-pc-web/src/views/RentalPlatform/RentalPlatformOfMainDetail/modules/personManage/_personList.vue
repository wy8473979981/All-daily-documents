<template>
  <div class="person">
    <div class="person-area">
      <div class="person-title">招商责任人：</div>
      <div
        v-for="(item, index) in enterpriseList"
        :class="[
          'person-item',
          { active: managerId == item.managerId && managerType == 1 },
        ]"
        :key="index"
        @click="handlePersonClick(item.managerId, 1)"
      >
        <span>{{ item.managerName }} </span>
        <span>（</span>
        <span>
          {{ item.storeFloorManagerNum }} / {{ item.storeManagerNum }}
        </span>
        <span> ）</span>
        <div
          class="close"
          @click="handleDeletePerson(item.managerId, 1)"
        ></div>
      </div>

      <div class="person-total" v-if="unEnterpriseList">
        <span>{{ unEnterpriseList.managerName }} </span>
        <span>（</span>
        <span class="person-item--data"
          >{{ unEnterpriseList.storeFloorManagerNum }} /
          {{ unEnterpriseList.storeManagerNum }}</span
        >
        <span> ）</span>
      </div>

      <x-cascader @change="(val) => handleAddPerson(val, 1)"></x-cascader>
    </div>

    <div class="person-area mt-15">
      <div class="person-title">营运责任人：</div>
      <div
        v-for="(item, index) in serviceList"
        :class="[
          'person-item',
          { active: managerId == item.managerId && managerType == 2 },
        ]"
        :key="index"
        @click="handlePersonClick(item.managerId, 2)"
      >
        <span>{{ item.managerName }} </span>
        <span>（</span>
        <span>
          {{ item.storeFloorManagerNum }} / {{ item.storeManagerNum }}
        </span>
        <span> ）</span>
        <div
          class="close"
          @click="handleDeletePerson(item.managerId, 2)"
        ></div>
      </div>

      <div class="person-total" v-if="unServiceList">
        <span>{{ unServiceList.managerName }} </span>
        <span>（</span>
        <span class="person-item--data"
          >{{ unServiceList.storeFloorManagerNum }} /
          {{ unServiceList.storeManagerNum }}</span
        >
        <span> ）</span>
      </div>

      <x-cascader @change="(val) => handleAddPerson(val, 2)"></x-cascader>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonList',

  props: {
    managerStoreInfo: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    enterpriseList() {
      // 招商责任人
      return this.managerStoreInfo.enterpriseEstablishingList
        ? this.managerStoreInfo.enterpriseEstablishingList.filter(
            (item) => item.managerName !== "未分配"
          )
        : [];
    },
    unEnterpriseList() {
      // 未分配招商
      return this.managerStoreInfo.enterpriseEstablishingList
        ? this.managerStoreInfo.enterpriseEstablishingList.find(
            (item) => item.managerName === "未分配"
          )
        : null;
    },

    serviceList() {
      // 营运责任人
      return this.managerStoreInfo.serviceList
        ? this.managerStoreInfo.serviceList.filter(
            (item) => item.managerName !== "未分配"
          )
        : [];
    },
    unServiceList() {
      // 未分配营运
      return this.managerStoreInfo.serviceList
        ? this.managerStoreInfo.serviceList.find(
            (item) => item.managerName === "未分配"
          )
        : null;
    },
  }
}
</script>

<style lang="scss" scoped>
.person-area {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 16px;
}

.person-total {
  display: flex;
  margin-right: 28px;
}

.person-item {
  display: flex;
  margin-right: 28px;
  cursor: pointer;

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
</style>