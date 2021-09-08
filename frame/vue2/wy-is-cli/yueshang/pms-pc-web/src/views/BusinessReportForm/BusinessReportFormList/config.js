/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:  招商报表-主页配置
 */

import store from "@/store";

let enumList = store.getters.enumList;

// 状态筛选组件
export function StatusSearchConfig() {
  return [
    { label: "面积", value: "1" },
    { label: "品牌", value: "2" },
    { label: "楼层", value: "3" },
  ];
}
export function FormConfig() {
  return [
    {
      key: "projectId",
      label: "",
      type: "select",
      props: {
        options: () => {
          return enumList.areaProjectDict.filter(
            (item) => item.key !== "empty" && item.label !== "总部"
          );
        },
        placeholder: "请选择项目",
        filterable: true,
        clearable: false,
      },
    },
    {
      key: "chargeType",
      label: "",
      type: "select",
      // clearable: false,
      props: {
        // options: () =>
        //   enumList.chargeTypeDict.map((item) => {
        //     let newItem = { ...item };
        //     if (newItem.key === "empty") {
        //       newItem.key = "0";
        //       newItem.code = "0";
        //     }
        //     return newItem;
        //   }),
        options: () => enumList.chargeTypeDict,
        clearable: false,
        placeholder: "请选择物业类型",
      },
    },

    {
      label: "",
      type: "dateRange",
      startKey: "startDate",
      endKey: "endDate",
      props: {
        valueFormat: "yyyy-MM",
        type: "month",
        width: "240px",
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
      },
    },
  ];
}

