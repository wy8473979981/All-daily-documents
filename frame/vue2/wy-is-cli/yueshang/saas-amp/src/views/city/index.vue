<template>
  <!-- 城市档案 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="16">
        <el-row type="flex" justify="space-between" :gutter="20" style="margin-bottom: 20px;">
          <el-col>
            <el-select placeholder="请选择项目" size="mini" v-model="query.project" clearable>
              <el-option
                v-for="item in layoutList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col>
            <el-date-picker
              v-model="query.month"
              type="month"
              size="mini"
              value-format="MM"
              @change="selectEndY"
              placeholder="权责月">
            </el-date-picker>
          </el-col>
        </el-row>

      </el-col>
      <el-col :span="8" style="text-align: right;">
        <el-button @click="dealSearch" size="mini" type="success">查询</el-button>
        <el-button @click="dealAdd" size="mini" type="success">新增</el-button>
        <el-button @click="dealDel" size="mini" type="info" plain>批量删除</el-button>
        <el-upload :data="dataObj" :multiple="true" :before-upload="beforeUpload" action="https://www.ruyouyaxing.com" style="display: inline-block;">
          <el-button @click="dealImport" size="mini" type="success" plain>导入数据</el-button>
        </el-upload>
        <el-button :loading="downloadLoading" @click="handleDownload" size="mini" type="success" plain>导出Excel</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" show-summary :summary-method="getSummaries" header-row-class-name="table-header">
      <el-table-column type="selection" width="60" fixed />
      <el-table-column label="业态" prop="layout" fixed />
      <el-table-column label="项目名称" width="120" prop="project" fixed />
      <el-table-column label="基础信息" >
        <el-table-column label="所属商业事业部" width="120" prop="business" />
        <el-table-column label="所属地产事业部" width="120" prop="estate"/>
        <el-table-column label="所在城市" prop="city"/>
        <el-table-column label="资产属性" prop="property"/>
        <el-table-column label="开业年份" prop="year"/>
      </el-table-column>
      <el-table-column label="自持经营建筑面积(㎡)">
        <el-table-column label="地上商业建筑面积" width="120" prop="area2"/>
        <el-table-column label="地下商业建筑面积" width="120" prop="area3"/>
        <el-table-column label="合计" prop="totle1">
          <template slot-scope="scope">
            <span>{{(parseFloat(scope.row.area2) + parseFloat(scope.row.area3)).toFixed(2)}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="车库信息" prop="position">
        <el-table-column label="分摊车库面积(㎡)" width="120" prop="area4"/>
        <el-table-column label="分摊车位个数" width="100" prop="num"/>
        <el-table-column label="总车库面积(㎡)" width="120" prop="area5"/>
        <el-table-column label="总车位个数" width="100" prop="num2"/>
        <el-table-column label="单车位面积(㎡)" width="120" prop="area6"/>
      </el-table-column>
      <el-table-column label="单方成本信息(元)" prop="position">
        <el-table-column label="地上土地单方" width="160px" >
          <el-table-column label="原始值" width="80px" prop="money"/>
          <el-table-column label="分摊值" width="80px" prop="money"/>
        </el-table-column>
        <el-table-column label="地下土地单方" width="100px" prop="money1"/>
        <el-table-column label="地上建安单方" width="100px" prop="money2"/>
        <el-table-column label="地下建安单方" width="100px" prop="money3"/>
        <el-table-column label="车库单方" prop="money4"/>
      </el-table-column>
      <el-table-column label="总投单方(元)" prop="position">
        <el-table-column label="累计总投" width="100" prop="money5"/>
        <el-table-column label="新增改造" prop="money6"/>
        <el-table-column label="合计">
          <template slot-scope="scope">
            <span>{{(parseFloat(scope.row.money5) + parseFloat(scope.row.money6)).toFixed(2)}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="上一年累计总投(万元)" width="150px" prop="money5"/>
      <el-table-column label="创建人"  prop="create_user"/>
      <el-table-column label="创建日期" width="150" prop="create_time"/>
      <el-table-column label="累计总投(㎡)" width="100" prop="money5"/>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="toUpdate(scope.row.number_id)">编辑</el-button>
          <el-button size="mini" type="info" plain @click="confirm(scope.row.number_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
  </div>
</template>

<script>
  import { handlePaginator } from '@mixins'
  const test = [
    {layout:'购物中心',project:'上海七宝宝龙广场',business:'华中事业部',estate:'事业一部',city:'上海',property:'自持',year:'2020.3.2',area1:'28000.00',area2:'25000.00',area3:'3000.00',t1:'28000.00',area4:'6000.00',num:'268',area5:'5000.00',num2:'350',area6:'35.00',money:'3000.00',money1:'0',money2:'4532.00',money3:'4000.00',money4:'4200.00',money5:'8860.00',money6:'2860.00',t2:'11720.00',create_user:'admin',create_time:'2020-03-10 13:50:00'},
    {layout:'商业街',project:'上海七宝宝龙广场',business:'华中事业部',estate:'事业一部',city:'上海',property:'自持',year:'2020.3.2',area1:'28000.00',area2:'25000.00',area3:'3000.00',t1:'28000.00',area4:'6000.00',num:'268',area5:'5000.00',num2:'350',area6:'35.00',money:'3000.00',money1:'0',money2:'4532.00',money3:'4000.00',money4:'4200.00',money5:'8860.00',money6:'2860.00',t2:'11720.00',create_user:'admin',create_time:'2020-03-10 13:50:00'},
    {layout:'车库',project:'上海七宝宝龙广场',business:'华中事业部',estate:'事业一部',city:'上海',property:'自持',year:'2020.3.2',area1:'28000.00',area2:'25000.00',area3:'3000.00',t1:'28000.00',area4:'6000.00',num:'268',area5:'5000.00',num2:'350',area6:'35.00',money:'3000.00',money1:'0',money2:'4532.00',money3:'4000.00',money4:'4200.00',money5:'8860.00',money6:'2860.00',t2:'11720.00',create_user:'admin',create_time:'2020-03-10 13:50:00'},
    {layout:'购物中心',project:'上海七宝宝龙广场',business:'华中事业部',estate:'事业一部',city:'上海',property:'自持',year:'2020.3.2',area1:'28000.00',area2:'25000.00',area3:'3000.00',t1:'28000.00',area4:'6000.00',num:'268',area5:'5000.00',num2:'350',area6:'35.00',money:'3000.00',money1:'0',money2:'4532.00',money3:'4000.00',money4:'4200.00',money5:'8860.00',money6:'2860.00',t2:'11720.00',create_user:'admin',create_time:'2020-03-10 13:50:00'},
    {layout:'商业街',project:'上海七宝宝龙广场',business:'华中事业部',estate:'事业一部',city:'上海',property:'自持',year:'2020.3.2',area1:'28000.00',area2:'25000.00',area3:'3000.00',t1:'28000.00',area4:'6000.00',num:'268',area5:'5000.00',num2:'350',area6:'35.00',money:'3000.00',money1:'0',money2:'4532.00',money3:'4000.00',money4:'4200.00',money5:'8860.00',money6:'2860.00',t2:'11720.00',create_user:'admin',create_time:'2020-03-10 13:50:00'},
    {layout:'车库',project:'上海七宝宝龙广场',business:'华中事业部',estate:'事业一部',city:'上海',property:'自持',year:'2020.3.2',area1:'28000.00',area2:'25000.00',area3:'3000.00',t1:'28000.00',area4:'6000.00',num:'268',area5:'5000.00',num2:'350',area6:'35.00',money:'3000.00',money1:'0',money2:'4532.00',money3:'4000.00',money4:'4200.00',money5:'8860.00',money6:'2860.00',t2:'11720.00',create_user:'admin',create_time:'2020-03-10 13:50:00'},
    {layout:'购物中心',project:'上海七宝宝龙广场',business:'华中事业部',estate:'事业一部',city:'上海',property:'混合',year:'2020.3.2',area1:'28000.00',area2:'25000.00',area3:'3000.00',t1:'28000.00',area4:'6000.00',num:'268',area5:'5000.00',num2:'350',area6:'35.00',money:'3000.00',money1:'0',money2:'4532.00',money3:'4000.00',money4:'4200.00',money5:'8860.00',money6:'2860.00',t2:'11720.00',create_user:'admin',create_time:'2020-03-10 13:50:00'},
    {layout:'商业街',project:'上海七宝宝龙广场',business:'华中事业部',estate:'事业一部',city:'上海',property:'混合',year:'2020.3.2',area1:'28000.00',area2:'25000.00',area3:'3000.00',t1:'28000.00',area4:'6000.00',num:'268',area5:'5000.00',num2:'350',area6:'35.00',money:'3000.00',money1:'0',money2:'4532.00',money3:'4000.00',money4:'4200.00',money5:'8860.00',money6:'2860.00',t2:'11720.00',create_user:'admin',create_time:'2020-03-10 13:50:00'},
    {layout:'车库',project:'上海七宝宝龙广场',business:'华中事业部',estate:'事业一部',city:'上海',property:'混合',year:'2020.3.2',area1:'28000.00',area2:'25000.00',area3:'3000.00',t1:'28000.00',area4:'6000.00',num:'268',area5:'5000.00',num2:'350',area6:'35.00',money:'3000.00',money1:'0',money2:'4532.00',money3:'4000.00',money4:'4200.00',money5:'8860.00',money6:'2860.00',t2:'11720.00',create_user:'admin',create_time:'2020-03-10 13:50:00'},
    {layout:'购物中心',project:'上海七宝宝龙广场',business:'华中事业部',estate:'事业一部',city:'上海',property:'混合',year:'2020.3.2',area1:'28000.00',area2:'25000.00',area3:'3000.00',t1:'28000.00',area4:'6000.00',num:'268',area5:'5000.00',num2:'350',area6:'35.00',money:'3000.00',money1:'0',money2:'4532.00',money3:'4000.00',money4:'4200.00',money5:'8860.00',money6:'2860.00',t2:'11720.00',create_user:'admin',create_time:'2020-03-10 13:50:00'}
  ]
  const test2 = [
    {layout:'商业街',project:'上海七宝宝龙广场',business:'华中事业部',estate:'事业一部',city:'上海',property:'混合',year:'2020.3.2',area1:'28000.00',area2:'25000.00',area3:'3000.00',t1:'28000.00',area4:'6000.00',num:'268',area5:'5000.00',num2:'350',area6:'35.00',money:'3000.00',money1:'0',money2:'4532.00',money3:'4000.00',money4:'4200.00',money5:'8860.00',money6:'2860.00',t2:'11720.00',create_user:'admin',create_time:'2020-03-10 13:50:00'},
    {layout:'车库',project:'上海七宝宝龙广场',business:'华中事业部',estate:'事业一部',city:'上海',property:'混合',year:'2020.3.2',area1:'28000.00',area2:'25000.00',area3:'3000.00',t1:'28000.00',area4:'6000.00',num:'268',area5:'5000.00',num2:'350',area6:'35.00',money:'3000.00',money1:'0',money2:'4532.00',money3:'4000.00',money4:'4200.00',money5:'8860.00',money6:'2860.00',t2:'11720.00',create_user:'admin',create_time:'2020-03-10 13:50:00'}
  ]
  const list = [{lable: 0,value:'购物中心'},{lable: 1,value:'商业街'},{lable: 2,value:'车库'}]
  const attr = [{lable: 0,value:'全部'},{lable: 1,value:'自持'},{lable: 2,value:'混合'}]
  import Vue from 'vue'
  var dat = {"code":20000,"data":{"total":100,"items":[{"id":1,"timestamp":360496083876,"author":"Kevin","reviewer":"Amy","title":"Agpnwd Scgiuxfg Xzcwj Onwbmadc Rbjylewowt Pkfvic Eillsl Cvgchzvgl","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":73.52,"importance":1,"type":"CN","status":"published","display_time":"2009-05-24 20:49:59","comment_disabled":true,"pageviews":3678,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":2,"timestamp":125835178839,"author":"Jason","reviewer":"Melissa","title":"Clp Eyacfucj Jfiouur Sjdmxa Oru Yldrlfst Fri Lwwyoqlrd Zqrefi","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":83.63,"importance":3,"type":"JP","status":"published","display_time":"1975-08-14 23:37:02","comment_disabled":true,"pageviews":4707,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":3,"timestamp":241739091132,"author":"Cynthia","reviewer":"Larry","title":"Bfutqr Umc Xskr Qhwtfmueb Zysbqplr Bvmd Nxksgq Ytagtiyr Rtnl","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":33.63,"importance":2,"type":"US","status":"published","display_time":"2007-08-20 10:21:30","comment_disabled":true,"pageviews":1733,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":4,"timestamp":507566119805,"author":"Deborah","reviewer":"Larry","title":"Beowryn Wtmyen Uudeng Prcxidijdw Bmpdjlryo Xqwigghn Cfbng Kgi","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":14.86,"importance":2,"type":"CN","status":"draft","display_time":"2008-10-24 01:33:39","comment_disabled":true,"pageviews":3951,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":5,"timestamp":881480926401,"author":"William","reviewer":"Michael","title":"Oyasct Zvhmszrboo Ijts Unqxmo Mdc Ikeie Wnl","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":88.37,"importance":2,"type":"US","status":"draft","display_time":"1981-10-10 14:25:10","comment_disabled":true,"pageviews":1741,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":6,"timestamp":221114868638,"author":"Christopher","reviewer":"Kenneth","title":"Ygzlglh Psqemux Stluqb Pdhlabk Ggwujqaq Zckkipn Rlqq","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":10.13,"importance":1,"type":"JP","status":"draft","display_time":"1972-04-15 06:22:04","comment_disabled":true,"pageviews":1647,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":7,"timestamp":478114423241,"author":"Jason","reviewer":"Kevin","title":"Mcw Rnks Lhuanezi Pxnotjqmc Qehuriio Mkkzvjmrou","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":11.66,"importance":1,"type":"JP","status":"published","display_time":"1987-06-15 00:34:32","comment_disabled":true,"pageviews":3615,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":8,"timestamp":1258644497570,"author":"Paul","reviewer":"Anthony","title":"Krfp Bwovbis Xckv Huwvwd Qooqmuho Fkqvjpjl Dkjy","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":24.85,"importance":2,"type":"JP","status":"published","display_time":"2017-03-20 09:06:10","comment_disabled":true,"pageviews":2555,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":9,"timestamp":185868370105,"author":"Deborah","reviewer":"Amy","title":"Tkvunnbq Dgrhh Yfvhfyh Gvvnruc Qblwf Lgfjo Igfjdhj Myroj Euqcaolck","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":23.54,"importance":1,"type":"JP","status":"published","display_time":"2001-07-25 15:25:37","comment_disabled":true,"pageviews":497,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":10,"timestamp":844074473570,"author":"Lisa","reviewer":"Jeffrey","title":"Xtehfbw Ohdshnpfow Elmyt Gbpby Hkw Efnw","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":32.52,"importance":1,"type":"JP","status":"published","display_time":"1995-05-17 01:33:16","comment_disabled":true,"pageviews":1023,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":11,"timestamp":1582845152656,"author":"Jeffrey","reviewer":"Joseph","title":"Ekxsikgi Ncpswstej Kkqdpkv Niquy Dhvkpljlj Ofqxven Txyu Audkatvg","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":69.98,"importance":2,"type":"US","status":"draft","display_time":"1995-02-20 10:57:38","comment_disabled":true,"pageviews":559,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":12,"timestamp":133197734568,"author":"Gary","reviewer":"Kevin","title":"Bhocgg Zefbbdxqta Bzgrvkdr Uqfhugrm Vgtftwqb Tojnip Yoorlqb","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":34.36,"importance":2,"type":"EU","status":"draft","display_time":"2005-10-25 05:30:56","comment_disabled":true,"pageviews":3128,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":13,"timestamp":156209027704,"author":"Betty","reviewer":"Eric","title":"Errpnj Ikhtwqnm Flgueb Qmbbtkj Iejhklzw Tmczimji","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":10.81,"importance":3,"type":"US","status":"draft","display_time":"1989-01-24 16:05:41","comment_disabled":true,"pageviews":3846,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":14,"timestamp":1439221353375,"author":"Joseph","reviewer":"Melissa","title":"Xlxtbzl Mbedig Kvdvbcyf Qgumlwgv Cudnrhsz","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":5.82,"importance":3,"type":"JP","status":"draft","display_time":"2018-08-11 01:32:17","comment_disabled":true,"pageviews":3261,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":15,"timestamp":310492557610,"author":"Christopher","reviewer":"Maria","title":"Jfg Vho Poho Qyesjbivw Jbkb Rpuvohofc Pvyu Zvxd","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":80.26,"importance":3,"type":"EU","status":"published","display_time":"2010-06-04 03:38:14","comment_disabled":true,"pageviews":2869,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":16,"timestamp":1408829209160,"author":"Jason","reviewer":"John","title":"Uemzzcq Nzwifotfaa Fddm Jwzlbguicv Bdsf Tlkn Digd Cpous Drix","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":83.86,"importance":3,"type":"US","status":"draft","display_time":"1986-10-03 01:25:30","comment_disabled":true,"pageviews":954,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":17,"timestamp":644908877662,"author":"Shirley","reviewer":"Donald","title":"Felxbxrplb Dev Iecqe Anrvxoiu Wsgbxcv Mjlbhxiywo Lbrocfxd Oilhg","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":49.31,"importance":1,"type":"EU","status":"published","display_time":"1986-07-20 04:28:10","comment_disabled":true,"pageviews":1012,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":18,"timestamp":1548773526092,"author":"Gary","reviewer":"Mark","title":"Kkfd Ocdfsxtcyc Jmd Osm Zwbime Armuxnfc Bel","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":19.32,"importance":1,"type":"JP","status":"draft","display_time":"2010-04-07 02:43:58","comment_disabled":true,"pageviews":3107,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":19,"timestamp":1423136904968,"author":"Margaret","reviewer":"Scott","title":"Zpljuvb Jfk Dop Inhruvsey Qrnn","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":64.46,"importance":2,"type":"US","status":"draft","display_time":"1978-12-11 11:44:54","comment_disabled":true,"pageviews":3261,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":20,"timestamp":751240620840,"author":"Scott","reviewer":"Matthew","title":"Jvqkiqtdq Wbl Pqnjqvs Posyvlwdx Koqhdtkoy Kxkmmz Utvjyjx Sfbtcucncy Enxz","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":94.78,"importance":1,"type":"JP","status":"published","display_time":"1987-05-27 12:08:55","comment_disabled":true,"pageviews":1938,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]}]}}
  const fetchList = dat.data.items
  export default {
    mixins: [handlePaginator],
    data() {
      return {
        pageInfo: {
          page_size: 10,
          page: 1,
          sum_num: 0
        },
        layoutList: [],// 业态列表
        assetAttr: [],// 资产属性
        tableData: [],
        query: {
          project: '',// 项目名称
          month: ''
        },
        downloadLoading: false,
        list: [],
        dataObj: { token: '', key: '' },

      }
    },
    watch: {},
    created() {
      this.layoutList = list
      this.assetAttr = attr
      this.tableData = test
      this.getList()
      this.fetchData()
    },
    mounted() {
      // this.getList()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        setTimeout(() => {
          this.list = fetchList
          this.listLoading = false
        },1500)
      },
      getList() {
        if(this.pageInfo.page === 1){
          this.tableData = test
        }else{
          this.tableData = test2
        }
        this.pageInfo.sum_num = 12
      },
      dealSearch() {
        if(this.query.layout){
          this.tableData = test.filter((item,index) => item.layout === this.query.layout)
          console.log(this.tableData,'===this.tableData')
          this.$set(this,tableData,this.tableData)
          // this.$forceUpdate()
          // Vue.set(this.tableData,0,{})
        }else{
          this.tableData = test
        }
        this.getList()
      },
      dealAdd() {

      },
      dealDel(ids) {
        try {
          this.$confirm(`确认要删除吗？`).then(() => {

          }).catch(() => {

          })
          // this.handelConfirm(id)
        } catch (error) {
          console.log(error, '----[取消删除 start]----')
        }
      },
      dealImport() {

      },
      dealDown() {

      },
      toUpdate() {

      },
      toDelete(id) {
        this.$confirm(`确认要删除吗？`).then(() => {
          let tl = [...this.tableData]
          tl.splice(id,1)
          this.tableData = tl
        }).catch(() => {

        })
      },
      handleDownload() {
        this.downloadLoading = true
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          // area5  num
          let values = data.map(item => Number(item[column.property]));
          if(column.property === 'totle1'){
            values = data.map(item => Number(parseFloat(item.area2) + parseFloat(item.area3)));
          }
          if (!values.every(value => isNaN(value))) {
            if (column.property === 'area6') {
              sums[index] = (sums[index - 2] / sums[index - 1]).toFixed(2)
            }else{
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] = sums[index].toFixed(2)
            }
          } else {
            sums[index] = '--';
          }
        });
        return sums;
      },
      beforeUpload() {

      },
      // 选择结束年份
      selectEndY(e){
        if(!this.query.startY){
          this.query.endY = ''
          this.$message.error('请选择开始年份')
          return
        }
        e = parseInt(e)
        if(e < this.query.startY){
          this.query.endY = ''
          this.$message.error('结束年份须大于开始年份')
        }
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  .ys-tab-col-color{
    color: #DF1717!important;
  }
</style>
