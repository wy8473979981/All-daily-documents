## 自定义 项目选择
***
项目选择组件-ys

### 使用方式
#### 在 ``script`` 中引入组件：
```javascript
	import ysWatermark from '../../components/ys-n-project-select/index';
	export default {
        components: {ysNProjectSelect}
    }
```


#### 在 ``template`` 中使用组件:

```html
	<ysNProjectSelect :selected="selected" @projeSelected="projeSelected" :disabledAll="true"></ysNProjectSelect>
```

### **属性说明**

| 属性        | 类型     | 默认值  | 说明              |
| :---:       | :---:   | :---:   | :--------:        |
| selected    | Object  | 无      | 设置默认选中项目    |
| disabledAll | Boolean | false   | 是否可以选择全部项  |


### **数据格式**
```
[
  {
    "pinyincode": "AX",
    "projectShortName": "AX",
    "operStatus": "2",
    "mallId": 100,
    "bisProjectId": "402834702db81ec3012dbca135f20c6a",
    "shortName": "安溪",
    "orgCd": "596"
  },
  {
    "pinyincode": "BB",
    "projectShortName": "BB",
    "operStatus": "2",
    "mallId": 102,
    "bisProjectId": "40282b8927a42dff0127a4347f2b00fc",
    "shortName": "蚌埠",
    "orgCd": "358"
  }
]
```