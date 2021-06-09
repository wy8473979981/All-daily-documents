## 自定义水印添加
***
水印定制组件-ys

### 使用方式
#### 在 ``script`` 中引入组件：
```javascript
	import ysWatermark from '../../components/ys-n-watermark/watermark';
	export default {
        components: {ysWatermark}
    }
```

#### 在 ``template`` 中使用组件:

```html
	<ys-n-watermark text="这是水印信息"></ys-n-watermark>
```

### **属性说明**

| 属性 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :--------: |
| text | String | 无 | 设置水印文字 注：(文字优先图片) |
| imgUrl | String | 无 | 设置水印图片链接 注：(文字优先图片) |
| opacity | Number,String | 0.6 | 设置显示透明度 |
| num | Number | 20 | 设置水印数量 |

