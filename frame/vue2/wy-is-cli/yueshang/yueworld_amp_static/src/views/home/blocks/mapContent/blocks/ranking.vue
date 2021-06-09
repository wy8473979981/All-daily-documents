<template>
  <div class="ranking-container">
    <div class="ranking-echarts-around">
      <!-- filter chart -->
      <div class="echarts-line-container">
        <div id="echarts-content" />
        <transition name="el-fade-in-linear">
         <div v-if="isShowOuter" class="pie-item-text">
           <div class="line"></div>
           <h4 class="name">{{positionTitleOuter}}</h4>
           <p class="value">当月合计20.4亿</p>
         </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="isShowInner" class="pie-item-text pie-inner">
            <div class="line"></div>
            <h4 class="name">{{positionTitleInner}}</h4>
            <p class="value">当年评价9%</p>
          </div>
        </transition>
        <div class="date-box">
          <my-date-picker class="small-date-picker" @selectDateResult="selectDateResult" />
        </div>
      </div>
      <!-- filter start -->
      <div class="around-map">
        <div class="around-map-title">
          <el-row>
            <el-col :span="12">
              <div class="title-left">排名环图</div>
            </el-col>
            <el-col :span="12">
              <div class="title-right" />
            </el-col>
          </el-row>
        </div>
        <div class="around-map-list">
          <el-scrollbar style="height: 100%">
            <div
              v-for="(item, index) in aroundList"
              :key="index"
              class="map-list-content"
            >
              <div class="radio-info-container clearfix">
                <div class="radio-content fl clearfix">
                  <div class="left fl">
                    <svg-icon
                      v-if="!item.leftActive"
                      icon-class="radio-default"
                      class="icon"
                      @click="handleClickLeft(item.title, index)"
                    />
                    <svg-icon
                      v-if="item.leftActive"
                      icon-class="radio-active"
                      class="icon"
                      @click="handleClickLeft(item.title, index)"
                    />
                  </div>
                  <div class="right fl">
                    <svg-icon
                      v-if="!item.rightActive"
                      icon-class="radio-default"
                      class="icon"
                      @click="handleClickRight(item.title, index)"
                    />
                    <svg-icon
                      v-if="item.rightActive"
                      icon-class="radio-active"
                      class="icon"
                      @click="handleClickRight(item.title, index)"
                    />
                  </div>
                </div>
                <div
                  class="map-list-title fl"
                  :class="item.leftActive&&false ? 'active' : ''"
                >
                  <div class="around-title">
                    {{ item.title }}
                  </div>
                  <div
                    v-if="item.leftActive&&false"
                    class="around-remove"
                    @click="handleRemove(index)"
                  >
                    <i class="el-icon-remove" />
                  </div>
                </div>
              </div>
              <!-- <el-row>
                                <el-col :span="4">
                                    <el-radio v-model="radio" :label="item.value">{{''}}</el-radio>
                                </el-col>
                                <el-col :span="4">
                                    <el-radio v-model="radio" :label="item.value1">{{''}}</el-radio>
                                </el-col>
                                <el-col :span="8">
                                    <div class="map-list-title" :class="item.active ? 'active' : ''">

                                                <div class="around-title" @click="handleClick(item.active, index)">
                                                    {{item.title}}
                                                </div>
                                                <div class="around-remove" @click="handleRemove(index)" v-if="item.active">
                                                    <i class="el-icon-remove"></i>
                                                </div>
                                    </div>
                                </el-col> -->
              <!-- </el-row> -->
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import MyDatePicker from '@/components/DatePicker/index'
export default {
  name: 'Ranking',
  components: { MyDatePicker },
  props: ['around-list', 'around-radio'],
  data() {
    return {
      positionTitleOuter: 'NOI',
      positionTitleInner: 'IRR',
      isShowOuter: true,
      isShowInner: false,
      isShowLeftRadio: false,
      isShowRightRadio: true,
      mapName: null,
      chinaMapData: [
        {
          name: '上海市',
          label: {
            show: true
          },
          value: 4,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '江苏省',
          label: {
            show: true
          },
          value: 3,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '安徽省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '浙江省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '福建省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '北京市',
          label: {
            show: true
          },
          value: 2,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '山东省',
          label: {
            show: true
          },
          value: 2,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '河南省',
          label: {
            show: true
          },
          value: 2,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '四川省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '重庆市',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '北京市',
          label: {
            show: true
          },
          value: 4,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '南海诸岛',
          value: 0,
          itemStyle: {
            normal: {
              opacity: 0,
              label: {
                show: false
              }
            }
          }
        }
      ],
      provinceMapData: [
        {
          name: '嘉定区',
          label: {
            show: true
          },
          value: 1,
          switchName: '测算开关',
          switchValue: false
        },
        {
          name: '宝山区',
          label: {
            show: true
          },
          value: 1,
          switchName: '测算开关',
          switchValue: false
        },
        {
          name: '闵行区',
          label: {
            show: true
          },
          value: 1,
          switchName: '测算开关',
          switchValue: false
        },
        {
          name: '浦东区',
          label: {
            show: true
          },
          value: 1,
          switchName: '测算开关',
          switchValue: false
        },
        {
          name: '奉贤区',
          label: {
            show: true
          },
          value: 1,
          switchName: '测算开关',
          switchValue: false
        },
        {
          name: '青浦区',
          label: {
            show: true
          },
          value: 2,
          switchName: '测算开关',
          switchValue: false
        },
        {
          name: '苏州市',
          label: {
            show: true
          },
          value: 1,
          switchName: '测算开关',
          switchValue: false
        }
      ],
      provinceMapPointList: [
        {
          name: 'test',
          value: [121.375972, 31.111658],
          itemStyle: {
            color: '#004948'
          },
          list: ['写字楼', '七宝宝龙城', '宝龙艾美酒店']
        },
        {
          name: 'test',
          value: [121.250333, 31.383524],
          itemStyle: {
            color: '#BF9000'
          },
          list: ['写字楼', '七宝宝龙城', '宝龙艾美酒店']
        }
      ],
      radio: '2',
      input2: '',
      form: {
        region: ''
      },
      projcetList: [
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#20384A' },
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#20384A' },
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#20384A' },
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#20384A' },
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#20384A' },
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#1C4C7F' },
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#1C4C7F' },
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#1C4C7F' },
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#1C4C7F' },
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#1C4C7F' },
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#1C4C7F' },
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#48A0C3' },
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#48A0C3' },
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#6F120C' },
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#6F120C' },
        { title: 'XYZ项目 . 购物中心 . X平方 . XXX', color: '#6F120C' }
      ],
      innerData: [
        { value: 27, name: '11: 福州 O', itemStyle: { color: '#0F1F2B' }},
        { value: 25, name: '12: 七宝 O', itemStyle: { color: '#16406D' }},
        { value: 30, name: '13: 宝山 O', itemStyle: { color: '#0F1F2B' }},
        { value: 26, name: '', itemStyle: { color: '#16406D' }},
        { value: 28, name: '', itemStyle: { color: '#0F1F2B' }},
        { value: 22, name: '', itemStyle: { color: '#16406D' }},
        { value: 25, name: '', itemStyle: { color: '#0F1F2B' }},
        { value: 22, name: '', itemStyle: { color: '#16406D' }},
        { value: 25, name: '', itemStyle: { color: '#0F1F2B' }},
        { value: 20, name: '', itemStyle: { color: '#16406D' }},

        { value: 20, name: '', itemStyle: { color: '#16406D' }},
        { value: 20, name: '', itemStyle: { color: '#16406D' }},
        { value: 20, name: '', itemStyle: { color: '#16406D' }},
        { value: 18, name: '', itemStyle: { color: '#16406D' }},
        { value: 18, name: '', itemStyle: { color: '#16406D' }},
        { value: 18, name: '', itemStyle: { color: '#16406D' }},
        { value: 18, name: '', itemStyle: { color: '#16406D' }},
        { value: 12, name: '', itemStyle: { color: '#4BABD1' }},
        { value: 14, name: '', itemStyle: { color: '#16406D' }},
        { value: 12, name: '', itemStyle: { color: '#16406D' }},
        { value: 12, name: '', itemStyle: { color: '#16406D' }},
        { value: 12, name: '', itemStyle: { color: '#4BABD1' }},
        { value: 16, name: '', itemStyle: { color: '#16406D' }},
        { value: 12, name: '', itemStyle: { color: '#4BABD1' }},
        { value: 12, name: '', itemStyle: { color: '#4BABD1' }},
        { value: 16, name: '', itemStyle: { color: '#B1D8B7' }},
        { value: 16, name: '', itemStyle: { color: '#16406D' }},
        { value: 10, name: '', itemStyle: { color: '#4BABD1' }},
        { value: 10, name: '', itemStyle: { color: '#4BABD1' }},
        { value: 16, name: '', itemStyle: { color: '#16406D' }},
        { value: 16, name: '', itemStyle: { color: '#16406D' }},
        { value: 8, name: '', itemStyle: { color: '#790002' }},
        { value: 8, name: '', itemStyle: { color: '#790002' }},
        { value: 16, name: '', itemStyle: { color: '#16406D' }},
        { value: 8, name: '', itemStyle: { color: '#790002' }},
        { value: 8, name: '', itemStyle: { color: '#790002' }},
        { value: 16, name: '', itemStyle: { color: '#16406D' }},
        { value: 6, name: '', itemStyle: { color: '#C1D4E8' }},
        { value: 6, name: '', itemStyle: { color: '#C1D4E8' }},
        { value: 6, name: '', itemStyle: { color: '#C1D4E8' }}
      ],
      outerData: [
        {
          value: 30,
          name: '1: 福州 O',
          itemStyle: { color: '#004948' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 28,
          name: '2: 七宝 O',
          itemStyle: { color: '#004948' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 27,
          name: '3: 宝山 O',
          itemStyle: { color: '#004948' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 27,
          name: '',
          itemStyle: { color: '#004948' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 26,
          name: '',
          itemStyle: { color: '#004948' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 25,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 25,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 25,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 25,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 23,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 23,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 23,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 23,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 22,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 22,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 22,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 18,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 18,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 18,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 18,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 18,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 18,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 15,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 15,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 12,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 12,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 12,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 12,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 12,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 12,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 10,
          name: '',
          itemStyle: { color: '#6F120C' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 10,
          name: '',
          itemStyle: { color: '#6F120C' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 10,
          name: '',
          itemStyle: { color: '#6F120C' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 10,
          name: '',
          itemStyle: { color: '#6F120C' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 10,
          name: '',
          itemStyle: { color: '#6F120C' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 10,
          name: '',
          itemStyle: { color: '#6F120C' },
          label: { show: false },
          labelLine: { show: false }
        },
        { value: 7, name: '', itemStyle: { color: '#D5E2CD' }},
        { value: 7, name: '', itemStyle: { color: '#D5E2CD' }},
        { value: 7, name: '', itemStyle: { color: '#D5E2CD' }}
      ],
      outerData12: [
        {
          value: 30,
          name: '1: 福州 O',
          itemStyle: { color: '#004948' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 28,
          name: '2: 七宝 O',
          itemStyle: { color: '#004948' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 27,
          name: '3: 宝山 O',
          itemStyle: { color: '#004948' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 27,
          name: '',
          itemStyle: { color: '#004948' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 26,
          name: '',
          itemStyle: { color: '#004948' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 25,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 25,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 25,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 25,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 23,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 23,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 23,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 23,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 22,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 22,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 22,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 18,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 18,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 18,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 18,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 18,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 18,
          name: '',
          itemStyle: { color: '#485F47' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 15,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 15,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 12,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 12,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 12,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 12,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 12,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 12,
          name: '',
          itemStyle: { color: '#B2D8B8' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 10,
          name: '',
          itemStyle: { color: '#6F120C' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 10,
          name: '',
          itemStyle: { color: '#6F120C' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 10,
          name: '',
          itemStyle: { color: '#6F120C' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 10,
          name: '',
          itemStyle: { color: '#6F120C' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 10,
          name: '',
          itemStyle: { color: '#6F120C' },
          label: { show: false },
          labelLine: { show: false }
        },
        {
          value: 10,
          name: '',
          itemStyle: { color: '#6F120C' },
          label: { show: false },
          labelLine: { show: false }
        },
        { value: 7, name: '', itemStyle: { color: '#D5E2CD' }},
        { value: 7, name: '', itemStyle: { color: '#D5E2CD' }},
        { value: 7, name: '', itemStyle: { color: '#D5E2CD' }}
      ],
      option: {
        tooltip: {
          trigger: 'item',
          triggerOn: 'none',
          padding: 0,
          borderWidth: 0,
          backgroundColor: 'rgba(50,50,50,0)',
          extraCssText: 'box-shadow: 0 0 0px rgba(0, 0, 0, 0.3);',
          position: function(pos, params, dom, rect, size) {
            console.log('rect', rect)

            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            var obj = { top: 60 }
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
            return [rect.x + rect.width, rect.y]
          },
          formatter: function(params) {
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
        animation: false,
        series: [
          {
            name: '客流排名bg',
            type: 'pie',
            // selectedMode: 'multiple',
            center: ['48%', '50%'],
            radius: ['54%', '78%'],
            selectedOffset: 0,
            hoverAnimation: false,
            roseType: 'area',
            labelLine: {
              show: false,
              smooth: false,
              length: 10,
              length2: 10
            },
            label: {
              normal: {
                show: false,
                position: 'outside',
                height: 50,
                formatter: function(params) {
                  return `{c|当月${params.value}\/}{b|${params.percent}%}\n{a|${params.name}}`
                },
                rich: {
                  c: {
                    padding: [3, 0]
                  },
                  b: {
                    color: '#6F120C',
                    padding: [3, 0]
                  },
                  a: {
                    fontSize: 12,
                    color: '#FFFFFF',
                    fontFamily: 'Microsoft Yahei',
                    backgroundColor: '#20384A',
                    borderColor: '#20384A',
                    borderWidth: 1,
                    borderRadius: 13,
                    lineHeight: 16,
                    padding: [3, 12]
                  }
                }
              }
            },
            itemStyle: { borderWidth: 10, borderColor: '#E0E7E7' },
            z: 0,
            data: []
          },
          {
            name: '客流排名',
            tooltip: {
              show: false
            },
            type: 'pie',
            // selectedMode: 'multiple',
            center: ['48%', '50%'],
            radius: ['54%', '78%'],
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
            itemStyle: { borderWidth: 10, borderColor: '#E0E7E7' },
            data: [],
            z: 1
          },
          {
            name: '销售排名bg',
            type: 'pie',
            center: ['48%', '50%'],
            radius: ['30%', '50%'],
            selectedOffset: 10,
            roseType: 'area',
            labelLine: {
              show: false,
              height: 200,
              length: 60,
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
            itemStyle: { borderWidth: 5, borderColor: '#E0E7E7' },
            data: [],
            z: 2
          },
          {
            name: '销售排名',
            type: 'pie',
            center: ['48%', '50%'],
            radius: ['30%', '50%'],
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
            itemStyle: { borderWidth: 5, borderColor: '#E0E7E7' },
            data: [],
            z: 3
          }
        ]
      }
    }
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        if (this.myChart) {
          if (newVal) {
            this.myChart.setOption(newVal)
          } else {
            this.myChart.setOption(oldVal)
          }
        } else {
          this.init()
        }
      },
      deep: true // 对象内部属性的监听，关键。
    }
  },
  mounted() {
    this.option.series[0].data = this.outerData
    this.option.series[1].data = this.outerData12
    this.init()
  },
  methods: {
    init() {
      const self = this
      var myChart = echarts.init(
        document.getElementById('echarts-content'),
        null,
        { renderer: 'svg' }
      )

      myChart.setOption(self.option)
      myChart.on('click', 'series.pie.label', function(params) {
        console.log('click==', params)
        const optionsNew = JSON.parse(JSON.stringify(self.option))
        myChart.dispatchAction({
          type: 'hideTip'
        })
        // 非背景系列点击触发前面一层的label显示
        if (params.seriesIndex % 2) {
          if (
            !optionsNew.series[params.seriesIndex - 1].data[params.dataIndex]
              .label
          ) {
            optionsNew.series[params.seriesIndex - 1].data[
              params.dataIndex
            ].label = {}
            optionsNew.series[params.seriesIndex - 1].data[
              params.dataIndex
            ].labelLine = {}
          }
          optionsNew.series[params.seriesIndex - 1].data[
            params.dataIndex
          ].label.show = true
          optionsNew.series[params.seriesIndex - 1].data[
            params.dataIndex
          ].labelLine.show = true
          myChart.setOption(optionsNew)
          return
        }
        // label 点击位置
        if (
          params.event.target.style &&
          params.event.target.style.lineWidth != 1
        ) {
          var position = []
          if (params.event.target.transform) {
            position = [
              params.event.target.transform[4] +
                params.event.target._rect.width,
              params.event.target.transform[5] - 10
            ]
          } else {
            position = [0, 0]
          }
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: params.seriesIndex,
            // 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
            dataIndex: params.dataIndex,
            // 屏幕上的 x 坐标
            // x: number,
            // 屏幕上的 y 坐标
            // y: number,
            // 本次显示 tooltip 的位置。只在本次 action 中生效。
            // 缺省则使用 option 中定义的 tooltip 位置。
            position: position
          })
          return
          // alert('');
        }
        // const index = params.dataIndex
        if (params.data) {
          // alert('点击：' + params.data.name)
        }
      })
      this.mayChartRose = myChart
    },
    handleClickLeft(title, index) {
      this.positionTitleOuter = title
      this.isShowOuter = true
      this.$emit('handleChangeLeftRadio', index)
      this.option.series[0].data = this.outerData
      this.option.series[1].data = this.outerData12
      this.mayChartRose.dispatchAction({
        type: 'hideTip'
      })
    },
    handleClickRight(title, index) {
      this.positionTitleInner = title
      this.isShowInner = true
      this.option.series[2].data = this.innerData
      this.option.series[3].data = this.innerData
      this.$emit('handleChangeRightRadio', index)
      this.mayChartRose.dispatchAction({
        type: 'hideTip'
      })
    },
    removeProject(index) {
      this.projcetList.splice(index, 1)
      this.option.series[0].data.splice(index, 1)
      this.option.series[1].data.splice(index, 1)
    },
    handleClick(active, idx) {
      this.aroundList.forEach((ele, index) => {
        if ((idx === index && !active) || (idx === index && active)) {
          ele.active = true
          return
        }
        ele.active = false
      })
      this.$emit('handleSearch', idx)
    },
    handleRemove(index) {
      this.$emit('removeAround', index)
    },
    selectDateResult() {}
  }
}
</script>
<style>
.small-date-picker{
  width: 112px !important;
  height: 112px !important;
  border-radius:56px !important;
  padding-top: 18px !important;
}
</style>
<style lang="scss">
$font-title-size: 18px;
$font-word-color: #050101;
$font-base-size: 14px;
.ranking-dialog {
    padding: 16px;
    position: relative;
    background: #1c4c7f;
    color: #fff;
    font-size: 14px;
    border-radius: 12px;
    padding: 10px;
    margin-left: 10px;
    opacity: 0.9;
    .title {
        font-size: $font-base-size;
        margin-bottom: 8px;
    }
    .info {
        font-size: 12px;
    }
    .link {
        font-size: 12px;
        color: #73d4f5;
        margin-top: 8px;
        cursor: pointer;
    }
}
.ranking-dialog::after {
    background: #1c4c7f;
    color: #fff;
    position: absolute;
    display: block;
    content: "";
    width: 10px;
    height: 1px;
    left: -10px;
    top: 10px;
}
</style>
<style lang="scss" scoped>
$font-title-size: 18px;
$font-word-color: #050101;
$font-base-size: 14px;
$pipe-inner-color:#16406D;
.ranking-container {
  height: 100%;
  position: relative;
  .ranking-row {
    height: 100%;
    .ranking-left-col,
    .ranking-right-col {
      height: 100%;
    }
  }
  .ranking-echarts-around {
    // width: 600px;
    position: relative;
    .date-box {
      position: absolute;
      width: 112px;
      height: 112px;
      border-radius: 56px;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      margin-left: -64px;
      background: #fff;
      z-index: 2;
      box-shadow: 0 3px 0 #000;
    }
    .echarts-line-container {
      position: relative;
      // width: 500px;
      margin-top: -30px;
      margin-left: -30px;
      .g-line {
       width: 2px;
       height: 182px;
       border-left: 2px dashed #485f47;
       position: absolute;
       top: 280px;
       left: 430px;
       transform: rotate(-28deg);
      }
      .b-line {
        width: 2px;
        height: 93px;
        border-left: 2px dashed #485F47;
        position: absolute;
        top: 192px;
        left: 399px;
        transform: rotate(-57deg)
      }
      .flow-container {
        width: 106px;
        height: 20px;
        position: absolute;
        left: 5px;
        bottom: -27px;
        transform: rotate(57deg);
        color: #16406D;
        text-align: center;
        .flow-title {
          font-size: $font-title-size;
          padding-bottom: 4px;
          border-bottom: 2px solid #16406D;
        }
        .flow-info {
          font-size: 12px;
          margin-top: 4px;
        }
        .flow-circle {
          width: 8px;
          height: 8px;
          background-color: #16406D;
          border-radius: 50%;
          position: absolute;
          top: 21px;
          left: -8px;
        }
      }
      .sale-flow-container {
        color: #485f47;
        .flow-title {
          border-color: #485f47;
        }
        .flow-circle {
          background: #485f47;
        }
      }
      .passenger-flow-container {
        transform: rotate(57deg);
        bottom: -53px;
        left: -11px;
      }
    }
    #echarts-content {
      width: 550px;
      height: 450px;
      margin-left: -50px;
      margin-top: -50px;
    }
    .around-map {
      position: absolute;
      right: 0px;
      top:30px;
      width: 128px;
      z-index: 2;
      .around-map-title {
        .title-left {
          font-size: 16px;
          padding-bottom: 8px;
          color: $font-word-color;
          border-bottom: 2px solid $font-word-color;
        }
        .title-right {
          height: 30px;
          padding-bottom: 6px;
          border-bottom: 1px solid #d1cec9;
          text-align: center;
        }
      }
      .map-list-content {
        padding-top: 14px;
        white-space: nowrap;
      }
      .around-map-list {
        height: 200px;
        .radio-content {
          padding-top: 2px;
          .icon {
            font-size: 24px;
            cursor: pointer;
          }
        }
        .map-list-title {
          min-width: 7px;
          padding: 0 4px;
          line-height: 26px;
          font-size: $font-base-size;
          color: $font-word-color;
          border-radius: 12px;
          overflow: hidden;

          &.active {
            background: #e5e2de;
          }
        }
        .around-title {
          width: 70px;
          cursor: pointer;
          float: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .around-remove {
          float: right;
          i {
            color: #6f120c;
            cursor: pointer;
          }
        }
      }
    }

    .pie-item-text{
        position: absolute;
        left: 440px;
        top: 240px;
        .line{
          position: absolute;
          width: 100px;
          display: block;
          transform: translate(-100%,0) rotate(45deg);
          transform-origin:right bottom ;
          border-bottom: 2px dashed #485F47;
          top: 22px;
          left: -2px
        }
       .name{
         position: relative;
         color: #485F47;
         font-size: 18px;
         height: 30px;
         line-height: 30px;
         padding-left: 10px;
         border-bottom: 2px solid #485F47;
         font-weight: normal;
         &:after{
           position: absolute;
           bottom: -3px;
           left: 0;
           content: "";
           width: 6px;
           height: 6px;
           border-radius: 50%;
           background: #485F47;
         }
       }
       .value{
         height: 24px;
         line-height: 24px;
         padding-left: 10px;
         color: #485F47;
         font-size: 12px;
       }
        &.pie-inner{
          top: 300px;
          .line{
            width: 158px;
            border-color: $pipe-inner-color;
            transform: translate(-100%, 0) rotate(35deg);
          }
          .name{
            color: $pipe-inner-color;
            border-color: $pipe-inner-color;
            &:after{
              background: $pipe-inner-color;
            }
          }
          .value{
            color: $pipe-inner-color;
          }
        }
    }
  }
}
</style>
