# Form 表单

根据配置生成表单，用于收集、校验数据。
**该表单支持使用 `v-model` 指令进行数据双向绑定。**

## Form Attributes

| 参数           | 说明                             | 类型    | 可选值                     | 默认值                             |
| -------------- | -------------------------------- | ------- | -------------------------- | ---------------------------------- |
| value          | 表单数据对象                     | Object  | -                          | -                                  |
| disabled       | 是否禁用该表单内的所有组件       | Boolean | -                          | `false`                            |
| editable       | 是否可编辑，非编辑模式下只显示值 | Boolean | -                          | `true`                             |
| form-items     | 表单域配置                       | Array   | -                          | -                                  |
| form-keys      | 表单所有键名，支持多列配置       | Array   | -                          | (默认取所有 `form-items` 中的键名) |
| disabled-keys  | 禁用的键名                       | Array   | -                          | -                                  |
| hidden-keys    | 隐藏的表单域                     | Array   | -                          | -                                  |
| inline         | 行内表单模式                     | Boolean | -                          | `false`                            |
| label-position | 表单域标签的位置                 | String  | `'right'`/`'left'`/`'top'` | `'right'`                          |
| label-width    | 表单域标签宽度                   | String  | -                          | `'80px'`                           |
| label-suffix   | 表单域标签后缀                   | String  | -                          | -                                  |
| column-gutter  | 多列配置时列间距                 | Number  | -                          | 50                                 |

> `form-keys` 同时支持单列和多列的配置，单列配置的每个元素是一个表单域名称字符串，
> 多列配置的每个元素都是一个对象，`col` 表示列宽，`keys` 表示该列的所有表单域名称，
> 示例如下: `[{ col: { span: 12 }, keys: ['a'] }, { col: { span: 12 }, keys: ['b'] }]`

### Form Item Config

`form-items` 数组中的每个元素都是一个对象，表示一个表单域的配置。
一部分配置是通用配置，对于不同的类型又有不同的选项可以配置。
其主要可选的配置如下：

| 键名        | 说明                                                                            | 类型                                                        | 示例                                                                         |
| ----------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| key         | **必选**，表单域名称                                                            | String                                                      | -                                                                            |
| type        | **必选**，表单域类型                                                            | String                                                      | text/textarea/combo/radio/checkbox/switcher/time/date/custom                 |
| label       | 表单域显示的名称                                                                | String                                                      | -                                                                            |
| default     | 默认值                                                                          | Any                                                         | -                                                                            |
| rules       | 表单域的校验规则                                                                | Array                                                       | `['required', 'email']`/`[{ required: true, message: '' }]`                  |
| trigger     | 表单域校验时机。默认为 change，如果是 price 组件，建议使用 blur                 | String                                                      | `'blur'` / `'change'`                                                        |
| placeholder | 表单域的提示文字                                                                | String                                                      | -                                                                            |
| props       | 直接传递给组件的选项，*不推荐使用*                                              | Object                                                      | -                                                                            |
| tips        | 表单项提示信息，显示在输入项之后                                                | String / Function(h, config)                                | -                                                                            |
| prefix      | **[text]** 输入框的前缀                                                         | String                                                      | -                                                                            |
| suffix      | **[text]** 输入框的后缀                                                         | String                                                      | -                                                                            |
| options     | **[combo, radio, checkbox]** 选项列表，每个选项有 value, label 和 disabled 配置 | Array / Object / Function(params)                           | `[{ value: '0', label: '女' }, { value: '1', label: '男', disabled: true }]` |
| onLabel     | **[switcher]** 开启时的文字                                                     | String                                                      | `'开启'`                                                                     |
| offLabel    | **[switcher]** 关闭时的文字                                                     | String                                                      | `'关闭'`                                                                     |
| onValue     | **[switcher]** 开启时的值                                                       | String                                                      | -                                                                            |
| offValue    | **[switcher]** 关闭时的值                                                       | String                                                      | -                                                                            |
| render      | **[custom]** 自定义组件的渲染函数                                               | Function(h: Function, decorator: Function(options: Object)) | `(h, decorator) => (<div>{decorator()(<Input />)}</div>)`                    |

> 自定义表单域的 `render` 配置提供了一个 `decorator` 函数，使用该函数包裹支持 `v-model` 指令的组件，
> 可以方便地将该表单域的数据收集到 form 组件所绑定的数据对象中。

### Form Item Rules Config

表单项支持校验，校验规则 `rules` 为一个对象数组，其中预设了一部分常用校验，可用预设的字符串直接替换对象。
预设的部分校验规则如下：

