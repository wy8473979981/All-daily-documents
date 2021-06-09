<template>
    <div style="height:654px;" class="p-b mt-10">
        <div class="d-flex">
         <el-row :gutter="20" type="flex" style="margin-top:10px">
            <el-col :span="12" style="margin-left:20px"><div class="grid-content bg-purple">
                 <el-radio v-model="radio" label="1" style="color:#004948;font-size:14px">项目</el-radio>
                </div></el-col>
                            <el-col :span="12" style="margin-left:20px"><div class="grid-content bg-purple">
                 <el-radio v-model="radio" label="1" style="color:#A7A7A7;font-size:14px">风险热区</el-radio>
                </div></el-col>
                            <el-col :span="12" style="margin-left:20px"><div class="grid-content bg-purple">
                 <el-radio v-model="radio" label="1" style="color:#A7A7A7;font-size:14px">卫星</el-radio>
                </div></el-col>
            </el-row>
        </div>

    <!-- 收入比重统计图 -->
        <div style="display:flex;padding-top:24px;">
            <!-- 左边 -->
           <div>
               <div class="c-1" @click="cur=0" :class="{active:cur==0}">收入比重</div>
               <div class="c-2" @click="cur=1" :class="{active:cur==1}">指标排行榜</div>
           </div>
           <!-- 右边 -->
           <div v-show="cur==0" id="box1" style="width:474px;height:376px;background:#E0E7E7"></div>
            <div v-show="cur==1" id="echarts-content" style="width:474px;height:376px;background:#E0E7E7"></div>
        </div>

<div  class="p-a">
        <!-- 资产状态  收入比重-->
     <div class="d-flex" style="width:300px;padding-top:36px;">
           <div class="b-border">
           <div class="pd-30">资产状态</div>
           </div>
         <div class="b-d">
           <div class=""></div>
        </div>
    </div>

    <div style="display:flex;margin-top:10px">
        <!-- 左边 -->
         <div style="width:96px;padding-left:10px">
             <div>
                <div style="display:flex;" class="box"><div class="b-ria-8"></div><div class="color_b">在营</div></div>
                <div class="color_b">总建面</div>
                <div class="font-1">686.55</div>
             </div>
             <div>
                <div style="display:flex;margin-top:17px" class="box"><div class="b-ria-8"></div><div class="color_b">在营</div></div>
                <div class="color_b">总建面</div>
                <div class="font-1">686.55</div>
             </div>
         </div>
         <!-- 右边 -->
         <div class="d-f">
             <div id="assets" style="width:124px;height:124px;"></div>
         </div>
    </div>
   </div> 

    </div>
</template>

