<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import pages from '@/config/page'

@Component({
  components: { }
})
export default class AppMenu extends Vue {
  @Prop(Boolean) expand!: boolean

  get menus () {
    return pages.filter((v: any) => this.$auth.accessSync(v.path))
  }

  get lastMenus () {
    const ret: any[] = []
    traverse(this.menus)
    return ret

    function traverse (list: any[]) {
      if (!Array.isArray(list) || list.length < 1) return
      list.forEach((v: any) => {
        if (v.menu && v.router) {
          ret.push(v)
        } else {
          if (Array.isArray(v.children) && v.children.length > 0) traverse(v.children)
        }
      })
    }
  }

  get aciveIndex () {
    const vm = this as any
    const path = this.$route.path
    return getPath(path)

    function getPath (path: string): string {
      if (!path) return ''
      const has = vm.lastMenus.some((v: any) => v.path === path)
      if (has) return path
      return getPath(path.slice(0, path.lastIndexOf('/')))
    }
  }

  get expandCls () {
    return this.expand ? (this as any).$style.expand : ''
  }

  render (h: CreateElement) {
    const vm = this as any
    const data = {
      props: {
        backgroundColor: '#ffffff',
        textColor: '#666',
        activeTextColor: '#3AC082',
        router: true,
        defaultActive: this.aciveIndex,
        collapse: !this.expand,
        uniqueOpened: true
      },
      class: [this.expandCls, 'glp-nav-menu']
    }
    return h('el-menu', data, this.menus.map((v: any) => renderItem(v)))

    function renderItem (item: any) {
      if (!item || !item.menu) return null
      const children = (item.children || []).filter((v: any) => vm.$auth.accessSync(v.path))
      if (children.length > 0 && !item.router) return renderSubMenu(item)
      return renderMenuItem(item)

      function renderSubMenu (item: any) {
        const data = {
          props: {
            index: item.path
          }
        }
        const children = (item.children || []).filter((v: any) => vm.$auth.accessSync(v.path))
        const content = [
          h('div', { slot: 'title' }, [renderIcon(item), h('span', item.title)]),
          children.map((v: any) => renderItem(v))
        ]
        return h('el-submenu', data, content)
      }

      function renderMenuItem (item: any) {
        const data = {
          props: {
            index: item.path
          }
        }
        const content = [
          renderIcon(item),
          h('span', { slot: 'title' }, item.title)
        ]
        return h('el-menu-item', data, content)
      }

      function renderIcon (item: any) {
        return null
        // return h('i', { class: [vm.$style.icon] }, [h('svg-icon', { props: { icon: item.name } })])
      }
    }
  }

  $style!: Record<string, unknown>
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";

.expand {
  width: 200px;
}

.icon {
    font-size: 16px;
    color: inherit !important;
    margin-right: 4px;
    line-height: 1;
}
</style>

<style lang="scss">
@import "~@/styles/vars.scss";
.glp-nav-menu.el-menu{
  border-right-color: transparent;
  border: none;

  .el-submenu.is-opened {
    .el-menu {
      background-color: #fff !important;
    }

    .el-menu-item {
      background-color: #fff !important;
      & *{
        font-size: 14px;
        color: #666;
      }
      &.is-active, &:hover{
        background-color:#F2FAF5 !important;
        font-weight: 600;

        & * {
          color: #3AC082;
        }
      }
    }
  }

  .el-submenu {
    position: relative;

    &::after {
      content: " ";
      position: absolute;
      height: 1px;
      width: 100%;
      background-color: #f3f3f3;
      bottom: 0;
      left: 0;
    }
  }

  .el-menu-item, .el-submenu__title{
      height: 42px;
      line-height: 42px;
      font-size: 14px;
      color: #333 !important;
      border-right: 4px solid transparent;
      &.is-active{
        border-right: 4px solid $color-primary;
        background-color:#F2FAF5 !important;
      }
      &:hover {
        background-color:#fff !important;
      }
  }

  .el-submenu__title {
    &:hover {
      color: $color-primary !important;
      font-weight: 600;
      border: none;
      background: #fff !important;
      border-right: 4px solid transparent;
    }
  }

  .el-submenu {
    .el-menu-item {
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