// 面积
export function TableConfig1(config) {
  let newList = [
    {
      key: "rentAchievementRateFirst3Years",
      label: "首三年租金达成率（%）",
      width: 200,
      align: "center",
      type: "number",
    },
  ];
  if (config.isShow === "0") {
    newList = [];
  }
  return [
    {
      key: "storePostion",
      label: "店型",
      minWidth: 120,
      fixed: true,
      align: "center",
      className: "hasBg",
    },
    {
      key: "issuingLayoutCD",
      label: "签批业态",
      minWidth: 120,
      className: "hasBg",
      fixed: true,
      align: "center",
    },
    {
      key: "totalRentSquare",
      label: "计租面积（㎡）",
      width: 150,
      align: "center",
      type: "number",
    },
    {
      key: "xsRentSquare",
      label: "蓄水面积（㎡）",
      width: 150,
      align: "center",
      type: "number",
    },
    {
      key: "yxj",
      label: "意向金",
      width: 150,
      align: "center",
      children: [
        {
          key: "yxjRentSquare",
          label: "面积（㎡）",
          width: 150,
          align: "center",
          type: "number",
        },
        {
          key: "yxjRentRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    {
      key: "yxqr",
      label: "意向双确",
      width: 150,
      align: "center",
      children: [
        {
          key: "yxqrRentSquare",
          label: "面积（㎡）",
          width: 150,
          align: "center",
          type: "number",
        },
        {
          key: "yxqrRentRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    {
      key: "swqp",
      label: "商务签批",
      width: 150,
      align: "center",
      children: [
        {
          key: "swqpRentSquare",
          label: "面积（㎡）",
          width: 150,
          align: "center",
          type: "number",
        },
        {
          key: "swqpRentRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    {
      key: "htwp",
      label: "合同网批",
      width: 150,
      align: "center",
      children: [
        {
          key: "htwpRentSquare",
          label: "面积（㎡）",
          width: 150,
          align: "center",
          type: "number",
        },
        {
          key: "htwpRentRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    {
      key: "htsq",
      label: "合同双签",
      width: 150,
      align: "center",
      children: [
        {
          key: "htsqRentSquare",
          label: "面积（㎡）",
          width: 150,
          align: "center",
          type: "number",
        },
        {
          key: "htsqRentRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    {
      key: "st",
      label: "审图",
      width: 150,
      align: "center",
      children: [
        {
          key: "stRentSquare",
          label: "面积（㎡）",
          width: 150,
          align: "center",
          type: "number",
        },
        {
          key: "stRentRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    {
      key: "jc",
      label: "装修进场",
      width: 150,
      align: "center",
      children: [
        {
          key: "jcRentSquare",
          label: "面积（㎡）",
          width: 150,
          align: "center",
          type: "number",
        },
        {
          key: "jcRentRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    {
      key: "ky",
      label: "开业",
      width: 150,
      align: "center",
      children: [
        {
          key: "kyRentSquare",
          label: "面积（㎡）",
          width: 150,
          align: "center",
          type: "number",
        },
        {
          key: "kyRentRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    ...newList,
  ];
}

// 品牌
export function TableConfig2(config) {
  let newList = [
    {
      key: "rentAchievementRateFirst3Years",
      label: "首三年租金达成率（%）",
      width: 200,
      align: "center",
      type: "number",
    },
  ];
  if (config.isShow === "0") {
    newList = [];
  }
  return [
    {
      key: "storePostion",
      label: "店型",
      minWidth: 120,
      fixed: true,
      align: "center",
      className: "hasBg",
    },
    {
      key: "issuingLayoutCD",
      label: "签批业态",
      minWidth: 120,
      className: "hasBg",
      fixed: true,
      align: "center",
    },
    {
      key: "totalStoreNumber",
      label: "品牌数",
      width: 150,
      align: "center",
    },
    {
      key: "xsStoreNumber",
      label: "蓄水品牌数",
      width: 150,
      align: "center",
    },
    {
      key: "yxj",
      label: "意向金",
      width: 150,
      align: "center",
      children: [
        {
          key: "yxjStoreNumber",
          label: "品牌数",
          width: 150,
          align: "center",
        },
        {
          key: "yxjStoreRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    {
      key: "yxqr",
      label: "意向双确",
      width: 150,
      align: "center",
      children: [
        {
          key: "yxqrStoreNumber",
          label: "品牌数",
          width: 150,
          align: "center",
        },
        {
          key: "yxqrStoreRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    {
      key: "swqp",
      label: "商务签批",
      width: 150,
      align: "center",
      children: [
        {
          key: "swqpStoreNumber",
          label: "品牌数",
          width: 150,
          align: "center",
        },
        {
          key: "swqpStoreRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    {
      key: "htwp",
      label: "合同网批",
      width: 150,
      align: "center",
      children: [
        {
          key: "htwpStoreNumber",
          label: "品牌数",
          width: 150,
          align: "center",
        },
        {
          key: "htwpStoreRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    {
      key: "htsq",
      label: "合同双签",
      width: 150,
      align: "center",
      children: [
        {
          key: "htsqStoreNumber",
          label: "品牌数",
          width: 150,
          align: "center",
        },
        {
          key: "htsqStoreRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    {
      key: "st",
      label: "审图",
      width: 150,
      align: "center",
      children: [
        {
          key: "stStoreNumber",
          label: "品牌数",
          width: 150,
          align: "center",
        },
        {
          key: "stStoreRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    {
      key: "jc",
      label: "装修进场",
      width: 150,
      align: "center",
      children: [
        {
          key: "jcStoreNumber",
          label: "品牌数",
          width: 150,
          align: "center",
        },
        {
          key: "jcStoreRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    {
      key: "ky",
      label: "开业",
      width: 150,
      align: "center",
      children: [
        {
          key: "kyStoreNumber",
          label: "品牌数",
          width: 150,
          align: "center",
        },
        {
          key: "kyStoreRate",
          label: "完成率（%）",
          width: 150,
          align: "center",
          type: "number",
        },
      ],
    },
    ...newList,
  ];
}

// 获取楼层的配置项
const getConfig3Child = function(name) {
  return [
    {
      key: `${name}totalArea`,
      label: "总面积 (㎡)",
      minWidth: 120,
      align: "center",
      type: "number",
    },
    {
      key: `${name}totalStoreNumber`,
      label: "总品牌数",
      minWidth: 120,
      align: "center",
    },
    {
      key: `${name}swArea`,
      label: "商务面积 (㎡)",
      minWidth: 120,
      align: "center",
      type: "number",
    },
    {
      key: `${name}swBrandNumber`,
      label: "商务品牌数",
      minWidth: 120,
      align: "center",
    },
    {
      key: `${name}sqArea`,
      label: "双签面积 (㎡)",
      minWidth: 120,
      align: "center",
      type: "number",
    },

    {
      key: `${name}sqBrandNumber`,
      label: "双签品牌数",
      minWidth: 120,
      align: "center",
    },
    {
      key: `${name}dskBrandNumber`,
      label: "待收口品牌数",
      minWidth: 120,
      align: "center",
    },
  ];
};

// 楼层
export function TableConfig3() {
  return [
    {
      key: "a",
      label: "业态",
      minWidth: 120,
      align: "center",
      className: "hasBg",
      fixed: true,
      children: [
        {
          key: "floorNumber",
          label: "楼层",
          minWidth: 120,
          fixed: true,
          align: "center",
          className: "hasBg",
        },
      ],
    },
    {
      key: "totalDetail",
      label: "合计",
      align: "center",
      hasClose: true,
      children: getConfig3Child("totalDetail"),
    },
    {
      key: "marketDetail",
      label: "主力店-超市",
      align: "center",
      hasClose: true,
      children: getConfig3Child("marketDetail"),
    },
    {
      key: "cinemaDetail",
      label: "主力店-影院",
      align: "center",
      hasClose: true,
      children: getConfig3Child("cinemaDetail"),
    },
    {
      key: "majorStoreDetail",
      label: "次主力店",
      align: "center",
      hasClose: true,
      children: getConfig3Child("majorStoreDetail"),
    },
    {
      key: "restaurantDetail",
      label: "中小商铺-餐饮",
      align: "center",
      hasClose: true,
      children: getConfig3Child("restaurantDetail"),
    },
    {
      key: "clothingDetail",
      label: "中小商铺-服装",
      align: "center",
      hasClose: true,
      children: getConfig3Child("clothingDetail"),
    },
    {
      key: "childrenDetail",
      label: "中小商铺-儿童",
      align: "center",
      hasClose: true,
      children: getConfig3Child("childrenDetail"),
    },
    {
      key: "retailSupportDetail",
      label: "中小商铺-零售配套",
      align: "center",
      hasClose: true,
      children: getConfig3Child("retailSupportDetail"),
    },
    {
      key: "lifeSupportDetail",
      label: "中小商铺-生活配套",
      align: "center",
      hasClose: true,
      children: getConfig3Child("lifeSupportDetail"),
    },
  ];
}