| 名称           | 说明                                            | 参数                     | 示例                          |
| -------------- | ----------------------------------------------- | ------------------------ | ----------------------------- |
| required       | 是否必填                                        | -                        | -                             |
| required_price | 是否必填（用于input-price）                     | -                        | -                             |
| required_array | 是否必填（用于校验数组）                         | -                        | -                             |
| required_wi    | 是否必填（用于单选window-input）                | -                        | -                             |
| required_group | 是否必填（用于text、select、date等的group组件） | -                        | -                             |
| digit          | 数字                                            | -                        | -                             |
| alphaNum       | 英文字母或数字                                  | -                        | -                             |
| positiveInt    | 正整数                                          | -                        | -                             |
| nonNegativeInt | 非负整数                                        | -                        | -                             |
| noSpecial      | 非特殊字符                                      | -                        | -                             |
| noCharacter    | 非中文字符                                      | -                        | -                             |
| stringLength   | 字符串长度                                      | min: 最小值，max: 最大值 | `'stringLength?min=0&max=50'` |
| desc           | 描述或说明                                      | -                        | -                             |
| phone          | 手机号                                          | -                        | -                             |
| email          | 电子邮件                                        | -                        | -                             |
| idcard         | 身份证号码                                      | -                        | -                             |
| code           | 编码                                            | -                        | -                             |
| name           | 名称                                            | -                        | -                             |

> 表单项的校验规则参见 [async-validator](https://github.com/yiminghe/async-validator)。

#### FormItem Type

表单项配置中有一个关键属性 `type` 用来控制表单项渲染出的控件，配置不同类型的 `type` 时支持配置不同的参数，详见下表：

| 类型       | 对应控件       | 支持的配置                           |
| ---------- | -------------- | ------------------------------------ |
| text       | 单行文本输入框 | prefix，suffix                       |
| textarea   | 多行文本输入框 | -                                    |
| combo      | 下拉单选框     | options                              |
| comboRange | 下拉单选范围   | options                              |
| radio      | 单选按钮       | options                              |
| checkbox   | 复选框         | options                              |
| switcher   | 滑动开关       | onValue, offValue, onLabel, offLabel |
| date       | 日期           | -                                    |
| dateRange  | 日期范围       | -                                    |
| price      | 价格数字       | -                                    |
| priceRange | 价格数字区间   | -                                    |
| custom     | 自定义渲染     | render: Function(decorator)          |

## Form Methods

| 方法名            | 说明                                                                                                                                                                 | 参数                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| validate          | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object))                     |
| validateField     | 对部分表单字段进行校验的方法                                                                                                                                         | Function(field: string, callback: Function(errorMessage: string)) |
| resetFields       | 重置表单，将表单域字段重置为初始值并移除校验效果                                                                                                                     | Function(fields?: string[])                                       |
| clearFields       | 清空表单域，将表单域字段重置为默认值并移除校验效果, isReset 传入 true 可重置表单初始值                                                                               | Function(fields?: string[], isReset?: boolean)                    |
| clearValidate     | 移除整个表单的校验效果                                                                                                                                               | -                                                                 |
| hasModified       | 判断表单或部分表单域是否发生过修改                                                                                                                                   | Function(fields?: string[]): Boolean                              |
| updateInitialData | 更新表单记录的初始值，用以纠正调用 `resetFields` 时的数据                                                                                                            | Function(data?: object)                                           |
| setValidateStatus | 设置表单的校验状态                                                                                                                                                   | Function(errors: Object)                                          |

## Form Events

| 事件名称 | 说明                 | 回调参数                                                                        |
| -------- | -------------------- | ------------------------------------------------------------------------------- |
| change   | 表单域发生改变时触发 | 表单域键名(key)，表单域的值(value), 是否为初始化阶段(isInitial)，旧值(oldValue) |

> 表单在首次加载时会触发 change 事件，同时提供第三个参数 isInitial 设置为 true。

## Public API

- `SET_FORM_RULES(rules: { [name: string]: object })`
  设置表单内置校验规则（同时适用于表格组件验证）
- `SET_FORM_PARSERS(parsers: { [type: string]: (h: Function, params: any, decorator: Function) => VueElement })`
  设置表单内置类型解析器（同时适用于表格组件）

## Demo

### 基本用法

```html
<template>
  <h-form
    inline
    v-model="formData"
    :form-items="formItems"
  ></h-form>
</template>
<script>
  export default {
    data() {
      return {
        formItems: [{
          key: 'name',
          type: 'text',
          label: '姓名',
          prefix: 'Mrs.',
          placeholder: '尊名',
          tips: '您的尊姓大名？',
          rules: ['required'],
          props: {
            width: 200,
          },
        }, {
          key: 'gender',
          type: 'radio',
          label: '性别',
          options: [{ value: '0', label: '女' }, { value: '1', label: '男' }],
        }],
        formData: {},
      };
    }
  };
</script>
<!-- form-basic-usage.vue -->
```

### 表单联动