<script>
export default {
    name: 'mapHome',
    props:{
        falg:{
            type:Boolean
        }
    },
    data() {
        return {
           radio:false,
           val:2,
           cur:0 
          };
     },

     mounted(){
         console.log(this.falg)
         let assets = this.$echarts.init(document.getElementById('assets'))
         var color = ['#004948', '#41B2AB']
         let  option = {
          color: color,
          backgroundColor: '#F2F1EC',
         title: {
        text: '资产状态\n分布',
        textStyle: {
            color: '#333333',
            fontSize: 14,
            fontWeight: 'normal',
        },
        x: 'center',
        y: 'center',
     },
      tooltip: {
        show: false,
        trigger: 'item'
    },
       legend: {
        show:false,
        orient: 'vertical',
        right: 20,
        top: 20
    },
    series: [{
        type: 'pie',
        roseType: 'radius',
        radius: ['70%', '90%'],
        label:{
            show:false
        },
        data: [{
                value: 220,
                name: '社会组织',
            }, {
                value: 120,
                name: '事业单位'
            }
        ]
    }]
};
    option && assets.setOption(option)
  
    let box1 = this.$echarts.init(document.getElementById('box1'))
    app.title = '堆叠柱状图';

let  option1 = {
    backgroundColor: '#E0E7E7',
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['租金收入','物管收入','多经收入','增长率'],
        textStyle: {
            color: '#848382'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['2016','2017','2018','2019','2020'],
            splitLine: {
                show: false
            },
            color: '#848382',
            axisLine: {
                lineStyle: {
                    color: '#848382',
                }
            },
            axisLabel: {
                color: '#848382'
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            min: 0,
            max: 500,
            interval: 100,
            axisLine: {
                lineStyle: {
                    color: '#848382',
                }
            }
        },
        {
            type: 'value',
            min: 0,
            max: 200,
            interval: 40,
            axisLabel: {
                formatter: '{value}%'
            },
            axisLine: {
                lineStyle: {
                    color: '#848382',
                }
            }
        }
    ],
    series : [
        {
            name:'租金收入',
            type:'bar',
            barWidth: 20,
            stack: '广告',
            zlevel:1,
            itemStyle: {
               barBorderRadius: 20, 
               color: '#004948'
            },
            data:[120, 132, 101, 134, 90]
        },
        {  // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20 
            type:'bar',
            barWidth: 20,
            barGap: '-100%',
            stack: '广告',
            zlevel:1,
            itemStyle: {
              color: 'transparent'  
            },
            data:[100, 102, 81, 114, 70]
        },
        {
            name:'物管收入',
            type:'bar',
            barWidth: 20,
            barGap: '-100%',
            stack: '广告',
            zlevel:1,
            itemStyle: {
               barBorderRadius: 20, 
               color:'#3B8995'
            },
            data:[220, 182, 191, 234, 290]
        },
         {  // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20 
            type:'bar',
            barWidth: 20,
            barGap: '-100%',
            stack: '多经收入',
            zlevel:5,
            itemStyle: {
              color: 'transparent'  
            },
            data:[100, 102, 81, 114, 70]
        },
        {
            name:'多经收入',
            type:'bar',
            barWidth: 20,
            barGap: '-100%',
            stack: '多经收入',
            zlevel:5,
            itemStyle: {
               barBorderRadius: 20, 
               color:'#B2D8B8'
            },
            data:[250, 192, 201, 244, 300]
        },
        {
            name: '增长率',
            type: 'line',
            data: [150, 142, 123, 122, 200 ],
            yAxisIndex: 1,
            itemStyle: {
               barBorderRadius: 20, 
               color:'#4AACD1'
            }
        }
    ]
};

 option1 && box1.setOption(option1)

       var myChart = this.$echarts.init(document.getElementById('echarts-content'), null, { renderer: 'svg' });
            var option2 = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'none',
                    padding:0,
                    borderWidth:0,
                    backgroundColor:'rgba(50,50,50,0)',
                    extraCssText: 'box-shadow: 0 0 0px rgba(0, 0, 0, 0.3);',
                    position: function (pos, params, dom, rect, size) {
                        console.log('rect', rect);
                
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        var obj = { top: 60 };
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        return [rect.x + rect.width, rect.y];
                    },
                    formatter: function(params){
                        return `<div class="ranking-dialog">
                            <p class="title">负责人： XXX</p>
                            <p class="info">出租率： 95%</p>
                            <p class="info">开业率： 93%</p>
                            <p class="info">租金收入： XXXX</p>
                            <p class="info">销售额： XXXX</p>
                            <p class="link">点击进入项目详情</p>
                        </div>`
                    }
                },
                animation:false,
                series: [
                    {
                        name: '客流排名bg',
                        type: 'pie',
                        // selectedMode: 'multiple',
                        radius: ['62%', '86%'],
                        selectedOffset: 0,
                        hoverAnimation:false,
                        roseType: 'area',
                        labelLine: {
                            show: false,
                            smooth: false
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'outside',
                                fontSize: 12,
                                color: '#FFFFFF',
                                formatter: '{b}',
                                fontFamily: 'Microsoft Yahei',
                                backgroundColor: '#20384A',
                                borderColor: '#20384A',
                                borderWidth: 1,
                                borderRadius: 13,
                                lineHeight: 16,
                                padding: [0, 12]
                            }
                        },
                        itemStyle: { borderWidth: 10, borderColor: '#e0e7e7' },
                        z:0,
                        data: [
                            { value: 30, name: '1: 福州 O', itemStyle: { color: '#20384A' }, label: { show: false }, labelLine: { show: false } },
                            { value: 28, name: '2: 七宝 O', itemStyle: { color: '#20384A' }, label: { show: false }, labelLine: { show: false } },
                            { value: 27, name: '3: 宝山 O', itemStyle: { color: '#20384A' }, label: { show: false }, labelLine: { show: false } },
                            { value: 27, name: '', itemStyle: { color: '#20384A' }, label: { show: false }, labelLine: { show: false } },
                            { value: 26, name: '', itemStyle: { color: '#20384A' }, label: { show: false }, labelLine: { show: false } },
                            { value: 25, name: '', itemStyle: { color: '#014C83' } , label: { show: false }, labelLine: { show: false }},
                            { value: 25, name: '', itemStyle: { color: '#014C83' } , label: { show: false }, labelLine: { show: false }},
                            { value: 25, name: '', itemStyle: { color: '#014C83' }, label: { show: false }, labelLine: { show: false } },
                            { value: 25, name: '', itemStyle: { color: '#014C83' } , label: { show: false }, labelLine: { show: false }},
                            { value: 23, name: '', itemStyle: { color: '#014C83' } , label: { show: false }, labelLine: { show: false }},
                            { value: 23, name: '', itemStyle: { color: '#014C83' } , label: { show: false }, labelLine: { show: false }},
                            { value: 23, name: '', itemStyle: { color: '#014C83' } , label: { show: false }, labelLine: { show: false }},
                            { value: 23, name: '', itemStyle: { color: '#014C83' } , label: { show: false }, labelLine: { show: false }},
                            { value: 22, name: '', itemStyle: { color: '#014C83' } , label: { show: false }, labelLine: { show: false }},
                            { value: 22, name: '', itemStyle: { color: '#014C83' }, label: { show: false }, labelLine: { show: false } },
                            { value: 22, name: '', itemStyle: { color: '#014C83' }, label: { show: false }, labelLine: { show: false } },
                            { value: 18, name: '', itemStyle: { color: '#014C83' } , label: { show: false }, labelLine: { show: false }},
                            { value: 18, name: '', itemStyle: { color: '#014C83' } , label: { show: false }, labelLine: { show: false }},
                            { value: 18, name: '', itemStyle: { color: '#014C83' }, label: { show: false }, labelLine: { show: false } },
                            { value: 18, name: '', itemStyle: { color: '#014C83' } , label: { show: false }, labelLine: { show: false }},
                            { value: 18, name: '', itemStyle: { color: '#014C83' } , label: { show: false }, labelLine: { show: false }},
                            { value: 18, name: '', itemStyle: { color: '#014C83' } , label: { show: false }, labelLine: { show: false }},
                            { value: 15, name: '', itemStyle: { color: '#014C83' } , label: { show: false }, labelLine: { show: false }},
                            { value: 15, name: '', itemStyle: { color: '#014C83' } , label: { show: false }, labelLine: { show: false }},
                            { value: 12, name: '', itemStyle: { color: '#00AED5' } , label: { show: false }, labelLine: { show: false }},
                            { value: 12, name: '', itemStyle: { color: '#00AED5' } , label: { show: false }, labelLine: { show: false }},
                            { value: 12, name: '', itemStyle: { color: '#00AED5' } , label: { show: false }, labelLine: { show: false }},
                            { value: 12, name: '', itemStyle: { color: '#00AED5' } , label: { show: false }, labelLine: { show: false }},
                            { value: 12, name: '', itemStyle: { color: '#00AED5' } , label: { show: false }, labelLine: { show: false }},
                            { value: 12, name: '', itemStyle: { color: '#00AED5' } , label: { show: false }, labelLine: { show: false }},
                            { value: 10, name: '', itemStyle: { color: '#790002' } , label: { show: false }, labelLine: { show: false }},
                            { value: 10, name: '', itemStyle: { color: '#790002' } , label: { show: false }, labelLine: { show: false }},
                            { value: 10, name: '', itemStyle: { color: '#790002' } , label: { show: false }, labelLine: { show: false }},
                            { value: 10, name: '', itemStyle: { color: '#790002' } , label: { show: false }, labelLine: { show: false }},
                            { value: 10, name: '', itemStyle: { color: '#790002' } , label: { show: false }, labelLine: { show: false }},
                            { value: 10, name: '', itemStyle: { color: '#790002' } , label: { show: false }, labelLine: { show: false }},
                            { value: 7, name: '', itemStyle: { color: '#BBCCD3' } },
                            { value: 7, name: '', itemStyle: { color: '#BBCCD3' } },
                            { value: 7, name: '', itemStyle: { color: '#BBCCD3' } }
                        ]
                    },
                    {
                        name: '客流排名',
                        tooltip: {
                            show: false
                        },
                        type: 'pie',
                        // selectedMode: 'multiple',
                        radius: ['62%', '86%'],
                        selectedOffset: 0,
                        roseType: 'area',
                        labelLine: {
                            show: false,
                            smooth: false
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'outside',
                                fontSize: 12,
                                color: '#FFFFFF',
                                formatter: '{b}',
                                fontFamily: 'Microsoft Yahei',
                                backgroundColor: '#20384A',
                                borderColor: '#20384A',
                                borderWidth: 1,
                                borderRadius: 13,
                                lineHeight: 16,
                                padding: [0, 12]
                            }
                        },
                        itemStyle: { borderWidth: 10, borderColor: '#e0e7e7' },
                        data: [
                            { value: 30, name: '1: 福州 O', itemStyle: { color: '#20384A' }, label: { show: false }, labelLine: { show: true } },
                            { value: 28, name: '2: 七宝 O', itemStyle: { color: '#20384A' }, label: { show: false }, labelLine: { show: true } },
                            { value: 27, name: '3: 宝山 O', itemStyle: { color: '#20384A' }, label: { show: false }, labelLine: { show: true } },
                            { value: 27, name: '', itemStyle: { color: '#20384A' } },
                            { value: 26, name: '', itemStyle: { color: '#20384A' } },
                            { value: 25, name: '', itemStyle: { color: '#014C83' } },
                            { value: 25, name: '', itemStyle: { color: '#014C83' } },
                            { value: 25, name: '', itemStyle: { color: '#014C83' } },
                            { value: 25, name: '', itemStyle: { color: '#014C83' } },
                            { value: 23, name: '', itemStyle: { color: '#014C83' } },
                            { value: 23, name: '', itemStyle: { color: '#014C83' } },
                            { value: 23, name: '', itemStyle: { color: '#014C83' } },
                            { value: 23, name: '', itemStyle: { color: '#014C83' } },
                            { value: 22, name: '', itemStyle: { color: '#014C83' } },
                            { value: 22, name: '', itemStyle: { color: '#014C83' } },
                            { value: 22, name: '', itemStyle: { color: '#014C83' } },
                            { value: 22, name: '', itemStyle: { color: '#014C83' } },
                            { value: 18, name: '', itemStyle: { color: '#014C83' } },
                            { value: 18, name: '', itemStyle: { color: '#014C83' } },
                            { value: 18, name: '', itemStyle: { color: '#014C83' } },
                            { value: 18, name: '', itemStyle: { color: '#014C83' } },
                            { value: 18, name: '', itemStyle: { color: '#014C83' } },
                            { value: 18, name: '', itemStyle: { color: '#014C83' } },
                            { value: 15, name: '', itemStyle: { color: '#014C83' } },
                            { value: 15, name: '', itemStyle: { color: '#014C83' } },
                            { value: 12, name: '', itemStyle: { color: '#00AED5' } },
                            { value: 12, name: '', itemStyle: { color: '#00AED5' } },
                            { value: 12, name: '', itemStyle: { color: '#00AED5' } },
                            { value: 12, name: '', itemStyle: { color: '#00AED5' } },
                            { value: 12, name: '', itemStyle: { color: '#00AED5' } },
                            { value: 12, name: '', itemStyle: { color: '#00AED5' } },
                            { value: 10, name: '', itemStyle: { color: '#790002' } },
                            { value: 10, name: '', itemStyle: { color: '#790002' } },
                            { value: 10, name: '', itemStyle: { color: '#790002' } },
                            { value: 10, name: '', itemStyle: { color: '#790002' } },
                            { value: 10, name: '', itemStyle: { color: '#790002' } },
                            { value: 10, name: '', itemStyle: { color: '#790002' } },
                            { value: 7, name: '', itemStyle: { color: '#BBCCD3' } },
                            { value: 7, name: '', itemStyle: { color: '#BBCCD3' } },
                            { value: 7, name: '', itemStyle: { color: '#BBCCD3' } }
                        ]
                    },
                    {
                        name: '销售排名',
                        type: 'pie',
                        radius: ['32%', '58%'],
                        selectedOffset: 10,
                        roseType: 'area',
                        labelLine: {
                            show: false,
                            height: 200,
                            smooth: false
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'outside',
                                fontSize: 12,
                                color: '#FFFFFF',
                                formatter: '{b}',
                                fontFamily: 'Microsoft Yahei',
                                backgroundColor: '#20384A',
                                borderColor: '#20384A',
                                borderWidth: 1,
                                borderRadius: 13,
                                lineHeight: 16,
                                padding: [0, 12]
                            }
                        },
                        itemStyle: { borderWidth: 10, borderColor: '#e0e7e7' },
                        data: [
                            { value: 27, name: '11: 福州 O', itemStyle: { color: '#004A48' } },
                            { value: 25, name: '12: 七宝 O', itemStyle: { color: '#416045' } },
                            { value: 30, name: '13: 宝山 O', itemStyle: { color: '#004A48' } },
                            { value: 26, name: '', itemStyle: { color: '#416045' } },
                            { value: 28, name: '', itemStyle: { color: '#004A48' } },
                            { value: 22, name: '', itemStyle: { color: '#416045' } },
                            { value: 25, name: '', itemStyle: { color: '#004A48' } },
                            { value: 22, name: '', itemStyle: { color: '#416045' } },
                            { value: 25, name: '', itemStyle: { color: '#004A48' } },
                            { value: 20, name: '', itemStyle: { color: '#416045' } },
                            { value: 20, name: '', itemStyle: { color: '#416045' } },
                            { value: 20, name: '', itemStyle: { color: '#416045' } },
                            { value: 20, name: '', itemStyle: { color: '#416045' } },
                            { value: 18, name: '', itemStyle: { color: '#416045' } },
                            { value: 18, name: '', itemStyle: { color: '#416045' } },
                            { value: 18, name: '', itemStyle: { color: '#416045' } },
                            { value: 18, name: '', itemStyle: { color: '#416045' } },
                            { value: 12, name: '', itemStyle: { color: '#A8DAB5' } },
                            { value: 14, name: '', itemStyle: { color: '#416045' } },
                            { value: 12, name: '', itemStyle: { color: '#416045' } },
                            { value: 12, name: '', itemStyle: { color: '#416045' } },
                            { value: 12, name: '', itemStyle: { color: '#A8DAB5' } },
                            { value: 16, name: '', itemStyle: { color: '#416045' } },
                            { value: 12, name: '', itemStyle: { color: '#A8DAB5' } },
                            { value: 12, name: '', itemStyle: { color: '#A8DAB5' } },
                            { value: 16, name: '', itemStyle: { color: '#A8DAB5' } },
                            { value: 16, name: '', itemStyle: { color: '#416045' } },
                            { value: 10, name: '', itemStyle: { color: '#A8DAB5' } },
                            { value: 10, name: '', itemStyle: { color: '#A8DAB5' } },
                            { value: 16, name: '', itemStyle: { color: '#416045' } },
                            { value: 16, name: '', itemStyle: { color: '#416045' } },
                            { value: 8, name: '', itemStyle: { color: '#790002' } },
                            { value: 8, name: '', itemStyle: { color: '#790002' } },
                            { value: 16, name: '', itemStyle: { color: '#416045' } },
                            { value: 8, name: '', itemStyle: { color: '#790002' } },
                            { value: 8, name: '', itemStyle: { color: '#790002' } },
                            { value: 16, name: '', itemStyle: { color: '#416045' } },
                            { value: 6, name: '', itemStyle: { color: '#BBCCD3' } },
                            { value: 6, name: '', itemStyle: { color: '#BBCCD3' } },
                            { value: 6, name: '', itemStyle: { color: '#BBCCD3' } }
                        ]
                    },
                    {
                        name: '部门',
                        type: 'pie',
                        radius: ['0%', '26%'],
                        label: {
                            normal: {
                                position: 'center',
                                fontSize: 22,
                                fontFamily: 'Microsoft YaHei',
                                color: '#262626'
                            }
                        },
                        data: [
                            { value: 22, name: '2021年\n\n5月\n\n3日', itemStyle: { color: '#fff', shadowColor: '#9C9C98', shadowOffsetY: 4 } }
                        ]
                    }
                ]
            };
            myChart.setOption(option2)
            myChart.on('click', 'series.pie.label', function (params) {
                console.log('click==', params);
                let optionsNew = JSON.parse(JSON.stringify(option))
                myChart.dispatchAction({
                    type: 'hideTip'
                })
                // 非背景系列点击触发前面一层的label显示
                if (params.seriesIndex % 2) {
                    if (!optionsNew.series[params.seriesIndex - 1].data[params.dataIndex].label) {
                        optionsNew.series[params.seriesIndex - 1].data[params.dataIndex].label = {}
                        optionsNew.series[params.seriesIndex - 1].data[params.dataIndex].labelLine = {}
                    }
                    optionsNew.series[params.seriesIndex - 1].data[params.dataIndex].label.show = true
                    optionsNew.series[params.seriesIndex - 1].data[params.dataIndex].labelLine.show = true
                    myChart.setOption(optionsNew);
                    return
                }
                // label 点击位置
                if(params.event.target.style&&params.event.target.style.lineWidth!=1){
                    var  position =[];
                    if(params.event.target.transform){
                        position = [params.event.target.transform[4]+params.event.target._rect.width,params.event.target.transform[5]-10]
                    }else{
                        position =[0,0]
                    }
                    myChart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: params.seriesIndex,
                        // 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
                        dataIndex: params.dataIndex,
                        // 屏幕上的 x 坐标
                        //x: number,
                        // 屏幕上的 y 坐标
                        //y: number,
                        // 本次显示 tooltip 的位置。只在本次 action 中生效。
                        // 缺省则使用 option 中定义的 tooltip 位置。
                        position: position,
                    })
                    return
                    //alert('');
                }
                // const index = params.dataIndex
                if (params.data) {
                    //alert('点击：' + params.data.name)
                }
            });

     },
     methods:{

     },

};
</script>

