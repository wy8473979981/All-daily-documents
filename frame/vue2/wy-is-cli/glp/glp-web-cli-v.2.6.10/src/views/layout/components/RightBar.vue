<template>
  <div class="right-bar">
    <div class="right-menu">
      <ul class="nav-list" >
        <li class="about-us" v-if="this.isShowEditPwd == 1"><a href="http://www.glp168.com" target="_blank"><svg-icon class="img mr3" :icon-class="'glp-guanyu'"></svg-icon>关于我们</a></li>
        <li class="follow-us" v-if="this.isShowEditPwd == 1">
           <el-dropdown>
              <span class="el-dropdown-link">
                <svg-icon class="img mr3" :icon-class="'glp-guanzstar'"></svg-icon>关注我们<i class="el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                  <div class="qr-code">  
                     <div class="imgs"><svg-icon :icon-class="'glp-code'" style="width:160px;height:160px;"></svg-icon></div>
                  </div>
              </el-dropdown-menu>
           </el-dropdown>
        </li>
        <li class="contact-us" v-if="this.isShowEditPwd == 1">
            <el-dropdown>
              <span class="el-dropdown-link">
                <svg-icon class="img mr3" :icon-class="'glp-lianxi'"></svg-icon>联系我们<i class="el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                  <div class="link-us">
                      <svg-icon class="kefu" :icon-class="'glp-kefu'"></svg-icon>
                      <div>客服电话</div>
                      <div>+86（21）6105 3999</div>
                      <div>工作日：9:00-18:00</div>
                  </div>
              </el-dropdown-menu>
            </el-dropdown>
        </li>
        <li>
            <el-dropdown>
              <span class="el-dropdown-link">
                <img src="~@/assets/img/avatar.png" alt="" style="width:24px;height:24px;position:relative;top:6px;margin-right:5px;"><span class="usergreen">{{userInfo.name}}</span><i class=" el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                  <div class="user-info">
                    <a @click="showEditPwdDialog" v-if="this.isShowEditPwd == 1" class="down-edit-pwd">修改密码</a>
                    <a @click="signOut" class="down-logout">退出登录</a>
                  </div>
              </el-dropdown-menu>
            </el-dropdown>
        </li>
      </ul>
        <!-- <span class="logout-span icon iconfont" @click="toList">&#xe67c;</span>
        <el-dropdown
          @command="getClickItem"
          :hide-on-click="true">
              <span class="el-dropdown-link logout-span">
                {{userInfo.name || ''}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="signOut" command="signOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
        </el-dropdown> -->
      <span v-if="changeColor" class="logout-span" @click="showThemeDialog">{{ $t('navbar.theme') }}</span>
    </div>
    <el-dialog :visible.sync="themeDialogVisible"
      :append-to-body="true"
      :title="$t('navbar.theme')" width="400px">
      <el-form
        :model="colors"
        :rules="rules"
        ref="form"
        class="theme-form"
        label-position="top"
        label-width="70px"
      >
        <el-form-item label="主题色" prop="primary">
          <el-color-picker v-model="colors.primary"></el-color-picker>
        </el-form-item>
        <el-form-item class="color-buttons">
          <el-button type="primary" @click="submitForm">切换</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
     <el-dialog title="修改密码" class="editPwd" :visible.sync="isShowEidtPwdDialog" @close="closeEidtPwdDialog" :modal-append-to-body='true' :append-to-body="true" :close-on-click-modal="false">
      <el-form :model="eidtAccountModel" :rules="rules" ref="eidtAccountModel" :label-position="'right'" label-width="90px" class="demo-ruleForm">
        <el-form-item label="旧密码">
          <el-input type="password" v-model="eidtAccountModel.oldPwd" placeholder="请输入旧密码" style="width:90%;"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="eidtAccountModel.newPwd" placeholder="请输入新密码" style="width:90%;"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input type="password" v-model="eidtAccountModel.confirmPwd" placeholder="请再次输入密码" style="width:90%;"></el-input>
        </el-form-item>
        <el-form-item style="margin:0 0 0 30px;">
          <el-button type="primary" @click="submitEidtPwd" style="margin-right:30px;">确定</el-button>
          <el-button @click="closeEidtPwdDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
  
</template>

<script>
import { mapGetters } from "vuex";
import commonApi from '@/api/common'
import generateColors from "@/utils/color";
import objectAssign from "object-assign";
import Cookies from 'js-cookie'
import Http from '@/api/common'
const defaultColor = '#409eff'
export default {
  components: {
  },
  data() {
    const colorValidator = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("主题色不能为空"));
      } else if (!/^#[\dabcdef]{6}$/i.test(value)) {
        return callback(new Error("请输入 hex 格式的主题色"));
      } else {
        callback();
      }
    };
     var validateConfirmPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.eidtAccountModel.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
        eidtAccountModel: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: "",
      },
      rules: {
        oldPwd: [{ required: true, message: '请输入旧密码', trigger: 'blur' },],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: "6-20位字符，由英文字母及数字组合，不允许空格，字母不限制大小写",
            trigger: ["blur"]
          }
        ],
        confirmPwd: [
          { validator: validateConfirmPwd, trigger: 'blur' },
        ]
      },
      isShowEidtPwdDialog: false,
      isSubmitting:false,             //是否正在请求数据
      changeColor:false,              //是否显示更改主体色
      colors: {
        primary: defaultColor
      },
      rules: {
        primary: [{ validator: colorValidator, trigger: "blur" }]
      },
      localColor:'',
      originalStylesheetCount: -1,
      originalStyle: "",
      themeDialogVisible: false,
      isShowEditPwd:1
    };
  },
  created() {
    //this.isShowEditPwd = sessionStorage.getItem("isShowEditPwd")
    let isShow = sessionStorage.getItem("isShowEditPwd")
    if(isShow == 1){
      this.isShowEditPwd = 1
    }else{
      this.isShowEditPwd = 2
    }
    this.isShowEditPwd=1;
    if(this.changeColor){
      this.getIndexStyle();
      this.localColor = localStorage.getItem('color')
    } 
  },
  mounted() {
    if(this.changeColor){
      this.$nextTick(() => {
        this.originalStylesheetCount = document.styleSheets.length
        this.colors.primary = this.localColor ? this.localColor : defaultColor
        this.initColor()
      });
    }
  },
  computed: {
    ...mapGetters(["name", "avatar", "device",'userInfo'])
  },
  methods: {
    toList (){
      this.$router.push(
        {
          path:'/permission/toList'
        }
      )
    },
    signOut() {
      if(this.isSubmitting==true){return}
      this.isSubmitting=true;
      let token=Cookies.get('token');
      commonApi.signOut({token}).then(
          res => {
              this.$message({
                  type:'success',
                  message:'退出成功！',
                  duration:1000,
                  onClose: () => {
                    this.$store.commit('signOut',{});
                    window.location.reload(true);
                    this.isSubmitting=false;
                  }
              })
          },
          err => {
              this.isSubmitting=false;
          }
      )
    },
    showEditPwdDialog(){//修改密码
      this.isShowEidtPwdDialog = true;
    },
    submitEidtPwd(){      
      this.$refs.eidtAccountModel.validate((valid) => {
        if(valid){
          let params = {
            oldPwd: this.eidtAccountModel.oldPwd,
            newPwd: this.eidtAccountModel.newPwd,
            confirmPwd: this.eidtAccountModel.confirmPwd,
          }

          Http.updateSuperManagerPwd(params).then(res => {
            if(res.code == 200){
              this.isShowEidtPwdDialog = false;
              this.$message.success("修改成功");
            }else{
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    closeEidtPwdDialog(){//关闭
      this.isShowEidtPwdDialog = false;
      this.$refs.eidtAccountModel.resetFields();
    },
    getClickItem (key){               //监听选择的下拉项
      if(key=='signOut'){
        this.signOut();
      }
    },
    showThemeDialog() {
      this.themeDialogVisible = true;
    },
    writeNewStyle() {
      document.getElementsByTagName('body')[0].style.setProperty('--color-primary', this.colors.primary);
      let cssText = this.originalStyle;
      Object.keys(this.colors).forEach(key => {
        cssText = cssText.replace(
          new RegExp("(:|\\s+)" + key, "g"),
          "$1" + this.colors[key]
        );
      });

      if (this.originalStylesheetCount === document.styleSheets.length) {
        const style = document.createElement("style");
        style.innerText = cssText;
        document.head.appendChild(style);
      } else {
        document.head.lastChild.innerText = cssText;
      }
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.themeDialogVisible = false;
          this.colors = objectAssign(
            {},
            this.colors,
            generateColors(this.colors.primary)
          );

          this.writeNewStyle();
          localStorage.setItem('color', this.colors.primary)
        } else {
          return false;
        }
      });
    },
    getIndexStyle() {
      this.getFile("//unpkg.com/element-ui/lib/theme-chalk/index.css").then(
        ({ data }) => {
          this.originalStyle = this.getStyleTemplate(data);
        }
      );
    },
    getStyleTemplate(data) {
      const colorMap = {
        "#3a8ee6": "shade-1",
        "#409eff": "primary",
        "#53a8ff": "light-1",
        "#66b1ff": "light-2",
        "#79bbff": "light-3",
        "#8cc5ff": "light-4",
        "#a0cfff": "light-5",
        "#b3d8ff": "light-6",
        "#c6e2ff": "light-7",
        "#d9ecff": "light-8",
        "#ecf5ff": "light-9"
      };
      Object.keys(colorMap).forEach(key => {
        const value = colorMap[key];
        data = data.replace(new RegExp(key, "ig"), value);
      });
      return data;
    },
    getFile (url, isBlob = false) {
        return new Promise((resolve, reject) => {
          const client = new XMLHttpRequest()
          client.responseType = isBlob ? 'blob' : ''
          client.onreadystatechange = () => {
            if (client.readyState !== 4) {
              return
            }
            if (client.status === 200) {
              const urlArr = client.responseURL.split('/')
              resolve({
                data: client.response,
                url: urlArr[urlArr.length - 1]
              })
            } else {
              reject(new Error(client.statusText))
            }
          }
          client.open('GET', url)
          client.send()
        })
      },
    resetForm() {
    //   this.$refs.form.resetFields();
        this.colors.primary = defaultColor
    },
    initColor(){
        this.colors = objectAssign(
            {},
            this.colors,
            generateColors(this.colors.primary)
          );
          this.writeNewStyle();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.logout-span {
  cursor: pointer;
  font-size: 14px;
  color: rgb(7, 142, 52);
  padding-right: 20px;
}
.right-bar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
   .nav-list{
       float: left;
       li{
         display:inline-block;
         list-style-type:none;
         color:#333333;
         font-size:14px;
         line-height: 20px;
         margin-right:15px;
         cursor: pointer;
         .mr3{
           margin-right:5px;
         }
       }
      .el-dropdown-link {
        cursor: pointer;
      }
      
    }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }

    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
  
  .product-tips .el-dialog__body{padding-top:0;line-height:24px;}
  .editPwd .el-dialog__body{padding-top:10px;padding-bottom:20px;}
  .editPwd .el-dialog__title, .el-dialog__title{font-weight:bold;display:block;text-align:center;}
  ul{margin:0;padding:0;}
.about-us a:hover{color:rgb(42, 182, 104);}
.follow-us .el-dropdown-link:hover{color:#FF902A;}
.contact-us .el-dropdown-link:hover{color:rgb(74, 144, 226);}
</style>
