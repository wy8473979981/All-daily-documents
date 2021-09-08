<!--
 * @Author: xza
 * @Date: 2021-08-02 17:04:01
 * @LastEditTime: 2021-08-03 09:24:21
 * @LastEditors: xza
 * @Description: 弹窗组件 item
 * @FilePath: /baolong/src/views/Financia/BillManagement/ReceiptList/block/items/item.vue
-->
<template>
  <div class="item text-truncate mr-8">
    <span class="word">{{ info[infoType] }}</span>
    <span class="minus-icon operation" @click="remove" />
  </div>
</template>

<script>

export default {
  name: 'Item',
  props: {
    info: {
      type: Object,
      default: () => { }
    },
    infoType: {
      type: String,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  methods: {
    remove() {
      this.$emit('removeChoose', this.info)
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
    height: 32px;
    line-height: 32px;
    width: 142px;
    background: $subMenuBg;
    color: $menuDefaultColor;
    font-size: 14px;
    border-radius: 16px;
    text-align: left;
    margin-bottom:12px;
    padding: 0 2px 0 16px;
    cursor:pointer;
    display: flex;
    align-items: center;
    .word{
       width: 108px;
       height: 32px;
       display: inline-block;
       overflow: hidden;
       white-space: nowrap;
       text-overflow:ellipsis;
    }
    .operation{
       width: 16px;
       height: 16px;
       display: inline-block;
       vertical-align: middle;
       cursor: pointer;
    }
    .minus-icon{
       background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAC8klEQVRoBe1YzWsTURCf99J8lKIYJFVq9aBBwYInC72JVwXBc47eRURPopaCB1Gq+DfoWVA89yYBb0o9BS+Gqo2SWjU2jc1zZteFTcnbmd3uGkrfXnb3zbz5zW/e5wyAe1wEXARcBFwE9nIEVFrk52dmCu3Wx/OwBZcU9E8DqCkDMEX2EWQFwKwY0O8hBy/KlaNL88vLm2lg75jAzUrlcK/fvWPA1MCY/SKnlFpXoJ7ldXHhQav1WdTHopSYwJNqtfhhbfUWOn3dGDNhsR/ZrJT6BUotHj8wee9qo9GNVLYIExGgqG/2N56j83MWu/GalaoXdOlyktGITeDGZPlMb6v3CgxMx/OS0VbQ1GP5C4++tN8xmgPiWAT8yP9+k7rzgUtIoqDHZ+OMhA76cm+a8/60STnyYWAcVcIgrHBz1HcuShiWndJ/7uKcr4XbMvqeXut2TL3TXZLYF00hf6vcaCTdbSSOhHVod8rrUlUylURTyNvnE26VYcek3xQowpToswTohPUOKYm1FHUIk7A5kywB73ogPWE5tDhyxPSwmT4sAbrbMDayEwuwWQL+xSw7H6MsS7BZAnSrjALJVsZjj3EOBFdim97jbz9sIlH7tYP7rHocNnUUjIDVfuYCPKSQQ/TDjgAawUQETtrMREXQ1idG+ydOVzACBrOpUT08NkvASwNH5L8EmyVAOeyI/AcJNkuAEnBM+9b/OwnE9LAZYJYAVQ8oAWfspC4mTEnlgiVAnlH1wEvAU3dzuEH/Ol1cGC4dbBUlNK87nZ9zE6USJjTnBrtn86e0vr/4tf1SYl00AmSISh+4FuoSozvSQQwPS2hElJEFtnZ1Uk8kKMXL5/IXsVbYDEil9v5XVpGkkWFM8RQKOj1cbb+l0keq08krbI3Pxq0JkU+iRRw4H7xpUdeOHHtK1QOcg2exnU39gr7hN+02tGBPlA9dud1sfg/LpN+x1sAwo37FYhcWd7eTGVV5fbsf7t9FwEXARcBFYG9F4C9VRgmu28o3IAAAAABJRU5ErkJggg==) no-repeat;
       background-size: contain;
    }
}
</style>
