#### 表单组件 Able
- 显示表单集合的组件
- 基本配置
```
config = [
  {
    key, // 表单绑定的字段
    label, // 表单显示的标题
    type, // 表单类型， text input textarea select checkbox radio checkboxGroup radioGroup date dateRange
    props, // 对于渲染出来的表单的补充配置 如select的options，  input的width，placeholder等等
    others // 额外的对el-form-item的配置 
  }
]
```
- 支持 type = custom 自定义组件