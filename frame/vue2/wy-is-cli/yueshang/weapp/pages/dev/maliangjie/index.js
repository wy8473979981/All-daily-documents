const app = getApp()
let times = 0;

Page({
  data: {
    checkboxes: [{
        label: "面积",
        key: "square",
        unit: "%",
        width: "120rpx",
      },
      {
        label: "招商率",
        key: "zsRate",
        unit: "%",
        width: "120rpx",
      },
      {
        label: "开业率",
        key: "kyRate",
        unit: "%",
        width: "120rpx",
      },
      {
        label: "日均客流(万/天)",
        key: "actualFlowDay",
        width: "220rpx",
        align: "right",
      },
      {
        label: "渗透率(人/㎡/天)",
        key: "permeability",
        width: "220rpx",
        align: "right",
      },
      {
        label: "租金收缴率",
        key: "zjRate",
        width: "220rpx",
        align: "right",
      }
    ],
    groups: [{
        label: '分组一',
        maxnum: 1,
        items: [{
          label: '分组一：数据1',
        }, {
          label: '分组一：数据2'
        }]
      },
      {
        label: '分组二',
        maxnum: 2,
        items: [{
          label: '分组二：数据1'
        }, {
          label: '分组二：数据2'
        }, {
          label: '分组二：数据3'
        }]
      }
    ]
  },
  onLoad: function () {

  },
  onClick() {
    // times++;
    // app.request
    //   .options({ loading: times % 2 })
    //   .get('https://www.baidu.com')
    //   .then(res => {
    //     console.log(res);
    //   });
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
    })
  },
  onProjectSelected(e) {
    console.log('onProjectSelected',e);
  },
  onSelectedChanged(values) {
    console.log(values);
  },
  onTabChanged(e) {
    console.log(e);
  },
  onDateChanged(e) {
    console.log(e);
  }
})