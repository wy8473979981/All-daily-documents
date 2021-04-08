<template>
  <li class="navMenu menu-wrapper">
    <template v-for="(item) in navMenus">
      <!-- 是否有子集 -->
      <template v-if="item.include && item.children && getChildLen(item)>0">

        <template v-if="item.meta.level==1 && getChildLen(item)==1">
          <el-menu-item v-if="!item.hidden" :index="item.pageUrl" :key="item.pageUrl">
            <svg-icon :icon-class="item.meta.icon"></svg-icon>
            <template slot="title">
              <item class="inline-div" :title="generateTitle(item.meta.title)" />
            </template>
          </el-menu-item>
        </template>

        <template v-else>

          <!-- 如果是二级菜单，不在循环 -->
          <template v-if="item.meta.level==2">
            <el-menu-item v-if="!item.hidden" :index="item.pageUrl" :key="item.pageUrl">
              <app-link :to="item.pageUrl" :key="item.label">
                <item :icon="item.meta.icon" :title="generateTitle(item.meta.title)" />
              </app-link>
            </el-menu-item>
          </template>

          <template v-else>
            <el-submenu :index="item.pageUrl" :key="item.pageUrl">
              <template slot="title">
                <item :icon="item.meta.icon" :title="generateTitle(item.meta.title)" />
              </template>
              <NavMenu :nav-menus="item.children"></NavMenu>
            </el-submenu>
          </template>

        </template>

      </template>

      <template v-else-if="item.include">
        <el-menu-item v-if="!item.hidden" :index="item.pageUrl" :key="item.pageUrl">
          <app-link :to="item.pageUrl" :key="item.label">
            <item :icon="item.meta.icon" :title="generateTitle(item.meta.title)" />
          </app-link>
        </el-menu-item>
      </template>

    </template>
  </li>
</template>
<script type="text/javascript">
import { generateTitle } from "@/utils/i18n";
import Item from "./Item";
import AppLink from "./Link";
export default {
  name: "NavMenu",
  props: {
    navMenus: {
      type: Array
    }
  },
  data() {
    return {};
  },

  components: {
    Item,
    AppLink
  },
  created() { },
  mounted() {
  },
  methods: {
    generateTitle,

    getChildLen(item) {
      //过滤可用子集
      let len = 0;
      if (item.children) {
        item.children.forEach(t => {
          if (t.hidden != true) {
            len++;
          }
        });
      }
      return len;
    }
  }
};
</script>

<style lang="scss">
.inline-div {
  display: inline-block;
}
</style>