<template>
  <el-scrollbar v-if="!mixin" wrap-class="scrollbar-wrapper">
    <Logo />
    <el-menu
      ref="mainMenu"
      :collapse="collapse"
      :show-timeout="200"
      :default-active="nowActiveRoute"
      class="el-menu-vertical-demo"
      router
    >
      <NavMenu :navMenus="mainMenu"></NavMenu>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import NavMenu from "./NavMenu";
import bus from "./bus";
import Logo from "./logo";
import commonFn from "@/js/common/methods";
export default {
  components: { NavMenu, Logo },
  data() {
    return {
      logo: null,
      mainMenu: [], //路由对象
      nowActiveRoute: "", //当前活动路由

      routes: null,
      mixin: false,
      collapse: false
    };
  },
  computed: {
    ...mapGetters(["permission_routers", "menuData"]),
    isCollapse() {
      return false;
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.setActiveRouter(val);
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    if (window.parent instanceof Window) {
      this.mixin = false;
    } else {
      this.mixin = true;
    }

    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });

    // 取菜单
    this.mainMenu = commonFn.deepClone(this.menuData);
    // 追加参数
    // console.time("追加参数用时：");

    this.setMenuParams(this.mainMenu);
    // console.timeEnd("追加参数用时：");
    // 设置当前活动路由
    this.setActiveRouter(this.$route);
  },
  update() {},
  mounted() {},

  methods: {
    setActiveRouter(route) {
      let nowPath = route.path;
      this.nowActiveRoute = nowPath;
      let meta = route.meta || "";
      if (meta) {
        if (meta.level == 3) {
          let re = /\/[^\/]+$/i;

          let arr = nowPath.match(re);
          let parentPath = arr ? nowPath.replace(arr[0], "") : nowPath;
          this.nowActiveRoute = parentPath;
        } else if (meta.level == 2) {
          if (meta.single == true) {
            let re = /\/[^\/]+$/i;

            let arr = nowPath.match(re);
            let parentPath = arr ? nowPath.replace(arr[0], "") : nowPath;
            this.nowActiveRoute = parentPath;
          }
        }
      }
    },
    setMenuParams(data) {
      //递归设置数据
      if (data) {
        data.forEach((item, index) => {
          let targetPath = item.pageUrl;
          let targetItem = this.deepFilterObjItem(
            this.permission_routers,
            targetPath
          );
          item.meta = {};
          if (targetItem) {
            item.include = true;
            // 找到
            item.meta = targetItem.meta;
            item.hidden = targetItem.hidden;
            if (item.children && item.children.length > 0) {
              this.setMenuParams(item.children);
            }
          } else {
            item.include = false;
            // 没找到直接删除
          }
        });
      }
    },

    deepFilterObjItem(data, path) {
      //深度查询对象里符合要求的
      let findItem = null;
      let fn = (data, path) => {
        let nItem = data.find(item => {
          return item.path && item.path == path;
        });
        if (!nItem) {
          data.forEach(item => {
            if (item.children) {
              fn(item.children, path);
            }
          });
        } else {
          findItem = nItem;
        }
      };

      if (data) {
        fn(data, path);
      }
      return findItem;
    }
  }
};
</script>

<style scoped>
</style>

