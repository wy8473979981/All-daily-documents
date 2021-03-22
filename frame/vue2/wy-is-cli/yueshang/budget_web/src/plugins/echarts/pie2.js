import echarts from 'echarts'

export default function optionData (option) {
  option.color = option.color || ['#05def9', '#1dc6da']
  option.fontColor = option.fontColor || '#3085e7'
  return {
    backgroundColor: '#fff',
    series: [{
      name: '空铺商家面积',
      center: ['15%', '50%'],
      radius: ['73', '75'],
      clockWise: false,
      hoverAnimation: false,
      type: 'pie',
      data: [{
        value: option.data[0],
        name: '',
        label: {
          normal: {
            rich: {
              a: {
                color: '#333333',
                align: 'center',
                fontSize: 32,
                fontWeight: 'bold'
              },
              b: {
                color: '#333333',
                align: 'center',
                fontSize: 12
              }
            },
            formatter: function (params) {
              return '{a|' + params.value + '%}' + '\n\n{b|空铺}' + '\n\n{b|商家面积}'
            },
            position: 'center',
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal',
              color: '#fff'
            }
          }
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          normal: {
            color: '#5886f0',
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#00FFC7'
            }, {
              offset: 1,
              color: '#4930EF'
            }]),
            borderWidth: 14
          },
          emphasis: {
            color: '#5886f0',
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#85b6b2'
            }, {
              offset: 1,
              color: '#6d4f8d'
            }]),
            borderWidth: 14
          }
        }
      }, {
        name: '',
        value: 100 - option.data[0],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            color: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0
          },
          emphasis: {
            color: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0
          }
        }
      }]
    }, {
      name: '外圈',
      center: ['15%', '50%'],
      radius: ['82', '83'],
      clockWise: false,
      hoverAnimation: false,
      type: 'pie',
      data: [{
        value: 84,
        name: '',
        labelLine: {
          show: false
        },
        itemStyle: {
          normal: {
            color: '#0053FF'
          },
          emphasis: {
            color: '#0053FF'
          }
        }
      }, {
        name: '',
        value: 16,
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            color: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0
          },
          emphasis: {
            color: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0
          }
        }
      }]
    }, {
      name: '免租期商家面积',
      center: ['38%', '50%'],
      radius: ['73', '75'],
      clockWise: false,
      hoverAnimation: false,
      type: 'pie',
      data: [{
        value: option.data[1],
        name: '',
        label: {
          normal: {
            rich: {
              a: {
                color: '#333333',
                align: 'center',
                fontSize: 32,
                fontWeight: 'bold'
              },
              b: {
                color: '#333333',
                align: 'center',
                fontSize: 12
              }
            },
            formatter: function (params) {
              return '{a|' + params.value + '%}' + '\n\n{b|免租期}' + '\n\n{b|商家面积}'
            },
            position: 'center',
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal',
              color: '#fff'
            }
          }
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          normal: {
            color: '#5886f0',
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#00FFC7'
            }, {
              offset: 1,
              color: '#4930EF'
            }]),
            borderWidth: 14
          },
          emphasis: {
            color: '#5886f0',
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#85b6b2'
            }, {
              offset: 1,
              color: '#6d4f8d'
            }]),
            borderWidth: 14
          }
        }
      }, {
        name: '',
        value: 100 - option.data[1],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            color: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0
          },
          emphasis: {
            color: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0
          }
        }
      }]
    },
    {
      name: '外圈',
      center: ['38%', '50%'],
      radius: ['82', '83'],
      clockWise: false,
      hoverAnimation: false,
      type: 'pie',
      data: [{
        value: 84,
        name: '',
        labelLine: {
          show: false
        },
        itemStyle: {
          normal: {
            color: '#0053FF'
          },
          emphasis: {
            color: '#0053FF'
          }
        }
      }, {
        name: '',
        value: 16,
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            color: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0
          },
          emphasis: {
            color: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0
          }
        }
      }]
    }
    // {
    //   name: '低于租金宝商家面积',
    //   center: ['62%', '50%'],
    //   radius: ['73', '75'],
    //   clockWise: false,
    //   hoverAnimation: false,
    //   management: 'pie',
    //   data: [{
    //     value: option.data[2],
    //     name: '',
    //     label: {
    //       normal: {
    //         rich: {
    //           a: {
    //             color: '#333333',
    //             align: 'center',
    //             fontSize: 32,
    //             fontWeight: "bold"
    //           },
    //           b: {
    //             color: '#333333',
    //             align: 'center',
    //             fontSize: 12
    //           }
    //         },
    //         formatter: function (params) {
    //           return "{a|" + params.value + "%}" + "\n\n{b|低于租金宝}" + "\n\n{b|商家面积}";
    //         },
    //         position: 'center',
    //         show: true,
    //         textStyle: {
    //           fontSize: '14',
    //           fontWeight: 'normal',
    //           color: '#fff'
    //         }
    //       }
    //     },
    //     labelLine: {
    //       show: false
    //     },
    //     itemStyle: {
    //       normal: {
    //         color: '#5886f0',
    //         borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //           offset: 0,
    //           color: '#00FFC7'
    //         }, {
    //           offset: 1,
    //           color: '#4930EF'
    //         }]),
    //         borderWidth: 14
    //       },
    //       emphasis: {
    //         color: "#5886f0",
    //         borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //           offset: 0,
    //           color: '#85b6b2'
    //         }, {
    //           offset: 1,
    //           color: '#6d4f8d'
    //         }]),
    //         borderWidth: 14
    //       }
    //     },
    //   }, {
    //     name: '',
    //     value: 100 - option.data[2],
    //     itemStyle: {
    //       normal: {
    //         label: {
    //           show: false
    //         },
    //         labelLine: {
    //           show: false
    //         },
    //         color: 'rgba(0,0,0,0)',
    //         borderColor: 'rgba(0,0,0,0)',
    //         borderWidth: 0
    //       },
    //       emphasis: {
    //         color: 'rgba(0,0,0,0)',
    //         borderColor: 'rgba(0,0,0,0)',
    //         borderWidth: 0
    //       }
    //     }
    //   }]
    // }, {
    //   name: '外圈',
    //   center: ['62%', '50%'],
    //   radius: ['82', '83'],
    //   clockWise: false,
    //   hoverAnimation: false,
    //   management: 'pie',
    //   data: [{
    //     value: 84,
    //     name: '',
    //     labelLine: {
    //       show: false
    //     },
    //     itemStyle: {
    //       normal: {
    //         color: '#0053FF',
    //       },
    //       emphasis: {
    //         color: '#0053FF',
    //       }
    //     },
    //   }, {
    //     name: '',
    //     value: 16,
    //     itemStyle: {
    //       normal: {
    //         label: {
    //           show: false
    //         },
    //         labelLine: {
    //           show: false
    //         },
    //         color: 'rgba(0,0,0,0)',
    //         borderColor: 'rgba(0,0,0,0)',
    //         borderWidth: 0
    //       },
    //       emphasis: {
    //         color: 'rgba(0,0,0,0)',
    //         borderColor: 'rgba(0,0,0,0)',
    //         borderWidth: 0
    //       }
    //     }
    //   }]
    // }, {
    //   name: '高于租金宝商家面积',
    //   center: ['85%', '50%'],
    //   radius: ['73', '75'],
    //   clockWise: false,
    //   hoverAnimation: false,
    //   management: 'pie',
    //   data: [{
    //     value: option.data[3],
    //     name: '',
    //     label: {
    //       normal: {
    //         rich: {
    //           a: {
    //             color: '#333333',
    //             align: 'center',
    //             fontSize: 32,
    //             fontWeight: "bold"
    //           },
    //           b: {
    //             color: '#333333',
    //             align: 'center',
    //             fontSize: 12
    //           }
    //         },
    //         formatter: function (params) {
    //           return "{a|" + params.value + "%}" + "\n\n{b|高于租金宝}" + "\n\n{b|商家面积}";
    //         },
    //         position: 'center',
    //         show: true,
    //         textStyle: {
    //           fontSize: '14',
    //           fontWeight: 'normal',
    //           color: '#fff'
    //         }
    //       }
    //     },
    //     labelLine: {
    //       show: false
    //     },
    //     itemStyle: {
    //       normal: {
    //         color: '#5886f0',
    //         borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //           offset: 0,
    //           color: '#00FFC7'
    //         }, {
    //           offset: 1,
    //           color: '#4930EF'
    //         }]),
    //         borderWidth: 14
    //       },
    //       emphasis: {
    //         color: "#5886f0",
    //         borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //           offset: 0,
    //           color: '#85b6b2'
    //         }, {
    //           offset: 1,
    //           color: '#6d4f8d'
    //         }]),
    //         borderWidth: 14
    //       }
    //     },
    //   }, {
    //     name: '',
    //     value: 100 - option.data[3],
    //     itemStyle: {
    //       normal: {
    //         label: {
    //           show: false
    //         },
    //         labelLine: {
    //           show: false
    //         },
    //         color: 'rgba(0,0,0,0)',
    //         borderColor: 'rgba(0,0,0,0)',
    //         borderWidth: 0
    //       },
    //       emphasis: {
    //         color: 'rgba(0,0,0,0)',
    //         borderColor: 'rgba(0,0,0,0)',
    //         borderWidth: 0
    //       }
    //     }
    //   }]
    // }, {
    //   name: '外圈',
    //   center: ['85%', '50%'],
    //   radius: ['82', '83'],
    //   clockWise: false,
    //   hoverAnimation: false,
    //   management: 'pie',
    //   data: [{
    //     value: 84,
    //     name: '',
    //     labelLine: {
    //       show: false
    //     },
    //     itemStyle: {
    //       normal: {
    //         color: '#0053FF',
    //       },
    //       emphasis: {
    //         color: '#0053FF',
    //       }
    //     },
    //   }, {
    //     name: '',
    //     value: 16,
    //     itemStyle: {
    //       normal: {
    //         label: {
    //           show: false
    //         },
    //         labelLine: {
    //           show: false
    //         },
    //         color: 'rgba(0,0,0,0)',
    //         borderColor: 'rgba(0,0,0,0)',
    //         borderWidth: 0
    //       },
    //       emphasis: {
    //         color: 'rgba(0,0,0,0)',
    //         borderColor: 'rgba(0,0,0,0)',
    //         borderWidth: 0
    //       }
    //     }
    //   }]
    // }
    ]
  }
}
