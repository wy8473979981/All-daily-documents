<template>
  <div style="width: 100%;">
    <el-form :inline="true">
      <!-- <el-form-item label="位置">
        <el-radio-group v-model="imgConfig.position">
          <el-radio label="left">左</el-radio>
          <el-radio label="center">中</el-radio>
          <el-radio label="right">右</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="宽度(px)">
        <el-input-number :min="0" size='mini' v-model="imgConfig.width"></el-input-number>
      </el-form-item>
      <el-form-item label="高度(px)">
        <el-input-number :min="0" size='mini' v-model="imgConfig.height"></el-input-number>
      </el-form-item>
    </el-form>
    <section class="html-list list">
      <el-table size='mini' :data="imageList" @row-click="rowClick">
        <el-table-column prop="label" label="图片名称"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope='scope'>
            <!-- <img :src='scope.row.path'/> -->
            <div class="image" :style="{backgroundImage: 'url('+ scope.row.path +')'}"></div>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgConfig: {
        position: 'left',
        width: 0,
        height: 0
      },
      path: require('@images/dragon.jpg'),
      imageList: [
        {
          path: require('@images/dragon.jpg'), label: '龙珠', originPath: 'https://www.baidu.com/img/baidu_jgylogo3.gif'
        }
      ]
    }
  },
  methods: {
    rowClick (data) {
      console.log(data, '--row lcick')
      this.insertInfo = {
        code: `<img width='${this.imgConfig.width}' height='${this.imgConfig.height}' src='${data.originPath}'>`
      }
      this.$emit('getContent', {...this.insertInfo, type: '图片'})
      this.$emit('toggleModal')
    }
  }
}
</script>

<style lang='scss' scoped>
.image{
  width: 100px;
  height: 100px;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
