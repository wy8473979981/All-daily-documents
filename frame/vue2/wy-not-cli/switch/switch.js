Vue.component('vswitch', {
	props: ["switchobj"],
	data: function() {
		return {
			me_checked: null
		}
	},
	watch: {
      value(){
        this.me_checked = this.switchobj.value;
      }
    },
	template: `<div class="weui-div" @click.stop="toggle(me_checked)">
	    <span class="weui-switch" :class="[ me_checked == 0 ? 'weui-switch-on' : '']"></span>
	    <div v-if='me_checked == 2' class="weui-div-2">忙碌</div>
	    <div v-if='me_checked == 0' class="weui-div-1">就绪</div>
  	</div>`,
	created: function() {
		var self = this;
		self.me_checked = self.switchobj.value;
	},
	methods: {
		toggle(type) {
			var self = this;
			self.me_checked = type == 0 ? 2 :0;
			this.$emit('changeSwitchChild', self.me_checked);
		}
	}
})