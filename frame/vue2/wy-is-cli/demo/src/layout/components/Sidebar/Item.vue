<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render (h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon]} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon} />)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
  position: absolute;
  left: 15px;
}
.el-icon-star-icon {
  background: url("../../../assets/images/star.png") no-repeat center top;
  background-size: auto 100%;
  background-origin: content-box;
  width: 23px;
  height: 23px;
  position: absolute;
  left: 9px;
  top: 4px;
  margin-right: 0px;
}
.el-icon-attention-icon {
  background: url("../../../assets/images/attention.png") no-repeat center top;
  background-size: auto 100%;
  background-origin: content-box;
  width: 23px;
  height: 23px;
  position: absolute;
  left: 9px;
  top: 5px;
  margin-right: 0px;
}
</style>
