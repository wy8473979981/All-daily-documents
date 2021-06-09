<template>
  <div class="branddetails">
    <div class="left">
      <div class="rightxian" />

      <div
        v-for="(e, i) in tabList"
        :key="i"
        :class="tabFlag == i ? 'every active' : 'every'"
        @click="goEvery(i)"
      >
        <span>{{ e }}</span>
      </div>
    </div>
    <div ref="floor_con" class="right">
      <div class="top">
        <button class="submit">保存</button>
        <button class="submit cancel">取消</button>
      </div>
      <el-tabs id="infor" v-model="activeName" class="tabs">
        <el-tab-pane label="基本信息" name="first">
          <div class="up" @click="inforShow = !inforShow">
            <span>{{ inforShow ? "收起" : "展开" }}</span>
            <i
              :class="inforShow ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
            />
          </div>
          <transition name="el-zoom-in-top">
            <el-form v-if="inforShow" class="colum">
              <div class="df">
                <div class="form">
                  <el-form-item label="适用项目" required class="deleft">
                    <el-select v-model="inforone" placeholder="请选择适用项目">
                      <el-option
                        v-for="item in xiangmuList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="方案状态" required class="deleft">
                    <el-select v-model="infortwo" placeholder="请选择适用项目">
                      <el-option
                        v-for="item in statueList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form">
                  <el-form-item label="方案名称" required class="deleft">
                    <el-input
                      v-model="inforthree"
                      placeholder="请输入方案名称"
                    />
                  </el-form-item>
                  <el-form-item label="台账推送方式" required class="deleft">
                    <el-select
                      v-model="inforfour"
                      placeholder="请选择台账推送方式"
                    >
                      <el-option
                        v-for="item in pushtypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form">
                  <el-form-item label="铺位类型" required class="deleft">
                    <el-select v-model="inforfive" placeholder="请选择铺位类型">
                      <el-option
                        v-for="item in puweitypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form">
                  <el-form-item label="合同名称">
                    <el-select v-model="inforsix" placeholder="请选择合同名称">
                      <el-option
                        v-for="item in hetongList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </transition>
        </el-tab-pane>
      </el-tabs>

      <el-tabs id="hetongMust" v-model="activeName" class="tabstwo tabs">
        <el-tab-pane label="合同必填字段初始默认值" name="first">
          <div class="up" @click="hetongMustShow = !hetongMustShow">
            <span>{{ hetongMustShow ? "收起" : "展开" }}</span>
            <i
              :class="
                hetongMustShow ? 'el-icon-caret-bottom' : 'el-icon-caret-top'
              "
            />
          </div>
          <transition name="el-zoom-in-top">
            <el-form v-if="hetongMustShow" class="colum">
              <div class="df">
                <div class="form">
                  <el-form-item label="计税类型" required class="deleft">
                    <el-select
                      v-model="hetongMustOne"
                      placeholder="请选择计税类型"
                    >
                      <el-option
                        v-for="item in jishuiList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="计租面积" required class="deleft">
                    <el-select
                      v-model="hetongMustTwo"
                      placeholder="请选择计租面积"
                    >
                      <el-option
                        v-for="item in jizuList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form">
                  <el-form-item label="收银类型" required class="deleft">
                    <el-select
                      v-model="hetongMustThree"
                      placeholder="请选择收银类型"
                    >
                      <el-option
                        v-for="item in shouyinList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form">
                  <el-form-item label="合同属性" required class="deleft">
                    <el-select
                      v-model="hetongMustFour"
                      placeholder="请选择合同属性"
                    >
                      <el-option
                        v-for="item in hetongtypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form">
                  <el-form-item label="合同签署" required class="deleft">
                    <el-select
                      v-model="hetongMustFive"
                      placeholder="请选择合同签署"
                    >
                      <el-option
                        v-for="item in qianshuList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </transition>
        </el-tab-pane>
      </el-tabs>

      <el-tabs id="hetongLuoji" v-model="activeName" class="tabstwo tabs">
        <el-tab-pane label="合同页面逻辑配置" name="first">
          <div class="up" @click="hetongLuojiShow = !hetongLuojiShow">
            <span>{{ hetongLuojiShow ? "收起" : "展开" }}</span>
            <i
              :class="
                hetongLuojiShow ? 'el-icon-caret-bottom' : 'el-icon-caret-top'
              "
            />
          </div>
          <transition name="el-zoom-in-top">
            <el-form v-if="hetongLuojiShow" class="colum">
              <div class="df">
                <div class="form">
                  <el-form-item label="铺位强控" required class="deleft">
                    <el-select
                      v-model="hetongLuojiOne"
                      placeholder="请选择铺位强控"
                    >
                      <el-option
                        v-for="item in puweiList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="应收允许早于合同"
                    required
                    class="deleft"
                  >
                    <el-select
                      v-model="hetongLuojiTwo"
                      placeholder="请选择应收允许早于合同"
                    >
                      <el-option
                        v-for="item in earlyhtList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form">
                  <el-form-item label="一铺一价表" required class="deleft">
                    <el-select
                      v-model="hetongLuojiThree"
                      placeholder="请选择一铺一价表"
                    >
                      <el-option
                        v-for="item in onepuList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="显示方式" required class="deleft">
                    <el-select
                      v-model="hetongLuojiFour"
                      placeholder="请选择显示方式"
                    >
                      <el-option
                        v-for="item in showtypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form">
                  <el-form-item label="尾差计算公式">
                    <el-select
                      v-model="hetongLuojiFive"
                      placeholder="请选择尾差计算公式"
                    >
                      <el-option
                        v-for="item in weichaList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="是否启用首账期" required class="deleft">
                    <el-select
                      v-model="hetongLuojiSix"
                      placeholder="请选择是否启用首账期"
                    >
                      <el-option
                        v-for="item in isOnList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form">
                  <el-form-item label="免租期计算方式" required class="deleft">
                    <el-select
                      v-model="hetongLuojiSeven"
                      placeholder="请选择合同签署"
                    >
                      <el-option
                        v-for="item in mianjisuanList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </transition>
        </el-tab-pane>
      </el-tabs>

      <el-tabs id="hetongziduan" v-model="activeName" class="tabstwo tabs">
        <el-tab-pane label="合同字段配置" name="first">
          <div class="up" @click="hetongDataShow = !hetongDataShow">
            <span>{{ hetongDataShow ? "收起" : "展开" }}</span>
            <i
              :class="
                hetongDataShow ? 'el-icon-caret-bottom' : 'el-icon-caret-top'
              "
            />
          </div>
          <transition name="el-zoom-in-top">
            <el-form v-if="hetongDataShow" class="colum">
              <div class="df">
                <div class="form">
                  <el-form-item
                    label="是否显示装修进场日"
                    required
                    class="deleft"
                  >
                    <el-select
                      v-model="hetongDataOne"
                      placeholder="请选择是否显示装修进场日"
                    >
                      <el-option
                        v-for="item in trueFalseList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="是否显示合同总金额"
                    required
                    class="deleft"
                  >
                    <el-select
                      v-model="hetongDataTwo"
                      placeholder="请选择是否显示合同总金额"
                    >
                      <el-option
                        v-for="item in trueFalseList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form">
                  <el-form-item
                    label="是否显示装修结束日"
                    required
                    class="deleft"
                  >
                    <el-select
                      v-model="hetongDataThree"
                      placeholder="请选择是否显示装修结束日"
                    >
                      <el-option
                        v-for="item in trueFalseList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="是否显示品牌名">
                    <el-select
                      v-model="hetongDataFour"
                      placeholder="请选择是否显示品牌名"
                    >
                      <el-option
                        v-for="item in trueFalseList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form">
                  <el-form-item label="是否显示装修期">
                    <el-select
                      v-model="hetongDataFive"
                      placeholder="请选择是否显示装修期"
                    >
                      <el-option
                        v-for="item in trueFalseList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form">
                  <el-form-item label="是否显示开业日" required class="deleft">
                    <el-select
                      v-model="hetongDataSix"
                      placeholder="请选择是否显示开业日"
                    >
                      <el-option
                        v-for="item in trueFalseList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </transition>
        </el-tab-pane>
      </el-tabs>

      <el-tabs id="conField" v-model="activeName" class="tabs">
        <el-tab-pane label="功能扩展" name="first">
          <div class="up" @click="conField = !conField">
            <span style="color: #1c4c7f">配置字段</span>
          </div>
        </el-tab-pane>
      </el-tabs>

      <el-tabs id="calc" v-model="activeName" class="tabs">
        <el-tab-pane label="计算方式" name="first">
          <div class="up" @click="calcShow = !calcShow">
            <span>{{ calcShow ? "收起" : "展开" }}</span>
            <i
              :class="calcShow ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
            />
          </div>
          <transition name="el-zoom-in-top">
            <div v-if="calcShow">
              <el-form class="colum">
                <div class="df">
                  <div class="form">
                    <el-form-item>
                      <div slot="label" class="formLabel">
                        <span style="color: red; margin-right: 6px">*</span>
                        <span>固定月天数</span>
                        <img
                          style="margin: 0 0 -4px 4px"
                          src="@/assets/detail/de.png"
                          alt=""
                        />
                        <div v-if="popoverFirst" class="popover">
                          替换计算公式内相关数值
                        </div>
                      </div>
                      <el-input
                        v-model="inforthree"
                        placeholder="请输入固定月天数"
                      />
                    </el-form-item>
                  </div>
                  <div class="form">
                    <el-form-item>
                      <div slot="label" class="formLabel">
                        <span style="color: red; margin-right: 6px">*</span>
                        <span>固定年天数</span>
                        <img
                          style="margin: 0 0 -4px 4px"
                          src="@/assets/detail/de.png"
                          alt=""
                        />
                        <div v-if="popoverFirst" class="popover">
                          替换计算公式内相关数值
                        </div>
                      </div>
                      <el-input
                        v-model="inforthree"
                        placeholder="请输入固定年天数"
                      />
                    </el-form-item>
                  </div>
                </div>
              </el-form>
              <div v-if="calcShow" class="Mtable">
                <el-table
                  :data="calcTableData"
                  style="width: 100%"
                  :header-cell-style="rowClass"
                >
                  <el-table-column
                    prop="num"
                    label="通过单价去计算整月或整月的应收"
                    width="240"
                  />
                  <el-table-column
                    prop="one"
                    label="日单价(申请租金)"
                    width="150"
                  >
                    <div slot-scope="scope">
                      <div v-if="scope.row.one">
                        <span>{{ scope.row.one }}</span>
                      </div>
                      <div v-else>
                        <el-select v-model="ridanmoney" placeholder="请选择">
                          <el-option
                            v-for="item in ridanmoneyList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          />
                        </el-select>
                      </div>
                    </div>
                  </el-table-column>
                  <el-table-column
                    prop="two"
                    label="月单价(申请租金)"
                    width="150"
                  >
                    <div slot-scope="scope">
                      <div v-if="scope.row.two">
                        <span>{{ scope.row.two }}</span>
                      </div>
                      <div v-else>
                        <el-select v-model="ridanmoney" placeholder="请选择">
                          <el-option
                            v-for="item in ridanmoneyList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          />
                        </el-select>
                      </div>
                    </div>
                  </el-table-column>
                  <el-table-column
                    prop="three"
                    label="月总额（申请租金）"
                    width="150"
                  >
                    <div slot-scope="scope">
                      <div v-if="scope.row.three">
                        <span>{{ scope.row.three }}</span>
                      </div>
                      <div v-else>
                        <el-select v-model="ridanmoney" placeholder="请选择">
                          <el-option
                            v-for="item in ridanmoneyList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          />
                        </el-select>
                      </div>
                    </div>
                  </el-table-column>
                  <el-table-column
                    prop="four"
                    label="年单价(申请租金)"
                    width="150"
                  />
                  <el-table-column
                    prop="five"
                    label="年总额(申请租金)"
                    width="150"
                  />
                </el-table>
              </div>
            </div>
          </transition>
        </el-tab-pane>
      </el-tabs>

      <el-tabs id="money" v-model="activeName" class="tabs">
        <el-tab-pane label="费项定制" name="first">
          <div class="up" @click="moneyShow = !moneyShow">
            <span>{{ moneyShow ? "收起" : "展开" }}</span>
            <i
              :class="moneyShow ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
            />
          </div>
          <transition name="el-zoom-in-top">
            <div v-if="moneyShow" class="Mtable">
              <div class="moneybtn">
                <button @click="addmoney">新增</button>
              </div>
              <el-table
                :data="moneyTableData"
                style="width: 100%; font-size: 10px"
                @sort-change="sort_change"
                :header-cell-style="rowClass1"
              >
                <el-table-column
                  type="index"
                  :index="indexMethod"
                  label="序号"
                  width="60"
                />
                <el-table-column prop="one" sortable label="费项名称">
                  <template slot="header">
                    <span>费项名称</span>
                    <img
                      v-if="lists.one == 'ascending'"
                      src="@/assets/imges/17.png"
                      width="20"
                      alt="" />
                    <img
                      v-else-if="lists.one == 'descending'"
                      src="@/assets/imges/19.png"
                      width="20"
                      alt="" />
                    <img
                      v-else
                      src="@/assets/imges/16pt／排序@2x.png"
                      width="20"
                      alt=""
                  /></template>
                </el-table-column>
                <el-table-column prop="two" sortable label="费项性质">
                  <template slot="header">
                    <span>费项性质</span>
                    <img
                      v-if="lists.two == 'ascending'"
                      src="@/assets/imges/17.png"
                      width="20"
                      alt="" />
                    <img
                      v-else-if="lists.two == 'descending'"
                      src="@/assets/imges/19.png"
                      width="20"
                      alt="" />
                    <img
                      v-else
                      src="@/assets/imges/16pt／排序@2x.png"
                      width="20"
                      alt=""
                  /></template>
                </el-table-column>
                <el-table-column prop="three" sortable label="费项类型">
                  <template slot="header">
                    <span>费项类型</span>
                    <img
                      v-if="lists.three == 'ascending'"
                      src="@/assets/imges/17.png"
                      width="20"
                      alt="" />
                    <img
                      v-else-if="lists.three == 'descending'"
                      src="@/assets/imges/19.png"
                      width="20"
                      alt="" />
                    <img
                      v-else
                      src="@/assets/imges/16pt／排序@2x.png"
                      width="20"
                      alt=""
                  /></template>
                </el-table-column>
                <el-table-column prop="four" sortable label="是否免租">
                  <template slot="header">
                    <span>是否免租</span>
                    <img
                      v-if="lists.four == 'ascending'"
                      src="@/assets/imges/17.png"
                      width="20"
                      alt="" />
                    <img
                      v-else-if="lists.four == 'descending'"
                      src="@/assets/imges/19.png"
                      width="20"
                      alt="" />
                    <img
                      v-else
                      src="@/assets/imges/16pt／排序@2x.png"
                      width="20"
                      alt=""
                  /></template>
                </el-table-column>
                <el-table-column prop="five" sortable label="是否必收">
                  <template slot="header">
                    <span>是否必收</span>
                    <img
                      v-if="lists.five == 'ascending'"
                      src="@/assets/imges/17.png"
                      width="20"
                      alt="" />
                    <img
                      v-else-if="lists.five == 'descending'"
                      src="@/assets/imges/19.png"
                      width="20"
                      alt="" />
                    <img
                      v-else
                      src="@/assets/imges/16pt／排序@2x.png"
                      width="20"
                      alt=""
                  /></template>
                </el-table-column>
                <el-table-column prop="six" sortable label="费项状态">
                  <template slot="header">
                    <span>费项状态</span>
                    <img
                      v-if="lists.six == 'ascending'"
                      src="@/assets/imges/17.png"
                      width="20"
                      alt="" />
                    <img
                      v-else-if="lists.six == 'descending'"
                      src="@/assets/imges/19.png"
                      width="20"
                      alt="" />
                    <img
                      v-else
                      src="@/assets/imges/16pt／排序@2x.png"
                      width="20"
                      alt=""
                  /></template>
                </el-table-column>
                <el-table-column label="操作">
                  <div slot-scope="scope">
                    <span
                      style="color: #1c4c7f; cursor: pointer"
                      @click="moneyDel(scope)"
                      >删除</span
                    >
                  </div>
                </el-table-column>
              </el-table>
            </div>
          </transition>
        </el-tab-pane>
      </el-tabs>

      <el-tabs id="one" v-model="activeName" class="tabs">
        <el-tab-pane label="一铺一价配置" name="first">
          <div class="up" @click="oneShow = !oneShow">
            <span>{{ oneShow ? "收起" : "展开" }}</span>
            <i
              :class="oneShow ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
            />
          </div>
          <transition name="el-zoom-in-top">
            <div v-if="oneShow" class="Mtable">
              <div class="moneybtn">
                <button @click="oneDialogVisible = true">新增</button>
              </div>
              <el-table
                :data="oneTableData"
                style="width: 100%; font-size: 10px"
                @sort-change="sort_change"
                 :header-cell-style="rowClass"
              >
                <el-table-column
                  type="index"
                  :index="indexMethod"
                  label="序号"
                  width="60"
                />
                <el-table-column prop="one" sortable label="费项">
                  <template slot="header">
                    <span>费项名称</span>
                    <img
                      v-if="lists.one == 'ascending'"
                      src="@/assets/imges/17.png"
                      width="20"
                      alt="" />
                    <img
                      v-else-if="lists.one == 'descending'"
                      src="@/assets/imges/19.png"
                      width="20"
                      alt="" />
                    <img
                      v-else
                      src="@/assets/imges/16pt／排序@2x.png"
                      width="20"
                      alt=""
                  /></template>
                </el-table-column>
                <el-table-column prop="two" sortable label="一铺一价类型">
                  <template slot="header">
                    <span>费项名称</span>
                    <img
                      v-if="lists.two == 'ascending'"
                      src="@/assets/imges/17.png"
                      width="20"
                      alt="" />
                    <img
                      v-else-if="lists.two == 'descending'"
                      src="@/assets/imges/19.png"
                      width="20"
                      alt="" />
                    <img
                      v-else
                      src="@/assets/imges/16pt／排序@2x.png"
                      width="20"
                      alt=""
                  /></template>
                </el-table-column>
                <el-table-column prop="three" sortable label="跨年计算">
                  <template slot="header">
                    <span>费项名称</span>
                    <img
                      v-if="lists.three == 'ascending'"
                      src="@/assets/imges/17.png"
                      width="20"
                      alt="" />
                    <img
                      v-else-if="lists.three == 'descending'"
                      src="@/assets/imges/19.png"
                      width="20"
                      alt="" />
                    <img
                      v-else
                      src="@/assets/imges/16pt／排序@2x.png"
                      width="20"
                      alt=""
                  /></template>
                </el-table-column>
                <el-table-column prop="four" sortable label="状态">
                  <template slot="header">
                    <span>费项名称</span>
                    <img
                      v-if="lists.four == 'ascending'"
                      src="@/assets/imges/17.png"
                      width="20"
                      alt="" />
                    <img
                      v-else-if="lists.four == 'descending'"
                      src="@/assets/imges/19.png"
                      width="20"
                      alt="" />
                    <img
                      v-else
                      src="@/assets/imges/16pt／排序@2x.png"
                      width="20"
                      alt=""
                  /></template>
                </el-table-column>
                <el-table-column label="操作">
                  <div slot-scope="scope">
                    <span
                      style="color: #1c4c7f; cursor: pointer"
                      @click="oneDel(scope)"
                      >删除</span
                    >
                  </div>
                </el-table-column>
              </el-table>
            </div>
          </transition>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 弹窗 -->

    <div class="dialogd">
      <el-dialog
        title="配置字段"
        :visible.sync="conField"
        width="720px"
        :before-close="handleCloseConField"
      >
        <el-divider />
        <div>
          字段
          <div class="kuang">
            <el-input v-model="ziduan" />
          </div>
          <br />
          <br />
          逻辑
          <div class="kuang">
            <el-input v-model="luoji" />
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="conField = false">取消</el-button>
          <el-button type="primary" @click="conField = false">确定</el-button>
        </span>
      </el-dialog>
    </div>

    <moneyDialog
      :title="moneyTitle"
      :dialog-visible.sync="moneyDialogVisible"
    />
    <oneDialog :title="oneTitle" :dialog-visible.sync="oneDialogVisible" />
  </div>
