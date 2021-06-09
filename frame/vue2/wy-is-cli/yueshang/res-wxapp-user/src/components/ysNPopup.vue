<template>
	<div class="popup">
		<van-popup v-model="show" position="top" v-if="type=='popup'" :style="{background:background,padding:'23px 23px'}" :close-on-click-overlay="false">
			<slot name="topSelect"></slot>
			<van-field
			  rows="3"
			  autosize
			  label=""
			  type="textarea"
			  :placeholder="placeholder"
			  show-word-limit
			  class="remark"
			/>
			<div class="operate-btn">
			   <van-button  v-for="(item, i) in buttonList" :key="i" :style="item.style" @click="getFc(item.fc)">{{item.name}}</van-button>
			</div>
		</van-popup>
		<div v-else>
			<van-field
			  rows="3"
			  autosize
			  label=""
			  type="textarea"
			  :placeholder="placeholder"
			  show-word-limit
			  class="remark"
			/>
			<div class="operate-btn">
			   <van-button  v-for="(item, i) in buttonList" :key="i" :style="item.style" @click="getFc(item.fc)">{{item.name}}</van-button>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
	  name: 'ysNPopup',
	  components: {
	  },
	  props: {
	    showPopup: {
	      type: Boolean,
	      default: false
	    },
		buttonList: {
		  type: Array,
		  default: []
		},
		background: {
		  type: String,
		  default:'transparent'
		},
		type: {
		  type: String,
		  default:''
		},
		placeholder: {
		  type: String,
		  default:''
		}
	  },
	  watch: {
	    showPopup: {
	      handler: function (newValue) {
	        this.show = newValue
	      },
	      // immediate: true,
	      // deep: true,
	    },
	  },
	  data () {
	    return {
	      show: this.showPopup
	    }
	  },
	  methods: {
		  getFc(fc) {
			  switch (fc) {
				case 'save':
				   this.$emit('onSave');
				   break;
				case 'cancel':
				   this.$emit('onCancel');
				   break;  
			  }
			    
		  }
	  }
	}
</script>

<style  lang="scss" scoped>
	.popup {
		.remark {
			padding: 8px 14px;
			border-radius: 8px;
			font-size:14px;
			line-height: 24px;
			color: rgba(120, 120, 120, 0.32);
			background: #FDFCFA;
		}
		.operate-btn {
			display: flex;
			align-items: center;
			justify-content : flex-end;
			padding-top: 20px;
			button {
				line-height: 32px;
				height: 32px;
				width: 80px;
				border:none;
				border-radius: 16px;
			}
		}
	}
</style>
