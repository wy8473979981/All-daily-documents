import { rentalPlatform } from "api/modules/RentalPlatform";

export default {
  namespaced: true,

  state: {
    pageLoading: false, // 整个页面的加载

    rightLoading: false, // 右侧整个加载

    bisProjectId: "", // 项目id
    projectInfo: {}, // 项目选择后，获取的总铺位楼层等信息

    floorId: 1,
    floorInfo: {}, // 楼层信息
    showLabels: ['cooperativeBrand'], // 显示偏好

    bisStoreId: "",
    storeInfo: {}, // 铺位信息

    allCont: {}, // 所有类型的合同列表
    comparedInfo: [], // 对比信息
    contInfo: {}, // 合同信息

    formatColorList: [], // 业态信息
    departmentStaffList: [], // 部门员工
  },

  mutations: {
    modifyPageLoading(state, status) {
      state.pageLoading = status;
    },

    modifyRightLoading(state, status) {
      state.rightLoading = status;
    },

    // 项目ID 和 项目信息
    modifyBisProjectId(state, id) {
      state.bisProjectId = id;
    },
    modifyProjectInfo(state, data) {
      state.projectInfo = data;
    },

    // 楼层ID 和 楼层信息
    modifyfloorId(state, id) {
      state.floorId = id;
    },
    modifyFloorInfo(state, data) {
      state.floorInfo = data;
    },

    modifyShowLabels(state, data) {
      state.showLabels = data
    },

    // 铺位id 和 铺位信息
    modifyBisStoreId(state, id) {
      state.bisStoreId = id;

      // 没有铺位id 的时候重置
      if (!id) {
        state.contInfo = {};
        state.storeInfo = {};
        state.allCont = {};
        state.comparedInfo = [];
        state.contInfo = {};
      }
    },
    modifyStoreInfo(state, data) {
      const storeNo =
        data.storeNo.length > 25
          ? data.storeNo.substring(0, 25) + "···"
          : data.storeNo;
      state.storeInfo = Object.assign({}, data, { storeNo });
    },

    // 所有类型的合同列表
    modifyAllCont(state, data) {
      let newData = {};

      for (const [key, value] of Object.entries(data)) {
        if (key === "zsPlanMerchantVoList") {
          newData[key] = value.map((item) => ({
            key: item.zsPlanId,
            label: item.cooperativeBrand,
          }));
        } else {
          newData[key] = value.map((item) => ({
            key: item.bisContId,
            label: item.cooperativeBrand,
          }));
        }
      }
      state.allCont = newData;
    },
    // 对比信息
    modifyComparedInfo(state, data) {
      const standard = data.find((item) => item.contSign === "1");
      const actual = data.find((item) => item.contSign === "2");
      const newData = [
        {
          key1: "业态",
          key2: standard.primaryForms,
          key3: actual.primaryForms,
        },
        {
          key1: "租金单价(元/㎡/月)",
          key2: standard.unitPriceOfRent,
          key3: actual.unitPriceOfRent,
        },
        { key1: "租金合计(元)", key2: standard.totalRent, key3: actual.totalRent },
        {
          key1: "物管费单价(元/㎡/月)",
          key2: standard.propertyManagementFeeUnitPrice,
          key3: actual.propertyManagementFeeUnitPrice,
        },
        {
          key1: "物管费合计(元)",
          key2: standard.totalPropertyManagementFee,
          key3: actual.totalPropertyManagementFee,
        },
        {
          key1: "免租期",
          key2: standard.freeRentPeriod,
          key3: actual.freeRentPeriod,
        },
      ];
      state.comparedInfo = newData;
    },
    // 合同信息
    modifyContInfo(state, data) {
      state.contInfo = Object.assign(data, {
        contPeriod: `${data.contStartDate}至${data.contEndDate}`,
      });
    },
    // 重置合同相关信息
    resetContInfos(state) {
      state.contInfo = {};
      state.comparedInfo = [];
    },

    // 设置业态信息
    modifyFormatColorList(state, list) {
      state.formatColorList = list.map((item) => {
        return {
          key: item.formatCd,
          label: item.formatNameBig,
          circle: item.standardColor,
          highlightColor: item.highlightColor,
          standardColor: item.standardColor,
        };
      });
    },

    // 设置部门员工信息
    modifyDepartmentStaffList(state, list) {
      state.departmentStaffList = list;
    },
  },

  actions: {
    // 根据项目id获取 项目基础信息
    getInfoByProject({ commit, state }, bisProjectId) {
      commit("modifyPageLoading", true);
      commit("modifyBisProjectId", bisProjectId);
      const promiseAll = [
        rentalPlatform.getInfoByProject({ bisProjectId }),
        rentalPlatform.getInfoByFloor({ bisProjectId, floorId: state.floorId }),
      ];
      Promise.all(promiseAll)
        .then(([projectInfo, floorInfo]) => {
          commit("modifyProjectInfo", projectInfo);
          commit("modifyFloorInfo", floorInfo);
        })
        .finally(() => commit("modifyPageLoading", false));
    },

    // 根据楼层获取当前楼层信息
    getInfoByFloor({ commit, state }, floorId) {
      commit("modifyfloorId", floorId);
      return new Promise((resolve, reject) => {
        rentalPlatform
          .getInfoByFloor({ bisProjectId: state.bisProjectId, floorId })
          .then((floorInfo) => {
            commit("modifyFloorInfo", floorInfo);
            resolve(floorInfo);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 根据店铺id获取 铺位概览， 和合同列表，招商中商家信息列表
    getInfoByStoreId({ commit, state }, bisStoreId) {
      commit("modifyBisStoreId", bisStoreId);
      commit("modifyRightLoading", true);
      const requestArr = [
        rentalPlatform.getInfoByRcStore({ bisStoreId: state.bisStoreId }),
        rentalPlatform.getAllCont({ bisStoreId: state.bisStoreId }),
      ];
      return new Promise((resolve, reject) => {
        Promise.all(requestArr)
          .then(([storeInfo, allCont]) => {
            commit("modifyStoreInfo", storeInfo);
            commit("modifyAllCont", allCont);

            resolve([storeInfo, allCont]);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            commit("modifyRightLoading", false);
          });
      });
    },

    // 根据合同id 和 招商中商家id，获取基础信息，对比信息 招商进度等
    getInfoByContId({ commit }, { id, type = "cont", bisStoreId }) {
      if (type === "cont") {
        const requestArr = [
          rentalPlatform.getComparedInfo({ bisContId: id }),
          rentalPlatform.getContInfo({ bisContId: id }),
        ];
        return new Promise((resolve, reject) => {
          Promise.all(requestArr)
            .then(([comparedInfo, contInfo]) => {
              commit("modifyComparedInfo", comparedInfo);
              commit("modifyContInfo", contInfo);
              resolve([comparedInfo, contInfo]);
            })
            .catch((error) => {
              reject(error);
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          rentalPlatform
            .getZsPlan({ zsPlanId: id, bisStoreId })
            .then((contInfo) => {
              commit("modifyContInfo", { zsPlanVoList: contInfo });
              resolve(contInfo);
            })
            .catch((error) => {
              reject(error);
            });
        });
      }
    },

    // 获取业态列表
    getLayoutListInfo({ commit }) {
      rentalPlatform
        .getFormatColorList({ formatCategory: 0 })
        .then((colorList) => {
          commit("modifyFormatColorList", colorList);
        });
    },

    // 获取员工信息
    getDepartmentStaff({ commit }, bisProjectId) {
      rentalPlatform
        .getDepartmentStaff({ bisProjectId: bisProjectId })
        .then((staff) => {
          commit("modifyDepartmentStaffList", staff);
        });
    },
  },
};