</template>
<script>
import moneyDialog from "./components/moneyDialog.vue";
import oneDialog from "./components/oneDialog.vue";
export default {
  name: "BudgetaApproval",
  components: {
    moneyDialog,
    oneDialog,
  },
  data() {
    return {
      activeName: "first",
      tabFlag: 0,
      tabList: [
        "基础信息",
        "合同必填字段初始默认值",
        "合同页面逻辑配置",
        "合同字段配置",
        "合同字段配置",
        "计算方式",
        "一铺一价配置",
      ],
      lists: {},
      inforShow: true,
      hetongMustShow: true,
      hetongLuojiShow: true,
      hetongDataShow: true,
      calcShow: true,
      moneyShow: true,
      oneShow: true,
      popoverFirst: false,

      conField: false,
      moneyDialogVisible: false,
      moneyTitle: "新增费项",
      oneDialogVisible: false,
      oneTitle: "新增一铺一价配置",

      xiangmuList: [
        { id: 1, name: "项目一" },
        { id: 2, name: "项目二" },
        { id: 3, name: "项目三" },
      ],
      statueList: [
        { id: 1, name: "正常" },
        { id: 2, name: "异常" },
      ],
      pushtypeList: [
        { id: 1, name: "手动推送" },
        { id: 2, name: "自动推送" },
      ],
      puweitypeList: [
        { id: 1, name: "类型1" },
        { id: 2, name: "类型2" },
      ],
      hetongList: [
        { id: 1, name: "名称1" },
        { id: 2, name: "名称2" },
      ],

      jishuiList: [
        { id: 1, name: "含税" },
        { id: 2, name: "不含税" },
      ],
      shouyinList: [
        { id: 1, name: "统收" },
        { id: 2, name: "分收" },
      ],
      jizuList: [
        { id: 1, name: "建筑面积" },
        { id: 2, name: "非建筑面积" },
      ],
      hetongtypeList: [
        { id: 1, name: "对内" },
        { id: 2, name: "对外" },
      ],
      qianshuList: [
        { id: 1, name: "俩方" },
        { id: 2, name: "单方" },
      ],
      puweiList: [
        { id: 1, name: "允许招商合同期重叠" },
        { id: 2, name: "不允许招商合同期重叠" },
      ],
      earlyhtList: [
        { id: 1, name: "是" },
        { id: 2, name: "否" },
      ],
      onepuList: [
        { id: 1, name: "显示" },
        { id: 2, name: "隐藏" },
      ],
      showtypeList: [
        { id: 1, name: "招商合同一项协议都显示" },
        { id: 2, name: "招商合同一项协议都不显示" },
      ],
      weichaList: [
        { id: 1, name: "一" },
        { id: 2, name: "二" },
      ],
      isOnList: [
        { id: 1, name: "启用" },
        { id: 2, name: "停用" },
      ],
      mianjisuanList: [
        { id: 1, name: "方式一" },
        { id: 2, name: "方式二" },
      ],
      trueFalseList: [
        { id: 1, name: "是" },
        { id: 2, name: "否" },
      ],

      // 费项定制
      moneyTableData: [
        {
          num: 1001,
          one: "固定租金",
          two: "周期性",
          three: "租金",
          four: "是",
          five: "是",
          six: "正常",
        },
        {
          num: 1002,
          one: "建筑垃圾清理费",
          two: "一次性",
          three: "垃圾清理",
          four: "是",
          five: "是",
          six: "正常",
        },
      ],
      // 一铺一价配置
      oneTableData: [
        {
          num: 1,
          one: "租金",
          two: "月总额，租期总额",
          three: "开始年",
          four: "正常",
        },
        {
          num: 2,
          one: "垃圾清理",
          two: "月总额，租期总额",
          three: "结束年",
          four: "正常",
        },
      ],
      // 一铺一价配置
      calcTableData: [
        {
          num: "整月应收",
          one: "",
          two: "申请租金*租赁面积",
          three: "申请租金",
          four: "申请租金*租赁面积/12",
          five: "申请租金*租赁面积/12",
        },
        {
          num: "非整月应收",
          one: "申请租金*租赁面积*实际天数",
          two: "",
          three: "",
          four: "申请租金*租赁面积/固定年天数*实际发生天数",
          five: "申请租金/固定年天数*实际发生天数",
        },
      ],
      ridanmoney: "",
      ridanmoneyList: [],
      // 基本信息竖着来
      inforone: "",
      infortwo: 1,
      inforthree: "",
      inforfour: 1,
      inforfive: "",
      inforsix: "",

      // 合同必填字段初始默认值
      hetongMustOne: 1,
      hetongMustTwo: 1,
      hetongMustThree: 1,
      hetongMustFour: 1,
      hetongMustFive: 1,

      // 合同页面逻辑配置
      hetongLuojiOne: 1,
      hetongLuojiTwo: 1,
      hetongLuojiThree: 1,
      hetongLuojiFour: 1,
      hetongLuojiFive: "",
      hetongLuojiSix: 1,
      hetongLuojiSeven: "",

      // 合同字段配置
      hetongDataOne: 1,
      hetongDataTwo: 1,
      hetongDataThree: 1,
      hetongDataFour: "",
      hetongDataFive: 1,
      hetongDataSix: 1,

      // 配置字段弹窗
      ziduan: "",
      luoji: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    rowClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 5) {
        return "border-bottom-right-radius: 20px;border-top-right-radius: 20px;";
      }
    },
    rowClass1({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 7) {
        return "border-bottom-right-radius: 20px;border-top-right-radius: 20px;";
      }
    },
    // 排序
    sort() {
      this.tableData = this.tableData.reverse();
    },
    // 隐藏
    showoff() {
      this.popoverFirst = !this.popoverFirst;
    },

    // 关闭
    handleCloseConField() {
      this.conField = false;
    },

    // 删除
    moneyDel(e) {
      this.moneyTableData.splice(e.$index, 1);
    },

    // 删除
    oneDel(e) {
      this.oneTableData.splice(e.$index, 1);
    },

    // 描点定位
    goEvery(i) {
      this.tabFlag = i;
      switch (i) {
        case 0:
          document.querySelector("#infor").scrollIntoView(true);
          break;
        case 1:
          document.querySelector("#hetongMust").scrollIntoView(true);
          break;
        case 2:
          document.querySelector("#hetongLuoji").scrollIntoView(true);
          break;
        case 3:
          document.querySelector("#hetongziduan").scrollIntoView(true);
          break;
        case 4:
          document.querySelector("#conField").scrollIntoView(true);
          break;
        case 5:
          document.querySelector("#calc").scrollIntoView(true);
          break;
        case 6:
          document.querySelector("#money").scrollIntoView(true);
          break;
        case 7:
          document.querySelector("#one").scrollIntoView(true);
          break;
        default:
          break;
      }
    },

    // 新增
    addmoney() {
      this.moneyDialogVisible = true;
    },
    sort_change(column, prop, order) {
      this.lists = {};
      const rops1 = column.prop;
      this.lists[rops1] = column.order;
      console.log(this.lists);
      console.log(column, "---", prop, order);
    },
    indexMethod(index) {
      return index + 1;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
