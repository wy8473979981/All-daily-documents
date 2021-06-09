<script>
/* eslint-disable */
const WIDTH = '178px'
const LABEL_WIDTH = '100px'
export default {
  name: 'YsNForm',

  model: {
    prop: 'formData',
    event: 'input'
  },

  props: {
    formData: Object,
    config: Array,
  },

  data() {
    return {
      form: {}
    }
  },

  methods: {
    handleChange(key, value) {
      // console.log('key', key, 'value', value, 'form', this.form)
      this.$emit('input', {...this.form})
      this.$emit('change', key, value)
    },

    customEvent(type, data) {
      this.$emit(type, data)
    },

    resetFields() {
      this.$refs.form.resetFields()
    },

    validate() {
      return this.$refs.form.validate
    }
  },

  render(h) {
    const renderFormItemChild = (data) => {
      let item = null
      const { key, type, props, ...others } = data
      const ps = {
        props: {
          key,
          clearable: true,
          size: 'mini',
          ...props,
          ...others
        },
        nativeOn: {}
      }
      others.clearable = true
      switch (type) {
        case 'text':
          ps.attrs = { ...others }
          item = (
            <div>{ this.form[key] }</div>
          )
          break
        case 'input':
          ps.attrs = { ...others }
          item = (
            <el-input v-model={this.form[key]} placeholder={ps.props.placeholder || '请输入'}  {...ps} on-input={() => this.handleChange(key, this.form[key])} style={{ width: ps.props.width ? ps.props.width : WIDTH }}/>
          )
          break
        case 'textarea':
          ps.attrs = { ...others }
          item = (
            <el-input v-model={this.form[key]} placeholder={ps.props.placeholder || '请输入'} {...ps} type="textarea" on-input={() => this.handleChange(key, this.form[key])} style={{ width: ps.props.width ? ps.props.width : WIDTH }}/>
          )
          break
        case 'select':
          {
            ps.attrs = { ...others }
            const Options = typeof ps.props.options === 'function' ? ps.props.options() : ps.props.options;
            item = <el-select v-model={this.form[key]} placeholder={ps.props.placeholder || '请选择'} {...ps} on-change={(val) => this.handleChange(key, val)} style={{ width: ps.props.width ? ps.props.width : WIDTH }}>
              {
                Options.map((item, index) => {
                  return <el-option
                    key={index}
                    label={item.label}
                    value={item.key}>
                  </el-option>
                })
              }
            </el-select>
          }
          break;
        case 'radioGroup':
          {
            ps.attrs = { ...others }
            const Options = typeof ps.props.options === 'function' ? ps.props.options() : ps.props.options;
            item = <el-radio-group v-model={this.form[key]} {...ps} on-change={(val) => this.handleChange(key, val)} style={{ width: ps.props.width ? ps.props.width : WIDTH }}>
              {
                Options.map((item, index) => {
                  return <el-radio
                    key={index}
                    label={item.key}>{item.label}
                  </el-radio>
                })
              }
            </el-radio-group>
          }
          break;
        case 'checkboxGroup':
          {
            ps.attrs = { ...others }
            const Options = typeof ps.props.options === 'function' ? ps.props.options() : ps.props.options;
            item = <el-checkbox-group v-model={this.form[key]} {...ps} on-change={(val) => this.handleChange(key, val)} style={{ width: ps.props.width ? ps.props.width : WIDTH }}>
              {
                Options.map((item, index) => {
                  return <el-checkbox
                    key={index}
                    label={item.key}>
                  {item.label}
                  </el-checkbox>
                })
              }
            </el-checkbox-group>
          }
          break;
        case 'checkbox':
          {
            ps.attrs = { ...others }
            item = <el-checkbox v-model={this.form[key]} {...ps} on-change={(val) => this.handleChange(key, val)} style={{ width: ps.props.width ? ps.props.width : WIDTH }}>
            {ps.props.label}
            </el-checkbox>
          }
          break;
        case 'date':
          item = (
            <el-date-picker v-model={this.form[key]} {...ps} on-change={(val) => this.handleChange(key, val)} style={{ width: ps.props.width ? ps.props.width : WIDTH }} />
          )
          break;
        case 'dateRange':{
          const startOptions = {
            props: {
              pickerOptions: {
                disabledDate: (time) => {
                  if (this.form[data.endKey]) {
                    return time.getTime() > new Date(`${this.form[data.endKey]}`).getTime()
                  }
                  return false
                }
              },
              valueFormat: data.props.valueFormat || 'yyyy-MM-dd 00:00:00',
              placeholder: data.props.startPlaceholder || '查询起始日'
            }
          }
          const endOptions = {
            props: {
              pickerOptions: {
                disabledDate: (time) => {
                  if (this.form[data.startKey]) {
                    return time.getTime() < new Date(`${this.form[data.startKey]}`).getTime() - 24 * 60 * 60 * 1000
                  }
                  return false
                }
              },
              valueFormat: data.props.valueFormat || 'yyyy-MM-dd 23:59:59',
              placeholder: data.props.endPlaceholder || '查询截止日'
            }
          }
          // this.form[data.prop] = (this.form[data.startKey] && this.form[data.endKey]) ? this.form[data.startKey] : ''
          item = (
            <section style="display: flex; justify-content: space-between;">
              <el-form-item prop={data.startKey} style="margin-right: 0;">
                <el-date-picker v-model={this.form[data.startKey]} {...ps} {...startOptions} on-change={(val) => this.handleChange(`${data.startKey}`, val)} style={{ width: WIDTH }}/>
              </el-form-item>
              <span style="width: 20px; color: #C9C9C9; text-align: center; font-size: 18px;">~</span>
              <el-form-item prop={data.endKey} style={{ margin: '5px 0;' }}>
                <el-date-picker v-model={this.form[data.endKey]} {...ps} {...endOptions} on-change={(val) => this.handleChange(`${data.endKey}`, val)} style={{ width: WIDTH }} />
              </el-form-item>
            </section>
          )
        }
          break
        case 'custom':
          item = data.render(h, data, this.customEvent)
          break;
        default:
          item = (
            <el-input v-model={this.form[key]} {...ps} on-change={(val) => this.handleChange(key, val)} style={{ width: ps.props.width ? ps.props.width : WIDTH }} />
          )
      }
      return item
    }

    const renderChild = (data) => {
      const { key, type, labelRender, defaultRender, label, props, ...itemProps } = data
      const labelVnode = labelRender && this.$scopedSlots[labelRender]
      const ps = { // Vue Data Object (https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth)
        props: {
          key,
          prop: key,
          label,
          ...itemProps
        },
        class: {
          'empty-label': !label && !labelVnode
        },
        scopedSlots: {}
      }
      if (defaultRender && this.$scopedSlots[defaultRender]) {
        ps.scopedSlots.default = (props) => this.$scopedSlots[defaultRender](props)
      }
      if (labelVnode) {
        ps.scopedSlots.label = (props) => labelVnode(props)
      }
      const cProps = {
        key,
        type,
        props,
        ...itemProps,
      }
      return (
        <el-form-item {...ps} class="form-item">
          { renderFormItemChild(cProps) }
        </el-form-item>
      )
    }

    const ps = {
      props: {
        model: this.form,
        ...this.$attrs
      },
      nativeOn: {
        submit: (e) => { e.preventDefault() } // 阻止默认提交
      }
    }
    const LABELWIDTH = this.$attrs['label-width'] || LABEL_WIDTH
    return (
      // <div>
        <el-form inline={false} label-position="right" ref="form" label-width={LABELWIDTH} class="ys-form" {...ps}>
          { this.config.map((item) => renderChild(item)) }
        </el-form>
      // </div>
    )
  },

  watch: {
    formData: {
      handler: function() {
        console.log('formData', JSON.stringify(this.formData))
        Object.keys(this.formData).forEach(key => {
          this.$set(this.form, key, this.formData[key])
        })
      },
      deep: true,
      immediate: true
    }
  }
}
</script>