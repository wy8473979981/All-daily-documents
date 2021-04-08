<template>
      <div v-if="row.contractRelatedBusinessRes" class="contractRelatedLink">
          <a v-if="row.contractRelatedBusinessRes.length===1" :href="contractRelatedLink(row,row.contractRelatedBusinessRes[0],projectId,projectName)" target="_blank" :class="[$style.link]">
              {{row.contractRelatedBusinessRes[0].targetCode}}
          </a>
          <el-dropdown :class="[$style.contractRelatedLink]" placement='bottom-start' v-else>
             <a :href="contractRelatedLink(row,item,projectId,projectName)" target="_blank" :class="[$style.link]" v-for="(item,index) in row.contractRelatedBusinessRes" :key="item.targetCode">
                  {{item.targetCode}}<span v-if="index<row.contractRelatedBusinessRes.length-1">,</span>
             </a>
              <el-dropdown-menu slot="dropdown">
                  <ul :class="[$style.dropList]">
                  <li v-for="item in row.contractRelatedBusinessRes" :key="item.targetCode" >
                    <a :href="contractRelatedLink(row,item,projectId,projectName)" target="_blank" :class="[$style.link]">
                        {{item.targetCode}}
                    </a>
                  </li>
              </ul>
            </el-dropdown-menu>
        </el-dropdown>
     </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch, Prop, Emit } from 'vue-property-decorator'
import { contractRelatedLink } from '@/views/pages/contract/contractRelatedLink'
@Component({})
export default class DropBox extends Vue {
  @Prop(Object) row!: object
  @Prop(Number) projectId!: number
  @Prop(String) projectName!: string
  contractRelatedLink=contractRelatedLink
}
</script>
<style lang="scss">
   .contractRelatedLink{
      .el-dropdown{
         width: 100%;
         white-space: nowrap;
         text-overflow: ellipsis;
         overflow: hidden;
      }
  }
</style>
<style lang="scss" module>
   .dropList{
      margin:0px;
      padding:10px;
      list-style: none;
      li{
        line-height: 24px;
      }
    }
    .link {
      color: #67c23a;
      cursor: pointer;
      text-decoration: none;
  }
</style>