```html
<template>
  <div>
    <div style="width: 800px">
      <h-form
        ref="form"
        v-model="formData"
        label-width="90px"
        :form-items="formItems"
        :form-keys="formKeys"
        :disabled-keys="disabledKeys"
        :hidden-keys="hiddenKeys"
        @change="handleFormChange"
      ></h-form>
      <Button v-shortcut="'global.confirm'" @click="handleSubmit">
        提交
      </Button>
      <Button @click="handleReset">
        重置
      </Button>
      <Button @click="handleClear">
        清空
      </Button>
      <Button @click="handleSetValidate">
        设置校验
      </Button>
    </div>
  </div>
</template>

<script>
import { Input, Button } from 'element-ui';

function getFormItems() {
  return [{
    key: 'name',
    label: '姓名',
    type: 'text',
    placeholder: '报上名来！',
    rules: ['required'],
    props: {
      attrs: {
        size: 'mini',
      },
      style: {
        width: '100px',
      },
    },
  }, {
    key: 'gender',
    label: '性别',
    type: 'radio',
    // default: '0',
    options: [{
      value: '0',
      label: '女',
      isDefault: true,
    }, {
      value: '1',
      label: '男'
    }],
  }, {
    key: 'age',
    label: '年龄',
    type: 'custom',
    rules: ['required'],
    render(h, decorator) {
      return (
        <div>
          {decorator()(
            <h-input type="numInput" width="60px" />
          )}
        </div>
      );
    },
  }, {
    key: 'city',
    label: '城市',
    type: 'checkbox',
    options: [{
      value: 'shanghai',
      label: '上海',
    }, {
      value: 'beijing',
      label: '北京',
    }, {
      value: 'guangzhou',
      label: '广州',
    }, {
      value: 'shenzhen',
      label: '深圳',
      disabled: true,
    }],
    // default: 'shanghai',
    rules: [{ required: true, type: 'array' }],
    props: {
      style: { width: '160px' },
    },
  }, {
    key: 'relocate',
    type: 'checkbox',
    offValue: '1',
    options: {
      value: '2',
      label: '接受组织安排',
    },
    style: {
      marginTop: '-15px',
    },
  }, {
    key: 'price',
    label: '价格',
    type: 'price',
    // default: '0',
    // trigger: 'blur',
    rules: ['required_price', 'positive'],
  }, {
    key: 'dateOrRange',
    type: 'group',
    title: '出售时间',
    mode: 'single',
    default: 'date',
    items: [{
      key: 'date',
      type: 'date',
      label: '日期',
      placeholder: '请选择日期',
      rules: ['required'],
    }, {
      key: 'dateRange',
      type: 'dateRange',
      label: '时间段',
    }],
  }, {
    key: 'hasEmail',
    label: '开启邮箱',
    type: 'switcher',
  }, {
    key: 'email',
    label: '邮箱',
    type: 'text',
    rules: ['email', 'required'],
    style: {
      marginBottom: '10px',
    }
  }];
};

export default {
  name: 'ex-form',

  components: { Button },

  data() {
    return {
      formItems: getFormItems.call(this),
      formKeys: [{
        col: { xs: { span: 24 }, md: { span: 8 } },
        keys: ['name', 'gender', 'age', 'city', 'relocate'],
      }, {
        col: { xs: { span: 24 }, md: { span: 16 } },
        keys: ['price', 'dateOrRange', 'hasEmail', 'email'],
      }],
      formData: {
        name: 'Lucy',
        // city: ['shanghai', 'beijing'],
      },
      disabledKeys: [],
      hiddenKeys: [],
    };
  },

  methods: {
    handleFormChange(key, value, isInitial, oldValue) {
      console.log('>>> form change: ', key, value, oldValue, isInitial);
      switch (key) {
        // 表单联动 启用/禁用
        case 'gender':
          if (value === '0') {
            this.disabledKeys.push('age');
          } else {
            this.disabledKeys = this.disabledKeys.filter(key => key !== 'age');
          }
          break;
        // 表单联动 显示/隐藏
        case 'hasEmail':
          if (value === '1') {
            this.hiddenKeys = this.hiddenKeys.filter(k => k !== 'email');
          } else {
            this.hiddenKeys.push('email');
          }
          break;
        default:
          break;
      }
    },

    handleSubmit() {
      this.$refs.form.validate((isValid) => {
        if (!isValid) return;
        this.$refs.form.updateInitialData();
        console.log(this.formData);
      });
    },

    handleReset() {
      this.$refs.form.resetFields();
    },

    handleClear() {
      if (this.$refs.form.hasModified()) {
        this.$confirmSave({
          message: '数据已修改，是否保存？',
          onDrop: () => this.$refs.form.clearFields(),
        });
      } else {
        this.$refs.form.clearFields();
      }
    },

    handleSetValidate() {
      this.$refs.form.setValidateStatus({
        name: '名字太长！',
      });
    },
  },
}
</script>
<!-- form-advanced-usage.vue -->
```