<style lang="scss"  scoped>
.p-b{
    position: relative;
}
.p-a{
    position: absolute;
    left:32px;
    top:419px;
    z-index:999;
}
 .c-1{
   color:#004948;padding-top: 15px;;width:24px;height:96px;border-radius: 16px;font-size:14px;background:#C8C6A9;text-align:center;    padding-left: 4px;
    padding-right: 4px;
 }
 .c-2{
     margin-top:20px;color:#004948;padding-top: 15px;;width:24px;height:109px;border-radius: 16px;font-size:14px;background:#C8C6A9;text-align:center;    padding-left: 4px;
    padding-right: 4px;
 }
 .active{
     background:#004948;
     color:#C8C6A9;
 }
  .d-flex{
      display:flex;
      justify-content: space-between;
  }
  .b-border{
      padding-bottom: 8px;
      align-items: center;
      border-bottom: 1px solid #050101;
      width:50%;
}
  .pd-30{
    vertical-align: middle;
    /* margin: 0 5px 15px 5px; */
    height: 24px;
    line-height: 24px;
    /* background:#6F120C; */
    border-radius: 30px;
    color: #050101;
    font-size: 18px;
    
}
.b-d{
   padding-bottom: 8px;
      align-items: center;
      border-bottom: 1px solid #E0DFDD;
        width:50%;
        text-align:right
}
.box{
    // background:red;
    display: flex;
    align-items: center;
}
.b-ria-8{
  width:8px;height:8px;background:#41B2AB;
  border-radius: 50%;
}
.color_b{
    font-size:12px;
    color:#000000;
}
.font-1{
    color:#333333;
    font-size:22px;
    margin-top:4px
}
.d-f{
    // display:flex;
    // align-items: center;

}
</style>