// {label: '所有考试成绩', val: 'scoreList', desc: '我是描述XXXXXXXXXXXXXX'},
// {label: '所有身高', val: 'heightList', desc: '我是描述YYYYYYYYY'}

/**
 *       loopHead: [
        {val: 'name', label: '名字'},
        {val: 'score', label: '分数'},
        {val: 'gender', label: '性别'}
      ],
      loopData: [
        { name: 'mike',  score: 99, gender: '男' },
        { name: 'lisa',  score: 1, gender: '男' },
        { name: 'jason',  score: 12, gender: '男' }
      ]
 */
const scoreList = [
  { key: 'name', label: '姓名' },
  { key: 'score', label: '分数分数分数分数分数' },
  { key: 'gender', label: '性别' }
]

const heightList = [
  { key: 'name', label: '姓名姓名' },
  { key: 'height', label: '升高升高' },
  { key: 'age', label: '年龄年龄' },
  { key: 'hobby', label: '爱好' },
  { key: 'salary', label: '薪水' }
]

const elementList = [
  {
    value: 'project.name',
    label: '项目名字',
    descr: '我是项目的名字'
  },
  {
    value: 'company.name',
    label: '公司的名字',
    descr: '我是公司的名字'
  }
]

export default {
  scoreList, heightList, elementList
}
