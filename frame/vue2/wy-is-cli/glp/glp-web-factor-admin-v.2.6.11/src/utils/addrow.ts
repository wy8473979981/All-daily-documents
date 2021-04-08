const addRow: any = (param: any) => {
  let temp: any = []
  if (param instanceof Array) {
    for (let i = 0; i < param.length; i++) {
      temp.push({
        span: 12,
        controls: [
          param[i]
        ]
      })
    }
  } else {
    temp = [{
      span: 12,
      controls: [
        param
      ]
    }]
  }

  return {
    span: 24,
    def: {
      type: 'grid',
      columns: temp
    }
  }
}
export default addRow
