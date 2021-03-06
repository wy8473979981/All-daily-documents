<template>
  <el-scrollbar v-if="!mixin" wrap-class="scrollbar-wrapper">
    <div class="header-logo-container">
      <svg-icon class="svg-icon-logo" :icon-class="'logo'"></svg-icon><br/>
      <span class="system-name-span">金融服务平台</span>
      <img class="small-logo" src="~@/assets/img/favicon.png"/ alt="GLP">
    </div>

    <el-menu
      ref="mainMenu"
      mode="vertical"
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
export default {
  components: {  NavMenu },
  data() {
    return {
      mainMenu: [], //路由对象
      nowActiveRoute: "", //当前活动路由

      routes: null,
      mixin: false,
      collapse:false
    };
  },
  computed: {
    ...mapGetters(["permission_routers", "menuData"]),
  },
  watch: {
    $route: {
      handler: function(val, oldVal){
        this.setActiveRouter(val);
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    // console.log("wdddd============", window.parent);

    if (window.parent instanceof Window) {
      this.mixin = false;
    } else {
      this.mixin = true;
    }

    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
        this.collapse = msg;
    });

    // 正式环境
    // this.mainMenu=this.menuData;
    // 开发
    this.mainMenu=this.permission_routers;

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
    setActiveRouter (route){
      let nowPath = route.path;
      this.nowActiveRoute = nowPath;
      let meta = route.meta || "";
      let re = /\/[^/]+$/i;
      if (meta) {
        if (meta.level == 3) {
        
          let arr = nowPath.match(re);
          let parentPath = arr ? nowPath.replace(arr[0], "") : nowPath;
          this.nowActiveRoute = parentPath;
        }else if(meta.level==2){
          if(meta.single==true){

            let arr = nowPath.match(re);
            let parentPath = arr ? nowPath.replace(arr[0], "") : nowPath;
            this.nowActiveRoute = parentPath==''?'/':parentPath;

          }
        }
      }
    },
    setMenuParams(data) {
      //递归设置数据
      if (data) {
        data.forEach((item, index) => {
          let targetPath = item.pageUrl || item.path;
          let targetItem = this.deepFilterObjItem(
            this.permission_routers,
            targetPath
          );
          // console.log(targetPath,targetItem)
          if (targetItem) {
            // 找到
            item.meta = targetItem.meta;
            item.hidden = targetItem.hidden;
            item.pageUrl = item.pageUrl || item.path;
          }

          if (item.children && item.children.length > 0) {
            this.setMenuParams(item.children);
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
    },

    getChildLen (item){               //过滤可用子集
      let len=0;
      if(item.children){
        item.children.forEach(t => {
          if(t.hidden!=true){
            len++;
          }
        })
      }
      return len;
    },
  }
};
</script>

<style lang="scss" scoped>
    .header-logo-container{
        cursor: pointer;
        .svg-icon-logo{
            width: 108px;
            height: 24px;
            margin-top: 28px;
            margin-bottom: 10px;
        }
        .system-name-span{
            font-size: 18px;
            font-weight: bold;
            word-break:keep-all;
        }
    }
    .hideSidebar{
        .svg-icon-logo{
            display: none;
        }
        .system-name-span{
            display: none;
        }
    }
</style>