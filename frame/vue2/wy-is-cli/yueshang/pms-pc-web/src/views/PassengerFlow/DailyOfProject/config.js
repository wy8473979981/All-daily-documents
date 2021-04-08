import store from '@/store'

let enumList = store.getters.enumList;

export const FormConfig = [
  {
    key: 'projectId',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.projectAllDict,
      placeholder: '项目',
      filterable: true
    }
  },
  {
    label: '',
    type: 'date',
    key: 'yearMonth',
    props: {
      valueFormat: 'yyyy-MM',
      type: 'month'
    }
  },
]

export const calendar = [
  {
    "actualFlow": 937707,
    "achievementRate": null,
    "date": "2021-03-01",
    "isHoliday": 0,
    "dayOfWeek": 1
  },
  {
    "actualFlow": 1036909,
    "achievementRate": null,
    "date": "2021-03-02",
    "isHoliday": 0,
    "dayOfWeek": 2
  },
  {
    "actualFlow": 1025234,
    "achievementRate": null,
    "date": "2021-03-03",
    "isHoliday": 0,
    "dayOfWeek": 3
  },
  {
    "actualFlow": 1037424,
    "achievementRate": null,
    "date": "2021-03-04",
    "isHoliday": 0,
    "dayOfWeek": 4
  },
  {
    "actualFlow": 1178103,
    "achievementRate": null,
    "date": "2021-03-05",
    "isHoliday": 1,
    "dayOfWeek": 5
  },
  {
    "actualFlow": 1703027,
    "achievementRate": null,
    "date": "2021-03-06",
    "isHoliday": 1,
    "dayOfWeek": 6
  },
  {
    "actualFlow": 1720392,
    "achievementRate": null,
    "date": "2021-03-07",
    "isHoliday": 1,
    "dayOfWeek": 7
  },
  {
    "actualFlow": 1296021,
    "achievementRate": null,
    "date": "2021-03-08",
    "isHoliday": 0,
    "dayOfWeek": 1
  },
  {
    "actualFlow": 1045225,
    "achievementRate": null,
    "date": "2021-03-09",
    "isHoliday": 0,
    "dayOfWeek": 2
  },
  {
    "actualFlow": 1122450,
    "achievementRate": null,
    "date": "2021-03-10",
    "isHoliday": 0,
    "dayOfWeek": 3
  },
  {
    "actualFlow": 1036270,
    "achievementRate": null,
    "date": "2021-03-11",
    "isHoliday": 0,
    "dayOfWeek": 4
  },
  {
    "actualFlow": 1271045,
    "achievementRate": null,
    "date": "2021-03-12",
    "isHoliday": 1,
    "dayOfWeek": 5
  },
  {
    "actualFlow": 1838098,
    "achievementRate": null,
    "date": "2021-03-13",
    "isHoliday": 1,
    "dayOfWeek": 6
  },
  {
    "actualFlow": 1805094,
    "achievementRate": null,
    "date": "2021-03-14",
    "isHoliday": 1,
    "dayOfWeek": 7
  },
  {
    "actualFlow": 1013639,
    "achievementRate": null,
    "date": "2021-03-15",
    "isHoliday": 0,
    "dayOfWeek": 1
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-16",
    "isHoliday": 0,
    "dayOfWeek": 2
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-17",
    "isHoliday": 0,
    "dayOfWeek": 3
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-18",
    "isHoliday": 0,
    "dayOfWeek": 4
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-19",
    "isHoliday": 1,
    "dayOfWeek": 5
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-20",
    "isHoliday": 1,
    "dayOfWeek": 6
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-21",
    "isHoliday": 1,
    "dayOfWeek": 7
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-22",
    "isHoliday": 0,
    "dayOfWeek": 1
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-23",
    "isHoliday": 0,
    "dayOfWeek": 2
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-24",
    "isHoliday": 0,
    "dayOfWeek": 3
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-25",
    "isHoliday": 0,
    "dayOfWeek": 4
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-26",
    "isHoliday": 1,
    "dayOfWeek": 5
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-27",
    "isHoliday": 1,
    "dayOfWeek": 6
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-28",
    "isHoliday": 1,
    "dayOfWeek": 7
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-29",
    "isHoliday": 0,
    "dayOfWeek": 1
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-30",
    "isHoliday": 0,
    "dayOfWeek": 2
  },
  {
    "actualFlow": 0,
    "achievementRate": null,
    "date": "2021-03-31",
    "isHoliday": 0,
    "dayOfWeek": 3
  }
]