<template>
  <!-- 礼品领用申请单 -->
  <div :class="['public-box', { disabled: form.bizEntityJson.disabled }]">
    <el-row :gutter="24" class="top-row">
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <div class="d-red" 
            :class="{ novalue: form.bizEntityJson.positionLevel5 != 'true', required: !form.bizEntityJson.disabled}">
            <d-radio-group v-model="form.bizEntityJson" 
            :nameList="[{ label: '董事局主席', name: 'positionLevel5' }]"/>
          </div>
        </div>
      </el-col>

      <el-col :span="12" class="right">
        <div class="d-min">
          <span>日期</span>
          <el-date-picker 
            v-model="form.bizEntityJson.applyDate"
            :class="{ novalue: !form.bizEntityJson.applyDate,required: !form.bizEntityJson.disabled}"
            value-format="yyyy-MM-dd"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
            :disabled="form.bizEntityJson.disabled"/>
        </div>
      </el-col>

      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>申请人</span>
          <el-input v-model="form.bizEntityJson.applyerName"
            :class="{ novalue: !form.bizEntityJson.applyerName, required: !form.bizEntityJson.disabled}"
            readonly
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
            @focus="showSearchUser = true"></el-input>
        </div>
      </el-col>

      <el-col :span="12" class="right">
        <div class="d-min">
          <span>费用承担部门</span>
          <el-input v-model="form.bizEntityJson.fullPath"
            :class="{novalue: !form.bizEntityJson.fullPath, required: !form.bizEntityJson.disabled}"
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
            readonly
            clearable
            @focus="showSearchOrg = true"></el-input>
        </div>
      </el-col>

      <el-col :span="12" v-if="!form.bizEntityJson.disabled" class="right-col">
        <div class="explain-p">
          <p class="explain-p-one"><span class="explain-btn-add" @click="queryBudget">查询实时预算</span></p>
        </div>
      </el-col>

      <el-col :span="12" class="right">
        <div class="d-min">
          <span>包干比例</span>
          <el-input v-model="form.bizEntityJson.ratio" readonly></el-input>
        </div>
      </el-col>

      <el-col :span="12" class="right-col">
        <div class="d-min"></div>
      </el-col>

      <!--单选 决策层 地产总部 事业部 城市公司 商业 酒店集团 集团 文化 配套公司 ；点商业 显示商业类型-->
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>领用单位</span>
          <div class="d-red" :class="{
            novalue:
              form.bizEntityJson.decision != 'true' &&
              form.bizEntityJson.realEstate != 'true' &&
              form.bizEntityJson.businessDepartment1 != 'true' &&
              form.bizEntityJson.itemCompany != 'true' &&
              form.bizEntityJson.business != 'true' &&
              form.bizEntityJson.hotel != 'true' &&
              form.bizEntityJson.groupHeadquarters != 'true' &&
              form.bizEntityJson.culture != 'true' &&
              form.bizEntityJson.designYard != 'true',
            required: !form.bizEntityJson.disabled
            }">
            <d-radio-group v-model="form.bizEntityJson"
              :nameList="[
                { label: '决策层', name: 'decision' },
                { label: '地产总部', name: 'realEstate' },
                { label: '事业部', name: 'businessDepartment1' },
                { label: '城市公司', name: 'itemCompany' },
                { label: '商业', name: 'business' },
                { label: '酒店集团', name: 'hotel' },
                { label: '集团', name: 'groupHeadquarters' },
                { label: '文化', name: 'culture' },
                { label: '配套公司', name: 'designYard' },
              ]"
              @change="changePlateType('lydw')"
            />
          </div>
        </div>
      </el-col>

      <!--单选 商业集团 区域公司 商业公司 -->
      <el-col :span="24" class="right-col" v-if="form.bizEntityJson.business == 'true'">
        <div class="d-min">
          <span>商业类型</span>
          <div class="d-red" 
          :class="{
            novalue:
              form.bizEntityJson.newBusinessType1 != 'true' &&
              form.bizEntityJson.newBusinessType2 != 'true' &&
              form.bizEntityJson.newBusinessType3 != 'true',
            required: !form.bizEntityJson.disabled}">
            <d-radio-group v-model="form.bizEntityJson"
            :nameList="[
              { label: '商业集团', name: 'newBusinessType1' },
              { label: '区域公司', name: 'newBusinessType2' },
              { label: '商业公司', name: 'newBusinessType3' },
            ]"/>
          </div>
        </div>
      </el-col>

      <!--单选 地产总部礼品库 地产总部自购 事业部 商业 酒店集团 集团 文化 ；点事业部 显示事业部类型-->
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>领用库房</span>
          <div class="d-red"
            :class="{
              novalue:
                form.bizEntityJson.newPlateType1 != 'true' &&
                form.bizEntityJson.newPlateType7 != 'true' &&
                form.bizEntityJson.newPlateType2 != 'true' &&
                form.bizEntityJson.newPlateType3 != 'true' &&
                form.bizEntityJson.newPlateType4 != 'true' &&
                form.bizEntityJson.newPlateType5 != 'true' &&
                form.bizEntityJson.newPlateType6 != 'true',
              required: !form.bizEntityJson.disabled
            }">
            <d-radio-group v-model="form.bizEntityJson"
              :nameList="[
                { label: '地产总部礼品库', name: 'newPlateType1' },
                { label: '地产总部自购', name: 'newPlateType7' },
                { label: '事业部', name: 'newPlateType2' },
                { label: '商业', name: 'newPlateType3' },
                { label: '酒店集团', name: 'newPlateType4' },
                { label: '集团', name: 'newPlateType5' },
                { label: '文化', name: 'newPlateType6' },
              ]"
              @change="changePlateType('syb')"/>
          </div>
        </div>
      </el-col>

      <!--单选 事业一部 事业二部 宝龙置地 浙江事业部 广东事业部 安徽事业部-->
      <el-col :span="24" class="right-col" v-if="form.bizEntityJson.newPlateType2 == 'true'">
        <div class="d-min">
          <span>事业部类型</span>
          <div class="d-red"
            :class="{
              novalue:
                form.bizEntityJson.newType1 != 'true' &&
                form.bizEntityJson.newType2 != 'true' &&
                form.bizEntityJson.newType3 != 'true' &&
                form.bizEntityJson.newType4 != 'true' &&
                form.bizEntityJson.newType5 != 'true' &&
                form.bizEntityJson.newType6 != 'true',
              required: !form.bizEntityJson.disabled
            }">
            <d-radio-group v-model="form.bizEntityJson"
              :nameList="[
                { label: '事业一部', name: 'newType1' },
                { label: '事业二部', name: 'newType2' },
                { label: '宝龙置地', name: 'newType3' },
                { label: '浙江事业部', name: 'newType4' },
                { label: '广东事业部', name: 'newType5' },
                { label: '安徽事业部', name: 'newType6' },
              ]"/>
          </div>
        </div>
      </el-col>

      <!--单选                            显示选项编号
          会务|会务(分摊)|自购核销           3、4、5、6
          办公(分摊)|培训|招待|其他福利      4、5、6
          营销推广类                        1、2、4、5、6
          -->
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>费用类型</span>
          <div class="d-red"
            :class="{
              novalue:
                form.bizEntityJson.hw != 'true' &&
                form.bizEntityJson.ft != 'true' &&
                form.bizEntityJson.bg != 'true' &&
                form.bizEntityJson.px != 'true' &&
                form.bizEntityJson.zd != 'true' &&
                form.bizEntityJson.qt != 'true' &&
                form.bizEntityJson.yx != 'true' &&
                form.bizEntityJson.zghx != 'true',
              required: !form.bizEntityJson.disabled}">
            <d-radio-group v-model="form.bizEntityJson"
              :nameList="[
                { label: '会务', name: 'hw' },
                { label: '会务(分摊)', name: 'ft' },
                { label: '办公(分摊)', name: 'bg' },
                { label: '培训', name: 'px' },
                { label: '招待', name: 'zd' },
                { label: '其他福利', name: 'qt' },
                { label: '营销推广类', name: 'yx' },
                { label: '自购核销', name: 'zghx' },
              ]"
              @change="changePlateType('fyType')"/>
          </div>
        </div>
      </el-col>
      <!-- 1 -->
      <el-col :span="12" class="right" v-if="form.bizEntityJson.yx == 'true'">
        <div class="d-min">
          <span>营销合同类别</span>
          <el-select v-model="form.bizEntityJson.marketType" 
          filterable 
          placeholder="请选择"
          @change="changeMarketExtension">
            <el-option
              v-for="(item, index) in marketExtensionOptions"
              :key="index"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </div>
      </el-col>
      <!-- 2 -->
      <el-col
        :span="12"
        class="right-col"
        v-if="form.bizEntityJson.yx == 'true'">
        <div class="d-min">
          <span>营销合同明细</span>
          <el-select v-model="form.bizEntityJson.marketDetail" filterable placeholder="请选择">
            <el-option
              v-for="(item, index) in marketDetailOptions"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <!-- 3 -->
      <el-col :span="12" class="right" v-if="showFwType || form.bizEntityJson.hw == 'true' || form.bizEntityJson.ft == 'true'">
        <div class="d-min">
          <span>网批查询号</span>
          <el-select v-model="form.bizEntityJson.giftDisplayNo"
            remote
            clearable
            filterable
            popper-class="select-header"
            :class="{ novalue: !form.bizEntityJson.giftDisplayNo,required: !form.bizEntityJson.disabled}"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled"
            :remote-method="remoteMethod1"
            @change="selectedGiftDisplayNo">
            <el-option
              v-for="item in giftDisplayNoOptions"
              :key="item.giftDisplayNoId"
              :label="item.resDisplayNo"
              :value="item.resDisplayNo">
              <el-row :gutter="24">
                <el-col :span="12">
                  <span>{{ item.resDisplayNo }}</span>
                </el-col>
                <el-col :span="12">
                  <span>{{ item.resTitle }}</span>
                </el-col>
              </el-row>
            </el-option>
          </el-select>
        </div>
      </el-col>

      <el-col :span="12" v-if="form.bizEntityJson.zghx == 'true'">
        <div class="d-min">
          <span>网批查询号</span>
          <el-input v-model="form.bizEntityJson.giftDisplayNo2"
            :class="{
              novalue: !form.bizEntityJson.giftDisplayNo2,
              required: !form.bizEntityJson.disabled
            }"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
          />
        </div>
      </el-col>

      <el-col :span="12" class="right-col"
        v-if="showFwType ||form.bizEntityJson.hw == 'true' ||form.bizEntityJson.ft == 'true' ||form.bizEntityJson.zghx == 'true'">
        <div class="d-min">
          <el-button v-if="form.bizEntityJson.zghx == 'true' && !form.bizEntityJson.disabled" type="text" size="mini" @click="searchGiftDisplayNoZGHX">检索</el-button>
        </div>
      </el-col>
      <!-- 4 -->
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>赠送对象</span>
          <el-input v-model="form.bizEntityJson.givingObject"
            :class="{novalue: !form.bizEntityJson.givingObject,required: !form.bizEntityJson.disabled}" 
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
        </div>
      </el-col>
    </el-row>
    <!-- 5 -->
    <el-row class="top-row margin-row">
      <el-col :span="24" v-if="form.bizEntityJson.zghx != 'true'" class="table-col right-col table-checkbox">
        <el-table ref="table" :data="form.bizEntityJson.otherProperties" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="品类" prop="giftType">
            <template slot-scope="scope">
                <el-select v-model="scope.row.giftType"
                :class="{
                  novalue: !scope.row.giftType,
                  required: !form.bizEntityJson.disabled,
                }"
                :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                :disabled="form.bizEntityJson.disabled">
                <el-option v-for="(item, index) in giftTypeInfoOptions"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictName"></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="价格区间（元）" prop="giftPriceSection">
            <template slot-scope="scope">
              <el-select v-model="scope.row.giftPriceSection"
                :class="{
                  novalue: !scope.row.giftPriceSection,
                  required: !form.bizEntityJson.disabled
                }"
                :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                :disabled="form.bizEntityJson.disabled">
                <el-option label="0-500" value="1"></el-option>
                <el-option label="501-1000" value="2"></el-option>
                <el-option label="1001-2000" value="3"></el-option>
                <el-option label="2001-5000" value="4"></el-option>
                <el-option label="5001-20000" value="5"></el-option>
                <el-option label="20000以上" value="6"></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="礼品名称（文字搜索）" prop="giftName">
            <template slot-scope="scope">
              <el-select v-model="scope.row.giftName"
                popper-class="select-header"
                filterable
                remote
                clearable
                :class="{novalue: !scope.row.giftName, required: !form.bizEntityJson.disabled}"
                :placeholder="scope.row.disabled ? '' : '请输入'"
                :loading="loading"
                :disabled="form.bizEntityJson.disabled"
                :remote-method="query => remoteMethod2(query, scope.$index)"
                @change="selectedGiftName(scope.row.giftName, scope.$index)">
              <el-option
                v-for="(item, index) in giftInfoList"
                :key="index"
                :label="item.giftName"
                :value="item.giftName"
                style="min-width: 800px;font-size:12px;">
                <el-row :gutter="24">
                  <el-col :span="10" style="height: 34px;">
                    <span>{{ item.giftName }}</span>
                  </el-col>
                  <el-col :span="3" style="height: 34px;text-align:center;">
                    <span>{{ item.giftNo }}</span>
                  </el-col>
                  <el-col :span="3" style="height: 34px;text-align:center;">
                    <span>{{ item.giftType }}</span>
                  </el-col>
                  <el-col :span="2" style="height: 34px;text-align:center;">
                    <span>{{ item.unitPrice?item.unitPrice==='礼品价格'?item.unitPrice:Number(item.unitPrice).toFixed(2):'0.00' }}</span>
                  </el-col>
                  <el-col :span="2" style="height: 34px;text-align:center;">
                    <span>{{ item.giftNumber }}</span>
                  </el-col>
                  <el-col :span="4" style="height: 34px;text-align:center;">
                    <span>{{ item.remark }}</span>
                  </el-col>
                </el-row>
              </el-option>
            </el-select>
          </template>
          </el-table-column>

          <el-table-column label="库存" prop="stock">
            <template slot-scope="scope">
              <el-input v-model="scope.row.stock" 
                :class="{novalue: !scope.row.stock,required: !form.bizEntityJson.disabled}"
                :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                readonly></el-input>
            </template>
          </el-table-column>

          <el-table-column label="数量" prop="quantity">
            <template slot-scope="scope">
              <el-input v-model="scope.row.quantity" maxlength="9"
                :class="{ novalue: !scope.row.quantity, required: !form.bizEntityJson.disabled}"
                :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                :readonly="scope.row.stock=='' ?true:false"
                @change="inputQuantity(scope.row.quantity, scope.$index)"
                @input="scope.row.quantity=scope.row.quantity.replace(/[^\d]/g,'')"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column label="单价(元)" prop="unitPrice">
            <template slot-scope="scope">
              <el-input v-model="scope.row.unitPrice" 
              :class="{ novalue: !scope.row.unitPrice, required: !form.bizEntityJson.disabled }" readonly></el-input>
            </template>
          </el-table-column>

          <el-table-column label="备注" prop="remark">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" 
              :class="{ novalue: !scope.row.remark, required: !form.bizEntityJson.disabled }" readonly></el-input>
            </template>
          </el-table-column>

          <el-table-column label="操作" v-if="!form.bizEntityJson.disabled">
            <template slot-scope="scope">
              <span v-if="scope.$index > 0" style="color: #ef2941; cursor: pointer"  @click="removeTkRow(scope.$index)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

       <el-col :span="24" v-if="form.bizEntityJson.zghx == 'true'" class="table-col right-col table-checkbox">
        <el-table ref="table" :data="form.bizEntityJson.otherPropertiesZGHX" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="品类" prop="giftTypeZGHX">
            <template slot-scope="scope">
              <el-input v-model="scope.row.giftTypeZGHX" readonly />
            </template>
          </el-table-column>

          <el-table-column label="价格区间（元）" prop="giftPriceSection">
            <template slot-scope="scope">
              <el-input v-model="scope.row.giftPriceSectionZGHX" readonly />
            </template>
          </el-table-column>

          <el-table-column label="礼品名称（文字搜索）" prop="giftName">
            <template slot-scope="scope">
              <el-input v-model="scope.row.giftNameZGHX" readonly />
          </template>
          </el-table-column>

          <el-table-column label="库存" prop="stockZGHX">
            <template slot-scope="scope">
              <el-input v-model="scope.row.stock" readonly></el-input>
            </template>
          </el-table-column>

          <el-table-column label="数量" prop="quantityZGHX">
            <template slot-scope="scope">
              <el-input v-model="scope.row.quantityZGHX" maxlength="9"
                :class="{ novalue: !scope.row.quantityZGHX, required: !form.bizEntityJson.disabled}"
                :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                :readonly="scope.row.stock=='' ?true:false"
                @change="inputQuantity(scope.row.quantityZGHX, scope.$index)"
                @input="scope.row.quantity=scope.row.quantityZGHX.replace(/[^\d]/g,'')"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column label="单价(元)" prop="unitPriceZGHX">
            <template slot-scope="scope">
              <el-input v-model="scope.row.unitPriceZGHX" readonly></el-input>
            </template>
          </el-table-column>

          <el-table-column label="备注" prop="remarkZGHX">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remarkZGHX" readonly></el-input>
            </template>
          </el-table-column>

          <el-table-column label="操作" v-if="!form.bizEntityJson.disabled">
            <template slot-scope="scope">
              <span style="color: #ef2941; cursor: pointer"  @click="removeTkZGHXRow(scope.$index)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!-- 6-1 -->
      <el-col :span="12" class="right">
        <div class="d-min">
          <span>礼品总金额</span>
          <el-input v-model="form.bizEntityJson.totalSum" 
          :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
        </div>
      </el-col>
      <!-- 6-2 -->
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>科目名称</span>
          <el-input value="业务招待费" readonly/>
        </div>
      </el-col>

      <el-col :span="24" style="text-align: center" class="right-col" v-if="form.bizEntityJson.zghx != 'true'">
        <el-button @click="addTkRow" type="text" size="mini">增加条款</el-button>
      </el-col>
    </el-row>

    <!-- 6 -->
    <el-row :gutter="24" class="top-row margin-row green-row">
      <dl-col :span="24" title="礼品图片" class="right-col" place="right" :novalue="!form.bizEntityJson.giftPictureId">
        <one-file :form="form" value="giftPictureId" />
      </dl-col>
    </el-row>
    <!-- 组件1申请人 -->
    <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser"></search-user>
    <!-- 组件2费用承担部门 -->
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      showSearchUser: false,
      showSearchOrg: false,
      loading: false,
      showFwType: true,
      otherProperties: [],
      otherPropertiesZGHX:[],
      userInfo: {},
      centerCd: "",
      centerName: "",
      centerParentName: "",
      fullPath: "",
      giftDisplayNoOptions:[],
      marketExtensionOptions:[],
      marketDetailOptions:[],
      giftTypeInfoOptions: {dictCd: '',dictName: ''},
      giftInfoList:[],
      realSubjectName:'业务招待费',
    };
  },
  props: ["data"],
  computed: {},
  watch: {
    data: {
      immediate: true,
      handler: function (val) {
        console.log(val);
        this.form = val;
      },
    },
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("ys_contract_token"));
    if (!this.$route.query.id) {
      this.giftTypeInfo();
      this.getMarketExtension();
      this.$set(this.form.bizEntityJson,'realSubjectName',this.realSubjectName);
      this.$set(this.form.bizEntityJson, "totalSum", "0.00");
      this.$set(this.form.bizEntityJson, "otherProperties", []);
      this.$set(this.form.bizEntityJson, "applyer", this.userInfo.userCd);
      this.$set(this.form.bizEntityJson, "applyerName", this.userInfo.username);
      this.$set(this.form.bizEntityJson, "centerCd", this.userInfo.orgCd);
      this.$set(this.form.bizEntityJson, "centerName", this.userInfo.orgName);
      this.$set(this.form.bizEntityJson, "centerParentName", this.userInfo.centerOrgName);
      this.$set(this.form.bizEntityJson, "fullPath", this.form.bizEntityJson.centerParentName + "-" + this.form.bizEntityJson.centerName);
    }
  },
  mounted() {},
  methods: {
    // 申请人赋值
    closeSearhUser(val) {
      if (val) {
        this.$set(this.form.bizEntityJson, "applyer", val.userCd);
        this.$set(this.form.bizEntityJson, "applyerName", val.userName);
      }
      this.showSearchUser = false;
    },
    // 费用承担部门赋值
    closeSearhOrg(val) {
      if (val) {
        this.$approval.getCenterParent({ orgCd: val.id }).then((res) => {
          if (res.code == 1 && res.data) {
            this.$set(this.form.bizEntityJson, "fullPath", res.data);
          } else {
            his.$set(this.form.bizEntityJson, "fullPath", val.text);
          }
        });
        this.$set(this.form.bizEntityJson, "centerCd", val.id);
        this.$set(this.form.bizEntityJson, "centerName", val.text);
      }
      this.showSearchOrg = false;
    },
    // 非自购核销网批号查询
    remoteMethod1(query) {
      if (query) {
        this.loading = true;
        const param={
          subjectId:this.form.bizEntityJson.subjectId,//科目id
          giftDisplayNo:query//网批号
        }
        this.$approval.searchGiftDisplayNo(param).then(res => {
          if(res.code == 1 && res.data) {
            this.giftDisplayNoOptions = res.data
            this.giftDisplayNoOptions.unshift({
              resDisplayNo: "网批查询号", 
              resTitle: "表单名称"
              })
          }else {
            this.giftDisplayNoOptions=[]
            this.$message.error(res)
          }
          this.loading = false
        })


      } else {
        this.$set(this.form.bizEntityJson, "giftDisplayNoOptions", []);
      }
    },
    // 礼品模糊查询
    remoteMethod2(query, index){
      if(query){
        this.loading = true;
        let plateType='';
        // 库房
        if (this.form.bizEntityJson.newPlateType1 === "true") {//1地产总部礼品库
          plateType = "1";
        }
        if (this.form.bizEntityJson.newType1 === "true") {//事业一部
          plateType = "2";
        }
        if (this.form.bizEntityJson.newType2 === "true") {//事业二部
          plateType = "3";
        }
        if (this.form.bizEntityJson.newType3 === "true") { //宝龙置地
          plateType = "4";
        }
        if (this.form.bizEntityJson.newType4 === "true") {//浙江事业部
          plateType = "5";
        }
        if (this.form.bizEntityJson.newType5 === "true") {//广东事业部
          plateType = "6";
        }
        if (this.form.bizEntityJson.newType6 === "true") {//安徽事业部
          plateType = "7";
        }
        if (this.form.bizEntityJson.newPlateType3 === "true") {//商业
          plateType = "8";
        }
        if (this.form.bizEntityJson.newPlateType4 === "true") {//酒店集团
          plateType = "9";
        }
        if (this.form.bizEntityJson.newPlateType5 === "true") {//集团
          plateType = "10";
        }
        if (this.form.bizEntityJson.newPlateType6 === "true") {//文化
          plateType = "11";
        }
        if (this.form.bizEntityJson.newPlateType7 === "true") {	//12地产总部自购
          plateType = "12";
        }
        const param ={
          giftPriceSection:this.form.bizEntityJson.otherProperties[index].giftPriceSection,//单价区间
          giftType:this.form.bizEntityJson.otherProperties[index].giftType,//品类
          plateType:plateType,//礼品库
          quickQuery:query,//礼品名称
          userId:this.userInfo.userid
        }
        this.$approval.searchGiftName(param).then(res => {
          if(res.code == 1 && res.data) {
            this.giftInfoList = res.data
            this.giftInfoList.unshift({
              giftName: "礼品名称", 
              giftNo: "礼品编号", 
              giftType: "礼品类别", 
              unitPrice: "礼品价格",
              giftNumber: "礼品库存", 
              remark: "备注"
              })

          }else {
            this.giftInfoList=[]
            this.$message.error(res)
          }
          this.loading = false
        })
      }
    },
    // 礼品品类
    giftTypeInfo() {
      const param = {dictTypeCd: 'A_GIFT_ACCOUNT_TYPE'};
      this.$approval.giftTypeInfo(param).then(res => {
        if(res.code == 1 && res.data) {
          this.giftTypeInfoOptions = res.data;
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 包干比例查询
    subjectRatio() {},
    // 非自购核销网批号查询选择触发
    selectedGiftDisplayNo(val){
      let obj = this.giftDisplayNoOptions.find(item => item.resDisplayNo == val)
      if(obj==undefined || obj===''){
        return false;
      }
      this.$set(this.form.bizEntityJson,'resDisplayNo',obj.resDisplayNo);
      this.$set(this.form.bizEntityJson,'billName',obj.resTitle);
      this.$set(this.form.bizEntityJson,'giftDisplayNoId',obj.preResApproveId);
      this.$set(this.form.bizEntityJson,'finBudgetPreId',obj.finBudgetPreId);
    },
    // 自购核销网批号查询点击检索触发
    searchGiftDisplayNoZGHX(query){
      this.$set( this.form.bizEntityJson,'otherProperties',[])
      this.$approval.giftTypeInfo({giftDisplayNo:query}).then(res => {
        if(res.code == 1 && res.data) {
          this.form.bizEntityJson.otherPropertiesZGHX = res.data;
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 礼品模糊查询选择触发
    selectedGiftName(val,index){
      if(val===''){
        this.$set(this.form.bizEntityJson.otherProperties[index],'giftType','');
        this.$set(this.form.bizEntityJson.otherProperties[index],'giftPriceSection','');
        this.$set(this.form.bizEntityJson.otherProperties[index],'giftName','');
        this.$set(this.form.bizEntityJson.otherProperties[index],'stock','');
        this.$set(this.form.bizEntityJson.otherProperties[index],'unitPrice','');
        this.$set(this.form.bizEntityJson.otherProperties[index],'remark','');
        this.$set(this.form.bizEntityJson.otherProperties[index],'quantity','');
        this.inputQuantity(val,index);
        return false;
      }
      let obj = this.giftInfoList.find(item => item.giftName == val)
      if(obj==undefined || obj===''){
        return false;
      }
      this.$set(this.form.bizEntityJson.otherProperties[index],'giftType',obj.giftType);
      if(0<=Number(obj.unitPrice)&& Number(obj.unitPrice)<=500){
        this.$set(this.form.bizEntityJson.otherProperties[index],'giftPriceSection','1');
      }
      if(501<=Number(obj.unitPrice)&& Number(obj.unitPrice)<=1000){
        this.$set(this.form.bizEntityJson.otherProperties[index],'giftPriceSection','2');
      }
      if(1001<=Number(obj.unitPrice)&& Number(obj.unitPrice)<=2000){
        this.$set(this.form.bizEntityJson.otherProperties[index],'giftPriceSection','3');
      }
      if(2001<=Number(obj.unitPrice)&& Number(obj.unitPrice)<=5000){
        this.$set(this.form.bizEntityJson.otherProperties[index],'giftPriceSection','4');
      }
      if(5001<=Number(obj.unitPrice)&& Number(obj.unitPrice)<=20000){
        this.$set(this.form.bizEntityJson.otherProperties[index],'giftPriceSection','5');
      }
      if(20000<Number(obj.unitPrice)){
        this.$set(this.form.bizEntityJson.otherProperties[index],'giftPriceSection','6');
      }
      this.$set(this.form.bizEntityJson.otherProperties[index],'giftName',obj.giftName);
      this.$set(this.form.bizEntityJson.otherProperties[index],'stock',obj.giftNumber);
      this.$set(this.form.bizEntityJson.otherProperties[index],'unitPrice',Number(obj.unitPrice).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
      this.$set(this.form.bizEntityJson.otherProperties[index],'remark',obj.remark);

    },
    // 数量涉及计算
    inputQuantity(val,index){
      let totalSum=0;
      let stock = this.form.bizEntityJson.otherProperties[index].stock;
      if(val>stock){
        this.$set(this.form.bizEntityJson.otherProperties[index],'quantity','');
      }else{
        this.form.bizEntityJson.otherProperties.forEach((item) => {
              let unitPriceTemp = item.unitPrice.replace(',','');
              let quantityTemp = item.quantity.replace(',','');
              totalSum+=Number(unitPriceTemp)*Number(quantityTemp)
      })
        this.$set(this.form.bizEntityJson,'totalSum',totalSum.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
      }
    } ,   
    // 实时预算查询 TODO
    queryBudget() {
      let centerCd = this.form.bizEntityJson.centerCd;
      console.log(centerCd);
      if (centerCd === "" || centerCd === undefined) {
        Message.error("请先选择费用承担部门！");
        return false;
      }

      if (this.form.bizEntityJson.yx === "true") {
        let checkStatus = true;
        let balance = checkYxBudget(centerCd);
        if ("" === balance) {
          Message.error("当前项目当前季度在营销季度预算维护没有,请重新选择");
          checkStatus = false;
        } else {
          Message.error("当前可用预算余额：" + balance.toFixed(2));
          checkStatus = false;
        }
        return checkStatus;
      }
      checkSubject();
      var subjectId = $("#subjectId").val();
      if (!subjectId) {
        alert("请先选择科目！");
        return;
      }
    },
    // 判断费用类型是否被选中
    checkedFyType() {
      if (
        this.form.bizEntityJson.hw == "true" ||
        this.form.bizEntityJson.ft == "true"
      ) {
        this.$confirm("是否使用立项申请单预算", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        }).then(() => {
           // TODO
        }).catch(err => console.log(err));
      }
      if (
        this.form.bizEntityJson.hw != "true" &&
        this.form.bizEntityJson.ft != "true" &&
        this.form.bizEntityJson.bg != "true" &&
        this.form.bizEntityJson.px != "true" &&
        this.form.bizEntityJson.zd != "true" &&
        this.form.bizEntityJson.qt != "true" &&
        this.form.bizEntityJson.yx != "true" &&
        this.form.bizEntityJson.zghx != "true"
      ) {
        this.showFwType = true;
      } else {
        this.showFwType = false;
        // 默认是业务招待费，zd，yx，zghx都属于业务招待费 所以不做判断
        this.realSubjectName='业务招待费';
        if(this.form.bizEntityJson.hw === "true"){
          this.realSubjectName='会务费';
        }
        if(this.form.bizEntityJson.ft === "true"){
          this.realSubjectName='会务费公摊';
        }
        if(this.form.bizEntityJson.bg === "true"){
          this.realSubjectName='办公费公摊';
        }
        if(this.form.bizEntityJson.px === "true"){
         this.realSubjectName='培训费';
        }
        if(this.form.bizEntityJson.qt === "true"){
          this.realSubjectName='福利';
        }
        const param = [{
         orgCd:this.form.bizEntityJson.centerCd,
         subjectName:this.realSubjectName
        }]
        this.getSubjectCdByOrgCd(param)
        }
    },
    // 根据费用承担部门以及科目名称查询科目cd
    getSubjectCdByOrgCd(param){
      var resultList=[];
      this.$approval.getSubjectCdByOrgCd(param).then(res => {
        if(res.code == 1 && res.data) {
          res.data.forEach(item => { 
          resultList.push(item)
          })
          this.$set(this.form.bizEntityJson,'subjectId',resultList[0]);
          this.$set(this.form.bizEntityJson,'realSubjectName',this.realSubjectName);
        }else {
           this.$message.error('没有相应的科目，请重试')
        }
      })
    },
    // 获取营销合同类别和营销合同明细
    getMarketExtension(){
      this.$approval.getMarketExtension().then(res => {
        if(res.code == 1 && res.data) {
          res.data.forEach(item => { 
            this.marketExtensionOptions.push(item)
          })
        }else {
           this.$message.error(res)
        }
      })
    },
    // 营销合同类别赋值
    changeMarketExtension(val){
      this.$set(this.form.bizEntityJson,'marketDetail','')
      this.marketDetailOptions=[]
      this.marketExtensionOptions.forEach(item => {
        if (item.id == val) {
          item.childNode.forEach(childItem =>{
            this.marketDetailOptions.push(childItem);
          })
        }
      })
    },
    // 切换显示后清空数据
    changePlateType(val) {
      if (val == "lydw") {
        this.$set(this.form.bizEntityJson, "newBusinessType1", "");
        this.$set(this.form.bizEntityJson, "newBusinessType2", "");
        this.$set(this.form.bizEntityJson, "newBusinessType3", "");
      }
      if (val == "syb") {
        this.$set(this.form.bizEntityJson, "newType1", "");
        this.$set(this.form.bizEntityJson, "newType2", "");
        this.$set(this.form.bizEntityJson, "newType3", "");
        this.$set(this.form.bizEntityJson, "newType4", "");
        this.$set(this.form.bizEntityJson, "newType5", "");
        this.$set(this.form.bizEntityJson, "newType6", "");
      }
      if (val == "fyType") {
        this.checkedFyType();
        this.$set(this.form.bizEntityJson, "marketType", "");
        this.$set(this.form.bizEntityJson, "marketDetail", "");
        this.$set(this.form.bizEntityJson, "giftDisplayNoId", "");
        this.$set(this.form.bizEntityJson, "givingObject", "");
        this.$set(this.form.bizEntityJson, "otherProperties", []);
        this.$set(this.form.bizEntityJson, "totalSum", "0.00");
      }
    },
    // 添加行
    addTkRow() {
      if (
        this.form.bizEntityJson.hw != "true" &&
        this.form.bizEntityJson.ft != "true" &&
        this.form.bizEntityJson.bg != "true" &&
        this.form.bizEntityJson.px != "true" &&
        this.form.bizEntityJson.zd != "true" &&
        this.form.bizEntityJson.qt != "true" &&
        this.form.bizEntityJson.yx != "true" &&
        this.form.bizEntityJson.zghx != "true"
      ) {
        return false;
      }
      var newData = {
        giftType: "",
        giftPriceSection: "",
        giftName: "",
        stock: "",
        quantity: "",
        unitPrice: "",
        remark: "",
      };
      this.form.bizEntityJson.otherProperties.push(newData);
    },
    // 删除行
    removeTkRow(index) {
      if (this.form.bizEntityJson.otherProperties.length > 0) {
        this.form.bizEntityJson.otherProperties.splice(index, 1);
      }
    },
     // 自购核销删除行
    removeTkZGHXRow(index) {
      if (this.form.bizEntityJson.otherPropertiesZGHX.length > 0) {
        this.form.bizEntityJson.otherPropertiesZGHX.splice(index, 1);
      }
    },
  },
}
</script>
<style type="text/css" lang="scss">
@import "./publicSheet.scss";
</style>
