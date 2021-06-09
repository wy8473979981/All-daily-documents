import successUrl from '../../../assets/images/indexSuccess.png'
import failUrl from '../../../assets/images/indexFail.png'
import totalUrl from '../../../assets/images/indexTotal.png'
let optionsList = {
	requestOption: {
		precision:0,
		title: {
			text: '每日请求总数',
			textStyle: {
				color: '#1C1C1C',
				fontSize: "14",
				lineHeight: '36'
			}
		},
		grid: {
			right: '130',
		},
		color: ['#4876EF','#32C88E', '#F4647E'],
		legend: {
			selectedMode: false,
			top: 25,
			right: 0,
			orient: 'vertical',
			align: 'left',
			itemWidth: 20, //图标宽
			data: [{
					name: '总次数',
					textStyle: {
						fontSize: 12,
						fontWeight: 'bolder',
						color: '#8893A3',
						padding: [0, 0, 0, 16]
					},
					icon: 'image://' + totalUrl
				},
				{
					name: '成功次数',
					textStyle: {
						fontSize: 12,
						fontWeight: 'bolder',
						color: '#8893A3',
						padding: [0, 0, 0, 16]
					},
					icon: 'image://' + successUrl
				},
				{
					name: '失败次数',
					textStyle: {
						fontSize: 12,
						fontWeight: 'bolder',
						color: '#8893A3',
						padding: [0, 0, 0, 16]
					},
					icon: 'image://' + failUrl
				}
			]
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: [],
		},
		series: [{
				name: '总次数',
				type: 'line',
				stack: '总量',
				data: [],
				symbol: 'circle', //拐点设置为实心
				itemStyle: {
					emphasis: {
						color: '#4876EF', //hover拐点颜色定义
						borderColor: 'rgba(72,118,239,0.3)', //拐点边框颜色
						borderWidth: 5, //拐点边框大小,
						fontSize: 10
					}
				},
				emphasis: {
					scale: false
				}
			},{
				name: '成功次数',
				type: 'line',
				data: [],
				symbol: 'circle', //拐点设置为实心
				itemStyle: {
					emphasis: {
						color: '#32C88E', //hover拐点颜色定义
						borderColor: 'rgba(50,200,142,0.3)', //拐点边框颜色
						borderWidth: 5, //拐点边框大小
						scale: false
					}
				},
				emphasis: {
					scale: false,
					focus: 'series'
				}
			},
			{
				name: '失败次数',
				type: 'line',
				data: [],
				symbol: 'circle', //拐点设置为实心
				itemStyle: {
					emphasis: {
						color: '#F4647E', //hover拐点颜色定义
						borderColor: 'rgba(244,100,126,0.3)', //拐点边框颜色
						borderWidth: 5 //拐点边框大小
					}
				},
				emphasis: {
					scale: false
				}
			}
		]
	},
	appOption: {
		precision:0,
		singType:true,
		title: {
			text: '应用调用统计',
			textStyle: {
				color: '#1C1C1C',
				fontSize: "14",
				lineHeight: '36'
			}
		},
		xAxis: {
			type: 'category',
			data: [],
		},
		series: {
			type: 'bar',
			barWidth: 20, //柱图宽度
			data: []
		}
	},
	successOption: {
		title: {
			text: '成功比例图',
			textStyle: {
				color: '#1C1C1C',
				fontSize: "14",
				lineHeight: '36',
				fontWeight: 'bolder'
			}
		},
		color: ['#32C88E', '#F4647E'],
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '0',
			left: 0,
			top: 25,
			right: 0,
			orient: 'vertical',
			align: 'left',
			icon: 'rect',
			itemWidth: 8, //图标宽
			itemHeight: 8, //图标宽
			itemGap: 10, // 设置间距
			data: [{
				'name': '成功'
			}, {
				'name': '失败'
			}, ]
		},
		xAxis: {
			show: false
		},
		yAxis: {
			show: false
		},
		tooltip: {
			trigger: 'item',
			backgroundColor: '#F0F2F7',
			padding: [10, 10, 10, 10],
			formatter: function(params) {
				let res;
				res = '<p style="color:#1C1C1C;line-height:30px">' + params.data.name +
					'</p><p style="color:#8893A3;line-height:30px">次数：<span style="color:#1C1C1C">' + params
					.data.value +
					'</span></p><p style="color:#8893A3;line-height:30px">占比：<span style="color:#1C1C1C">' +
					params.percent + '</span></p>'
				//'{b}\n次数：{c}\n占比：{d}%  '
				return res
			}
		},
		series: [{
			name: '成功比例图',
			type: 'pie',
			radius: ['40%', '55%'],
			avoidLabelOverlap: true,
			startAngle:270, //起始角度
			emphasis: {
				label: {
					show: true,
					fontSize: '40',
					fontWeight: 'bolder'
				}
			},
			labelLine: {
				showAbove :true,
				minTurnAngle:90,
				normal: {
					length: 4, //标识线
					lineStyle: {
						borderType: 'dotted', //dotted 虚线
						borderWidth: 1, // 虚线宽度
						type: 'dashed'
					},
					smooth: 0.2,
					length:10,
					length2: 10
				}
			},
			label: { //饼图图形上的文本标签
				position: 'outer',
				align:'left',
				alignTo:'edge',
				normal: {
					show: true,
					textStyle: {
						fontWeight: 300,
						fontSize: 10, //文字的字体大小
						textAlign: 'left',
					},
					formatter: '{a|{b}}\n{a|次数：{c}}\n{a|占比：{d}%}',
					align:'left',
					rich: {
						b: {
							color:'#1C1C1C',
							lineHeight:30
						},
						a: {
							color:'#8893A3',
							textAlign:'left',
							lineHeight:20
						}
					}
				}
			},
			data: [{
					value: 200,
					name: '成功'
				},
				{
					value: 735,
					name: '失败'
				}
			]
		}]
	}
}
export default optionsList
