<template>
  <div class="map-pop">
    <a class="close el-icon-close" href="javascript:void(0);" @click="$emit('close')" />
    <div class="map-pop-content">
      <h4 class="title">具体项目大致情况</h4>
      <div>
        <table class="table-data">
          <thead>
            <tr>
              <th>
                <p class="name">项目名称</p>
              </th>
              <th>
                <p class="name">总投资</p>
                <p class="until">(万元)</p>
              </th>
              <th>
                <p class="name">NOI</p>
                <p class="until">(万元)</p>
              </th>
              <th>
                <p class="name">有效租金</p>
                <p class="until">(元/平方/天)</p>
              </th>
              <th>
                <p class="name">出租率</p>
              </th>
              <th>
                <p class="name">YOC</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>上海奉贤</td>
              <td>6,353.86</td>
              <td>6,353.86</td>
              <td>86.75</td>
              <td>86.75%</td>
              <td>36.43%</td>
            </tr>
            <tr>
              <td>上海奉贤</td>
              <td>6,353.86</td>
              <td>6,353.86</td>
              <td>75.86</td>
              <td>86.75%</td>
              <td>36.43%</td>
            </tr>
            <tr>
              <td>上海奉贤</td>
              <td>6,353.86</td>
              <td>6,353.86</td>
              <td>75.86</td>
              <td>86.75%</td>
              <td>36.43%</td>
            </tr>
            <tr>
              <td>上海奉贤</td>
              <td>6,353.86</td>
              <td>6,353.86</td>
              <td>75.86</td>
              <td>86.75%</td>
              <td>36.43%</td>
            </tr>
            <tr>
              <td>上海奉贤</td>
              <td>6,353.86</td>
              <td>6,353.86</td>
              <td>75.86</td>
              <td>86.75%</td>
              <td>36.43%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MapPop',
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.map-pop{
    position: absolute;
    bottom: 101%;
    right: 0;
    // margin-top: -5px;
    width: 571px;
    height: 275px;
    background: #E0E7E7;
    border-radius: 20px;
    background: rgba(224, 231, 231, 0.8);
    border: 1px solid rgba(0, 73, 72, 0.8);
    .close{
        position: absolute;
        right: 20px;
        top: 15px;
        display: block;
        width: 16px;
        height: 16px;
        color: #7E807F;
        font-size:20px;
    }
    .map-pop-content{
        padding-left: 20px;
        .title{
            padding-left: 5px;
            color: rgba(2, 11, 20, 1);
            font-size: 18px;
            height: 50px;
            line-height: 50px;
            font-weight: normal;
        }
    }
    .table-data{
        width: 100%;
        table-layout: fixed;
        tr>th{
            height: 46px;
            background: #D9D9D9;
            font-size: 14px;
            color: rgba(2, 11, 20, 1);
            padding: 0 10px;
            text-align: random($limit: 1);
             text-align: right;
             font-weight: normal;
            >p.name{
                padding-top:8px;
                font-size: 14px;
                color: rgba(2, 11, 20, 1);
                line-height: 1.2;
                margin-bottom: 0;
            }
            >p.until{
                font-size: 12px;
                color: rgba(2, 11, 20, 1);
                line-height: 1.2;
                margin-bottom: 0;
            }
        }
        tr>td{
            text-align: right;
            height: 30px;
            line-height: 30px;
            color: rgba(2, 11, 20, 1);
            border-bottom:1px solid rgba(217, 217, 217, 1);
            font-size: 14px;
            padding: 0 10px;
        }
    }
}
</style>
