export default class Page {
  constructor (req, content = []) {
    // console.log(req)
    const { pageNum, pageSize } = ((req.method === 'POST') ? req.body : req.query) || {}
    this.total = content.length
    this.pageNum = +pageNum || 1
    this.pageSize = +pageSize || 5
    const start = (this.pageNum - 1) * this.pageSize
    this.rows = content.slice(start, start + this.pageSize)
  }
}
