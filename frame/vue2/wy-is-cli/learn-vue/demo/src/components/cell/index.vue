<script>

export default {
  name: 'ECell',
  //允许传入的参数
  props: {
    label: {
      type: String,
      default: 'T'
    },
    value: {
      type: String,
      default: '(T (共2888点，抵20元))'
    }
  },

  data () {
    return {
      check: false,
    }
  },
  //绑定一个事件， 通知是否被点击
  methods: {
    change () {
      this.check = !this.check
      this.$emit('change', { evt: this.label, select: this.check })
    },
  },
  // render  vue官方对 h 的描述 这是一个约定
  render (h) {
    const { label, value, check, change } = this
    return (
      <div class={'e-cell'}>
        <div class={'e-cell--content'}>
          <span class={'e-cell--label'}>{label}111</span>
          {
            this.$slots.default
              ? h('i', this.$slots.default)
              : <div class={'e-cell--value'}>{value}222</div>
          }

        </div>
        <div class={'e-cell--right'} on-click={change.bind(this)}>
          {
            check
              ? <span class={'e-cell-icon'}></span>
              : ''
          }
        </div>
      </div>
    )
  },
}
</script>

