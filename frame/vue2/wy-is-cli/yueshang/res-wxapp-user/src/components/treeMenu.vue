<template>
  <div class="treeMenu-overflow">
    <ul class="treeMenu">
      <tree-item :children="bljtOrgTreeList"></tree-item>
      <tree-item :children="bldcOrgTreeList"></tree-item>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'treeMenu',
  data: () => {
    return {
      // treeData: {
      //   text: '宝龙集团',
      //   children: [
      //     {
      //       text: '秦琴琴',
      //       children: [
      //         {
      //           text: '吴涵涵',
      //           children: [
      //             {
      //               text: '宝龙集团',
      //               children: [
      //                 {
      //                   text: '秦琴琴',
      //                   children: [
      //                     {
      //                       text: '吴涵涵'
      //                     },
      //                     {
      //                       text: 'yichang'
      //                     },
      //                     {
      //                       text: 'jinzhou'
      //                     }
      //                   ]
      //                 }
      //               ]
      //             },
      //             {
      //               text: '宝龙集团',
      //               children: [
      //                 {
      //                   text: '吴涵涵'
      //                 },
      //                 {
      //                   text: 'yichang'
      //                 }
      //               ]
      //             }
      //           ]
      //         },
      //         {
      //           text: 'yichang'
      //         },
      //         {
      //           text: 'jinzhou'
      //         }
      //       ]
      //     },
      //     {
      //       text: '秦琴琴',
      //       children: [
      //         {
      //           text: '吴涵涵',
      //           children: [
      //             {
      //               text: '宝龙集团',
      //               children: [
      //                 {
      //                   text: '秦琴琴',
      //                   children: [
      //                     {
      //                       text: '吴涵涵'
      //                     },
      //                     {
      //                       text: 'yichang'
      //                     },
      //                     {
      //                       text: 'jinzhou'
      //                     }
      //                   ]
      //                 }
      //               ]
      //             },
      //             {
      //               text: '宝龙集团',
      //               children: [
      //                 {
      //                   text: '吴涵涵'
      //                 },
      //                 {
      //                   text: 'yichang'
      //                 }
      //               ]
      //             }
      //           ]
      //         },
      //         {
      //           text: 'yichang'
      //         },
      //         {
      //           text: 'jinzhou'
      //         }
      //       ]
      //     }
      //   ]
      // }
    }
  },
  computed: {
    ...mapState(['bljtOrgTreeList', ['bldcOrgTreeList']])
  },
}
</script>
<style lang="scss" scoped>
.treeMenu-overflow {
  overflow-y: auto;
  height: calc(100% - 170px);
}
</style>
