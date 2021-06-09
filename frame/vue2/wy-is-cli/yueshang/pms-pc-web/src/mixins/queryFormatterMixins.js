
import { mapGetters } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import { exportData, getSession } from 'utils/utils'
import { exportEexcel, exportConfig } from 'api/export'
import { TransformQueryKeys } from '@/common/components/YsNContainer/config'
const queryFormatterMixins = {
  props: {
    subTitle: String, // 主标题后的辅助标题，辅助说明，额外信息显示'

    formConfig: Array, // 查询组件配置
    formData: Object, // 查询组件的数据

    requestConfig: Object, // 接口请求配置

    asyncBeforeSearch: Function, // 查询接口发送数据之前，需要处理的函数
    asyncBefortTableUpdate: Function, // 接口获取到数据之后，需要处理的函数
  },

  data() {
    return {
      currentFormData: {},

      updateForm: 1,

      pathKey: "", // 页面path

      loading: true,
      loadingLock: true, // 加载时页面loading画面固定
    };
  },

  computed: {
    ...mapGetters(["enumKeys"]),

    showExport() {
      return !!exportConfig[this.pathKey];
    },
  },

  methods: {
    // 加载前数据处理
    handleDataBefortLoad() {
      this.pathKey = this.$route.path.split("/")[1];
      this.currentFormData = this.getInitFormData(this.pathKey, this.formData);
      console.log("window.location.hash", window.location.hash);
      if (window.location.hash.includes("type=pd")) {
        let formData = JSON.parse(this.$route.query.data).formData;

        TransformQueryKeys[this.pathKey] &&
          (formData = TransformQueryKeys[this.pathKey](formData));

        this.currentFormData = Object.assign(
          this.currentFormData,
          this.getQueryDataAddModify(formData)
        );
        this.updateForm++;
        this.fecthData();
      } else {
        this.fecthData(); // 本地调试使用
      }
    },
    // 更新数据
    fecthData() {
      this.loading = true;
      this.loadingLock = true;
      const sendData = this.beforeSearchModifyFormData(
        this.beforeSearch(cloneDeep(this.currentFormData))
      );

      this.requestConfig.query
        .api(sendData)
        .then((queryData) => {
          // 处理返回值
          const responeData = this.asyncBefortTableUpdate
            ? this.asyncBefortTableUpdate(queryData)
            : queryData;

          // 处理calendarData
          let rk = this.requestConfig.query.responseKey || "";
          let calendarData = (rk ? responeData[rk] : responeData) || [];

          console.log("calendarData", calendarData);
          this.currentCalendarData = calendarData;

          this.$emit(
            "update:calendarData",
            cloneDeep(this.currentCalendarData)
          );
        })
        .finally(() => {
          this.loading = false;
          setTimeout(() => {
            this.loadingLock = false;
          }, 200);
        });
    },
    // 搜索之前需要特殊处理
    beforeSearch(data) {
      return this.asyncBeforeSearch
        ? this.asyncBeforeSearch(cloneDeep(data))
        : data;
    },

    // 搜索
    handleSearch() {
      this.fecthData();
    },

    // 重置
    handleReset() {
      this.fecthData();
    },

    // 导出excel
    handleExport() {
      if (!this.showExport) {
        return;
      }
      this.loading = true;
      this.loadingLock = true;

      let params = {
        ...this.beforeSearchModifyFormData(this.currentFormData),
        responseType: "blob",
      };
      exportEexcel
        .exportApi(exportConfig[this.pathKey], params)
        .then((data) => {
          // 处理返回值
          if (data) {
            exportData(data);
            this.$message({ message: "导出成功！", type: "success" });
          } else {
            this.$message.error("出错了，请稍后重试");
          }
        })
        .finally(() => {
          this.loading = false;
          setTimeout(() => {
            this.loadingLock = false;
          }, 200);
        });
    },

    // 获取初始formData
    getInitFormData(pathKey, data) {
      let formData = {};

      for (const [key, value] of Object.entries(data)) {
        let val = getSession(pathKey)[key] || value;
        formData[key] = val;
      }

      return formData;
    },

    // 接受老项目跳转传值后重新修改formData
    getQueryDataAddModify(data) {
      let formData = {};
      for (const [key, value] of Object.entries(data)) {
        let val = value;
        if (this.enumKeys.includes(key) && value === "") {
          val = "empty";
        }
        formData[key] = val;
      }

      return formData;
    },

    // 请求前修改formData
    beforeSearchModifyFormData(data) {
      let formData = {};
      for (const [key, value] of Object.entries(data)) {
        let val = value;
        if (this.enumKeys.includes(key) && value === "empty") {
          val = "";
        }
        formData[key] = val;
      }

      return formData;
    },

    // 手动更新formData
    updateFormData(data) {
      this.currentFormData = Object.assign(this.currentFormData, data);
      this.updateForm++;
    },

    // form change
    handleFormChange(key, value) {
      this.$emit('form-change', key, value)
    },
  },

  watch: {
    currentFormData: {
      handler: function(val) {
        this.$emit("update:formData", cloneDeep(val));
      },
    },
  },
};

export default queryFormatterMixins
