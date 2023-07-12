import successUrl from '../../../assets/images/success.png'
import failUrl from '../../../assets/images/fail.png'
import totalUrl from '../../../assets/images/total.png'
let optionsList  = {
	countTotalApi: {
		color: ['#32C88E', '#F4647E', '#4876EF'],
		legend: {
			data: [{
					name: '成功次数',
					textStyle: {
						fontSize: 12,
						fontWeight: 'bolder',
						color: '#1C1C1C'
					},
					icon: 'image://' + successUrl
				},
				{
					name: '失败次数',
					textStyle: {
						fontSize: 12,
						fontWeight: 'bolder',
						color: '#1C1C1C',
					},
					icon: 'image://' + failUrl
				},
				{
					name: '总次数',
					textStyle: {
						fontSize: 12,
						fontWeight: 'bolder',
						color: '#1C1C1C'
					},
					icon: 'image://' + totalUrl
				}
			]
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['04-05', '04-06', '04-07', '04-08', '04-09', '04-10', '04-11'],
		},
		series: [{
				name: '成功次数',
				type: 'line',
				data: [1, 2, 3, 4, 5, 6, 7],
				symbol: 'emptyCircle', //拐点设置为实心
				symbolSize: 8, //拐点大小
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
				data: [3, 2, 3, 2, 5, 5, 7],
				symbol: 'emptyCircle', //拐点设置为实心
				symbolSize: 8, //拐点大小
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
			},
			{
				name: '总次数',
				type: 'line',
				stack: '总量',
				data: [1, 9, 3, 0, 2, 5, 4],
				symbol: 'emptyCircle', //拐点设置为实心
				symbolSize: 8, //拐点大小
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
			}
		]

	},
	countTotal: {
		color: ['#32C88E', '#F4647E', '#4876EF'],
		legend: {
			data: [{
					name: '成功次数',
					textStyle: {
						fontSize: 12,
						fontWeight: 'bolder',
						color: '#1C1C1C'
					},
					icon: 'image://' + successUrl
				},
				{
					name: '失败次数',
					textStyle: {
						fontSize: 12,
						fontWeight: 'bolder',
						color: '#1C1C1C',
					},
					icon: 'image://' + failUrl
				},
				{
					name: '总次数',
					textStyle: {
						fontSize: 12,
						fontWeight: 'bolder',
						color: '#1C1C1C'
					},
					icon: 'image://' + totalUrl
				}
			]
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['04-05', '04-06', '04-07', '04-08', '04-09', '04-10', '04-11'],
		},
		series: [{
				name: '成功次数',
				type: 'line',
				data: [1, 2, 3, 4, 5, 6, 7],
				symbol: 'emptyCircle', //拐点设置为实心
				symbolSize: 8, //拐点大小
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
				data: [3, 2, 3, 2, 5, 5, 7],
				symbol: 'emptyCircle', //拐点设置为实心
				symbolSize: 8, //拐点大小
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
			},
			{
				name: '总次数',
				type: 'line',
				stack: '总量',
				data: [1, 9, 3, 0, 2, 5, 4],
				symbol: 'emptyCircle', //拐点设置为实心
				symbolSize: 8, //拐点大小
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
			}
		]
	
	},
}
export default optionsList